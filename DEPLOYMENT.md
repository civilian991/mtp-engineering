# MTP Engineering - Deployment Guide

This guide covers the deployment process for the MTP Engineering website.

## Prerequisites

- Node.js 18+
- Supabase account and project
- Vercel account (recommended) or other hosting platform
- Domain name (mtp.com.sa)
- Email service (Gmail/SMTP)
- Google Analytics account (optional)

## 1. Supabase Setup

### Database Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the database migrations in the SQL editor:

```sql
-- Enable RLS
ALTER DATABASE postgres SET "app.tenant_isolation" = 'on';

-- Create tables (see supabase/migrations/ for complete schema)
-- Tables: careers, projects, news, job_applications, inquiries, company_info, team_members, sectors, services

-- Enable Row Level Security
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read active careers" ON careers FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Admin can manage careers" ON careers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage news" ON news FOR ALL USING (auth.role() = 'authenticated');
```

### Storage Configuration

1. Create storage buckets:
   - `general` - for general file uploads
   - `projects` - for project images
   - `news` - for news images
   - `cvs` - for career application CVs

2. Set up storage policies for public read and authenticated write access.

## 2. Environment Variables

### Production Environment (.env.production)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Application
NEXT_PUBLIC_APP_URL=https://mtp.com.sa
NEXT_PUBLIC_SITE_URL=https://mtp.com.sa
NEXT_PUBLIC_SITE_NAME=MTP Engineering

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@mtp.com.sa
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@mtp.com.sa

# Security
NEXTAUTH_SECRET=generate_random_secret_here
NEXTAUTH_URL=https://mtp.com.sa

# Admin
ADMIN_INITIAL_EMAIL=admin@mtp.com.sa
ADMIN_INITIAL_PASSWORD=secure_password_here
```

## 3. Vercel Deployment

### Initial Setup

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `.next`

### Domain Configuration

1. Add your custom domain (mtp.com.sa) in Vercel
2. Configure DNS records:
   - A record: 76.76.19.61
   - CNAME: cname.vercel-dns.com

### Build Settings

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "devCommand": "npm run dev"
}
```

## 4. Database Seeding

After deployment, seed the database with initial content:

### Admin User
```sql
-- Create admin user in Supabase Auth dashboard
-- Email: admin@mtp.com.sa
-- Password: as configured in environment
```

### Company Information
```sql
INSERT INTO company_info (key, value_en, value_ar) VALUES
('company_name', 'MTP Engineering', 'إم تي بي للهندسة'),
('company_description', 'Leading engineering consultancy in Saudi Arabia', 'شركة استشارات هندسية رائدة في المملكة العربية السعودية'),
('contact_email', 'info@mtp.com.sa', 'info@mtp.com.sa'),
('contact_phone', '+966 11 123 4567', '٠٠٩٦٦ ١١ ١٢٣ ٤٥٦٧');
```

### Sectors
```sql
INSERT INTO sectors (name_en, name_ar, description_en, description_ar, is_active) VALUES
('Infrastructure', 'البنية التحتية', 'Roads, bridges, and urban development projects', 'مشاريع الطرق والجسور والتطوير العمراني', true),
('Government', 'الحكومي', 'Government buildings and public facilities', 'المباني الحكومية والمرافق العامة', true),
('Healthcare', 'الرعاية الصحية', 'Hospitals and medical facilities', 'المستشفيات والمرافق الطبية', true),
('Commercial', 'التجاري', 'Shopping centers and office buildings', 'المراكز التجارية والمباني المكتبية', true),
('Industrial', 'الصناعي', 'Manufacturing facilities and warehouses', 'المرافق الصناعية والمستودعات', true),
('Utilities', 'المرافق', 'Water, power, and telecommunications', 'المياه والطاقة والاتصالات', true),
('Oil & Gas', 'النفط والغاز', 'Energy sector projects', 'مشاريع قطاع الطاقة', true);
```

## 5. SSL/HTTPS Setup

Vercel automatically provides SSL certificates. Ensure:
- Force HTTPS redirects are enabled
- HSTS headers are configured
- Security headers are properly set

## 6. Performance Optimization

### Caching
- Static assets: 1 year cache
- API routes: appropriate cache headers
- ISR for dynamic content

### CDN
- Images optimized with Next.js Image component
- Static assets served from Vercel CDN

### Monitoring
- Error monitoring with built-in error tracking
- Performance monitoring via Vercel Analytics
- Google Analytics for user behavior

## 7. Post-Deployment Checklist

### Functionality Testing
- [ ] Website loads correctly
- [ ] All pages render properly
- [ ] Contact form submits successfully
- [ ] Career applications work
- [ ] Admin dashboard accessible
- [ ] File uploads working
- [ ] Search functionality operational

### SEO Testing
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Meta tags present
- [ ] Google Analytics tracking
- [ ] Page load speeds acceptable

### Security Testing
- [ ] HTTPS working
- [ ] Rate limiting active
- [ ] Admin area protected
- [ ] File upload restrictions working
- [ ] SQL injection protection verified

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] Lighthouse scores > 90
- [ ] Mobile responsiveness verified

## 8. Ongoing Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies monthly
- Review and update content
- Check and renew SSL certificates
- Monitor performance metrics

### Backup Strategy
- Supabase automatic backups enabled
- Regular database exports
- Code repository maintained
- Environment variables documented

### Updates
- Monitor for security updates
- Test updates in staging environment
- Deploy updates during low-traffic periods
- Monitor post-deployment metrics

## 9. Troubleshooting

### Common Issues

**Build Failures**
- Check environment variables
- Verify dependencies
- Review build logs

**Database Connection Issues**
- Verify Supabase configuration
- Check RLS policies
- Review connection strings

**Performance Issues**
- Check image optimization
- Review caching headers
- Monitor database queries

### Support Contacts
- Vercel Support: vercel.com/support
- Supabase Support: supabase.com/support
- Domain Support: Your domain registrar

## 10. Security Considerations

### Regular Security Tasks
- Update dependencies
- Review user permissions
- Monitor access logs
- Check for unusual activity
- Update passwords regularly

### Security Headers
Ensure these headers are configured:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

---

This deployment guide ensures a secure, performant, and maintainable deployment of the MTP Engineering website.