'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  // Mock data for demonstration
  const repositories = [
    {
      id: '1',
      name: 'my-awesome-app',
      owner: 'gitgreen-demo',
      totalEmissions: 12.5,
      status: 'OFFSET',
    },
    {
      id: '2',
      name: 'backend-api',
      owner: 'gitgreen-demo',
      totalEmissions: 8.3,
      status: 'MINTED',
    },
  ];

  const totalEmissions = repositories.reduce((sum, repo) => sum + repo.totalEmissions, 0);
  const offsetEmissions = repositories
    .filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
    .reduce((sum, repo) => sum + repo.totalEmissions, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              GitGreen Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Connect Repository</Button>
            <Button>Calculate Emissions</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Emissions</CardDescription>
              <CardTitle className="text-3xl">{totalEmissions.toFixed(2)} kg CO₂</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Across {repositories.length} repositories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Carbon Offset</CardDescription>
              <CardTitle className="text-3xl">{offsetEmissions.toFixed(2)} kg CO₂</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">
                {((offsetEmissions / totalEmissions) * 100).toFixed(0)}% Offset
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Guardian Tokens</CardDescription>
              <CardTitle className="text-3xl">{repositories.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Minted emission tokens</p>
            </CardContent>
          </Card>
        </div>

        {/* Repositories Section */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Repositories</TabsTrigger>
            <TabsTrigger value="active">Active Tracking</TabsTrigger>
            <TabsTrigger value="offset">Carbon Neutral</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Repositories</CardTitle>
                <CardDescription>
                  Tracking carbon emissions from CI/CD workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repositories.map((repo) => (
                    <div
                      key={repo.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {repo.owner}/{repo.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Total emissions: {repo.totalEmissions} kg CO₂
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            repo.status === 'OFFSET' || repo.status === 'RETIRED'
                              ? 'success'
                              : repo.status === 'MINTED'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {repo.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {repositories.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="mb-4 text-muted-foreground">
                      No repositories connected yet
                    </p>
                    <Button>Connect Your First Repository</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Tracking</CardTitle>
                <CardDescription>
                  Repositories with active emission tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {repositories.length} repositories actively tracked
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offset">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Neutral</CardTitle>
                <CardDescription>
                  Repositories with fully offset emissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repositories
                    .filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
                    .map((repo) => (
                      <div
                        key={repo.id}
                        className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {repo.owner}/{repo.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {repo.totalEmissions} kg CO₂ offset
                          </p>
                        </div>
                        <Badge variant="success">Carbon Neutral</Badge>
                      </div>
                    ))}
                </div>

                {repositories.filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
                  .length === 0 && (
                  <p className="py-12 text-center text-muted-foreground">
                    No carbon neutral repositories yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your carbon tracking and offsets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <span className="mb-1 text-lg">📊 Calculate Emissions</span>
                <span className="text-xs text-muted-foreground">
                  Run emission calculation for your repositories
                </span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <span className="mb-1 text-lg">🌱 Purchase Offsets</span>
                <span className="text-xs text-muted-foreground">
                  Browse verified carbon offset projects
                </span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <span className="mb-1 text-lg">🏆 View Badges</span>
                <span className="text-xs text-muted-foreground">
                  Check your carbon neutrality badges
                </span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start p-4">
                <span className="mb-1 text-lg">📝 Emission History</span>
                <span className="text-xs text-muted-foreground">
                  View detailed emission breakdown
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
