# GitGreen Development Setup Guide

This guide will help you set up GitGreen for local development using SQLite (no PostgreSQL required).

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env
# The default .env already uses SQLite - no changes needed!

# 3. Set up the database
./setup-dev-db.sh

# 4. Start development server
npm run dev

# 5. Test the API (in a new terminal)
npm run test:api
```

That's it! Your development environment is ready.

---

## 📂 What's Different in Development?

### Database: SQLite vs PostgreSQL

We use **SQLite** for development to simplify local setup:

| Feature | Development (SQLite) | Production (PostgreSQL) |
|---------|---------------------|------------------------|
| Setup | Zero config | Requires database server |
| Database File | `./dev.db` | Cloud/server hosted |
| Provider | `sqlite` | `postgresql` |
| Performance | Good for dev | Production-grade |

**Why SQLite for development?**
- ✅ No PostgreSQL installation needed
- ✅ Zero configuration
- ✅ File-based - easy to reset (`rm dev.db`)
- ✅ Same Prisma ORM - seamless switching
- ✅ Perfect for testing and local development

### Guardian: Mock vs Real

We use **Mock Guardian** by default to avoid complex setup:

| Feature | Development (Mock) | Production (Real) |
|---------|-------------------|------------------|
| Setup | Zero config | Requires Guardian instance |
| Token Minting | Simulated | Real Guardian API |
| Environment | `USE_MOCK_GUARDIAN=true` | `USE_MOCK_GUARDIAN=false` |

**Why Mock Guardian for development?**
- ✅ No Guardian Docker setup needed (initially)
- ✅ Instant response - faster testing
- ✅ Implements same IGuardianService interface
- ✅ Easy toggle via environment variable

---

## 🔧 Environment Configuration

Your `.env` file is pre-configured for development:

```bash
# Database - SQLite (file-based)
DATABASE_URL="file:./dev.db"

# Guardian - Mock mode
USE_MOCK_GUARDIAN="true"
GUARDIAN_API_URL="https://demo-guardian.hedera.com/api/v1"
GUARDIAN_POLICY_ID="mock-policy-software-emissions-v1"

# Other settings have sensible defaults
```

---

## 🧪 Testing

### Test Services
```bash
npm run test:services
```
Tests carbon calculation and GitHub services (no database needed).

### Test Guardian
```bash
npm run test:guardian
```
Tests Guardian integration (uses mock by default).

### Test API
```bash
# Make sure dev server is running first!
npm run dev

# In another terminal:
npm run test:api
```
Tests the full API stack: carbon calculation → database → Guardian token minting.

---

## 📊 Database Management

### View Database (Prisma Studio)
```bash
npm run db:studio
```
Opens a web UI at http://localhost:5555 to browse your database.

### Reset Database
```bash
rm dev.db
npx prisma db push
```

### Regenerate Prisma Client
```bash
npx prisma generate
```

---

## 🔄 Switching to Production

### ⚠️ CRITICAL: PostgreSQL Migration Steps

When you're ready to deploy to production with PostgreSQL:

#### Step 1: Update Prisma Schema

Edit `prisma/schema.prisma`:

```diff
datasource db {
-  provider = "sqlite"
+  provider = "postgresql"
   url      = env("DATABASE_URL")
}

-// 🔄 PRODUCTION REMINDER:
-// When deploying to production with PostgreSQL:
-// 1. Change provider to "postgresql"
-// 2. Update DATABASE_URL to your PostgreSQL connection string
-// 3. Run: npx prisma generate && npx prisma db push
```

#### Step 2: Update Environment Variable

Edit `.env`:

```diff
-# Database URL - SQLite for development
-# 🔄 PRODUCTION: Switch to PostgreSQL connection string when deploying
-DATABASE_URL="file:./dev.db"
+# Database URL - PostgreSQL for production
+DATABASE_URL="postgresql://user:password@host:5432/gitgreen?schema=public"
```

#### Step 3: Regenerate Client & Migrate

```bash
npx prisma generate
npx prisma db push
```

#### Step 4: Restart Your Application

```bash
npm run build
npm start
```

---

## 🔄 Switching to Real Guardian

When you've set up Guardian locally (see GUARDIAN_SETUP.md):

#### Step 1: Start Guardian via Docker

Follow the instructions in `GUARDIAN_SETUP.md` to:
1. Run Guardian with Docker Compose
2. Create a Standard Registry account
3. Create a custom policy for software emissions
4. Get your policy ID

#### Step 2: Update Environment

Edit `.env`:

```diff
-USE_MOCK_GUARDIAN="true"
+USE_MOCK_GUARDIAN="false"

-GUARDIAN_API_URL="https://demo-guardian.hedera.com/api/v1"
+GUARDIAN_API_URL="http://localhost:3000/api/v1"

-GUARDIAN_POLICY_ID="mock-policy-software-emissions-v1"
+GUARDIAN_POLICY_ID="<your-actual-policy-id>"
```

Add Guardian credentials:

```bash
GUARDIAN_USERNAME="gitgreen_registry"
GUARDIAN_PASSWORD="<your-guardian-password>"
```

#### Step 3: Test Real Guardian Integration

```bash
npm run test:guardian
```

You should see real tokens being minted!

---

## 🎯 Current Development Status

### ✅ Completed
- [x] Project architecture & structure
- [x] Carbon calculation engine (CI/CD emissions)
- [x] GitHub service (OAuth, webhooks, API)
- [x] Guardian integration (with mock factory pattern)
- [x] Database schema & repository pattern
- [x] API endpoints (emission calculation, retrieval)
- [x] SQLite development setup
- [x] Testing infrastructure

### 🚧 In Progress / Next Steps
- [ ] Dashboard UI for emission visualization
- [ ] Hedera Token Service (HTS) NFT badges
- [ ] Retirement smart contract
- [ ] Offset marketplace
- [ ] GitHub OAuth implementation
- [ ] Webhook handler for automated tracking
- [ ] Badge generation & display
- [ ] Public verification pages
- [ ] Charts and data visualization
- [ ] Demo repository & presentation

---

## 🐛 Troubleshooting

### "Prisma client not generated"

**Problem:** API fails with "Please run prisma generate"

**Solution:**
```bash
npx prisma generate
```

### "Database locked" errors

**Problem:** SQLite database is locked

**Solution:**
```bash
# Stop all running servers
pkill -f "next dev"

# Reset database
rm dev.db
npx prisma db push
```

### "Guardian authentication failed"

**Problem:** Real Guardian credentials not working

**Solution:**
1. Check Guardian is running: `docker ps`
2. Verify Guardian URL in `.env`
3. Try mock mode first: `USE_MOCK_GUARDIAN="true"`

### "Module not found" errors

**Problem:** Missing dependencies

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Hedera Guardian:** https://docs.hedera.com/guardian
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Guardian Setup Guide:** See `GUARDIAN_SETUP.md` in this repo

---

## 💡 Development Tips

1. **Use Prisma Studio** for quick database inspection
2. **Enable hot reload** - Next.js auto-reloads on file changes
3. **Check logs** - API routes log to terminal
4. **Test incrementally** - Use individual test scripts
5. **Reset database** frequently during development

---

## 🎉 You're Ready!

Your development environment is configured and ready to go. The codebase is production-ready with clear migration paths for:
- ✅ SQLite → PostgreSQL (database)
- ✅ Mock → Real Guardian (tokenization)

When you're ready to deploy, follow the "Switching to Production" section above.

Happy coding! 🚀
