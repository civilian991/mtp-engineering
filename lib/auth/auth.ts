import { createServerClient } from '@supabase/ssr';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';
const COOKIE_NAME = 'mtp-admin-token';

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

// Create a Supabase client without type restrictions for admin tables
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: async () => {
        const cookieStore = await cookies();
        return cookieStore.getAll();
      },
      setAll: async (cookiesToSet) => {
        const cookieStore = await cookies();
        cookiesToSet.forEach((cookie) => {
          cookieStore.set(cookie.name, cookie.value, cookie.options as any);
        });
      }
    }
  });
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

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const supabase = createAdminClient();

  // Query the admin_users table using raw SQL or untyped query
  const { data: adminUsers, error } = await supabase
    .from('admin_users')
    .select('id, email, password_hash, full_name, role, is_active')
    .eq('email', email)
    .single();

  if (error || !adminUsers) {
    console.error('User not found:', error);
    throw new Error('Invalid credentials');
  }

  const adminUser = adminUsers as any;

  if (!adminUser.is_active) {
    throw new Error('Account is disabled');
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, adminUser.password_hash);
  if (!isValidPassword) {
    // Log failed attempt
    await supabase
      .from('admin_login_attempts')
      .insert({
        email,
        success: false,
        ip_address: '0.0.0.0',
        user_agent: 'unknown'
      });

    throw new Error('Invalid credentials');
  }

  const user: User = {
    id: adminUser.id,
    email: adminUser.email,
    full_name: adminUser.full_name,
    role: adminUser.role as User['role']
  };

  // Generate token
  const token = generateToken(user);

  // Create session
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await supabase
    .from('admin_sessions')
    .insert({
      user_id: user.id,
      token,
      expires_at: expiresAt.toISOString(),
      ip_address: '0.0.0.0',
      user_agent: 'unknown'
    });

  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  // Log successful attempt
  await supabase
    .from('admin_login_attempts')
    .insert({
      email,
      success: true,
      ip_address: '0.0.0.0',
      user_agent: 'unknown'
    });

  return { token, user };
}

export async function logout() {
  const token = await getAuthCookie();
  if (token) {
    const supabase = createAdminClient();
    await supabase
      .from('admin_sessions')
      .delete()
      .eq('token', token);
  }
  await removeAuthCookie();
}

export async function getCurrentUser(token: string): Promise<User | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Verify session in database
  const supabase = createAdminClient();
  const { data: session } = await supabase
    .from('admin_sessions')
    .select('user_id, expires_at')
    .eq('token', token)
    .single();

  if (!session) return null;

  // Check if session expired
  const sessionData = session as any;
  if (new Date(sessionData.expires_at) < new Date()) {
    await supabase
      .from('admin_sessions')
      .delete()
      .eq('token', token);
    return null;
  }

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

export async function logAuditAction(
  userId: string | null,
  action: string,
  entityType?: string,
  entityId?: string,
  details?: any,
  ipAddress?: string
) {
  console.log('Audit:', { userId, action, entityType, entityId, details, ipAddress });
}

export async function createAdminUser(
  email: string,
  password: string,
  fullName: string,
  role: 'super_admin' | 'admin' | 'editor' = 'admin'
): Promise<User> {
  const supabase = createAdminClient();

  // Check if user already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    throw new Error('User already exists');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const { data: newUser, error } = await supabase
    .from('admin_users')
    .insert({
      email,
      password_hash: passwordHash,
      full_name: fullName,
      role,
      is_active: true
    })
    .select('id, email, full_name, role')
    .single();

  if (error) {
    throw new Error('Failed to create user: ' + error.message);
  }

  const userData = newUser as any;
  return {
    id: userData.id,
    email: userData.email,
    full_name: userData.full_name,
    role: userData.role as User['role']
  };
}