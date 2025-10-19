#!/bin/bash

# Script to run database migrations
# Requires Supabase CLI and proper environment variables

echo "=== Running Database Migrations ==="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo "Error: .env.local file not found"
  echo "Please create .env.local with your Supabase credentials"
  exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '#' | xargs)

# Check required variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "Error: Missing required Supabase environment variables"
  echo "Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set"
  exit 1
fi

echo ""
echo "Migrations to run:"
echo "1. 001_create_admin_users.sql - Creates admin authentication tables"
echo "2. 002_fix_schema_mismatches.sql - Fixes schema mismatches and adds missing fields"
echo ""

read -p "Do you want to continue? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "To run migrations, please:"
  echo "1. Go to your Supabase dashboard: ${NEXT_PUBLIC_SUPABASE_URL}"
  echo "2. Navigate to SQL Editor"
  echo "3. Copy and run each migration file in order:"
  echo "   - supabase/migrations/001_create_admin_users.sql"
  echo "   - supabase/migrations/002_fix_schema_mismatches.sql"
  echo ""
  echo "After running migrations:"
  echo "1. Generate new TypeScript types: npm run generate:types"
  echo "2. Create admin user: node scripts/create-admin-user.js"
else
  echo "Migration cancelled"
fi