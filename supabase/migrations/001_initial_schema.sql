-- MTP Engineering Complete Database Schema
-- Migration: 001_initial_schema
-- Date: 2025-09-21
-- Description: Complete database setup based on Phase 4 architecture

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS downloads CASCADE;
DROP TABLE IF EXISTS blog_categories_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS careers CASCADE;
DROP TABLE IF EXISTS project_team CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS project_documents CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS project_sectors CASCADE;
DROP TABLE IF EXISTS project_services CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS sectors CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- ============================================
-- 1. SERVICES TABLE
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    short_description_en VARCHAR(500),
    short_description_ar VARCHAR(500),
    icon VARCHAR(100),
    features_en JSONB,
    features_ar JSONB,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    meta_title_en VARCHAR(255),
    meta_title_ar VARCHAR(255),
    meta_description_en TEXT,
    meta_description_ar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- Indexes
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_sort ON services(sort_order);

-- ============================================
-- 2. SECTORS TABLE
-- ============================================
CREATE TABLE sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon VARCHAR(100),
    image_url TEXT,
    project_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    meta_title_en VARCHAR(255),
    meta_title_ar VARCHAR(255),
    meta_description_en TEXT,
    meta_description_ar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sectors_slug ON sectors(slug);
CREATE INDEX idx_sectors_active ON sectors(is_active);

-- ============================================
-- 3. PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    project_code VARCHAR(50) UNIQUE,
    name_en VARCHAR(500) NOT NULL,
    name_ar VARCHAR(500) NOT NULL,
    client_name_en VARCHAR(255) NOT NULL,
    client_name_ar VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    scope_en TEXT,
    scope_ar TEXT,
    challenges_en TEXT,
    challenges_ar TEXT,
    solutions_en TEXT,
    solutions_ar TEXT,
    outcomes_en TEXT,
    outcomes_ar TEXT,

    -- Location
    city_en VARCHAR(100),
    city_ar VARCHAR(100),
    region_en VARCHAR(100),
    region_ar VARCHAR(100),
    country VARCHAR(2) DEFAULT 'SA',
    coordinates JSONB,

    -- Dates and Duration
    start_date DATE,
    end_date DATE,
    duration_months INTEGER,
    year INTEGER NOT NULL,

    -- Project Details
    project_value DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'SAR',
    area_sqm DECIMAL(10,2),
    status VARCHAR(50) CHECK (status IN ('planning', 'ongoing', 'completed', 'on-hold')),

    -- Legacy Flag
    is_legacy BOOLEAN DEFAULT false,
    legacy_source VARCHAR(255),

    -- Metrics
    team_size INTEGER,
    completion_percentage INTEGER DEFAULT 0,

    -- Media
    featured_image TEXT,
    thumbnail_image TEXT,
    hero_image TEXT,
    video_url TEXT,

    -- Visibility
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    show_in_portfolio BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,

    -- SEO
    meta_title_en VARCHAR(255),
    meta_title_ar VARCHAR(255),
    meta_description_en TEXT,
    meta_description_ar TEXT,
    keywords JSONB,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    created_by UUID,
    updated_by UUID
);

-- Indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_legacy ON projects(is_legacy);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_city ON projects(city_en, city_ar);
CREATE INDEX idx_projects_client ON projects(client_name_en, client_name_ar);
CREATE INDEX idx_projects_search ON projects USING gin(
    to_tsvector('english', COALESCE(name_en, '') || ' ' || COALESCE(description_en, '') || ' ' || COALESCE(client_name_en, ''))
);

-- ============================================
-- 4. PROJECT_SERVICES (Junction Table)
-- ============================================
CREATE TABLE project_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, service_id)
);

-- Indexes
CREATE INDEX idx_project_services_project ON project_services(project_id);
CREATE INDEX idx_project_services_service ON project_services(service_id);

-- ============================================
-- 5. PROJECT_SECTORS (Junction Table)
-- ============================================
CREATE TABLE project_sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, sector_id)
);

