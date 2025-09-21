-- RPC Functions for MTP Engineering
-- Migration: 004_rpc_functions
-- Date: 2025-09-21
-- Description: Create remote procedure calls for common operations

-- ============================================
-- INCREMENT PROJECT VIEWS
-- ============================================
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE projects
  SET views_count = views_count + 1
  WHERE id = project_id;
END;
$$;

-- ============================================
-- INCREMENT BLOG POST VIEWS
-- ============================================
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_posts
  SET views_count = views_count + 1
  WHERE id = post_id;
END;
$$;

-- ============================================
-- INCREMENT DOWNLOAD COUNT
-- ============================================
CREATE OR REPLACE FUNCTION increment_download_count(download_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE downloads
  SET download_count = download_count + 1
  WHERE id = download_id;
END;
$$;

-- ============================================
-- INCREMENT JOB APPLICATIONS COUNT
-- ============================================
CREATE OR REPLACE FUNCTION increment_applications_count(career_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE careers
  SET applications_count = applications_count + 1
  WHERE id = career_id;
END;
$$;

-- ============================================
-- UPDATE SECTOR PROJECT COUNT
-- ============================================
CREATE OR REPLACE FUNCTION update_sector_project_count()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE sectors
    SET project_count = (
      SELECT COUNT(*)
      FROM project_sectors
      WHERE sector_id = NEW.sector_id
    )
    WHERE id = NEW.sector_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE sectors
    SET project_count = (
      SELECT COUNT(*)
      FROM project_sectors
      WHERE sector_id = OLD.sector_id
    )
    WHERE id = OLD.sector_id;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for automatic sector project count update
CREATE TRIGGER update_sector_project_count_trigger
AFTER INSERT OR DELETE ON project_sectors
FOR EACH ROW
EXECUTE FUNCTION update_sector_project_count();

-- ============================================
-- SEARCH PROJECTS FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION search_projects(
  search_term TEXT,
  filter_year INTEGER DEFAULT NULL,
  filter_status TEXT DEFAULT NULL,
  filter_sector UUID DEFAULT NULL,
  filter_service UUID DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  slug VARCHAR,
  name_en VARCHAR,
  name_ar VARCHAR,
  client_name_en VARCHAR,
  client_name_ar VARCHAR,
  description_en TEXT,
  description_ar TEXT,
  year INTEGER,
  status VARCHAR,
  featured_image TEXT,
  is_featured BOOLEAN,
  relevance REAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.slug,
    p.name_en,
    p.name_ar,
    p.client_name_en,
    p.client_name_ar,
    p.description_en,
    p.description_ar,
    p.year,
    p.status,
    p.featured_image,
    p.is_featured,
    ts_rank(
      to_tsvector('english', COALESCE(p.name_en, '') || ' ' || COALESCE(p.description_en, '') || ' ' || COALESCE(p.client_name_en, '')),
      plainto_tsquery('english', search_term)
    ) AS relevance
  FROM projects p
  WHERE p.is_published = true
    AND (search_term IS NULL OR search_term = '' OR
      to_tsvector('english', COALESCE(p.name_en, '') || ' ' || COALESCE(p.description_en, '') || ' ' || COALESCE(p.client_name_en, ''))
      @@ plainto_tsquery('english', search_term)
      OR p.name_ar ILIKE '%' || search_term || '%'
      OR p.description_ar ILIKE '%' || search_term || '%'
      OR p.client_name_ar ILIKE '%' || search_term || '%'
    )
    AND (filter_year IS NULL OR p.year = filter_year)
    AND (filter_status IS NULL OR p.status = filter_status)
    AND (filter_sector IS NULL OR EXISTS (
      SELECT 1 FROM project_sectors ps WHERE ps.project_id = p.id AND ps.sector_id = filter_sector
    ))
    AND (filter_service IS NULL OR EXISTS (
      SELECT 1 FROM project_services psv WHERE psv.project_id = p.id AND psv.service_id = filter_service
    ))
  ORDER BY
    CASE WHEN search_term IS NOT NULL AND search_term != '' THEN relevance ELSE 0 END DESC,
    p.is_featured DESC,
    p.year DESC,
    p.sort_order
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- ============================================
-- GET PROJECT STATISTICS
-- ============================================
CREATE OR REPLACE FUNCTION get_project_statistics()
RETURNS TABLE (
  total_projects BIGINT,
  completed_projects BIGINT,
  ongoing_projects BIGINT,
  total_value NUMERIC,
  total_area NUMERIC,
  total_clients BIGINT,
  years_active BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_projects,
    COUNT(CASE WHEN status = 'completed' THEN 1 END)::BIGINT AS completed_projects,
    COUNT(CASE WHEN status = 'ongoing' THEN 1 END)::BIGINT AS ongoing_projects,
    SUM(project_value)::NUMERIC AS total_value,
    SUM(area_sqm)::NUMERIC AS total_area,
    COUNT(DISTINCT client_name_en)::BIGINT AS total_clients,
    (MAX(year) - MIN(year))::BIGINT AS years_active
  FROM projects
  WHERE is_published = true;
END;
$$;