/**
 * User Repository
 * Handles all database operations for users
 */

import { User } from './prisma-types';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  protected getModel() {
    return this.prisma.user;
  }

  /**
   * Find user by GitHub ID
   */
  async findByGitHubId(githubId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { githubId },
    });
  }

  /**
   * Find user by GitHub username
   */
  async findByGitHubUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { githubUsername: username },
    });
  }

  /**
   * Find or create user from GitHub OAuth
   */
  async findOrCreate(data: {
    githubId: string;
    githubUsername: string;
    email?: string;
    avatarUrl?: string;
    accessToken?: string;
  }): Promise<User> {
    const existing = await this.findByGitHubId(data.githubId);

    if (existing) {
      // Update access token if provided
      if (data.accessToken) {
        return await this.update(existing.id, {
          accessToken: data.accessToken,
          email: data.email,
          avatarUrl: data.avatarUrl,
        });
      }
      return existing;
    }

    return await this.create(data);
  }

  /**
   * Update Hedera account ID
   */
  async updateHederaAccount(userId: string, hederaAccountId: string): Promise<User> {
    return await this.update(userId, { hederaAccountId });
  }

  /**
   * Get user with their repositories
   */
  async findWithRepositories(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        repositories: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
