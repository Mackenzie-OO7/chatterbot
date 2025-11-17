/**
 * Prisma Type Definitions
 * Local type definitions for development/testing without database
 * These match what Prisma generates from schema.prisma
 */

export type User = {
  id: string;
  githubId: string;
  githubUsername: string;
  email: string | null;
  avatarUrl: string | null;
  hederaAccountId: string | null;
  accessToken: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Repository = {
  id: string;
  githubRepoId: string;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  defaultBranch: string;
  isPrivate: boolean;
  userId: string;
  isTracking: boolean;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum EmissionStatus {
  CALCULATED = 'CALCULATED',
  MINTED = 'MINTED',
  OFFSET = 'OFFSET',
  RETIRED = 'RETIRED',
}

export type Emission = {
  id: string;
  repositoryId: string;
  periodStart: Date;
  periodEnd: Date;
  totalCO2kg: number;
  cicdCO2kg: number;
  cloudCO2kg: number | null;
  aiCO2kg: number | null;
  calculationData: any; // JSON type
  methodology: string;
  guardianTokenId: string | null;
  guardianTxHash: string | null;
  status: EmissionStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum OffsetStatus {
  PENDING = 'PENDING',
  PURCHASED = 'PURCHASED',
  RETIRED = 'RETIRED',
}

export type OffsetPurchase = {
  id: string;
  userId: string;
  emissionId: string;
  co2kg: number;
  projectName: string;
  projectType: string;
  projectId: string | null;
  priceHBAR: number;
  priceUSD: number | null;
  hbarUsdRate: number | null;
  guardianTokenId: string | null;
  guardianTxHash: string | null;
  hederaTxId: string | null;
  status: OffsetStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Retirement = {
  id: string;
  emissionId: string;
  offsetPurchaseId: string;
  emissionTokenId: string;
  offsetTokenId: string;
  hederaTxId: string;
  certificateNFTId: string | null;
  certificateUrl: string | null;
  createdAt: Date;
};

export enum BadgeType {
  CARBON_NEUTRAL = 'CARBON_NEUTRAL',
  FIRST_OFFSET = 'FIRST_OFFSET',
  GREEN_STREAK_30 = 'GREEN_STREAK_30',
  EFFICIENCY_EXPERT = 'EFFICIENCY_EXPERT',
  CLIMATE_CHAMPION = 'CLIMATE_CHAMPION',
}

export type Badge = {
  id: string;
  repositoryId: string;
  type: BadgeType;
  name: string;
  description: string;
  nftTokenId: string | null;
  imageUrl: string;
  metadata: any | null; // JSON type
  badgeUrl: string | null;
  createdAt: Date;
};

export type WebhookEvent = {
  id: string;
  eventType: string;
  action: string | null;
  repositoryId: string | null;
  payload: any; // JSON type
  processed: boolean;
  error: string | null;
  createdAt: Date;
};

export type SystemConfig = {
  id: string;
  key: string;
  value: any; // JSON type
  description: string | null;
  updatedAt: Date;
};
