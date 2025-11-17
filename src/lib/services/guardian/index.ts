/**
 * Guardian Service Factory
 * Toggles between mock and real Guardian service based on environment variable
 *
 * Usage:
 *   import { getGuardianService } from '@/lib/services/guardian';
 *   const guardian = getGuardianService();
 *
 * Configuration:
 *   - USE_MOCK_GUARDIAN=true  -> Uses MockGuardianService (for development without Guardian)
 *   - USE_MOCK_GUARDIAN=false -> Uses real GuardianService (requires Guardian running)
 */

import { IGuardianService } from '../../types';
import { guardianService } from './guardian.service';
import { mockGuardianService } from './mock-guardian.service';

/**
 * Get the appropriate Guardian service based on environment
 */
export function getGuardianService(): IGuardianService {
  const useMock = process.env.USE_MOCK_GUARDIAN === 'true';

  if (useMock) {
    console.log('🔷 Using MOCK Guardian service (set USE_MOCK_GUARDIAN=false for real Guardian)');
    return mockGuardianService;
  }

  console.log('🔷 Using REAL Guardian service');
  return guardianService;
}

// Export both services for explicit usage if needed
export { guardianService } from './guardian.service';
export { mockGuardianService } from './mock-guardian.service';

// Default export is the factory function
export default getGuardianService;
