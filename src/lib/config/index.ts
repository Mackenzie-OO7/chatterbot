/**
 * Centralized Configuration
 * All environment variables and app config in one place
 * Validates config on startup
 */

import { z } from 'zod';

const configSchema = z.object({
  // Database (PostgreSQL connection string)
  database: z.object({
    url: z.string().min(1), // Accept any non-empty string (PostgreSQL URLs have custom format)
  }),

  // NextAuth
  auth: z.object({
    url: z.string().url(),
    secret: z.string().min(32),
  }),

  // GitHub
  github: z.object({
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
    webhookSecret: z.string().min(1),
  }),

  // Hedera
  hedera: z.object({
    network: z.enum(['testnet', 'mainnet', 'previewnet']),
    accountId: z.string().min(1),
    privateKey: z.string().min(1),
    publicKey: z.string().min(1),
  }),

  // Guardian
  guardian: z.object({
    apiUrl: z.string().min(1), // Accept any non-empty string for testing
    apiKey: z.string().optional(),
    standardRegistryId: z.string().optional(),
  }),

  // IPFS (optional)
  ipfs: z.object({
    pinataApiKey: z.string().optional(),
    pinataSecretKey: z.string().optional(),
  }).optional(),

  // Application
  app: z.object({
    env: z.enum(['development', 'production', 'test']),
  }),
});

export type AppConfig = z.infer<typeof configSchema>;

/**
 * Load and validate configuration from environment variables
 */
export function loadConfig(): AppConfig {
  const config: AppConfig = {
    database: {
      url: process.env.DATABASE_URL || '',
    },
    auth: {
      url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      secret: process.env.NEXTAUTH_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    },
    hedera: {
      network: (process.env.HEDERA_NETWORK as 'testnet' | 'mainnet' | 'previewnet') || 'testnet',
      accountId: process.env.HEDERA_ACCOUNT_ID || '',
      privateKey: process.env.HEDERA_PRIVATE_KEY || '',
      publicKey: process.env.HEDERA_PUBLIC_KEY || '',
    },
    guardian: {
      apiUrl: process.env.GUARDIAN_API_URL || '',
      apiKey: process.env.GUARDIAN_API_KEY,
      standardRegistryId: process.env.GUARDIAN_STANDARD_REGISTRY_ID,
    },
    ipfs: {
      pinataApiKey: process.env.PINATA_API_KEY,
      pinataSecretKey: process.env.PINATA_SECRET_KEY,
    },
    app: {
      env: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    },
  };

  // Validate config
  try {
    return configSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid configuration:', error.errors);
      throw new Error('Invalid configuration. Please check your .env file.');
    }
    throw error;
  }
}

// Export singleton instance
export const config = loadConfig();
