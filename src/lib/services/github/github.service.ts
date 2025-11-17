/**
 * GitHub Service
 * Handles all interactions with GitHub API
 *
 * MODULAR: All GitHub logic in one place, easy to mock/test
 */

import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { config } from '../../config';
import {
  IGitHubService,
  GitHubUser,
  GitHubRepository,
  GitHubWorkflowRun,
} from '../../types';

export class GitHubService implements IGitHubService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  /**
   * Get OAuth authorization URL
   */
  getOAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: config.github.clientId,
      redirect_uri: `${config.auth.url}/api/auth/callback/github`,
      scope: 'repo,user:email,read:org',
      state: this.generateState(),
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange OAuth code for access token
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: config.github.clientId,
          client_secret: config.github.clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.data.error) {
        throw new Error(`GitHub OAuth error: ${response.data.error_description}`);
      }

      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw new Error('Failed to authenticate with GitHub');
    }
  }

  /**
   * Get authenticated user profile
   */
  async getUserProfile(accessToken: string): Promise<GitHubUser> {
    try {
      const response = await this.api.get('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        id: response.data.id,
        login: response.data.login,
        email: response.data.email,
        name: response.data.name,
        avatarUrl: response.data.avatar_url,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch GitHub user profile');
    }
  }

  /**
   * Get user repositories
   */
  async getUserRepositories(accessToken: string): Promise<GitHubRepository[]> {
    try {
      const response = await this.api.get('/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          per_page: 100,
          sort: 'updated',
        },
      });

      return response.data.map((repo: any) => this.mapRepository(repo));
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error('Failed to fetch GitHub repositories');
    }
  }

  /**
   * Get single repository
   */
  async getRepository(
    owner: string,
    repo: string,
    accessToken: string
  ): Promise<GitHubRepository> {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return this.mapRepository(response.data);
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw new Error('Failed to fetch GitHub repository');
    }
  }

  /**
   * Get workflow runs for a repository
   */
  async getWorkflowRuns(
    owner: string,
    repo: string,
    accessToken: string,
    options: {
      branch?: string;
      event?: string;
      status?: string;
      perPage?: number;
    } = {}
  ): Promise<GitHubWorkflowRun[]> {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/actions/runs`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          branch: options.branch,
          event: options.event,
          status: options.status || 'completed',
          per_page: options.perPage || 30,
        },
      });

      return response.data.workflow_runs.map((run: any) => this.mapWorkflowRun(run));
    } catch (error) {
      console.error('Error fetching workflow runs:', error);
      throw new Error('Failed to fetch workflow runs');
    }
  }

  /**
   * Get single workflow run
   */
  async getWorkflowRun(
    owner: string,
    repo: string,
    runId: number,
    accessToken: string
  ): Promise<GitHubWorkflowRun> {
    try {
      const response = await this.api.get(`/repos/${owner}/${repo}/actions/runs/${runId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return this.mapWorkflowRun(response.data);
    } catch (error) {
      console.error('Error fetching workflow run:', error);
      throw new Error('Failed to fetch workflow run');
    }
  }

  /**
   * Get workflow file content
   */
  async getWorkflowFile(
    owner: string,
    repo: string,
    workflowPath: string,
    accessToken: string
  ): Promise<string> {
    try {
      // Remove leading .github/ if present
      const path = workflowPath.startsWith('.github/')
        ? workflowPath
        : `.github/${workflowPath}`;

      const response = await this.api.get(`/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.raw',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching workflow file:', error);
      // Return empty string if file not found
      return '';
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', config.github.webhookSecret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  }

  /**
   * Helper: Map repository response to our type
   */
  private mapRepository(repo: any): GitHubRepository {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      description: repo.description,
      private: repo.private,
      defaultBranch: repo.default_branch,
      hasWorkflows: true, // Assume true, will be validated later
    };
  }

  /**
   * Helper: Map workflow run response to our type
   */
  private mapWorkflowRun(run: any): GitHubWorkflowRun {
    const startedAt = new Date(run.run_started_at || run.created_at);
    const completedAt = run.updated_at ? new Date(run.updated_at) : undefined;

    let runtimeMinutes: number | undefined;
    if (completedAt) {
      runtimeMinutes = (completedAt.getTime() - startedAt.getTime()) / 1000 / 60;
    }

    return {
      id: run.id,
      name: run.name,
      workflowPath: run.path,
      status: run.status,
      conclusion: run.conclusion,
      runStartedAt: run.run_started_at || run.created_at,
      runCompletedAt: run.updated_at,
      runtimeMinutes,
      htmlUrl: run.html_url,
    };
  }

  /**
   * Helper: Generate random state for OAuth
   */
  private generateState(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}

// Export singleton instance
export const githubService = new GitHubService();
