# GitGreen 🌱

> Carbon tracking and offsetting for software development

GitGreen automatically tracks the carbon footprint of your CI/CD workflows, mints emission tokens via Hedera Guardian, and enables automated carbon offsetting with verifiable on-chain certificates.

**Built for the Hedera Hackathon 2025 - Sustainability Track**

---

## 🎯 What is GitGreen?

GitGreen turns your development workflow carbon neutral by:

1. **Tracking** - Monitors CI/CD pipeline emissions automatically
2. **Tokenizing** - Mints emission tokens via Hedera Guardian
3. **Offsetting** - Marketplace for verified carbon offset projects
4. **Retiring** - Automated smart contract retirement of emission/offset tokens
5. **Certifying** - NFT badges and certificates for carbon neutrality

---

## 🏗️ Architecture

### Modular Design Principles

GitGreen is built with strict modularity:

- **Service Layer Pattern** - Each external integration is isolated
- **Repository Pattern** - All database access through repositories
- **Config-driven** - Everything configurable via .env
- **Interface-based** - Easy to swap implementations
- **Type-safe** - Full TypeScript coverage

### Project Structure

```
src/
├── app/                      # Next.js app router pages
├── lib/
│   ├── config/              # Centralized configuration
│   │   └── index.ts         # Environment validation with Zod
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts         # All domain types & service interfaces
│   ├── services/            # Business logic (modular services)
│   │   ├── carbon/          # Carbon calculation engine
│   │   ├── github/          # GitHub API integration
│   │   ├── guardian/        # Hedera Guardian integration
│   │   └── hedera/          # Hedera SDK integration
│   ├── repositories/        # Database access layer
│   │   ├── base.repository.ts
│   │   ├── user.repository.ts
│   │   ├── repository.repository.ts
│   │   └── emission.repository.ts
│   └── utils/               # Utility functions
├── components/
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   └── features/            # Feature-specific components
└── hooks/                   # React hooks

prisma/
└── schema.prisma            # Database schema
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Shadcn/ui** - Component library
- **Recharts** - Data visualization

### Backend
- **Next.js API Routes** - Serverless functions
- **PostgreSQL** - Database
- **Prisma** - ORM with type safety

### Blockchain
- **Hedera SDK** - HTS tokens, smart contracts
- **Hedera Guardian** - Carbon credit tokenization
- **Hedera Consensus Service** - Audit trail

### Integrations
- **GitHub API** - OAuth, webhooks, workflow data
- **Guardian REST API** - Emission/offset token minting
- **IPFS (Pinata)** - Metadata storage

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- GitHub OAuth App
- Hedera Testnet Account
- Guardian Testnet Access

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Run development server
npm run dev
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio (GUI)
npm run db:studio
```

---

## 🔧 Configuration

Create a `.env` file (see `.env.example` for all options)

---

## 📐 Carbon Calculation Methodology

### CI/CD Emissions Formula

```
Emissions (kg CO2) = Runtime (hours) × Carbon Intensity (kg CO2/hour)
```

### Carbon Intensity by Runner

| Runner Type      | Carbon Intensity (kg CO2/hour) |
|------------------|-------------------------------|
| ubuntu-latest    | 0.45                          |
| macos-latest     | 0.38                          |
| windows-latest   | 0.52                          |

**Version:** v1.0

---

## 📄 License

MIT License

---

**Built with ❤️ for a sustainable future**
