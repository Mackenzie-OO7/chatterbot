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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
      {/* Subtle Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-40 right-20 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 opacity-5 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

      {/* Background Trees - Sustainability Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-16 left-8 text-8xl opacity-[0.03]">🌲</div>
        <div className="absolute top-40 right-12 text-7xl opacity-[0.04]">🌳</div>
        <div className="absolute bottom-60 left-24 text-6xl opacity-[0.03]">🌲</div>
        <div className="absolute bottom-32 right-28 text-8xl opacity-[0.04]">🌳</div>
        <div className="absolute top-1/3 left-1/5 text-7xl opacity-[0.02]">🌳</div>
        <div className="absolute top-2/3 right-1/5 text-7xl opacity-[0.03]">🌲</div>
      </div>

      {/* Background Code Snippets - Developer Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none font-mono text-green-400">
        <div className="absolute top-24 right-32 text-sm opacity-[0.04]">
          const emissions = <br />
          &nbsp;&nbsp;calculateWorkflow(repo);
        </div>
        <div className="absolute bottom-80 left-36 text-xs opacity-[0.03]">
          await guardian.mint(&#123;<br />
          &nbsp;&nbsp;co2kg: totalEmissions<br />
          &#125;);
        </div>
        <div className="absolute top-1/2 left-12 text-xs opacity-[0.03]">
          if (status === &apos;OFFSET&apos;) &#123;<br />
          &nbsp;&nbsp;badge.mint();<br />
          &#125;
        </div>
        <div className="absolute bottom-40 right-24 text-sm opacity-[0.04]">
          const offset = await<br />
          &nbsp;&nbsp;marketplace.purchase(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;amount: co2kg<br />
          &nbsp;&nbsp;&#125;);
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-green-500/20 glass-dark">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 neon-green" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                GitGreen Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:text-green-200 hover:border-green-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
                Connect Repository
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all">
                Calculate Emissions
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="glass-dark border-green-500/30 hover:border-green-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 group">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Total Emissions</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {totalEmissions.toFixed(2)} kg CO₂
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">
                  Across {repositories.length} repositories
                </p>
              </CardContent>
            </Card>

            <Card className="glass-dark border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 group">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Carbon Offset</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {offsetEmissions.toFixed(2)} kg CO₂
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  {((offsetEmissions / totalEmissions) * 100).toFixed(0)}% Offset
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-dark border-green-500/30 hover:border-green-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 group">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-400">Guardian Tokens</CardDescription>
                <CardTitle className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
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
            <TabsList className="glass-dark border border-green-500/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                All Repositories
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                Active Tracking
              </TabsTrigger>
              <TabsTrigger value="offset" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                Carbon Neutral
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card className="glass-dark border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Your Repositories</CardTitle>
                  <CardDescription className="text-gray-400">
                    Tracking carbon emissions from CI/CD workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repositories.map((repo) => (
                      <div
                        key={repo.id}
                        className="group flex items-center justify-between rounded-lg border border-green-500/20 p-4 glass-dark hover:border-green-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-300 group-hover:text-green-200 transition-colors">
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
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                                : repo.status === 'MINTED'
                                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0'
                                  : 'bg-gray-700 text-gray-300 border-0'
                            }
                          >
                            {repo.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all">
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
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        Connect Your First Repository
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card className="glass-dark border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-emerald-300">Active Tracking</CardTitle>
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
              <Card className="glass-dark border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Carbon Neutral</CardTitle>
                  <CardDescription className="text-gray-400">
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
                          className="flex items-center justify-between rounded-lg border border-green-500/30 glass-dark p-4 hover:border-green-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-green-300">
                              {repo.owner}/{repo.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {repo.totalEmissions} kg CO₂ offset
                            </p>
                          </div>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
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
          <Card className="mt-8 glass-dark border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Manage your carbon tracking and offsets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-green-500/30 hover:border-green-400 hover:bg-green-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">📊</span>
                  <span className="mb-1 text-lg text-green-300 group-hover:text-green-200">Calculate Emissions</span>
                  <span className="text-xs text-gray-400">
                    Run emission calculation for your repositories
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">🌱</span>
                  <span className="mb-1 text-lg text-emerald-300 group-hover:text-emerald-200">Purchase Offsets</span>
                  <span className="text-xs text-gray-400">
                    Browse verified carbon offset projects
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-green-500/30 hover:border-green-400 hover:bg-green-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">🏆</span>
                  <span className="mb-1 text-lg text-green-300 group-hover:text-green-200">View Badges</span>
                  <span className="text-xs text-gray-400">
                    Check your carbon neutrality badges
                  </span>
                </Button>
                <Button variant="outline" className="group h-auto flex-col items-start p-6 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105">
                  <span className="mb-2 text-2xl group-hover:scale-110 transition-transform">📝</span>
                  <span className="mb-1 text-lg text-emerald-300 group-hover:text-emerald-200">Emission History</span>
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
