# MTP Engineering - Complete Deployment Steps

## Step 1: Run Supabase Migrations

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/fezkfoeejbagqrdmchuy

2. Click on "SQL Editor" in the left sidebar

3. Copy the entire contents of `/supabase/deploy-migration.sql`

4. Paste it in the SQL Editor and click "Run"

5. Verify the tables are created by going to "Table Editor" in the sidebar

## Step 2: Update Supabase TypeScript Types (Local)

Run this command locally to generate the latest types:

```bash
npx supabase gen types typescript --project-id fezkfoeejbagqrdmchuy > lib/types/database.ts
```

## Step 3: Configure Vercel Environment Variables

1. Go to your Vercel project: https://vercel.com/mohamad-al-madanis-projects/mtp-engineering

2. Go to Settings → Environment Variables

3. Add the following variables for Production:

```
NEXT_PUBLIC_SUPABASE_URL=https://fezkfoeejbagqrdmchuy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlemtmb2VlamJhZ3FyZG1jaHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NzE0NTMsImV4cCI6MjA3NDA0NzQ1M30.LTPwNGkQFfWq4Tu9VzvVhQ9bXTSciBTkZRGB7StiT5c

NEXT_PUBLIC_APP_URL=https://mtp-engineering.vercel.app
NEXT_PUBLIC_SITE_URL=https://mtp-engineering.vercel.app

JWT_SECRET=your-secure-jwt-secret-here-minimum-32-characters
NEXTAUTH_SECRET=your-secure-nextauth-secret-here-minimum-32-characters

ADMIN_EMAIL=admin@mtp.com.sa
```

Optional (if you want email notifications):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

## Step 4: Test Build Locally

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test locally with production environment
npm run start
```

## Step 5: Deploy to Vercel

Option A: Using Vercel CLI
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy to production
vercel --prod
```

Option B: Using Git
```bash
# Commit your changes
git add .
git commit -m "Production deployment with Supabase integration"

# Push to your repository
git push origin main
```

## Step 6: Create Admin User

After deployment, you can either:

1. Use the default admin (CHANGE PASSWORD IMMEDIATELY):
   - Email: `admin@mtp.com.sa`
   - Password: `Admin@123456`

2. Or create a new admin by running this SQL in Supabase:

```sql
-- Create new admin user
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'your-email@mtp.com.sa',
  '$2a$10$rBZWZjVMc5OQ2YZ8FIzu7u.H2KjD3G7XL6K.GcZr0oNpRNqmFz5u6', -- Password: Admin@123456
  'Your Name',
  'super_admin',
  true
);
```

Then immediately log in and change the password at: https://mtp-engineering.vercel.app/admin

## Step 7: Configure Supabase Storage Buckets

1. Go to Storage in Supabase dashboard
2. Create these buckets:
   - `projects` - For project images
   - `careers` - For CV uploads
   - `news` - For news images
3. Set each bucket to "Public" if you want images to be publicly accessible

## Step 8: Verify Deployment

Check these URLs:
- Homepage: https://mtp-engineering.vercel.app
- Admin Login: https://mtp-engineering.vercel.app/admin
- API Health: https://mtp-engineering.vercel.app/api/auth/me

Test these features:
- [ ] Homepage loads in English
- [ ] Switch to Arabic (RTL layout)
- [ ] Contact form submission
- [ ] Admin login works
- [ ] Can create/edit projects in admin
- [ ] Can create careers in admin
- [ ] Career application form works

## Step 9: Domain Setup (Optional)

If you want to use mtp.com.sa:

1. In Vercel project settings, go to "Domains"
2. Add `mtp.com.sa` and `www.mtp.com.sa`
3. Update your domain DNS records as instructed
4. Update environment variables to use the new domain

## Troubleshooting

### Database Connection Issues
- Check Supabase URL and anon key are correct
- Ensure RLS policies are enabled
- Check if tables exist in Supabase

### Build Errors
- Run `npm run type-check` to check TypeScript errors
- Ensure all environment variables are set
- Check `.next` folder is not corrupted (delete and rebuild)

### Admin Login Not Working
- Check admin_users table has at least one user
- Verify JWT_SECRET is set in environment variables
- Check browser console for error messages

## Support

For issues:
1. Check build logs in Vercel dashboard
2. Check Supabase logs for database errors
3. Use browser DevTools to inspect API responses