/**
 * Repository Repository (yes, that's the name!)
 * Handles database operations for GitHub repositories
 */

import { Repository } from './prisma-types';
import { BaseRepository } from './base.repository';

export class RepositoryRepository extends BaseRepository<Repository> {
  protected getModel() {
    return this.prisma.repository;
  }

  /**
   * Find repository by GitHub repo ID
   */
  async findByGitHubRepoId(githubRepoId: string): Promise<Repository | null> {
    return await this.prisma.repository.findUnique({
      where: { githubRepoId },
    });
  }

  /**
   * Find repository by full name (owner/name)
   */
  async findByFullName(fullName: string): Promise<Repository | null> {
    return await this.prisma.repository.findFirst({
      where: { fullName },
    });
  }

  /**
   * Get all repositories for a user
   */
  async findByUserId(userId: string): Promise<Repository[]> {
    return await this.findMany(
      { userId },
      { createdAt: 'desc' }
    );
  }

  /**
   * Get all tracked repositories for a user
   */
  async findTrackedByUserId(userId: string): Promise<Repository[]> {
    return await this.findMany(
      { userId, isTracking: true },
      { createdAt: 'desc' }
    );
  }

  /**
   * Find or create repository
   */
  async findOrCreate(data: {
    githubRepoId: string;
    name: string;
    owner: string;
    fullName: string;
    userId: string;
    description?: string;
    defaultBranch?: string;
    isPrivate?: boolean;
  }): Promise<Repository> {
    const existing = await this.findByGitHubRepoId(data.githubRepoId);
    if (existing) {
      return existing;
    }
    return await this.create(data);
  }

  /**
   * Toggle repository tracking
   */
  async toggleTracking(repositoryId: string): Promise<Repository> {
    const repo = await this.findById(repositoryId);
    if (!repo) {
      throw new Error('Repository not found');
    }
    return await this.update(repositoryId, {
      isTracking: !repo.isTracking,
    });
  }

  /**
   * Update last synced timestamp
   */
  async updateLastSync(repositoryId: string): Promise<Repository> {
    return await this.update(repositoryId, {
      lastSyncedAt: new Date(),
    });
  }

  /**
   * Get repository with emissions
   */
  async findWithEmissions(repositoryId: string) {
    return await this.prisma.repository.findUnique({
      where: { id: repositoryId },
      include: {
        emissions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        badges: true,
      },
    });
  }

  /**
   * Get repository stats
   */
  async getStats(repositoryId: string) {
    const emissions = await this.prisma.emission.aggregate({
      where: { repositoryId },
      _sum: {
        totalCO2kg: true,
        cicdCO2kg: true,
      },
      _count: true,
    });

    const offsetPurchases = await this.prisma.offsetPurchase.count({
      where: {
        emission: { repositoryId },
      },
    });

    const retirements = await this.prisma.retirement.count({
      where: {
        emission: { repositoryId },
      },
    });

    return {
      totalEmissions: emissions._sum.totalCO2kg || 0,
      totalCICDEmissions: emissions._sum.cicdCO2kg || 0,
      emissionCount: emissions._count,
      offsetCount: offsetPurchases,
      retirementCount: retirements,
    };
  }
}

// Export singleton instance
export const repositoryRepository = new RepositoryRepository();
