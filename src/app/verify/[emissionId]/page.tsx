import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This would normally fetch data from the database
// For now, using mock data for demonstration
function getMockEmissionData(id: string) {
  return {
    id,
    repositoryName: 'my-awesome-app',
    repositoryOwner: 'gitgreen-demo',
    periodStart: '2025-01-01',
    periodEnd: '2025-01-31',
    totalCO2kg: 12.5,
    cicdCO2kg: 12.5,
    guardianTokenId: 'emission_1_1737216000000',
    guardianTxHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    status: 'MINTED',
    methodology: 'v1.0',
    calculationData: {
      workflows: [
        {
          workflowName: 'CI Build',
          runCount: 150,
          totalRuntimeMinutes: 750,
          runnerType: 'ubuntu-latest',
          emissionsCO2kg: 5.625,
        },
        {
          workflowName: 'Tests',
          runCount: 200,
          totalRuntimeMinutes: 1000,
          runnerType: 'ubuntu-latest',
          emissionsCO2kg: 7.5,
        },
      ],
    },
  };
}

export default function VerifyPage({ params }: { params: { emissionId: string } }) {
  const emission = getMockEmissionData(params.emissionId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">GitGreen</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <Badge variant="success" className="mb-4">
              Verified Emission Token
            </Badge>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              {emission.repositoryOwner}/{emission.repositoryName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Carbon Emission Certificate - {emission.periodStart} to {emission.periodEnd}
            </p>
          </div>

          {/* Emission Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Emission Summary</CardTitle>
              <CardDescription>Total carbon footprint for this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-green-600">
                    {emission.totalCO2kg}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    kg CO₂ Total
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">
                    {emission.cicdCO2kg}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    kg CO₂ from CI/CD
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant={emission.status === 'MINTED' ? 'secondary' : 'success'}>
                    {emission.status}
                  </Badge>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Token Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hedera Guardian Token</CardTitle>
              <CardDescription>On-chain verification details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Token ID
                </div>
                <div className="rounded-md bg-gray-100 p-3 font-mono text-sm dark:bg-gray-800">
                  {emission.guardianTokenId}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Transaction Hash
                </div>
                <div className="rounded-md bg-gray-100 p-3 font-mono text-sm dark:bg-gray-800">
                  {emission.guardianTxHash}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Methodology
                </div>
                <div className="text-sm">{emission.methodology}</div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Workflow Breakdown</CardTitle>
              <CardDescription>Detailed emission calculation by workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emission.calculationData.workflows.map((workflow, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{workflow.workflowName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workflow.runCount} runs • {workflow.totalRuntimeMinutes} minutes •{' '}
                        {workflow.runnerType}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {workflow.emissionsCO2kg} kg
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">CO₂</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Badge */}
          <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-4 text-6xl">✓</div>
                <h3 className="mb-2 text-xl font-bold text-green-800 dark:text-green-200">
                  Verified by Hedera Guardian
                </h3>
                <p className="mb-4 text-sm text-green-700 dark:text-green-300">
                  This emission record is permanently stored on the Hedera network and can be
                  independently verified.
                </p>
                <Link href="/">
                  <Button variant="outline">Track Your Emissions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white py-8 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Powered by Hedera Guardian • GitGreen Carbon Tracking Platform</p>
        </div>
      </footer>
    </div>
  );
}
