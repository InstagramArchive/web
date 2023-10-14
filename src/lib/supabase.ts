export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      data_profile_picture: {
        Row: {
          created_at: string
          hd_path: string | null
          id: number
          path: string
          profile_id: number
        }
        Insert: {
          created_at?: string
          hd_path?: string | null
          id?: number
          path: string
          profile_id: number
        }
        Update: {
          created_at?: string
          hd_path?: string | null
          id?: number
          path?: string
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "data_profile_picture_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "instagram_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      instagram_profile: {
        Row: {
          created_at: string
          id: number
          name: string
          sponsor: string | null
          views: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          sponsor?: string | null
          views?: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          sponsor?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "instagram_profile_sponsor_fkey"
            columns: ["sponsor"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
