#!/bin/bash

# GitGreen Development Database Setup Script
# This script initializes the SQLite database for local development

echo "🚀 GitGreen Development Setup"
echo "=============================="
echo ""

# Step 1: Generate Prisma Client
echo "1️⃣  Generating Prisma Client..."
echo "   (Using workaround for Cloudflare CDN issues...)"
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate

if [ $? -ne 0 ]; then
  echo "❌ Failed to generate Prisma client"
  exit 1
fi

echo "   ✅ Prisma client generated"
echo ""

# Step 2: Push schema to SQLite database
echo "2️⃣  Creating SQLite database..."
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma db push

if [ $? -ne 0 ]; then
  echo "❌ Failed to create database"
  exit 1
fi

echo "   ✅ Database created at: ./dev.db"
echo ""

# Step 3: Verify setup
echo "3️⃣  Verifying setup..."

if [ -f "dev.db" ]; then
  echo "   ✅ Database file exists"
else
  echo "   ⚠️  Database file not found"
fi

if [ -d "node_modules/@prisma/client" ]; then
  echo "   ✅ Prisma client installed"
else
  echo "   ⚠️  Prisma client not found"
fi

echo ""
echo "✅ Development database setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Run: npm run dev"
echo "   2. Test API: npm run test:api"
echo ""
echo "🔄 REMINDER: When deploying to production:"
echo "   1. Update prisma/schema.prisma: change provider to 'postgresql'"
echo "   2. Update DATABASE_URL in .env to PostgreSQL connection string"
echo "   3. Run: npx prisma generate && npx prisma db push"
echo ""
