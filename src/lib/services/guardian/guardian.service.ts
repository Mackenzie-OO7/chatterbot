/**
 * Guardian Service
 * Handles all interactions with Hedera Guardian API
 *
 * MODULAR: All Guardian logic in one place, easy to test
 */

import axios, { AxiosInstance } from 'axios';
import { config } from '../../config';
import {
  IGuardianService,
  GuardianPolicy,
  EmissionTokenData,
  OffsetTokenData,
  GuardianToken,
} from '../../types';

interface GuardianAuthResponse {
  username: string;
  did: string;
  accessToken: string;
  refreshToken: string;
}

export class GuardianService implements IGuardianService {
  private api: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private policyId: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: config.guardian.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Authenticate with Guardian API
   * Uses credentials from environment variables
   */
  async authenticate(): Promise<string> {
    try {
      // If we have a valid token, return it
      if (this.accessToken) {
        return this.accessToken;
      }

      // Get credentials from config
      const username = process.env.GUARDIAN_USERNAME;
      const password = process.env.GUARDIAN_PASSWORD;

      if (!username || !password) {
        throw new Error('Guardian credentials not configured. Set GUARDIAN_USERNAME and GUARDIAN_PASSWORD in .env');
      }

      // Login to Guardian
      const response = await this.api.post<GuardianAuthResponse>('/accounts/login', {
        username,
        password,
      });

      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;

      console.log('✅ Guardian authentication successful');
      return this.accessToken;
    } catch (error) {
      console.error('❌ Guardian authentication failed:', error);
      throw new Error('Failed to authenticate with Guardian');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      return await this.authenticate();
    }

    try {
      const response = await this.api.post<{ accessToken: string }>('/accounts/access-token', {
        refreshToken: this.refreshToken,
      });

      this.accessToken = response.data.accessToken;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to refresh token, re-authenticating');
      return await this.authenticate();
    }
  }

