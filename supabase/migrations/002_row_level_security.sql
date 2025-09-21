-- MTP Engineering Row Level Security Policies
-- Migration: 002_row_level_security
-- Date: 2025-09-21
-- Description: Set up RLS policies for all tables

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES
-- ============================================

-- Services - Public read for active services
CREATE POLICY "Services are viewable by everyone" ON services
    FOR SELECT USING (is_active = true);

-- Sectors - Public read for active sectors
CREATE POLICY "Sectors are viewable by everyone" ON sectors
    FOR SELECT USING (is_active = true);

-- Projects - Public read for published projects
CREATE POLICY "Published projects are viewable by everyone" ON projects
    FOR SELECT USING (is_published = true);

-- Project Services - Public read for published projects
CREATE POLICY "Project services are viewable for published projects" ON project_services
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_services.project_id
            AND projects.is_published = true
        )
    );

-- Project Sectors - Public read for published projects
CREATE POLICY "Project sectors are viewable for published projects" ON project_sectors
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_sectors.project_id
            AND projects.is_published = true
        )
    );

-- Project Images - Public read for published projects
CREATE POLICY "Project images are viewable for published projects" ON project_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_images.project_id
            AND projects.is_published = true
        )
    );

-- Project Documents - Public read for public documents of published projects
CREATE POLICY "Public project documents are viewable" ON project_documents
    FOR SELECT USING (
        is_public = true AND
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_documents.project_id
            AND projects.is_published = true
        )
    );

-- Team Members - Public read for active members shown on website
CREATE POLICY "Active team members are viewable" ON team_members
    FOR SELECT USING (is_active = true AND show_on_website = true);

-- Project Team - Public read for published projects
CREATE POLICY "Project team is viewable for published projects" ON project_team
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_team.project_id
            AND projects.is_published = true
        )
    );

-- Careers - Public read for active job postings
CREATE POLICY "Active careers are viewable by everyone" ON careers
    FOR SELECT USING (is_active = true);

-- Blog Posts - Public read for published posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Blog Categories - Public read for active categories
CREATE POLICY "Active blog categories are viewable by everyone" ON blog_categories
    FOR SELECT USING (is_active = true);

-- Blog Categories Posts - Public read for published posts
CREATE POLICY "Blog category relations are viewable for published posts" ON blog_categories_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM blog_posts
            WHERE blog_posts.id = blog_categories_posts.post_id
            AND blog_posts.status = 'published'
        )
    );

-- Downloads - Public read for active downloads
CREATE POLICY "Active downloads are viewable by everyone" ON downloads
    FOR SELECT USING (is_active = true);

-- Site Settings - Public read for public settings
CREATE POLICY "Public site settings are viewable by everyone" ON site_settings
    FOR SELECT USING (is_public = true);

-- ============================================
-- PUBLIC INSERT POLICIES
-- ============================================

-- Job Applications - Allow public to submit applications
CREATE POLICY "Anyone can submit job applications" ON job_applications
    FOR INSERT WITH CHECK (true);

-- Inquiries - Allow public to submit inquiries
CREATE POLICY "Anyone can submit inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Newsletter Subscribers - Allow public to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- ============================================
-- AUTHENTICATED USER POLICIES
-- ============================================

-- Note: These policies will be activated when authentication is implemented
-- For now, they check for authenticated users via auth.uid()

-- Admin full access to services
CREATE POLICY "Authenticated users can manage services" ON services
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to sectors
CREATE POLICY "Authenticated users can manage sectors" ON sectors
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to projects
CREATE POLICY "Authenticated users can manage projects" ON projects
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to project relations
CREATE POLICY "Authenticated users can manage project services" ON project_services
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage project sectors" ON project_sectors
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage project images" ON project_images
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage project documents" ON project_documents
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to team
CREATE POLICY "Authenticated users can manage team members" ON team_members
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage project team" ON project_team
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to careers
CREATE POLICY "Authenticated users can manage careers" ON careers
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin can view all job applications
CREATE POLICY "Authenticated users can view job applications" ON job_applications
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin can update job applications
CREATE POLICY "Authenticated users can update job applications" ON job_applications
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Admin can view and manage all inquiries
CREATE POLICY "Authenticated users can manage inquiries" ON inquiries
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to blog
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage blog categories" ON blog_categories
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage blog category relations" ON blog_categories_posts
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to downloads
CREATE POLICY "Authenticated users can manage downloads" ON downloads
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin full access to settings
CREATE POLICY "Authenticated users can manage all site settings" ON site_settings
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Admin can view and manage newsletter subscribers
CREATE POLICY "Authenticated users can manage newsletter subscribers" ON newsletter_subscribers
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ============================================
-- SPECIAL POLICIES
-- ============================================

-- Newsletter subscribers can update their own subscription
CREATE POLICY "Subscribers can update their own subscription" ON newsletter_subscribers
    FOR UPDATE USING (
        email = current_setting('request.jwt.claims', true)::json->>'email'
    );

-- Increment view counts (no authentication required)
CREATE POLICY "Anyone can increment project view count" ON projects
    FOR UPDATE USING (true)
    WITH CHECK (
        -- Only allow updating view count
        (OLD.views_count IS DISTINCT FROM NEW.views_count) AND
        (OLD.* IS NOT DISTINCT FROM NEW.* EXCEPT FOR views_count, updated_at)
    );

CREATE POLICY "Anyone can increment blog post view count" ON blog_posts
    FOR UPDATE USING (true)
    WITH CHECK (
        -- Only allow updating view count
        (OLD.views_count IS DISTINCT FROM NEW.views_count) AND
        (OLD.* IS NOT DISTINCT FROM NEW.* EXCEPT FOR views_count, updated_at)
    );

-- ============================================
-- SERVICE ROLE BYPASS
-- ============================================
-- Note: Service role (used by backend APIs) bypasses RLS by default
-- No additional policies needed for service role access