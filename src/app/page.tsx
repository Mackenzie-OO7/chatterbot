import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
      {/* Animated Background Shapes - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 opacity-10 blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 neon-green" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                GitGreen
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:text-green-200 hover:border-green-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
                  Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all">
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
            Hedera Hackathon 2025 - Sustainability Track
          </Badge>

          <h1 className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Carbon Tracking for
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Software Development
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300 leading-relaxed">
            Automatically track CI/CD emissions, mint tokens via{' '}
            <span className="text-green-400 font-semibold">Hedera Guardian</span>,
            and offset your carbon footprint with verifiable on-chain certificates.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-6 text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300">
              Connect GitHub
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:text-green-200 px-8 py-6 text-lg hover:border-green-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                View Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group glass-dark border-green-500/20 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl">📊</span>
                </div>
                <CardTitle className="text-2xl text-green-300">Track</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor CI/CD pipeline emissions automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Connect your repositories and we&apos;ll calculate carbon emissions
                  from every workflow run.
                </p>
              </CardContent>
            </Card>

            <Card className="group glass-dark border-emerald-500/20 hover:border-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl">🪙</span>
                </div>
                <CardTitle className="text-2xl text-emerald-300">Tokenize</CardTitle>
                <CardDescription className="text-gray-400">
                  Mint emission tokens via Hedera Guardian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Your emissions are tokenized on Hedera for transparent tracking
                  and verification.
                </p>
              </CardContent>
            </Card>

            <Card className="group glass-dark border-green-500/20 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl">🌱</span>
                </div>
                <CardTitle className="text-2xl text-green-300">Offset</CardTitle>
                <CardDescription className="text-gray-400">
                  Purchase verified carbon offset credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Browse marketplace of verified offset projects and purchase
                  credits with HBAR.
                </p>
              </CardContent>
            </Card>

            <Card className="group glass-dark border-emerald-500/20 hover:border-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-all duration-300">
                  <span className="text-4xl">🏆</span>
                </div>
                <CardTitle className="text-2xl text-emerald-300">Certify</CardTitle>
                <CardDescription className="text-gray-400">
                  Earn NFT badges for carbon neutrality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Get verifiable NFT certificates and display badges on your
                  GitHub repos.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tech Stack Section - Static */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Built on Hedera
          </h2>
          <div className="mx-auto max-w-4xl">
            <Card className="glass-dark border-green-500/30">
              <CardContent className="pt-10 pb-10">
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">⚡</div>
                    <h3 className="mb-2 font-semibold text-xl text-green-300">Guardian</h3>
                    <p className="text-sm text-gray-400">
                      Carbon credit tokenization
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-4 text-6xl">🎯</div>
                    <h3 className="mb-2 font-semibold text-xl text-emerald-300">Token Service</h3>
                    <p className="text-sm text-gray-400">
                      NFT badges & certificates
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-4 text-6xl">📝</div>
                    <h3 className="mb-2 font-semibold text-xl text-green-300">Consensus Service</h3>
                    <p className="text-sm text-gray-400">
                      Immutable audit trail
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-400">
            Built with <span className="text-green-500">❤️</span> for a sustainable future |
            <span className="text-green-400 font-semibold"> Hedera Hackathon 2025</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
