#!/bin/bash

# Generate TypeScript types from Supabase database
# This script requires the Supabase CLI to be installed

echo "Generating TypeScript types from Supabase..."

# Load environment variables
if [ -f ".env.local" ]; then
  export $(cat .env.local | grep -v '#' | xargs)
fi

# Generate types
npx supabase gen types typescript \
  --project-id "$SUPABASE_PROJECT_ID" \
  --schema public \
  > types/database.ts

echo "Types generated successfully at types/database.ts"