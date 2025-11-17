/**
 * Core type definitions for GitGreen
 * All interfaces and types used across the application
 */

// ============================================================================
// Domain Models
// ============================================================================

export interface User {
  id: string;
  githubId: string;
  githubUsername: string;
  email?: string;
  hederaAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Repository {
  id: string;
  githubRepoId: string;
  name: string;
  owner: string;
  fullName: string; // owner/name
  userId: string;
  isTracking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Emission {
  id: string;
  repositoryId: string;
  periodStart: Date;
  periodEnd: Date;
  totalCO2kg: number;
  cicdCO2kg: number;
  cloudCO2kg?: number;
  aiCO2kg?: number;
  calculationData: EmissionCalculationData;
  guardianTokenId?: string;
  status: EmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type EmissionStatus = 'calculated' | 'minted' | 'offset' | 'retired';

export interface EmissionCalculationData {
  workflows: WorkflowEmission[];
  methodology: string;
  calculatedAt: string;
  metadata?: Record<string, any>;
}

export interface WorkflowEmission {
  workflowName: string;
  workflowFile: string;
  runId: string;
  runUrl: string;
  runnerType: string;
  runtimeMinutes: number;
  carbonIntensity: number;
  emissionsCO2kg: number;
  timestamp: string;
}

export interface OffsetPurchase {
  id: string;
  userId: string;
  emissionId: string;
  co2kg: number;
  projectName: string;
  projectType: string;
  priceHBAR: number;
  priceUSD?: number;
  guardianTokenId?: string;
  status: OffsetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OffsetStatus = 'pending' | 'purchased' | 'retired';

export interface Retirement {
  id: string;
  emissionTokenId: string;
  offsetTokenId: string;
  hederaTxId: string;
  certificateNFTId?: string;
  createdAt: Date;
}

export interface Badge {
  id: string;
  repositoryId: string;
  type: BadgeType;
  nftTokenId?: string;
  imageUrl: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export type BadgeType =
  | 'carbon_neutral'
  | 'first_offset'
  | 'green_streak_30'
  | 'efficiency_expert'
  | 'climate_champion';

// ============================================================================
// Service Interfaces (for modularity)
// ============================================================================

/**
 * GitHub Service Interface
 */
export interface IGitHubService {
  // OAuth
  getOAuthUrl(): string;
  exchangeCodeForToken(code: string): Promise<string>;
  getUserProfile(accessToken: string): Promise<GitHubUser>;

  // Repositories
  getUserRepositories(accessToken: string): Promise<GitHubRepository[]>;
  getRepository(owner: string, repo: string, accessToken: string): Promise<GitHubRepository>;

  // Webhooks
  verifyWebhookSignature(payload: string, signature: string): boolean;

  // Workflows
  getWorkflowRuns(owner: string, repo: string, accessToken: string): Promise<GitHubWorkflowRun[]>;
  getWorkflowRun(owner: string, repo: string, runId: number, accessToken: string): Promise<GitHubWorkflowRun>;
  getWorkflowFile(owner: string, repo: string, workflowPath: string, accessToken: string): Promise<string>;
}

export interface GitHubUser {
  id: number;
  login: string;
  email?: string;
  name?: string;
  avatarUrl: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  description?: string;
  private: boolean;
  defaultBranch: string;
  hasWorkflows: boolean;
}

export interface GitHubWorkflowRun {
  id: number;
  name: string;
  workflowPath: string;
  status: string;
  conclusion?: string;
  runStartedAt: string;
  runCompletedAt?: string;
  runtimeMinutes?: number;
  htmlUrl: string;
}

/**
 * Guardian Service Interface
 */
export interface IGuardianService {
  // Authentication
  authenticate(): Promise<string>;

  // Policies
  getPolicies(): Promise<GuardianPolicy[]>;
  getPolicy(policyId: string): Promise<GuardianPolicy>;

  // Tokens
  mintEmissionToken(data: EmissionTokenData): Promise<string>;
  mintOffsetToken(data: OffsetTokenData): Promise<string>;
  getToken(tokenId: string): Promise<GuardianToken>;

  // Retirement
  retireTokens(emissionTokenId: string, offsetTokenId: string): Promise<string>;
}

export interface GuardianPolicy {
  id: string;
  name: string;
  description: string;
  version: string;
  status: string;
}

export interface EmissionTokenData {
  repository: string;
  periodStart: string;
  periodEnd: string;
  totalEmissions: number;
  breakdown: {
    cicd: number;
    cloud?: number;
    ai?: number;
  };
  calculationMethodology: string;
  verificationData?: string;
}

export interface OffsetTokenData {
  projectName: string;
  projectType: string;
  amount: number;
  vintage: string;
  verificationStandard?: string;
}

export interface GuardianToken {
  id: string;
  type: 'emission' | 'offset';
  amount: number;
  metadata: Record<string, any>;
  owner: string;
  status: string;
}

/**
 * Hedera Service Interface
 */
export interface IHederaService {
  // Account
  getAccountBalance(): Promise<number>;

  // Tokens
  createToken(options: CreateTokenOptions): Promise<string>;
  mintNFT(tokenId: string, metadata: NFTMetadata): Promise<string>;
  transferToken(tokenId: string, toAccountId: string, amount: number): Promise<string>;

  // Smart Contract
  deployContract(bytecode: string): Promise<string>;
  executeContract(contractId: string, functionName: string, params: any[]): Promise<string>;

  // Consensus
  submitMessage(topic: string, message: string): Promise<string>;
}

export interface CreateTokenOptions {
  name: string;
  symbol: string;
  type: 'fungible' | 'non-fungible';
  decimals?: number;
  initialSupply?: number;
  maxSupply?: number;
  metadata?: Record<string, any>;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  properties?: Record<string, any>;
}

/**
 * Carbon Calculation Service Interface
 */
export interface ICarbonCalculationService {
  // CI/CD Calculations
  calculateWorkflowEmissions(workflow: GitHubWorkflowRun, workflowYaml: string): Promise<number>;
  calculateCICDEmissions(workflows: GitHubWorkflowRun[], workflowFiles: Map<string, string>): Promise<EmissionCalculationData>;

  // Future: Cloud, AI calculations
  calculateCloudEmissions?(cloudUsage: any): Promise<number>;
  calculateAIEmissions?(aiUsage: any): Promise<number>;
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// Webhook Payloads
// ============================================================================

export interface GitHubWebhookPayload {
  action?: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
  };
  sender: {
    login: string;
  };
}

export interface WorkflowRunWebhookPayload extends GitHubWebhookPayload {
  workflow_run: {
    id: number;
    name: string;
    path: string;
    status: string;
    conclusion?: string;
    created_at: string;
    updated_at: string;
    run_started_at: string;
    html_url: string;
  };
}

// ============================================================================
// Carbon Constants
// ============================================================================

export const CARBON_INTENSITY_BY_RUNNER: Record<string, number> = {
  'ubuntu-latest': 0.45,    // kg CO2/hour (US East)
  'ubuntu-22.04': 0.45,
  'ubuntu-20.04': 0.45,
  'macos-latest': 0.38,     // kg CO2/hour
  'macos-13': 0.38,
  'macos-12': 0.38,
  'windows-latest': 0.52,   // kg CO2/hour
  'windows-2022': 0.52,
  'windows-2019': 0.52,
  'default': 0.45,          // Fallback
};

export const CARBON_CALCULATION_VERSION = 'v1.0';
