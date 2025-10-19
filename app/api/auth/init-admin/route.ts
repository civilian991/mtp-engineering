import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Initialize admin user - run this once after deployment
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Create a test admin user with a simple password
    const { data: { user }, error } = await supabase.auth.signUp({
      email: 'admin@mtp.com.sa',
      password: 'Admin@123456',
      options: {
        data: {
          full_name: 'System Administrator',
          role: 'super_admin'
        }
      }
    });

    if (error) {
      // If user already exists, try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@mtp.com.sa',
        password: 'Admin@123456'
      });

      if (signInError) {
        return NextResponse.json({
          error: 'User exists but password is different. Please use password reset.',
          details: signInError.message
        }, { status: 400 });
      }

      return NextResponse.json({
        message: 'Admin user already exists and login successful',
        user: signInData.user?.email
      });
    }

    if (user) {
      // Ensure admin profile exists
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: 'System Administrator',
          role: 'super_admin',
          is_active: true
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user initialized successfully',
      email: user?.email
    });
  } catch (error: any) {
    console.error('Init admin error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize admin user', details: error.message },
      { status: 500 }
    );
  }
}