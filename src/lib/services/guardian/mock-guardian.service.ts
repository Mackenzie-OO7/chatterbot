/**
 * Mock Guardian Service
 * Simulates Guardian API for testing without real Guardian instance
 *
 * IMPORTANT: Implements exact same interface as real GuardianService
 * This ensures type safety and seamless switching
 */

import {
  IGuardianService,
  GuardianPolicy,
  EmissionTokenData,
  OffsetTokenData,
  GuardianToken,
} from '../../types';

export class MockGuardianService implements IGuardianService {
  private isAuthenticated = false;
  private mockPolicyId = 'mock-policy-software-emissions-v1';
  private tokenCounter = 1000;

  /**
   * Mock authentication - always succeeds
   */
  async authenticate(): Promise<string> {
    console.log('🔷 [MOCK] Guardian authentication...');
    this.isAuthenticated = true;
    const mockToken = `mock_jwt_token_${Date.now()}`;
    console.log('✅ [MOCK] Authenticated successfully');
    return mockToken;
  }

  /**
   * Mock get policies - returns sample policy
   */
  async getPolicies(): Promise<GuardianPolicy[]> {
    console.log('🔷 [MOCK] Fetching policies...');

    const mockPolicies: GuardianPolicy[] = [
      {
        id: this.mockPolicyId,
        name: 'Software Development Emissions v1.0',
        description: 'Mock policy for tracking carbon emissions from software development',
        version: '1.0.0',
        status: 'published',
      },
      {
        id: 'mock-policy-carbon-offsets',
        name: 'Carbon Offset Credits v1.0',
        description: 'Mock policy for carbon offset tokens',
        version: '1.0.0',
        status: 'published',
      },
    ];

    console.log(`✅ [MOCK] Found ${mockPolicies.length} policies`);
    return mockPolicies;
  }

  /**
   * Mock get single policy
   */
  async getPolicy(policyId: string): Promise<GuardianPolicy> {
    console.log(`🔷 [MOCK] Fetching policy: ${policyId}`);

    const policies = await this.getPolicies();
    const policy = policies.find(p => p.id === policyId);

    if (!policy) {
      throw new Error(`Policy ${policyId} not found`);
    }

    return policy;
  }

  /**
   * Set the policy ID to use for token minting
   */
  setPolicyId(policyId: string): void {
    console.log(`🔷 [MOCK] Setting policy ID: ${policyId}`);
    this.mockPolicyId = policyId;
  }

  /**
   * Get the current policy ID
   */
  getPolicyId(): string {
    return this.mockPolicyId;
  }

  /**
   * Mock mint emission token - generates realistic token ID
   */
  async mintEmissionToken(data: EmissionTokenData): Promise<string> {
    console.log('🔷 [MOCK] Minting emission token...');
    console.log('   Repository:', data.repository);
    console.log('   Emissions:', data.totalEmissions, 'kg CO2');
    console.log('   Breakdown:', JSON.stringify(data.breakdown));

    // Simulate network delay
    await this.delay(500);

    // Generate realistic-looking token ID
    const tokenId = `emission_${this.tokenCounter++}_${Date.now()}`;

    console.log('✅ [MOCK] Emission token minted:', tokenId);
    console.log('   ⚠️  This is a MOCK token - set USE_MOCK_GUARDIAN=false for real minting');

    return tokenId;
  }

  /**
   * Mock mint offset token
   */
  async mintOffsetToken(data: OffsetTokenData): Promise<string> {
    console.log('🔷 [MOCK] Minting offset token...');
    console.log('   Project:', data.projectName);
    console.log('   Type:', data.projectType);
    console.log('   Amount:', data.amount, 'kg CO2');

    // Simulate network delay
    await this.delay(500);

    const tokenId = `offset_${this.tokenCounter++}_${Date.now()}`;

    console.log('✅ [MOCK] Offset token minted:', tokenId);
    console.log('   ⚠️  This is a MOCK token - set USE_MOCK_GUARDIAN=false for real minting');

    return tokenId;
  }

  /**
   * Mock get token details
   */
  async getToken(tokenId: string): Promise<GuardianToken> {
    console.log(`🔷 [MOCK] Fetching token: ${tokenId}`);

    await this.delay(200);

    // Parse token ID to determine type
    const type = tokenId.startsWith('emission_') ? 'emission' : 'offset';

    const token: GuardianToken = {
      id: tokenId,
      type,
      amount: 100, // Mock amount
      metadata: {
        mock: true,
        createdAt: new Date().toISOString(),
      },
      owner: 'mock-owner-did',
      status: 'active',
    };

    console.log('✅ [MOCK] Token retrieved');
    return token;
  }

  /**
   * Mock retire tokens
   */
  async retireTokens(emissionTokenId: string, offsetTokenId: string): Promise<string> {
    console.log('🔷 [MOCK] Retiring tokens...');
    console.log('   Emission Token:', emissionTokenId);
    console.log('   Offset Token:', offsetTokenId);

    await this.delay(800);

    const retirementId = `retirement_${this.tokenCounter++}_${Date.now()}`;

    console.log('✅ [MOCK] Tokens retired:', retirementId);
    console.log('   ⚠️  This is a MOCK retirement - set USE_MOCK_GUARDIAN=false for real retirement');

    return retirementId;
  }

  /**
   * Mock get instance info
   */
  async getInstanceInfo(): Promise<any> {
    return {
      mode: 'MOCK',
      version: '1.0.0-mock',
      message: 'This is a mock Guardian service. Set USE_MOCK_GUARDIAN=false to use real Guardian.',
    };
  }

  /**
   * Helper: Simulate async delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Helper: Generate realistic token ID
   */
  private generateTokenId(prefix: string): string {
    return `${prefix}_${this.tokenCounter++}_${Date.now()}`;
  }
}

// Export singleton instance
export const mockGuardianService = new MockGuardianService();
