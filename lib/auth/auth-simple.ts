// Simplified authentication for production deployment
// This doesn't rely on admin_users table in database types
// After deployment, run migrations and switch to full auth.ts

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';
const COOKIE_NAME = 'mtp-admin-token';

// Demo credentials - CHANGE IN PRODUCTION
const DEMO_ADMIN = {
  email: 'admin@mtp.com.sa',
  password: 'Admin@123456',
  id: 'demo-admin-id',
  full_name: 'System Administrator',
  role: 'super_admin' as const
};

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'super_admin' | 'admin' | 'editor';
}

export interface AuthToken {
  user: User;
  expires_at: string;
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      user: decoded.user,
      expires_at: new Date(decoded.exp * 1000).toISOString()
    };
  } catch (error) {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  // Simple demo authentication
  // In production, this should verify against database
  if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    const user = {
      id: DEMO_ADMIN.id,
      email: DEMO_ADMIN.email,
      full_name: DEMO_ADMIN.full_name,
      role: DEMO_ADMIN.role
    };

    const token = generateToken(user);
    return { token, user };
  }

  throw new Error('Invalid credentials');
}

export async function logout() {
  // Simple logout
  await removeAuthCookie();
}

export async function getCurrentUser(token: string): Promise<User | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return decoded.user;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/'
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export function hasPermission(user: User | null, requiredRole: 'super_admin' | 'admin' | 'editor'): boolean {
  if (!user) return false;

  const roleHierarchy = {
    'super_admin': 3,
    'admin': 2,
    'editor': 1
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

// Placeholder functions for compatibility
export async function hashPassword(password: string): Promise<string> {
  return password; // In production, use bcrypt
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return password === hashedPassword; // In production, use bcrypt
}

export async function logAuditAction(
  userId: string | null,
  action: string,
  entityType?: string,
  entityId?: string,
  details?: any,
  ipAddress?: string
) {
  // Log to console for now
  console.log('Audit:', { userId, action, entityType, entityId, details, ipAddress });
}