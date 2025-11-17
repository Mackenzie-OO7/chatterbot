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
- **SQLite** (development) / **PostgreSQL** (production)
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

**For Development:**
- Node.js 18+
- GitHub OAuth App (optional for local testing)
- Hedera Testnet Account (optional - can use mock Guardian)

**For Production:**
- All development prerequisites
- PostgreSQL database
- Guardian instance (local Docker or testnet access)

### Quick Start (Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# The default .env uses SQLite - no PostgreSQL needed for development!

# 3. Initialize development database (SQLite)
./setup-dev-db.sh

# 4. Run development server
npm run dev

# 5. Test the API (optional)
npm run test:api
```

The development setup uses **SQLite** for simplicity - no PostgreSQL installation required!

### Database Setup

#### Development (SQLite)

```bash
# Quick setup with provided script
./setup-dev-db.sh

# OR manually:
npx prisma generate    # Generate Prisma client
npx prisma db push     # Create SQLite database
```

The development database is stored in `./dev.db` (gitignored).

#### Production (PostgreSQL)

**⚠️ IMPORTANT: When switching to production with PostgreSQL:**

1. **Update Prisma Schema**
   ```prisma
   // In prisma/schema.prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update Environment Variable**
   ```bash
   # In .env
   DATABASE_URL="postgresql://user:password@host:5432/gitgreen?schema=public"
   ```

3. **Regenerate Client & Push Schema**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

#### Useful Commands

```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (development only)
rm dev.db && npx prisma db push
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
