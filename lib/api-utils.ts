import { NextResponse } from "next/server";
import { ApiResponse } from "./validation";

export function createApiResponse(
  success: boolean,
  data?: any,
  error?: string,
  status: number = 200
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success,
      data,
      error,
    },
    { status }
  );
}

export function handleApiError(error: any): NextResponse<ApiResponse> {
  console.error("API Error:", error);
  
  if (error instanceof Error) {
    return createApiResponse(false, undefined, error.message, 500);
  }
  
  return createApiResponse(false, undefined, "Internal server error", 500);
}

export function handleValidationError(error: any): NextResponse<ApiResponse> {
  if (error.errors) {
    const errorMessage = error.errors
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    return createApiResponse(false, undefined, errorMessage, 400);
  }
  
  return createApiResponse(false, undefined, "Invalid request data", 400);
}