import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie, verifyToken, getCurrentUser } from '@/lib/auth/auth';

export async function withAuth(
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
  options: { requiredRole?: 'super_admin' | 'admin' | 'editor' } = {}
) {
  return async (request: NextRequest) => {
    try {
      // Get auth token from cookie
      const token = request.cookies.get('mtp-admin-token')?.value;

      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Verify token
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Check if user still exists and is active
      const user = await getCurrentUser(token);
      if (!user) {
        return NextResponse.json(
          { error: 'User not found or inactive' },
          { status: 401 }
        );
      }

      // Check role permissions
      if (options.requiredRole) {
        const roleHierarchy = {
          'super_admin': 3,
          'admin': 2,
          'editor': 1
        };

        if (roleHierarchy[user.role] < roleHierarchy[options.requiredRole]) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
      }

      // Call the actual handler with the authenticated user
      return handler(request, user);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }
  };
}

export function checkAdminAuth(request: NextRequest) {
  const token = request.cookies.get('mtp-admin-token')?.value;

  if (!token) {
    return false;
  }

  const decoded = verifyToken(token);
  return !!decoded;
}