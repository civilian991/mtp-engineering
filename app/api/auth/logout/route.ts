import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth/supabase-auth';

export async function POST(request: NextRequest) {
  try {
    await logout();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}