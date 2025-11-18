import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              GitGreen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4" variant="success">
          Hedera Hackathon 2025 - Sustainability Track
        </Badge>
        <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
          Carbon Tracking for
          <br />
          <span className="text-green-600">Software Development</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Automatically track CI/CD emissions, mint tokens via Hedera Guardian,
          and offset your carbon footprint with verifiable on-chain certificates.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg">
            Connect GitHub
          </Button>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle className="text-xl">Track</CardTitle>
              <CardDescription>
                Monitor CI/CD pipeline emissions automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect your repositories and we&apos;ll calculate carbon emissions
                from every workflow run.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <span className="text-2xl">🪙</span>
              </div>
              <CardTitle className="text-xl">Tokenize</CardTitle>
              <CardDescription>
                Mint emission tokens via Hedera Guardian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your emissions are tokenized on Hedera for transparent tracking
                and verification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900">
                <span className="text-2xl">🌱</span>
              </div>
              <CardTitle className="text-xl">Offset</CardTitle>
              <CardDescription>
                Purchase verified carbon offset credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse marketplace of verified offset projects and purchase
                credits with HBAR.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">🏆</span>
              </div>
              <CardTitle className="text-xl">Certify</CardTitle>
              <CardDescription>
                Earn NFT badges for carbon neutrality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get verifiable NFT certificates and display badges on your
                GitHub repos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Built on Hedera
        </h2>
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-2 text-4xl">⚡</div>
                  <h3 className="mb-1 font-semibold">Guardian</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Carbon credit tokenization
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl">🎯</div>
                  <h3 className="mb-1 font-semibold">Token Service</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    NFT badges & certificates
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl">📝</div>
                  <h3 className="mb-1 font-semibold">Consensus Service</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Immutable audit trail
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600 dark:text-gray-400">
        <p>Built with ❤️ for a sustainable future | Hedera Hackathon 2025</p>
      </footer>
    </div>
  );
}
