/**
 * Emission Repository
 * Handles database operations for carbon emissions
 */

import { Emission, EmissionStatus } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class EmissionRepository extends BaseRepository<Emission> {
  protected getModel() {
    return this.prisma.emission;
  }

  /**
   * Find emissions by repository ID
   */
  async findByRepositoryId(repositoryId: string, limit = 10): Promise<Emission[]> {
    return await this.findMany(
      { repositoryId },
      { createdAt: 'desc' },
      limit
    );
  }

  /**
   * Find emissions by status
   */
  async findByStatus(status: EmissionStatus): Promise<Emission[]> {
    return await this.findMany(
      { status },
      { createdAt: 'desc' }
    );
  }

  /**
   * Find emissions by Guardian token ID
   */
  async findByGuardianToken(guardianTokenId: string): Promise<Emission | null> {
    return await this.prisma.emission.findUnique({
      where: { guardianTokenId },
    });
  }

  /**
   * Create emission record
   */
  async createEmission(data: {
    repositoryId: string;
    periodStart: Date;
    periodEnd: Date;
    totalCO2kg: number;
    cicdCO2kg: number;
    cloudCO2kg?: number;
    aiCO2kg?: number;
    calculationData: any;
    methodology?: string;
  }): Promise<Emission> {
    return await this.create({
      ...data,
      status: 'CALCULATED',
      methodology: data.methodology || 'v1.0',
    });
  }

  /**
   * Update emission status
   */
  async updateStatus(emissionId: string, status: EmissionStatus): Promise<Emission> {
    return await this.update(emissionId, { status });
  }

  /**
   * Update Guardian token ID after minting
   */
  async updateGuardianToken(
    emissionId: string,
    guardianTokenId: string,
    guardianTxHash: string
  ): Promise<Emission> {
    return await this.update(emissionId, {
      guardianTokenId,
      guardianTxHash,
      status: 'MINTED',
    });
  }

  /**
   * Get total emissions for a repository
   */
  async getTotalEmissions(repositoryId: string): Promise<number> {
    const result = await this.prisma.emission.aggregate({
      where: { repositoryId },
      _sum: { totalCO2kg: true },
    });
    return result._sum.totalCO2kg || 0;
  }

  /**
   * Get emissions summary for a date range
   */
  async getEmissionsSummary(repositoryId: string, startDate: Date, endDate: Date) {
    const emissions = await this.prisma.emission.findMany({
      where: {
        repositoryId,
        periodStart: { gte: startDate },
        periodEnd: { lte: endDate },
      },
      orderBy: { periodStart: 'asc' },
    });

    const total = emissions.reduce((sum, e) => sum + e.totalCO2kg, 0);
    const cicd = emissions.reduce((sum, e) => sum + e.cicdCO2kg, 0);
    const cloud = emissions.reduce((sum, e) => sum + (e.cloudCO2kg || 0), 0);
    const ai = emissions.reduce((sum, e) => sum + (e.aiCO2kg || 0), 0);

    return {
      emissions,
      summary: {
        total,
        cicd,
        cloud,
        ai,
        count: emissions.length,
      },
    };
  }

  /**
   * Get emissions with offset purchases
   */
  async findWithOffsets(emissionId: string) {
    return await this.prisma.emission.findUnique({
      where: { id: emissionId },
      include: {
        offsetPurchases: {
          orderBy: { createdAt: 'desc' },
        },
        retirements: {
          orderBy: { createdAt: 'desc' },
        },
        repository: {
          select: {
            fullName: true,
          },
        },
      },
    });
  }
}

// Export singleton instance
export const emissionRepository = new EmissionRepository();
