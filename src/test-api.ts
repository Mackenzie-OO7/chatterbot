/**
 * Test API Endpoints
 * Tests the emission calculation API with mock data
 */

import 'dotenv/config';

const API_BASE = 'http://localhost:3000/api';

async function testEmissionsAPI() {
  console.log('🧪 Testing Emissions API...\n');

  try {
    // Test data: Mock GitHub workflow runs
    const testRequest = {
      repository: {
        id: 'test-repo-123',
        name: 'gitgreen',
        owner: 'test-user',
        fullName: 'test-user/gitgreen',
      },
      periodStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      periodEnd: new Date().toISOString(),
      workflows: [
        {
          id: 12345,
          name: 'CI Tests',
          workflowPath: '.github/workflows/ci.yml',
          status: 'completed',
          conclusion: 'success',
          runStartedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
          runCompletedAt: new Date().toISOString(),
          runtimeMinutes: 5,
          htmlUrl: 'https://github.com/test-user/gitgreen/actions/runs/12345',
        },
        {
          id: 12346,
          name: 'Build',
          workflowPath: '.github/workflows/build.yml',
          status: 'completed',
          conclusion: 'success',
          runStartedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
          runCompletedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          runtimeMinutes: 5,
          htmlUrl: 'https://github.com/test-user/gitgreen/actions/runs/12346',
        },
      ],
      workflowFiles: {
        '.github/workflows/ci.yml': `
name: CI Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
`,
        '.github/workflows/build.yml': `
name: Build
on: [push]
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build
`,
      },
      mintToken: true,
    };

    console.log('1️⃣  Sending emission calculation request...');
    console.log('   Repository:', testRequest.repository.fullName);
    console.log('   Workflows:', testRequest.workflows.length);

    const response = await fetch(`${API_BASE}/emissions/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API request failed: ${JSON.stringify(error)}`);
    }

    const result = await response.json();

    console.log('\n✅ Emission calculation successful!');
    console.log('\n📊 Results:');
    console.log('   Emission ID:', result.data.emission.id);
    console.log('   Repository:', result.data.emission.repository);
    console.log('   Total CO2:', result.data.emission.totalCO2kg, 'kg');
    console.log('   Guardian Token:', result.data.emission.guardianTokenId || 'Not minted');
    console.log('   Status:', result.data.emission.status);

    console.log('\n📈 Summary:');
    console.log('   Total Emissions:', result.data.summary.totalEmissions.toFixed(4), 'kg CO2');
    console.log('   Workflow Count:', result.data.summary.workflowCount);
    console.log('   Emissions by Runner:', JSON.stringify(result.data.summary.emissionsByRunner, null, 2));

    console.log('\n🎉 API test passed!\n');

  } catch (error: any) {
    console.error('\n❌ API test failed:');
    console.error('   Error:', error.message);
    console.error('\n📋 Troubleshooting:');
    console.error('   1. Is the dev server running? Run: npm run dev');
    console.error('   2. Check the terminal for API errors');
    console.error('   3. Verify USE_MOCK_GUARDIAN=true in .env\n');

    process.exit(1);
  }
}

// Run test
console.log('⚠️  Make sure the dev server is running: npm run dev\n');
console.log('Starting API test in 2 seconds...\n');

setTimeout(() => {
  testEmissionsAPI()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}, 2000);