-- Indexes
CREATE INDEX idx_project_sectors_project ON project_sectors(project_id);
CREATE INDEX idx_project_sectors_sector ON project_sectors(sector_id);

-- ============================================
-- 6. PROJECT_IMAGES TABLE
-- ============================================
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    title_en VARCHAR(255),
    title_ar VARCHAR(255),
    caption_en TEXT,
    caption_ar TEXT,
    alt_text_en VARCHAR(255),
    alt_text_ar VARCHAR(255),
    image_type VARCHAR(50) DEFAULT 'gallery',
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    mime_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    uploaded_by UUID
);

-- Indexes
CREATE INDEX idx_project_images_project ON project_images(project_id);
CREATE INDEX idx_project_images_type ON project_images(image_type);
CREATE INDEX idx_project_images_sort ON project_images(sort_order);

-- ============================================
-- 7. PROJECT_DOCUMENTS TABLE
-- ============================================
CREATE TABLE project_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    title_ar VARCHAR(255),
    description_en TEXT,
    description_ar TEXT,
    document_type VARCHAR(50),
    file_size INTEGER,
    mime_type VARCHAR(100),
    is_public BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    uploaded_by UUID
);

-- Indexes
CREATE INDEX idx_project_documents_project ON project_documents(project_id);
CREATE INDEX idx_project_documents_type ON project_documents(document_type);

-- ============================================
-- 8. TEAM_MEMBERS TABLE
-- ============================================
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) UNIQUE,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    position_en VARCHAR(255) NOT NULL,
    position_ar VARCHAR(255) NOT NULL,
    department_en VARCHAR(100),
    department_ar VARCHAR(100),
    bio_en TEXT,
    bio_ar TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url TEXT,
    photo_url TEXT,
    years_experience INTEGER,
    specializations JSONB,
    certifications JSONB,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_management BOOLEAN DEFAULT false,
    show_on_website BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_team_members_management ON team_members(is_management);
CREATE INDEX idx_team_members_department ON team_members(department_en, department_ar);

-- ============================================
-- 9. PROJECT_TEAM (Junction Table)
-- ============================================
CREATE TABLE project_team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
    role VARCHAR(100),
    responsibilities TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, team_member_id)
);

-- Indexes
CREATE INDEX idx_project_team_project ON project_team(project_id);
CREATE INDEX idx_project_team_member ON project_team(team_member_id);

-- ============================================
-- 10. CAREERS TABLE
-- ============================================
CREATE TABLE careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_code VARCHAR(50) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    department_en VARCHAR(100) NOT NULL,
    department_ar VARCHAR(100) NOT NULL,
    location_en VARCHAR(255),
    location_ar VARCHAR(255),
    employment_type VARCHAR(50) CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
    experience_level VARCHAR(50) CHECK (experience_level IN ('entry', 'junior', 'mid', 'senior', 'executive')),
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    requirements_en JSONB,
    requirements_ar JSONB,
    responsibilities_en JSONB,
    responsibilities_ar JSONB,
    benefits_en JSONB,
    benefits_ar JSONB,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'SAR',
    deadline DATE,
    is_urgent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    positions_available INTEGER DEFAULT 1,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_careers_active ON careers(is_active);
CREATE INDEX idx_careers_urgent ON careers(is_urgent);
CREATE INDEX idx_careers_department ON careers(department_en, department_ar);
CREATE INDEX idx_careers_type ON careers(employment_type);
CREATE INDEX idx_careers_level ON careers(experience_level);