  /**
   * Make authenticated API request with automatic token refresh
   */
  private async makeAuthenticatedRequest<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any
  ): Promise<T> {
    // Ensure we're authenticated
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await this.api.request<T>({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      // If 401, refresh token and retry
      if (error.response?.status === 401) {
        await this.refreshAccessToken();
        const response = await this.api.request<T>({
          method,
          url,
          data,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        return response.data;
      }

      throw error;
    }
  }

  /**
   * Get all policies
   */
  async getPolicies(): Promise<GuardianPolicy[]> {
    try {
      const policies = await this.makeAuthenticatedRequest<any[]>('get', '/policies');

      return policies.map((p) => ({
        id: p.id || p._id,
        name: p.name,
        description: p.description || '',
        version: p.version || '1.0',
        status: p.status,
      }));
    } catch (error) {
      console.error('Error fetching policies:', error);
      throw new Error('Failed to fetch Guardian policies');
    }
  }

  /**
   * Get single policy by ID
   */
  async getPolicy(policyId: string): Promise<GuardianPolicy> {
    try {
      const policy = await this.makeAuthenticatedRequest<any>('get', `/policies/${policyId}`);

      return {
        id: policy.id || policy._id,
        name: policy.name,
        description: policy.description || '',
        version: policy.version || '1.0',
        status: policy.status,
      };
    } catch (error) {
      console.error('Error fetching policy:', error);
      throw new Error(`Failed to fetch policy ${policyId}`);
    }
  }

  /**
   * Set the policy ID to use for token minting
   */
  setPolicyId(policyId: string): void {
    this.policyId = policyId;
  }

  /**
   * Get the current policy ID
   */
  getPolicyId(): string {
    if (!this.policyId) {
      this.policyId = process.env.GUARDIAN_POLICY_ID || '';
    }

    if (!this.policyId) {
      throw new Error('Guardian policy ID not set. Call setPolicyId() or set GUARDIAN_POLICY_ID in .env');
    }

    return this.policyId;
  }

  /**
   * Mint emission token via Guardian policy
   */
  async mintEmissionToken(data: EmissionTokenData): Promise<string> {
    try {
      const policyId = this.getPolicyId();

      // Prepare document data for Guardian
      const document = {
        type: 'emission',
        repository: data.repository,
        periodStart: data.periodStart,
        periodEnd: data.periodEnd,
        totalEmissions: data.totalEmissions,
        breakdown: data.breakdown,
        calculationMethodology: data.calculationMethodology,
        verificationData: data.verificationData,
        timestamp: new Date().toISOString(),
      };

      console.log('🔷 Minting emission token via Guardian...');
      console.log('   Repository:', data.repository);
      console.log('   Emissions:', data.totalEmissions, 'kg CO2');

      // Submit document to policy for processing and minting
      // The exact endpoint depends on your policy configuration
      // This is a generic approach - adjust based on your policy blocks
      const result = await this.makeAuthenticatedRequest<any>(
        'post',
        `/policies/${policyId}/blocks/submit`,
        {
          document,
          ref: 'emission_data', // Adjust based on your policy's block reference
        }
      );

      // Extract token ID from result
      const tokenId = result.tokenId || result.id || result._id;

      if (!tokenId) {
        console.warn('⚠️  Token minted but ID not found in response:', result);
        // Return a placeholder - we can query for it later
        return `pending_${Date.now()}`;
      }

      console.log('✅ Emission token minted:', tokenId);
      return tokenId;
    } catch (error: any) {
      console.error('❌ Failed to mint emission token:', error.response?.data || error.message);
      throw new Error('Failed to mint emission token via Guardian');
    }
  }

  /**
   * Mint offset token via Guardian policy
   */
  async mintOffsetToken(data: OffsetTokenData): Promise<string> {
    try {
      const policyId = this.getPolicyId();

      const document = {
        type: 'offset',
        projectName: data.projectName,
        projectType: data.projectType,
        amount: data.amount,
        vintage: data.vintage,
        verificationStandard: data.verificationStandard,
        timestamp: new Date().toISOString(),
      };

      console.log('🌳 Minting offset token via Guardian...');
      console.log('   Project:', data.projectName);
      console.log('   Amount:', data.amount, 'kg CO2');

      const result = await this.makeAuthenticatedRequest<any>(
        'post',
        `/policies/${policyId}/blocks/submit`,
        {
          document,
          ref: 'offset_data', // Adjust based on your policy
        }
      );

      const tokenId = result.tokenId || result.id || result._id;

      if (!tokenId) {
        console.warn('⚠️  Offset token minted but ID not found in response');
        return `pending_offset_${Date.now()}`;
      }

      console.log('✅ Offset token minted:', tokenId);
      return tokenId;
    } catch (error: any) {
      console.error('❌ Failed to mint offset token:', error.response?.data || error.message);
      throw new Error('Failed to mint offset token via Guardian');
    }
  }

  /**
   * Get token details by ID
   */
  async getToken(tokenId: string): Promise<GuardianToken> {
    try {
      // Query Guardian for token details
      const token = await this.makeAuthenticatedRequest<any>('get', `/tokens/${tokenId}`);

      return {
        id: token.tokenId || token.id,
        type: token.type === 'emission' ? 'emission' : 'offset',
        amount: token.amount || token.balance || 0,
        metadata: token.metadata || {},
        owner: token.owner || '',
        status: token.status || 'active',
      };
    } catch (error) {
      console.error('Error fetching token:', error);
      throw new Error(`Failed to fetch token ${tokenId}`);
    }
  }

  /**
   * Retire tokens (burn emission + offset tokens)
   */
  async retireTokens(emissionTokenId: string, offsetTokenId: string): Promise<string> {
    try {
      const policyId = this.getPolicyId();

      console.log('🔥 Retiring tokens via Guardian...');
      console.log('   Emission Token:', emissionTokenId);
      console.log('   Offset Token:', offsetTokenId);

      // Submit retirement request to Guardian policy
      const result = await this.makeAuthenticatedRequest<any>(
        'post',
        `/policies/${policyId}/retire`,
        {
          emissionTokenId,
          offsetTokenId,
          timestamp: new Date().toISOString(),
        }
      );

      const retirementId = result.retirementId || result.id || result._id;

      console.log('✅ Tokens retired:', retirementId);
      return retirementId;
    } catch (error: any) {
      console.error('❌ Failed to retire tokens:', error.response?.data || error.message);
      throw new Error('Failed to retire tokens via Guardian');
    }
  }

  /**
   * Get Guardian instance info (for debugging)
   */
  async getInstanceInfo(): Promise<any> {
    try {
      // This endpoint might not exist - adjust based on Guardian version
      const info = await this.makeAuthenticatedRequest<any>('get', '/status');
      return info;
    } catch (error) {
      return {
        error: 'Could not fetch instance info',
        apiUrl: config.guardian.apiUrl,
      };
    }
  }
}

// Export singleton instance
export const guardianService = new GuardianService();
