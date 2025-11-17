/**
 * Guardian Integration Test
 * Tests connection to Guardian API and token minting
 * Uses factory to automatically switch between mock and real Guardian
 */

import 'dotenv/config';
import { getGuardianService } from './lib/services/guardian';
import { EmissionTokenData } from './lib/types';

async function testGuardianIntegration() {
  console.log('🧪 Testing Guardian Integration...\n');

  // Get Guardian service (mock or real based on USE_MOCK_GUARDIAN env var)
  const guardianService = getGuardianService();

  try {
    // Test 1: Authentication
    console.log('1️⃣  Testing Authentication...');
    const token = await guardianService.authenticate();
    console.log('   ✅ Authenticated successfully');
    console.log('   - Token:', token.substring(0, 20) + '...\n');

    // Test 2: Get Policies
    console.log('2️⃣  Fetching Policies...');
    const policies = await guardianService.getPolicies();
    console.log(`   ✅ Found ${policies.length} policies`);

    if (policies.length > 0) {
      console.log('   - Policies:');
      policies.forEach((p, i) => {
        console.log(`     ${i + 1}. ${p.name} (${p.version}) - ${p.status}`);
        console.log(`        ID: ${p.id}`);
      });
    }
    console.log('');

    // Test 3: Set Policy ID
    const policyId = process.env.GUARDIAN_POLICY_ID;
    if (!policyId) {
      console.log('⚠️  GUARDIAN_POLICY_ID not set in .env');
      console.log('   Please set it to one of the policy IDs above\n');
      return;
    }

    guardianService.setPolicyId(policyId);
    console.log('3️⃣  Policy ID configured:', policyId, '\n');

    // Test 4: Mint Test Emission Token
    console.log('4️⃣  Minting Test Emission Token...');

    const testEmissionData: EmissionTokenData = {
      repository: 'test-user/test-repo',
      periodStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      periodEnd: new Date().toISOString(),
      totalEmissions: 10.5, // 10.5 kg CO2
      breakdown: {
        cicd: 10.5,
        cloud: 0,
        ai: 0,
      },
      calculationMethodology: 'v1.0',
      verificationData: 'test_verification_data',
    };

    const tokenId = await guardianService.mintEmissionToken(testEmissionData);

    console.log('   ✅ Emission token minted!');
    console.log('   - Token ID:', tokenId);
    console.log('   - Amount:', testEmissionData.totalEmissions, 'kg CO2\n');

    // Test 5: Get Token Details (if supported)
    console.log('5️⃣  Fetching Token Details...');
    try {
      const token = await guardianService.getToken(tokenId);
      console.log('   ✅ Token details retrieved');
      console.log('   - Type:', token.type);
      console.log('   - Amount:', token.amount);
      console.log('   - Status:', token.status, '\n');
    } catch (error) {
      console.log('   ⚠️  Token details endpoint not available (this is OK)\n');
    }

    // Success summary
    console.log('✨ All Guardian tests passed!\n');
    console.log('📝 Summary:');
    console.log('   - Authentication: ✅');
    console.log('   - Policy listing: ✅');
    console.log('   - Token minting: ✅');
    console.log('\n🎉 Guardian integration is working!\n');

  } catch (error: any) {
    console.error('\n❌ Guardian test failed:');
    console.error('   Error:', error.message);

    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }

    console.log('\n📋 Troubleshooting:');
    console.log('   1. Is Guardian running? Check: docker-compose ps');
    console.log('   2. Are credentials correct in .env?');
    console.log('      - GUARDIAN_API_URL');
    console.log('      - GUARDIAN_USERNAME');
    console.log('      - GUARDIAN_PASSWORD');
    console.log('   3. Is the policy published?');
    console.log('   4. Check Guardian logs: docker-compose logs -f guardian-service\n');

    process.exit(1);
  }
}

// Run tests
testGuardianIntegration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
