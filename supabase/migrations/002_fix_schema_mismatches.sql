-- Fix database schema mismatches

-- 1. Update projects table to match schema definition
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS slug VARCHAR(500) UNIQUE,
  ADD COLUMN IF NOT EXISTS city VARCHAR(100),
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS end_date DATE,
  ADD COLUMN IF NOT EXISTS project_value DECIMAL(15, 2),
  ADD COLUMN IF NOT EXISTS is_legacy BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS meta_description_en TEXT,
  ADD COLUMN IF NOT EXISTS meta_description_ar TEXT,
  -- Rename existing columns to match schema
  ALTER COLUMN client_en TYPE VARCHAR(500),
  ALTER COLUMN client_ar TYPE VARCHAR(500),
  ALTER COLUMN location_en TYPE VARCHAR(255),
  ALTER COLUMN location_ar TYPE VARCHAR(255),
  -- Rename value column to project_value if it exists
  ALTER COLUMN value TYPE DECIMAL(15, 2);

-- Generate slugs for existing projects
UPDATE projects
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(name_en, '[^a-zA-Z0-9]+', '-', 'g'), '^-|-$', '', 'g'))
WHERE slug IS NULL;

-- Make slug NOT NULL after populating
ALTER TABLE projects ALTER COLUMN slug SET NOT NULL;

-- 2. Ensure project_images table exists (already in schema.sql but might be missing)
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_en VARCHAR(500),
  caption_ar VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Ensure project_services table exists
CREATE TABLE IF NOT EXISTS project_services (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- 4. Ensure project_sectors table exists
CREATE TABLE IF NOT EXISTS project_sectors (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, sector_id)
);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_is_legacy ON projects(is_legacy);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_services_project_id ON project_services(project_id);
CREATE INDEX IF NOT EXISTS idx_project_services_service_id ON project_services(service_id);
CREATE INDEX IF NOT EXISTS idx_project_sectors_project_id ON project_sectors(project_id);
CREATE INDEX IF NOT EXISTS idx_project_sectors_sector_id ON project_sectors(sector_id);

-- 6. Add missing columns to other tables
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

ALTER TABLE sectors
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Generate slugs for services
UPDATE services
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(name_en, '[^a-zA-Z0-9]+', '-', 'g'), '^-|-$', '', 'g'))
WHERE slug IS NULL;

-- Generate slugs for sectors
UPDATE sectors
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(name_en, '[^a-zA-Z0-9]+', '-', 'g'), '^-|-$', '', 'g'))
WHERE slug IS NULL;

-- 7. Create RPC functions for common operations
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- 8. Add views_count column if needed
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- 9. Create project_documents table for future use
CREATE TABLE IF NOT EXISTS project_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  document_url TEXT NOT NULL,
  document_name VARCHAR(255),
  document_type VARCHAR(50),
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_documents_project_id ON project_documents(project_id);