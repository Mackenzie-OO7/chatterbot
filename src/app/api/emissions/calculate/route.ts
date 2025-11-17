/**
 * POST /api/emissions/calculate
 * Calculate emissions for a repository's workflows and mint Guardian token
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { apiSuccess, apiError, handleApiError } from '@/lib/utils/api';
import { carbonCalculationService } from '@/lib/services/carbon/carbon-calculation.service';
import { getGuardianService } from '@/lib/services/guardian';
import { emissionRepository } from '@/lib/repositories';
import { repositoryRepository } from '@/lib/repositories';
import { EmissionCalculationData } from '@/lib/types';

// Request validation schema
const calculateEmissionsSchema = z.object({
  repository: z.object({
    id: z.string(),
    name: z.string(),
    owner: z.string(),
    fullName: z.string(),
  }),
  periodStart: z.string(), // ISO date string
  periodEnd: z.string(),   // ISO date string
  workflows: z.array(z.object({
    id: z.number(),
    name: z.string(),
    workflowPath: z.string(),
    status: z.string(),
    conclusion: z.string().optional(),
    runStartedAt: z.string(),
    runCompletedAt: z.string().optional(),
    runtimeMinutes: z.number().optional(),
    htmlUrl: z.string(),
  })),
  workflowFiles: z.record(z.string()), // Map of workflow path -> YAML content
  mintToken: z.boolean().optional().default(true), // Whether to mint Guardian token
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = calculateEmissionsSchema.parse(body);

    console.log('📊 Calculating emissions for:', validatedData.repository.fullName);
    console.log('   Period:', validatedData.periodStart, 'to', validatedData.periodEnd);
    console.log('   Workflows:', validatedData.workflows.length);

    // Step 1: Calculate carbon emissions
    console.log('\n1️⃣  Calculating CI/CD emissions...');

    const workflowFilesMap = new Map(Object.entries(validatedData.workflowFiles));
    const calculationData: EmissionCalculationData =
      await carbonCalculationService.calculateCICDEmissions(
        validatedData.workflows,
        workflowFilesMap
      );

    const totalEmissions = carbonCalculationService.getTotalEmissions(calculationData);

    console.log('   ✅ Calculation complete');
    console.log('   Total emissions:', totalEmissions.toFixed(4), 'kg CO2');
    console.log('   Workflows processed:', calculationData.workflows.length);

    // Step 2: Find or create repository in database
    console.log('\n2️⃣  Storing repository data...');

    const repo = await repositoryRepository.findOrCreate({
      githubRepoId: validatedData.repository.id,
      name: validatedData.repository.name,
      owner: validatedData.repository.owner,
      fullName: validatedData.repository.fullName,
      userId: 'system', // TODO: Replace with actual user ID from auth
    });

    console.log('   ✅ Repository:', repo.fullName);

    // Step 3: Store emission record
    console.log('\n3️⃣  Storing emission record...');

    const emission = await emissionRepository.createEmission({
      repositoryId: repo.id,
      periodStart: new Date(validatedData.periodStart),
      periodEnd: new Date(validatedData.periodEnd),
      totalCO2kg: totalEmissions,
      cicdCO2kg: totalEmissions, // For now, all emissions are from CI/CD
      calculationData: calculationData as any, // Stored as JSON
      methodology: calculationData.methodology,
    });

    console.log('   ✅ Emission record created:', emission.id);

    // Step 4: Mint Guardian token (if requested)
    let guardianTokenId: string | undefined;

    if (validatedData.mintToken) {
      console.log('\n4️⃣  Minting emission token via Guardian...');

      try {
        const guardianService = getGuardianService();

        guardianTokenId = await guardianService.mintEmissionToken({
          repository: validatedData.repository.fullName,
          periodStart: validatedData.periodStart,
          periodEnd: validatedData.periodEnd,
          totalEmissions: totalEmissions,
          breakdown: {
            cicd: totalEmissions,
            cloud: 0,
            ai: 0,
          },
          calculationMethodology: calculationData.methodology,
          verificationData: emission.id, // Link back to our emission record
        });

        // Update emission record with Guardian token ID
        await emissionRepository.updateGuardianToken(
          emission.id,
          guardianTokenId,
          'mock_tx_hash' // TODO: Get actual transaction hash from Guardian
        );

        console.log('   ✅ Token minted:', guardianTokenId);
      } catch (error) {
        console.error('   ⚠️  Guardian token minting failed:', error);
        // Continue without token - don't fail the entire request
        guardianTokenId = undefined;
      }
    }

    // Step 5: Return response
    console.log('\n✅ Emission calculation complete!\n');

    return apiSuccess({
      emission: {
        id: emission.id,
        repository: repo.fullName,
        periodStart: emission.periodStart,
        periodEnd: emission.periodEnd,
        totalCO2kg: emission.totalCO2kg,
        cicdCO2kg: emission.cicdCO2kg,
        guardianTokenId: guardianTokenId || null,
        status: emission.status,
        calculationData: calculationData,
      },
      summary: {
        totalEmissions: totalEmissions,
        workflowCount: calculationData.workflows.length,
        emissionsByRunner: carbonCalculationService.getEmissionsByRunner(calculationData),
      },
    }, 201);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(
        `Validation error: ${error.errors.map(e => e.message).join(', ')}`,
        'VALIDATION_ERROR',
        400
      );
    }

    return handleApiError(error);
  }
}
