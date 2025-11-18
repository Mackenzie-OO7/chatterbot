import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 neon-green animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                GitGreen
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200">
                  Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0">
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="animate-float">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 neon-purple px-4 py-2">
              Hedera Hackathon 2025 - Sustainability Track
            </Badge>
          </div>

          <h1 className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl animate-float-slow">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Carbon Tracking for
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Software Development
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300 leading-relaxed">
            Automatically track CI/CD emissions, mint tokens via{' '}
            <span className="text-cyan-400 font-semibold">Hedera Guardian</span>,
            and offset your carbon footprint with verifiable on-chain certificates.
          </p>

          <div className="flex items-center justify-center gap-6 animate-float" style={{ animationDelay: '1s' }}>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 neon-green px-8 py-6 text-lg">
              Connect GitHub
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 px-8 py-6 text-lg">
                View Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group glass-dark border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105 animate-float" style={{ animationDelay: '0s' }}>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 neon-cyan group-hover:scale-110 transition-transform">
                  <span className="text-4xl">📊</span>
                </div>
                <CardTitle className="text-2xl text-cyan-300">Track</CardTitle>
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

            <Card className="group glass-dark border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 animate-float" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 neon-green group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🪙</span>
                </div>
                <CardTitle className="text-2xl text-green-300">Tokenize</CardTitle>
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

            <Card className="group glass-dark border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 animate-float" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 neon-purple group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🌱</span>
                </div>
                <CardTitle className="text-2xl text-purple-300">Offset</CardTitle>
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

            <Card className="group glass-dark border-pink-500/30 hover:border-pink-400 transition-all duration-300 hover:scale-105 animate-float" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 neon-pink group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🏆</span>
                </div>
                <CardTitle className="text-2xl text-pink-300">Certify</CardTitle>
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

        {/* Tech Stack Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Built on Hedera
          </h2>
          <div className="mx-auto max-w-4xl">
            <Card className="glass-dark border-green-500/30 hover:border-green-400 transition-all duration-300 animate-float-slow">
              <CardContent className="pt-10 pb-10">
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="text-center group">
                    <div className="mb-4 text-6xl animate-float group-hover:scale-125 transition-transform">⚡</div>
                    <h3 className="mb-2 font-semibold text-xl text-cyan-300">Guardian</h3>
                    <p className="text-sm text-gray-400">
                      Carbon credit tokenization
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="mb-4 text-6xl animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '1s' }}>🎯</div>
                    <h3 className="mb-2 font-semibold text-xl text-green-300">Token Service</h3>
                    <p className="text-sm text-gray-400">
                      NFT badges & certificates
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="mb-4 text-6xl animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '2s' }}>📝</div>
                    <h3 className="mb-2 font-semibold text-xl text-purple-300">Consensus Service</h3>
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
            Built with <span className="text-pink-500">❤️</span> for a sustainable future |
            <span className="text-cyan-400 font-semibold"> Hedera Hackathon 2025</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
