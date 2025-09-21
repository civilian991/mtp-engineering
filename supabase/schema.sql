-- MTP Engineering Database Schema
-- Version: 1.0
-- Date: 2025-09-21

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  icon VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sectors table
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  icon VARCHAR(100),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(500) NOT NULL,
  name_ar VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  client_name VARCHAR(500),
  location_en VARCHAR(255),
  location_ar VARCHAR(255),
  city VARCHAR(100),
  start_date DATE,
  end_date DATE,
  project_value DECIMAL(15, 2),
  status VARCHAR(50) CHECK (status IN ('planned', 'ongoing', 'completed')),
  is_legacy BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  sort_order INT DEFAULT 0,
  meta_description_en TEXT,
  meta_description_ar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project images table
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_en VARCHAR(500),
  caption_ar VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project-Service relationship table (many-to-many)
CREATE TABLE project_services (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- Project-Sector relationship table (many-to-many)
CREATE TABLE project_sectors (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, sector_id)
);

-- Team members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  position_en VARCHAR(255),
  position_ar VARCHAR(255),
  bio_en TEXT,
  bio_ar TEXT,
  image_url TEXT,
  email VARCHAR(255),
  linkedin_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers table
CREATE TABLE careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  department_en VARCHAR(255),
  department_ar VARCHAR(255),
  location_en VARCHAR(255),
  location_ar VARCHAR(255),
  employment_type VARCHAR(50) CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level VARCHAR(50) CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  description_en TEXT,
  description_ar TEXT,
  requirements_en TEXT,
  requirements_ar TEXT,
  benefits_en TEXT,
  benefits_ar TEXT,
  salary_range_min DECIMAL(10, 2),
  salary_range_max DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  posted_date DATE DEFAULT CURRENT_DATE,
  closing_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications table
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  career_id UUID NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  nationality VARCHAR(100),
  current_position VARCHAR(255),
  years_experience INT,
  education_level VARCHAR(100),
  cv_url TEXT,
  cover_letter TEXT,
  linkedin_url VARCHAR(500),
  portfolio_url VARCHAR(500),
  availability VARCHAR(100),
  expected_salary DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries/Contact form submissions table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  inquiry_type VARCHAR(50) CHECK (inquiry_type IN ('general', 'project', 'career', 'partnership', 'media')),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News/Updates table (optional for future use)
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt_en TEXT,
  excerpt_ar TEXT,
  content_en TEXT,
  content_ar TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_date TIMESTAMPTZ,
  author VARCHAR(255),
  tags JSONB,
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_legacy ON projects(is_legacy);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_careers_active ON careers(is_active);
CREATE INDEX idx_careers_slug ON careers(slug);
CREATE INDEX idx_applications_status ON job_applications(status);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_news_published ON news(is_published, published_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON sectors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default services
INSERT INTO services (name_en, name_ar, sort_order) VALUES
  ('Civil Engineering', 'الهندسة المدنية', 1),
  ('Infrastructure Development', 'تطوير البنية التحتية', 2),
  ('Project Management', 'إدارة المشاريع', 3),
  ('Technical Consulting', 'الاستشارات الفنية', 4),
  ('Quality Assurance', 'ضمان الجودة', 5),
  ('Feasibility Studies', 'دراسات الجدوى', 6);

-- Insert default sectors
INSERT INTO sectors (name_en, name_ar, sort_order) VALUES
  ('Government', 'القطاع الحكومي', 1),
  ('Private', 'القطاع الخاص', 2),
  ('Infrastructure', 'البنية التحتية', 3),
  ('Real Estate', 'العقارات', 4),
  ('Industrial', 'الصناعي', 5),
  ('Healthcare', 'الرعاية الصحية', 6),
  ('Education', 'التعليم', 7);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('company_info', '{"phone": "+966 XX XXX XXXX", "email": "info@mtp.com.sa", "address_en": "Riyadh, Saudi Arabia", "address_ar": "الرياض، المملكة العربية السعودية"}', 'Company contact information'),
  ('social_media', '{"linkedin": "", "twitter": "", "instagram": ""}', 'Social media links'),
  ('business_hours', '{"sunday_thursday": "8:00 AM - 5:00 PM", "friday_saturday": "Closed"}', 'Business operating hours');

-- Row Level Security (RLS) Policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public read access for most tables
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON sectors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON careers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON news FOR SELECT USING (is_published = true);

-- Public insert for applications and inquiries
CREATE POLICY "Public can submit applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit inquiries" ON inquiries FOR INSERT WITH CHECK (true);