/**
 * GET /api/emissions/[repositoryId]
 * Get emissions for a specific repository
 */

import { NextRequest } from 'next/server';
import { apiSuccess, apiNotFound, handleApiError } from '@/lib/utils/api';
import { emissionRepository, repositoryRepository } from '@/lib/repositories';

export async function GET(
  request: NextRequest,
  { params }: { params: { repositoryId: string } }
) {
  try {
    const { repositoryId } = params;

    console.log('📊 Fetching emissions for repository:', repositoryId);

    // Check if repository exists
    const repo = await repositoryRepository.findById(repositoryId);
    if (!repo) {
      return apiNotFound('Repository');
    }

    // Get emissions for this repository
    const emissions = await emissionRepository.findByRepositoryId(repositoryId);

    // Calculate totals
    const totalEmissions = await emissionRepository.getTotalEmissions(repositoryId);

    console.log('   ✅ Found', emissions.length, 'emission records');
    console.log('   Total emissions:', totalEmissions.toFixed(4), 'kg CO2');

    return apiSuccess({
      repository: {
        id: repo.id,
        name: repo.name,
        owner: repo.owner,
        fullName: repo.fullName,
      },
      emissions: emissions.map(e => ({
        id: e.id,
        periodStart: e.periodStart,
        periodEnd: e.periodEnd,
        totalCO2kg: e.totalCO2kg,
        cicdCO2kg: e.cicdCO2kg,
        guardianTokenId: e.guardianTokenId,
        status: e.status,
        createdAt: e.createdAt,
      })),
      summary: {
        totalEmissions,
        emissionCount: emissions.length,
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
}
