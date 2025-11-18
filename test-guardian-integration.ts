/**
 * Test Guardian Integration
 * Run with: npx ts-node test-guardian-integration.ts
 */

import { guardianService } from './src/lib/services/guardian/guardian.service';

async function testGuardianIntegration() {
  console.log('🧪 Testing Guardian Integration\n');

  try {
    // Test 1: Authentication
    console.log('1️⃣ Testing authentication...');
    const token = await guardianService.authenticate();
    console.log('✅ Authenticated! Token:', token.substring(0, 20) + '...\n');

    // Test 2: Get Policies
    console.log('2️⃣ Fetching policies...');
    const policies = await guardianService.getPolicies();
    console.log(`✅ Found ${policies.length} policies`);

    if (policies.length > 0) {
      console.log('\nAvailable Policies:');
      policies.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name} (${p.status})`);
        console.log(`      ID: ${p.id}`);
      });

      // If we have policies, set the first one as default
      if (policies.length > 0) {
        console.log(`\n📝 To use the first policy, add this to your .env:`);
        console.log(`   GUARDIAN_POLICY_ID=${policies[0].id}`);
      }
    } else {
      console.log('\n⚠️  No policies found. You need to create a policy in Guardian first.');
      console.log('   For now, GitGreen will use mock Guardian for testing.');
    }

    console.log('\n✅ Guardian integration test complete!');

  } catch (error: any) {
    console.error('\n❌ Guardian integration test failed:', error.message);
    console.error('\nThis is OK! GitGreen will fall back to mock Guardian.');
    console.error('You can continue building features and add real Guardian later.');
  }
}

testGuardianIntegration();
