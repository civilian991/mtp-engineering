// Database Types for MTP Engineering
// Generated from Phase 4 Database Architecture

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================
// Core Tables
// ============================================

export interface Service {
  id: string
  slug: string
  name_en: string
  name_ar: string
  description_en: string
  description_ar: string
  short_description_en?: string | null
  short_description_ar?: string | null
  icon?: string | null
  features_en?: Json | null
  features_ar?: Json | null
  image_url?: string | null
  sort_order: number
  is_active: boolean
  meta_title_en?: string | null
  meta_title_ar?: string | null
  meta_description_en?: string | null
  meta_description_ar?: string | null
  created_at: string
  updated_at: string
  created_by?: string | null
  updated_by?: string | null
}

export interface Sector {
  id: string
  slug: string
  name_en: string
  name_ar: string
  description_en?: string | null
  description_ar?: string | null
  icon?: string | null
  image_url?: string | null
  project_count: number
  sort_order: number
  is_active: boolean
  meta_title_en?: string | null
  meta_title_ar?: string | null
  meta_description_en?: string | null
  meta_description_ar?: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  slug: string
  project_code?: string | null
  name_en: string
  name_ar: string
  client_name_en: string
  client_name_ar: string
  description_en: string
  description_ar: string
  scope_en?: string | null
  scope_ar?: string | null
  challenges_en?: string | null
  challenges_ar?: string | null
  solutions_en?: string | null
  solutions_ar?: string | null
  outcomes_en?: string | null
  outcomes_ar?: string | null

  // Location
  city_en?: string | null
  city_ar?: string | null
  region_en?: string | null
  region_ar?: string | null
  country: string
  coordinates?: Json | null

  // Dates and Duration
  start_date?: string | null
  end_date?: string | null
  duration_months?: number | null
  year: number

  // Project Details
  project_value?: number | null
  currency: string
  area_sqm?: number | null
  status?: 'planning' | 'ongoing' | 'completed' | 'on-hold' | null

  // Legacy Flag
  is_legacy: boolean
  legacy_source?: string | null

  // Metrics
  team_size?: number | null
  completion_percentage: number

  // Media
  featured_image?: string | null
  thumbnail_image?: string | null
  hero_image?: string | null
  video_url?: string | null

  // Visibility
  is_featured: boolean
  is_published: boolean
  show_in_portfolio: boolean
  sort_order: number
  views_count: number

  // SEO
  meta_title_en?: string | null
  meta_title_ar?: string | null
  meta_description_en?: string | null
  meta_description_ar?: string | null
  keywords?: Json | null

  // Timestamps
  created_at: string
  updated_at: string
  published_at?: string | null
  created_by?: string | null
  updated_by?: string | null
}

// ============================================
// Junction Tables
// ============================================

export interface ProjectService {
  id: string
  project_id: string
  service_id: string
  is_primary: boolean
  created_at: string
}

export interface ProjectSector {
  id: string
  project_id: string
  sector_id: string
  is_primary: boolean
  created_at: string
}

// ============================================
// Media Tables
// ============================================

export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  thumbnail_url?: string | null
  title_en?: string | null
  title_ar?: string | null
  caption_en?: string | null
  caption_ar?: string | null
  alt_text_en?: string | null
  alt_text_ar?: string | null
  image_type: string
  sort_order: number
  is_primary: boolean
  width?: number | null
  height?: number | null
  file_size?: number | null
  mime_type?: string | null
  created_at: string
  uploaded_by?: string | null
}

export interface ProjectDocument {
  id: string
  project_id: string
  document_url: string
  filename: string
  title_en?: string | null
  title_ar?: string | null
  description_en?: string | null
  description_ar?: string | null
  document_type?: string | null
  file_size?: number | null
  mime_type?: string | null
  is_public: boolean
  download_count: number
  created_at: string
  uploaded_by?: string | null
}

// ============================================
// Team Tables
// ============================================

export interface TeamMember {
  id: string
  employee_id?: string | null
  name_en: string
  name_ar: string
  position_en: string
  position_ar: string
  department_en?: string | null
  department_ar?: string | null
  bio_en?: string | null
  bio_ar?: string | null
  email?: string | null
  phone?: string | null
  linkedin_url?: string | null
  photo_url?: string | null
  years_experience?: number | null
  specializations?: Json | null
  certifications?: Json | null
  sort_order: number
  is_active: boolean
  is_management: boolean
  show_on_website: boolean
  created_at: string
  updated_at: string
}

export interface ProjectTeam {
  id: string
  project_id: string
  team_member_id: string
  role?: string | null
  responsibilities?: string | null
  start_date?: string | null
  end_date?: string | null
  created_at: string
}

// ============================================
// Career Tables
// ============================================

export interface Career {
  id: string
  job_code: string
  title_en: string
  title_ar: string
  department_en: string
  department_ar: string
  location_en?: string | null
  location_ar?: string | null
  employment_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | null
  experience_level?: 'entry' | 'junior' | 'mid' | 'senior' | 'executive' | null
  description_en: string
  description_ar: string
  requirements_en?: Json | null
  requirements_ar?: Json | null
  responsibilities_en?: Json | null
  responsibilities_ar?: Json | null
  benefits_en?: Json | null
  benefits_ar?: Json | null
  salary_min?: number | null
  salary_max?: number | null
  currency: string
  deadline?: string | null
  is_urgent: boolean
  is_active: boolean
  positions_available: number
  applications_count: number
  created_at: string
  updated_at: string
  published_at?: string | null
}

export interface JobApplication {
  id: string
  career_id: string
  application_number: string

