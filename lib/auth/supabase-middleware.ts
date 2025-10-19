import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr'

export async function withAuth(
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
  options: { requiredRole?: 'super_admin' | 'admin' | 'editor' } = {}
) {
  return async (request: NextRequest) => {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            },
          },
        }
      )

      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Get admin profile
      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profile || !profile.is_active) {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        );
      }

      // Check role permissions
      if (options.requiredRole) {
        const roleHierarchy = {
          'super_admin': 3,
          'admin': 2,
          'editor': 1
        };

        if (roleHierarchy[profile.role] < roleHierarchy[options.requiredRole]) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
      }

      const adminUser = {
        id: user.id,
        email: user.email!,
        full_name: profile.full_name,
        role: profile.role
      }

      // Call the actual handler with the authenticated user
      return handler(request, adminUser);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }
  };
}

export async function checkAdminAuth(request: NextRequest): Promise<boolean> {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    // Check if user has admin profile
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('id, is_active')
      .eq('id', user.id)
      .single()

    return !!(profile && profile.is_active)
  } catch (error) {
    console.error('Auth check error:', error)
    return false
  }
}