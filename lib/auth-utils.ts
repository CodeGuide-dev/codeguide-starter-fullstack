import { auth } from './auth';
import { headers } from 'next/headers';

export async function getAuthenticatedUser() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return null;
        }

        return session.user;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

export function createErrorResponse(message: string, status: number = 400) {
    return Response.json({ error: message }, { status });
}

export function createSuccessResponse(data: any, status: number = 200) {
    return Response.json({ data }, { status });
}