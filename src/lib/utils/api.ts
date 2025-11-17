/**
 * API Response Utilities
 * Standardized response helpers for Next.js API routes
 */

import { NextResponse } from 'next/server';
import { APIResponse } from '../types';

/**
 * Success response
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  const response: APIResponse<T> = {
    success: true,
    data,
  };

  return NextResponse.json(response, { status });
}

/**
 * Error response
 */
export function apiError(
  message: string,
  code: string = 'ERROR',
  status = 500
): NextResponse {
  const response: APIResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Validation error response
 */
export function apiValidationError(message: string): NextResponse {
  return apiError(message, 'VALIDATION_ERROR', 400);
}

/**
 * Not found error response
 */
export function apiNotFound(resource: string): NextResponse {
  return apiError(`${resource} not found`, 'NOT_FOUND', 404);
}

/**
 * Unauthorized error response
 */
export function apiUnauthorized(message = 'Unauthorized'): NextResponse {
  return apiError(message, 'UNAUTHORIZED', 401);
}

/**
 * Catch and format errors
 */
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  if (error instanceof Error) {
    return apiError(error.message, 'INTERNAL_ERROR', 500);
  }

  return apiError('An unexpected error occurred', 'INTERNAL_ERROR', 500);
}