-- ============================================
-- 11. JOB_APPLICATIONS TABLE
-- ============================================
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
    application_number VARCHAR(50) UNIQUE NOT NULL,

    -- Applicant Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100),
    residence_country VARCHAR(100),
    city VARCHAR(100),

    -- Professional Information
    current_position VARCHAR(255),
    current_company VARCHAR(255),
    years_experience INTEGER,
    expected_salary DECIMAL(10,2),
    notice_period_days INTEGER,
    available_date DATE,

    -- Documents
    cv_url TEXT NOT NULL,
    cover_letter_url TEXT,
    portfolio_url TEXT,

    -- Additional Information
    linkedin_profile TEXT,
    github_profile TEXT,
    additional_info TEXT,
    how_heard VARCHAR(100),

    -- Status Tracking
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'interview', 'offer', 'rejected', 'withdrawn')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    interviewed_at TIMESTAMPTZ,
    decided_at TIMESTAMPTZ,
    reviewed_by UUID
);

-- Indexes
CREATE INDEX idx_job_applications_career ON job_applications(career_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_email ON job_applications(email);
CREATE INDEX idx_job_applications_created ON job_applications(created_at DESC);

-- ============================================
-- 12. INQUIRIES TABLE
-- ============================================
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_type VARCHAR(50) CHECK (inquiry_type IN ('general', 'project', 'service', 'career', 'partnership')),

    -- Contact Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    position VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100),

    -- Inquiry Details
    subject VARCHAR(500),
    message TEXT NOT NULL,
    preferred_contact VARCHAR(50) DEFAULT 'email',
    preferred_time VARCHAR(100),

    -- References
    service_id UUID REFERENCES services(id),
    project_id UUID REFERENCES projects(id),

    -- Status
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'responded', 'closed', 'spam')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to UUID,

    -- Response
    response_text TEXT,
    responded_at TIMESTAMPTZ,
    responded_by UUID,

    -- Metadata
    source VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_type ON inquiries(inquiry_type);
CREATE INDEX idx_inquiries_priority ON inquiries(priority);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);

-- ============================================
-- 13. BLOG_POSTS TABLE
-- ============================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    title_ar VARCHAR(500) NOT NULL,
    excerpt_en TEXT,
    excerpt_ar TEXT,
    content_en TEXT NOT NULL,
    content_ar TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES team_members(id),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    reading_time_minutes INTEGER,
    meta_title_en VARCHAR(255),
    meta_title_ar VARCHAR(255),
    meta_description_en TEXT,
    meta_description_ar TEXT,
    tags JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC);

-- ============================================
-- 14. BLOG_CATEGORIES TABLE
-- ============================================
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    parent_id UUID REFERENCES blog_categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX idx_blog_categories_parent ON blog_categories(parent_id);
CREATE INDEX idx_blog_categories_active ON blog_categories(is_active);

-- ============================================
-- 15. BLOG_CATEGORIES_POSTS (Junction Table)
-- ============================================
CREATE TABLE blog_categories_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, category_id)
);

-- Indexes
CREATE INDEX idx_blog_categories_posts_post ON blog_categories_posts(post_id);
CREATE INDEX idx_blog_categories_posts_category ON blog_categories_posts(category_id);

-- ============================================
-- 16. DOWNLOADS TABLE
-- ============================================
CREATE TABLE downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    category VARCHAR(100),
    download_count INTEGER DEFAULT 0,
    requires_registration BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_downloads_category ON downloads(category);
CREATE INDEX idx_downloads_active ON downloads(is_active);

-- ============================================
-- 17. SITE_SETTINGS TABLE
-- ============================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    category VARCHAR(100),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_site_settings_key ON site_settings(key);
CREATE INDEX idx_site_settings_category ON site_settings(category);
CREATE INDEX idx_site_settings_public ON site_settings(is_public);

-- ============================================
-- 18. NEWSLETTER_SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    language_preference VARCHAR(2) DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    confirmation_token VARCHAR(255),
    confirmed_at TIMESTAMPTZ,
    ip_address INET,
    source VARCHAR(100),
    tags JSONB
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_newsletter_confirmed ON newsletter_subscribers(confirmed_at);

-- ============================================
-- CREATE UPDATE TIMESTAMP TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON sectors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_downloads_updated_at BEFORE UPDATE ON downloads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();