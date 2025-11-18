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

  const totalEmissions = repositories.reduce((sum: number, repo) => sum + repo.totalEmissions, 0);
  const offsetEmissions = repositories
    .filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
    .reduce((sum: number, repo) => sum + repo.totalEmissions, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-40 right-20 h-80 w-80 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-10 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyan-500/20 glass-dark">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 neon-green animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                GitGreen Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200">
                Connect Repository
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0 neon-green">
                Calculate Emissions
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="glass-dark border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 animate-float group">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Total Emissions</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {totalEmissions.toFixed(2)} kg CO₂
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">
                  Across {repositories.length} repositories
                </p>
              </CardContent>
            </Card>

            <Card className="glass-dark border-green-500/30 hover:border-green-400 transition-all duration-300 animate-float group" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Carbon Offset</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {offsetEmissions.toFixed(2)} kg CO₂
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 neon-green">
                  {((offsetEmissions / totalEmissions) * 100).toFixed(0)}% Offset
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-dark border-purple-500/30 hover:border-purple-400 transition-all duration-300 animate-float group" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Guardian Tokens</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {repositories.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">Minted emission tokens</p>
              </CardContent>
            </Card>
          </div>

          {/* Repositories Section */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="glass-dark border border-cyan-500/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
                All Repositories
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                Active Tracking
              </TabsTrigger>
              <TabsTrigger value="offset" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                Carbon Neutral
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card className="glass-dark border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Your Repositories</CardTitle>
                  <CardDescription className="text-gray-400">
                    Tracking carbon emissions from CI/CD workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repositories.map((repo, index) => (
                      <div
                        key={repo.id}
                        className="group flex items-center justify-between rounded-lg border border-cyan-500/20 p-4 glass-dark hover:border-cyan-400 transition-all duration-300 hover:scale-[1.02] animate-float"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                            {repo.owner}/{repo.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Total emissions: <span className="text-green-400 font-semibold">{repo.totalEmissions} kg CO₂</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              repo.status === 'OFFSET' || repo.status === 'RETIRED'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 neon-green'
                                : repo.status === 'MINTED'
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 neon-purple'
                                  : 'bg-gray-700 text-gray-300 border-0'
                            }
                          >
                            {repo.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {repositories.length === 0 && (
                    <div className="py-12 text-center">
                      <p className="mb-4 text-gray-400">
                        No repositories connected yet
                      </p>
                      <Button className="bg-gradient-to-r from-green-500 to-cyan-500 text-white border-0">
                        Connect Your First Repository
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card className="glass-dark border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Active Tracking</CardTitle>
                  <CardDescription className="text-gray-400">
                    Repositories with active emission tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400">
                    {repositories.length} repositories actively tracked
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offset">
              <Card className="glass-dark border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Carbon Neutral</CardTitle>
                  <CardDescription className="text-gray-400">
                    Repositories with fully offset emissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repositories
                      .filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
                      .map((repo, index) => (
                        <div
                          key={repo.id}
                          className="flex items-center justify-between rounded-lg border border-green-500/30 glass-dark p-4 hover:border-green-400 transition-all animate-float"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-green-300">
                              {repo.owner}/{repo.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {repo.totalEmissions} kg CO₂ offset
                            </p>
                          </div>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 neon-green">
                            Carbon Neutral
                          </Badge>
                        </div>
                      ))}
                  </div>

                  {repositories.filter((r) => r.status === 'OFFSET' || r.status === 'RETIRED')
                    .length === 0 && (
                    <p className="py-12 text-center text-gray-400">
                      No carbon neutral repositories yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="mt-8 glass-dark border-cyan-500/30 animate-float-slow">
            <CardHeader>
              <CardTitle className="text-cyan-300">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Manage your carbon tracking and offsets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">📊</span>
                  <span className="mb-1 text-lg text-cyan-300 group-hover:text-cyan-200">Calculate Emissions</span>
                  <span className="text-xs text-gray-400">
                    Run emission calculation for your repositories
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-green-500/30 hover:border-green-400 hover:bg-green-500/5 transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">🌱</span>
                  <span className="mb-1 text-lg text-green-300 group-hover:text-green-200">Purchase Offsets</span>
                  <span className="text-xs text-gray-400">
                    Browse verified carbon offset projects
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/5 transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">🏆</span>
                  <span className="mb-1 text-lg text-purple-300 group-hover:text-purple-200">View Badges</span>
                  <span className="text-xs text-gray-400">
                    Check your carbon neutrality badges
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-pink-500/30 hover:border-pink-400 hover:bg-pink-500/5 transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">📝</span>
                  <span className="mb-1 text-lg text-pink-300 group-hover:text-pink-200">Emission History</span>
                  <span className="text-xs text-gray-400">
                    View detailed emission breakdown
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
