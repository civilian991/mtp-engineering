#!/bin/bash

echo "🚀 MTP Engineering Deployment Script"
echo "====================================="
echo ""

# Step 1: Confirm Supabase migration
echo "📊 Step 1: Supabase Migration"
echo "Have you run the migration script in Supabase SQL Editor? (y/n)"
read -r MIGRATION_DONE

if [ "$MIGRATION_DONE" != "y" ]; then
    echo "⚠️  Please run the migration first!"
    echo "1. Go to: https://supabase.com/dashboard/project/fezkfoeejbagqrdmchuy/sql"
    echo "2. Copy contents of supabase/deploy-migration.sql"
    echo "3. Run in SQL Editor"
    exit 1
fi

# Step 2: Generate TypeScript types
echo ""
echo "📝 Step 2: Generating TypeScript types from Supabase..."
npx supabase gen types typescript --project-id fezkfoeejbagqrdmchuy > lib/types/database.ts
echo "✅ Types generated"

# Step 3: Install dependencies
echo ""
echo "📦 Step 3: Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# Step 4: Build project
echo ""
echo "🔨 Step 4: Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful"

# Step 5: Deploy to Vercel
echo ""
echo "🌐 Step 5: Deploying to Vercel"
echo "Choose deployment method:"
echo "1. Deploy with Vercel CLI"
echo "2. Push to Git (auto-deploy)"
echo "3. Skip deployment"
read -r DEPLOY_CHOICE

case $DEPLOY_CHOICE in
    1)
        echo "Deploying with Vercel CLI..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        vercel --prod
        ;;
    2)
        echo "Preparing Git deployment..."
        git add .
        echo "Enter commit message:"
        read -r COMMIT_MSG
        git commit -m "$COMMIT_MSG"
        git push origin main
        echo "✅ Pushed to Git. Vercel will auto-deploy."
        ;;
    3)
        echo "Skipping deployment."
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

echo ""
echo "📋 Post-Deployment Checklist:"
echo "=============================="
echo ""
echo "1. Set environment variables in Vercel:"
echo "   https://vercel.com/mohamad-al-madanis-projects/mtp-engineering/settings/environment-variables"
echo ""
echo "2. Test the deployment:"
echo "   - Homepage: https://mtp-engineering.vercel.app"
echo "   - Admin: https://mtp-engineering.vercel.app/admin"
echo "   - Default admin: admin@mtp.com.sa / Admin@123456"
echo ""
echo "3. IMPORTANT: Change the admin password immediately!"
echo ""
echo "4. Configure Supabase Storage buckets if needed"
echo ""
echo "✅ Deployment script completed!"