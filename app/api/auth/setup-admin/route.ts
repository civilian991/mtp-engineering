import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Temporary endpoint to set up the first admin user
// This should be removed after initial setup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Only allow creation of the initial admin
    if (email !== 'admin@mtp.com.sa') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const supabase = await createClient();

    // Check if any admin already exists
    const { data: existingAdmins } = await supabase
      .from('admin_profiles')
      .select('id')
      .limit(1);

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: 'System Administrator',
          role: 'super_admin'
        }
      }
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (data.user) {
      // Create admin profile
      await supabase
        .from('admin_profiles')
        .insert({
          id: data.user.id,
          email: data.user.email || email,
          full_name: 'System Administrator',
          role: 'super_admin',
          is_active: true
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully'
    });
  } catch (error: any) {
    console.error('Setup admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}