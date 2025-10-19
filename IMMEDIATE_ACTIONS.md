# 🚨 IMMEDIATE DEPLOYMENT ACTIONS

## 1. Run Supabase Migration (5 minutes)

1. Open: https://supabase.com/dashboard/project/fezkfoeejbagqrdmchuy/sql
2. Copy ALL content from `supabase/deploy-migration.sql`
3. Paste in SQL Editor
4. Click "Run"
5. Verify tables created in Table Editor

## 2. Set Vercel Environment Variables (3 minutes)

1. Open: https://vercel.com/mohamad-al-madanis-projects/mtp-engineering/settings/environment-variables
2. Add these Production variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://fezkfoeejbagqrdmchuy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlemtmb2VlamJhZ3FyZG1jaHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NzE0NTMsImV4cCI6MjA3NDA0NzQ1M30.LTPwNGkQFfWq4Tu9VzvVhQ9bXTSciBTkZRGB7StiT5c
JWT_SECRET = [generate-a-secure-32-char-string]
NEXTAUTH_SECRET = [generate-another-secure-32-char-string]
ADMIN_EMAIL = admin@mtp.com.sa
```

Generate secure secrets at: https://generate-secret.vercel.app/32

## 3. Deploy (2 minutes)

Option A - Using Terminal:
```bash
vercel --prod
```

Option B - Using Git:
```bash
git add .
git commit -m "Production deployment with Supabase"
git push
```

## 4. Test Deployment

Once deployed, test:
1. Open: https://mtp-engineering.vercel.app
2. Test admin login: https://mtp-engineering.vercel.app/admin
   - Email: `admin@mtp.com.sa`
   - Password: `Admin@123456`
3. **CHANGE THE PASSWORD IMMEDIATELY**

## 5. Optional: Supabase Storage

If you want image uploads:
1. Go to: https://supabase.com/dashboard/project/fezkfoeejbagqrdmchuy/storage
2. Create buckets:
   - `projects` (public)
   - `careers` (public)
   - `news` (public)

## Quick Commands

```bash
# Run migration locally (optional)
npm run supabase:migrate

# Test locally
npm run dev

# Deploy to production
vercel --prod

# Check deployment
open https://mtp-engineering.vercel.app
```

## Need Help?

- Build failed? Run: `npm run type-check`
- Database error? Check Supabase logs
- Login not working? Verify JWT_SECRET is set

---

**Total Time: ~10 minutes to full deployment** 🚀