  // Applicant Information
  first_name: string
  last_name: string
  email: string
  phone: string
  nationality?: string | null
  residence_country?: string | null
  city?: string | null

  // Professional Information
  current_position?: string | null
  current_company?: string | null
  years_experience?: number | null
  expected_salary?: number | null
  notice_period_days?: number | null
  available_date?: string | null

  // Documents
  cv_url: string
  cover_letter_url?: string | null
  portfolio_url?: string | null

  // Additional Information
  linkedin_profile?: string | null
  github_profile?: string | null
  additional_info?: string | null
  how_heard?: string | null

  // Status Tracking
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  rating?: number | null
  notes?: string | null

  // Timestamps
  created_at: string
  reviewed_at?: string | null
  interviewed_at?: string | null
  decided_at?: string | null
  reviewed_by?: string | null
}

// ============================================
// Contact Tables
// ============================================

export interface Inquiry {
  id: string
  inquiry_type?: 'general' | 'project' | 'service' | 'career' | 'partnership' | null

  // Contact Information
  name: string
  email: string
  phone?: string | null
  company?: string | null
  position?: string | null
  country?: string | null
  city?: string | null

  // Inquiry Details
  subject?: string | null
  message: string
  preferred_contact: string
  preferred_time?: string | null

  // References
  service_id?: string | null
  project_id?: string | null

  // Status
  status: 'new' | 'in-progress' | 'responded' | 'closed' | 'spam'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assigned_to?: string | null

  // Response
  response_text?: string | null
  responded_at?: string | null
  responded_by?: string | null

  // Metadata
  source?: string | null
  ip_address?: string | null
  user_agent?: string | null
  created_at: string
  updated_at: string
}

// ============================================
// Blog Tables
// ============================================

export interface BlogPost {
  id: string
  slug: string
  title_en: string
  title_ar: string
  excerpt_en?: string | null
  excerpt_ar?: string | null
  content_en: string
  content_ar: string
  featured_image?: string | null
  author_id?: string | null
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  views_count: number
  reading_time_minutes?: number | null
  meta_title_en?: string | null
  meta_title_ar?: string | null
  meta_description_en?: string | null
  meta_description_ar?: string | null
  tags?: Json | null
  created_at: string
  updated_at: string
  published_at?: string | null
}

export interface BlogCategory {
  id: string
  slug: string
  name_en: string
  name_ar: string
  description_en?: string | null
  description_ar?: string | null
  parent_id?: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlogCategoryPost {
  id: string
  post_id: string
  category_id: string
  created_at: string
}

// ============================================
// Utility Tables
// ============================================

export interface Download {
  id: string
  title_en: string
  title_ar: string
  description_en?: string | null
  description_ar?: string | null
  file_url: string
  file_type?: string | null
  file_size?: number | null
  category?: string | null
  download_count: number
  requires_registration: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value?: Json | null
  category?: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string | null
  language_preference: string
  is_active: boolean
  subscribed_at: string
  unsubscribed_at?: string | null
  confirmation_token?: string | null
  confirmed_at?: string | null
  ip_address?: string | null
  source?: string | null
  tags?: Json | null
}

// ============================================
// Database Schema Type
// ============================================

export interface Database {
  public: {
    Tables: {
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Service>
      }
      sectors: {
        Row: Sector
        Insert: Omit<Sector, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Sector>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Project>
      }
      project_services: {
        Row: ProjectService
        Insert: Omit<ProjectService, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ProjectService>
      }
      project_sectors: {
        Row: ProjectSector
        Insert: Omit<ProjectSector, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ProjectSector>
      }
      project_images: {
        Row: ProjectImage
        Insert: Omit<ProjectImage, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ProjectImage>
      }
      project_documents: {
        Row: ProjectDocument
        Insert: Omit<ProjectDocument, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ProjectDocument>
      }
      team_members: {
        Row: TeamMember
        Insert: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<TeamMember>
      }
      project_team: {
        Row: ProjectTeam
        Insert: Omit<ProjectTeam, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ProjectTeam>
      }
      careers: {
        Row: Career
        Insert: Omit<Career, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Career>
      }
      job_applications: {
        Row: JobApplication
        Insert: Omit<JobApplication, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<JobApplication>
      }
      inquiries: {
        Row: Inquiry
        Insert: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Inquiry>
      }
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<BlogPost>
      }
      blog_categories: {
        Row: BlogCategory
        Insert: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<BlogCategory>
      }
      blog_categories_posts: {
        Row: BlogCategoryPost
        Insert: Omit<BlogCategoryPost, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<BlogCategoryPost>
      }
      downloads: {
        Row: Download
        Insert: Omit<Download, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Download>
      }
      site_settings: {
        Row: SiteSetting
        Insert: Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<SiteSetting>
      }
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: Omit<NewsletterSubscriber, 'id' | 'subscribed_at'> & {
          id?: string
          subscribed_at?: string
        }
        Update: Partial<NewsletterSubscriber>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_status: 'planning' | 'ongoing' | 'completed' | 'on-hold'
      employment_type: 'full-time' | 'part-time' | 'contract' | 'internship'
      experience_level: 'entry' | 'junior' | 'mid' | 'senior' | 'executive'
      inquiry_type: 'general' | 'project' | 'service' | 'career' | 'partnership'
      inquiry_status: 'new' | 'in-progress' | 'responded' | 'closed' | 'spam'
      priority: 'low' | 'normal' | 'high' | 'urgent'
      application_status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
      blog_status: 'draft' | 'published' | 'archived'
    }
  }
}