export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_login_attempts: {
        Row: {
          attempted_at: string | null
          email: string
          id: string
          ip_address: string | null
          success: boolean | null
          user_agent: string | null
        }
        Insert: {
          attempted_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Update: {
          attempted_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          password_hash: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          password_hash: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          password_hash?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      careers: {
        Row: {
          benefits_ar: string | null
          benefits_en: string | null
          closing_date: string | null
          created_at: string | null
          department_ar: string | null
          department_en: string | null
          description_ar: string | null
          description_en: string | null
          employment_type: string | null
          experience_level: string | null
          id: string
          is_active: boolean | null
          location_ar: string | null
          location_en: string | null
          posted_date: string | null
          requirements_ar: string | null
          requirements_en: string | null
          salary_range_max: number | null
          salary_range_min: number | null
          slug: string
          title_ar: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          benefits_ar?: string | null
          benefits_en?: string | null
          closing_date?: string | null
          created_at?: string | null
          department_ar?: string | null
          department_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location_ar?: string | null
          location_en?: string | null
          posted_date?: string | null
          requirements_ar?: string | null
          requirements_en?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          slug: string
          title_ar: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          benefits_ar?: string | null
          benefits_en?: string | null
          closing_date?: string | null
          created_at?: string | null
          department_ar?: string | null
          department_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location_ar?: string | null
          location_en?: string | null
          posted_date?: string | null
          requirements_ar?: string | null
          requirements_en?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          slug?: string
          title_ar?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      company_info: {
        Row: {
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          value_ar: string | null
          value_en: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value_ar?: string | null
          value_en?: string | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          inquiry_type: string | null
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          inquiry_type?: string | null
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          availability: string | null
          career_id: string
          cover_letter: string | null
          created_at: string | null
          current_position: string | null
          cv_url: string | null
          education_level: string | null
          email: string
          expected_salary: number | null
          full_name: string
          id: string
          linkedin_url: string | null
          nationality: string | null
          notes: string | null
          phone: string | null
          portfolio_url: string | null
          status: string | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          career_id: string
          cover_letter?: string | null
          created_at?: string | null
          current_position?: string | null
          cv_url?: string | null
          education_level?: string | null
          email: string
          expected_salary?: number | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          status?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          career_id?: string
          cover_letter?: string | null
          created_at?: string | null
          current_position?: string | null
          cv_url?: string | null
          education_level?: string | null
          email?: string
          expected_salary?: number | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          status?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author: string | null
          content_ar: string | null
          content_en: string | null
          created_at: string | null
          excerpt_ar: string | null
          excerpt_en: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_date: string | null
          slug: string
          tags: Json | null
          title_ar: string
          title_en: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author?: string | null
          content_ar?: string | null
          content_en?: string | null
          created_at?: string | null
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_date?: string | null
          slug: string
          tags?: Json | null
          title_ar: string
          title_en: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string | null
          content_ar?: string | null
          content_en?: string | null
          created_at?: string | null
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_date?: string | null
          slug?: string
          tags?: Json | null
          title_ar?: string
          title_en?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          caption_ar: string | null
          caption_en: string | null
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          project_id: string
          sort_order: number | null
        }
        Insert: {
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          project_id: string
          sort_order?: number | null
        }
        Update: {
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          project_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_sectors: {
        Row: {
          project_id: string
          sector_id: string
        }
        Insert: {
          project_id: string
          sector_id: string
        }
        Update: {
          project_id?: string
          sector_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_sectors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_sectors_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      project_services: {
        Row: {
          project_id: string
          service_id: string
        }
        Insert: {
          project_id: string
          service_id: string
        }
        Update: {
          project_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_services_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          city: string | null
          client_name: string | null
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          end_date: string | null
          id: string
          is_featured: boolean | null
          is_legacy: boolean | null
          location_ar: string | null
          location_en: string | null
          meta_description_ar: string | null
          meta_description_en: string | null
          name_ar: string
          name_en: string
          project_value: number | null
          slug: string
          sort_order: number | null
          start_date: string | null
          status: string | null
          thumbnail_url: string | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          city?: string | null
          client_name?: string | null
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean | null
          is_legacy?: boolean | null
          location_ar?: string | null
          location_en?: string | null
          meta_description_ar?: string | null
          meta_description_en?: string | null
          name_ar: string
          name_en: string
          project_value?: number | null
          slug: string
          sort_order?: number | null
          start_date?: string | null
          status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          city?: string | null
          client_name?: string | null
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          end_date?: string | null
          id?: string
          is_featured?: boolean | null
          is_legacy?: boolean | null
          location_ar?: string | null
          location_en?: string | null
          meta_description_ar?: string | null
          meta_description_en?: string | null
          name_ar?: string
          name_en?: string
          project_value?: number | null
          slug?: string
          sort_order?: number | null
          start_date?: string | null
          status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      sectors: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          icon: string | null
          id: string
          name_ar: string
          name_en: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          name_ar: string
          name_en: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio_ar: string | null
          bio_en: string | null
          created_at: string | null
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name_ar: string
          name_en: string
          position_ar: string | null
          position_en: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          bio_ar?: string | null
          bio_en?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name_ar: string
          name_en: string
          position_ar?: string | null
          position_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          bio_ar?: string | null
          bio_en?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name_ar?: string
          name_en?: string
          position_ar?: string | null
          position_en?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_career_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_project_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const