# Guardian Local Setup Guide

This guide walks you through setting up Guardian locally with Docker to mint emission tokens on Hedera testnet.

## Prerequisites

- Docker Desktop installed
- Hedera Testnet account (we'll create this below)
- 8GB+ RAM available for Docker

---

## Step 1: Create Hedera Testnet Account

### Option A: Hedera Developer Portal (Recommended)

1. Go to [Hedera Portal](https://portal.hedera.com/)
2. Sign up / Log in
3. Click **"Create Account"** in the dashboard
4. Select **"Testnet"** from the network dropdown
5. Click **"Create"**
6. **IMPORTANT**: Copy and save:
   - **Account ID** (format: `0.0.xxxxx`)
   - **Private Key** (DER Encoded - NOT HEX)
   - **Public Key**

### Option B: Hedera SDK (Alternative)

```bash
# Install Hedera SDK globally
npm install -g @hashgraph/sdk

# Create account (run in terminal)
node -e "
const { Client, PrivateKey, AccountCreateTransaction, Hbar } = require('@hashgraph/sdk');
const client = Client.forTestnet();
const newPrivateKey = PrivateKey.generateED25519();
console.log('Private Key:', newPrivateKey.toString());
console.log('Public Key:', newPrivateKey.publicKey.toString());
console.log('');
console.log('⚠️  Fund this account at: https://portal.hedera.com/');
"
```

Then fund the account via the [Hedera Testnet Faucet](https://portal.hedera.com/).

---

## Step 2: Clone Guardian Repository

```bash
# Clone the official Guardian repository
git clone https://github.com/hashgraph/guardian.git
cd guardian

# Checkout latest stable version (v2.x)
git checkout main
```

---

## Step 3: Configure Guardian Environment

### 3.1 Create `.env.guardian` file

```bash
# In the guardian/ directory, create .env.guardian
cd guardian
cat > .env.guardian << 'EOF'
# Hedera Network Configuration
HEDERA_NET="testnet"
OPERATOR_ID="0.0.YOUR_ACCOUNT_ID_HERE"
OPERATOR_KEY="YOUR_PRIVATE_KEY_HERE"

# Guardian Configuration
INITIALIZATION_TOPIC_ID=""
GUARDIAN_ENV="docker"

# MongoDB
MONGO_USERNAME="mongouser"
MONGO_PASSWORD="mongopassword"
MONGO_DATABASE="guardian_db"

# Message Broker
MQ_ADDRESS="message-broker"

# IPFS (for storing policies)
IPFS_STORAGE_API_KEY=""
IPFS_PUBLIC_GATEWAY="https://ipfs.io/ipfs/${cid}"

# Worker
WORKER_LOG_LEVEL="2"
EOF
```

### 3.2 Replace Placeholder Values

Edit `.env.guardian` and replace:
- `0.0.YOUR_ACCOUNT_ID_HERE` → Your actual Account ID (e.g., `0.0.12345`)
- `YOUR_PRIVATE_KEY_HERE` → Your DER Encoded Private Key

---

## Step 4: Start Guardian with Docker

```bash
# Make sure Docker Desktop is running

# Start Guardian (this will take 5-10 minutes first time)
docker-compose up -d

# Check if containers are running
docker-compose ps

# You should see these containers running:
# - guardian-service
# - mongo
# - message-broker
# - ipfs-node
# - api-gateway
```

### Troubleshooting

If containers fail to start:

```bash
# Check logs
docker-compose logs -f guardian-service

# Common issues:
# - MongoDB connection: Wait 2-3 minutes for MongoDB to initialize
# - Port conflicts: Make sure ports 3000, 3002, 27017 are available
# - Memory: Increase Docker memory to 8GB in Docker Desktop settings
```

---

## Step 5: Access Guardian UI

1. Open browser to: **http://localhost:3000**
2. You should see the Guardian login page

### Create Standard Registry User

1. Click **"Register"**
2. Fill in:
   - **Username**: `gitgreen_registry` (or any name)
   - **Password**: (choose a strong password)
   - **Role**: Select **"Standard Registry"**
3. Click **"Register"**
4. Log in with your new credentials

---

## Step 6: Create Custom Policy via UI

### 6.1 Navigate to Policies

1. In Guardian UI, go to **Policies** tab
2. Click **"Create New Policy"**

### 6.2 Policy Configuration

**Basic Info:**
- **Name**: `Software Development Emissions v1.0`
- **Description**: `Policy for tracking and tokenizing carbon emissions from software development workflows`
- **Version**: `1.0.0`

### 6.3 Create Schema (Emission Data Structure)

Click **"Schemas"** → **"Add Schema"**

**Schema Name**: `SoftwareEmissionData`

**Schema Fields**:
```json
{
  "repository": {
    "type": "string",
    "required": true,
    "description": "GitHub repository (owner/name)"
  },
  "periodStart": {
    "type": "string",
    "format": "date-time",
    "required": true
  },
  "periodEnd": {
    "type": "string",
    "format": "date-time",
    "required": true
  },
  "totalEmissions": {
    "type": "number",
    "required": true,
    "description": "Total CO2 emissions in kg"
  },
  "breakdown": {
    "type": "object",
    "properties": {
      "cicd": { "type": "number" },
      "cloud": { "type": "number" },
      "ai": { "type": "number" }
    }
  },
  "calculationMethodology": {
    "type": "string",
    "default": "v1.0"
  },
  "verificationData": {
    "type": "string",
    "description": "IPFS hash of supporting calculation data"
  }
}
```

### 6.4 Configure Token

Click **"Tokens"** → **"Create Token"**

**Token Config:**
- **Name**: `Software Emission Token`
- **Symbol**: `SET`
- **Type**: `Fungible`
- **Decimals**: `2`
- **Initial Supply**: `0` (will mint on demand)

### 6.5 Add Policy Workflow Blocks

This is simplified - Guardian UI will guide you:

1. **requestVcDocumentBlock**: Intake emission data
2. **mintDocumentBlock**: Mint tokens based on emissions
   - **Rule**: `totalEmissions * 1` (1 token per kg CO2)

### 6.6 Publish Policy

1. Click **"Publish"**
2. Guardian will:
   - Publish schema to IPFS
   - Create topic on Hedera
   - Publish policy configuration
3. **Save the Policy ID** - you'll need this for API integration

---

## Step 7: Get API Access

### 7.1 Login via API

```bash
# Test authentication
curl -X POST http://localhost:3000/api/v1/accounts/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "gitgreen_registry",
    "password": "YOUR_PASSWORD"
  }'
```

**Save the returned `accessToken` and `refreshToken`**

### 7.2 Get Policy ID

```bash
# List policies
curl -X GET http://localhost:3000/api/v1/policies \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Find your "Software Development Emissions v1.0" policy and note its `id`.

---

## Step 8: Update GitGreen .env

Update your GitGreen project's `.env` file:

```bash
# Guardian API (local instance)
GUARDIAN_API_URL="http://localhost:3000/api/v1"
GUARDIAN_USERNAME="gitgreen_registry"
GUARDIAN_PASSWORD="your_password_here"
GUARDIAN_POLICY_ID="your_policy_id_here"

# Hedera Testnet (same credentials as Guardian)
HEDERA_NETWORK="testnet"
HEDERA_ACCOUNT_ID="0.0.xxxxx"
HEDERA_PRIVATE_KEY="your_private_key"
HEDERA_PUBLIC_KEY="your_public_key"
```

---

## Step 9: Test Integration

Run GitGreen test to verify Guardian connection:

```bash
# From GitGreen project directory
npm run test:guardian
```

---

## Useful Commands

```bash
# View Guardian logs
docker-compose logs -f guardian-service

# Restart Guardian
docker-compose restart guardian-service

# Stop Guardian
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

---

## Next Steps

Once Guardian is running:
1. ✅ Guardian service is ready
2. ➡️ Build Guardian integration in GitGreen
3. ➡️ Test emission token minting
4. ➡️ Build frontend to display tokens

---

## Troubleshooting

### Guardian UI won't load
- Check if containers are running: `docker-compose ps`
- Wait 2-3 minutes after starting (MongoDB needs time)
- Check logs: `docker-compose logs guardian-service`

### API authentication fails
- Verify username/password
- Check if user has "Standard Registry" role
- Restart Guardian: `docker-compose restart`

### Token minting fails
- Ensure policy is published
- Check Hedera account has HBAR balance
- Verify OPERATOR_ID and OPERATOR_KEY in `.env.guardian`

---

**Need Help?**
- Guardian Discord: https://hedera.com/discord
- Guardian Docs: https://docs.hedera.com/guardian
- GitHub Issues: https://github.com/hashgraph/guardian/issues
