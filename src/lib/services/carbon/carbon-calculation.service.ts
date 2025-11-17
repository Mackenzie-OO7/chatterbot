/**
 * Carbon Calculation Service
 * Calculates CO2 emissions from CI/CD workflows
 *
 * MODULAR: Can be extended to support cloud, AI, and other emission sources
 */

import yaml from 'js-yaml';
import {
  ICarbonCalculationService,
  GitHubWorkflowRun,
  EmissionCalculationData,
  WorkflowEmission,
  CARBON_INTENSITY_BY_RUNNER,
  CARBON_CALCULATION_VERSION,
} from '../../types';

export class CarbonCalculationService implements ICarbonCalculationService {
  /**
   * Calculate emissions for a single workflow run
   */
  async calculateWorkflowEmissions(
    workflow: GitHubWorkflowRun,
    workflowYaml: string
  ): Promise<number> {
    try {
      // Parse workflow YAML to extract runner type
      const runnerType = this.extractRunnerType(workflowYaml);

      // Get carbon intensity for runner
      const carbonIntensity = this.getCarbonIntensity(runnerType);

      // Calculate runtime in hours
      const runtimeHours = (workflow.runtimeMinutes || 0) / 60;

      // Calculate emissions: runtime (hours) × carbon intensity (kg CO2/hour)
      const emissionsCO2kg = runtimeHours * carbonIntensity;

      return emissionsCO2kg;
    } catch (error) {
      console.error('Error calculating workflow emissions:', error);
      return 0; // Return 0 on error, don't fail the entire calculation
    }
  }

  /**
   * Calculate total CI/CD emissions from multiple workflows
   */
  async calculateCICDEmissions(
    workflows: GitHubWorkflowRun[],
    workflowFiles: Map<string, string>
  ): Promise<EmissionCalculationData> {
    const workflowEmissions: WorkflowEmission[] = [];

    for (const workflow of workflows) {
      try {
        // Get workflow file content
        const workflowYaml = workflowFiles.get(workflow.workflowPath) || '';

        // Extract runner type
        const runnerType = this.extractRunnerType(workflowYaml);

        // Get carbon intensity
        const carbonIntensity = this.getCarbonIntensity(runnerType);

        // Calculate emissions for this workflow
        const runtimeMinutes = workflow.runtimeMinutes || 0;
        const emissionsCO2kg = (runtimeMinutes / 60) * carbonIntensity;

        // Build workflow emission record
        const workflowEmission: WorkflowEmission = {
          workflowName: workflow.name,
          workflowFile: workflow.workflowPath,
          runId: workflow.id.toString(),
          runUrl: workflow.htmlUrl,
          runnerType,
          runtimeMinutes,
          carbonIntensity,
          emissionsCO2kg,
          timestamp: workflow.runStartedAt,
        };

        workflowEmissions.push(workflowEmission);
      } catch (error) {
        console.error(`Error processing workflow ${workflow.name}:`, error);
        // Continue processing other workflows
      }
    }

    return {
      workflows: workflowEmissions,
      methodology: CARBON_CALCULATION_VERSION,
      calculatedAt: new Date().toISOString(),
      metadata: {
        totalWorkflows: workflows.length,
        processedWorkflows: workflowEmissions.length,
      },
    };
  }

  /**
   * Extract runner type from workflow YAML
   */
  private extractRunnerType(workflowYaml: string): string {
    try {
      const parsed: any = yaml.load(workflowYaml);

      // Check jobs for runs-on configuration
      if (parsed.jobs) {
        for (const jobName in parsed.jobs) {
          const job = parsed.jobs[jobName];
          if (job['runs-on']) {
            const runsOn = job['runs-on'];

            // Handle string or array format
            if (typeof runsOn === 'string') {
              return runsOn;
            } else if (Array.isArray(runsOn) && runsOn.length > 0) {
              return runsOn[0];
            }
          }
        }
      }

      // Default fallback
      return 'ubuntu-latest';
    } catch (error) {
      console.error('Error parsing workflow YAML:', error);
      return 'ubuntu-latest';
    }
  }

  /**
   * Get carbon intensity for a runner type
   */
  private getCarbonIntensity(runnerType: string): number {
    return CARBON_INTENSITY_BY_RUNNER[runnerType] || CARBON_INTENSITY_BY_RUNNER['default'];
  }

  /**
   * Calculate total emissions from calculation data
   */
  getTotalEmissions(calculationData: EmissionCalculationData): number {
    return calculationData.workflows.reduce((sum, w) => sum + w.emissionsCO2kg, 0);
  }

  /**
   * Get emissions breakdown by runner type
   */
  getEmissionsByRunner(calculationData: EmissionCalculationData): Record<string, number> {
    const breakdown: Record<string, number> = {};

    for (const workflow of calculationData.workflows) {
      if (!breakdown[workflow.runnerType]) {
        breakdown[workflow.runnerType] = 0;
      }
      breakdown[workflow.runnerType] += workflow.emissionsCO2kg;
    }

    return breakdown;
  }

  /**
   * Future: Calculate cloud emissions
   * This is a placeholder for cloud infrastructure carbon tracking
   */
  async calculateCloudEmissions(cloudUsage: any): Promise<number> {
    // TODO: Implement cloud carbon calculation
    // Will integrate with AWS, GCP, Azure APIs
    throw new Error('Cloud emissions calculation not yet implemented');
  }

  /**
   * Future: Calculate AI/ML emissions
   * This is a placeholder for AI model training/inference carbon tracking
   */
  async calculateAIEmissions(aiUsage: any): Promise<number> {
    // TODO: Implement AI carbon calculation
    // Will track GPU hours, model training, inference calls
    throw new Error('AI emissions calculation not yet implemented');
  }
}

// Export singleton instance
export const carbonCalculationService = new CarbonCalculationService();
