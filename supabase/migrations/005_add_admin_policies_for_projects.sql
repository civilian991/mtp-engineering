-- Add RLS policies for admin operations on projects table
-- This fixes the "Failed to delete project" error

-- Allow authenticated admins to insert projects
CREATE POLICY "Admins can insert projects" ON projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );

-- Allow authenticated admins to update projects
CREATE POLICY "Admins can update projects" ON projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );

-- Allow authenticated admins to delete projects
CREATE POLICY "Admins can delete projects" ON projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );
