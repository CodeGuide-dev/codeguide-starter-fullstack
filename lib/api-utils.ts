import { NextResponse } from 'next/server';
import { auth } from './auth';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function createResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: status >= 200 && status < 300,
    data
  }, { status });
}

export function createErrorResponse(message: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status });
}

export async function getAuthenticatedUser(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return null;
    }
    return session.user;
  } catch (error) {
    return null;
  }
}

export function validateRequiredFields(data: any, fields: string[]): string | null {
  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return `Field '${field}' is required`;
    }
  }
  return null;
}