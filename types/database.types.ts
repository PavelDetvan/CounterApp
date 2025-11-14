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
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      counters: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          icon: string | null
          color: string
          created_at: string
          updated_at: string
          archived: boolean
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string
          created_at?: string
          updated_at?: string
          archived?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string
          created_at?: string
          updated_at?: string
          archived?: boolean
        }
      }
      counter_entries: {
        Row: {
          id: string
          counter_id: string
          user_id: string
          value: number
          timestamp: string
          note: string | null
          synced: boolean
        }
        Insert: {
          id?: string
          counter_id: string
          user_id: string
          value?: number
          timestamp?: string
          note?: string | null
          synced?: boolean
        }
        Update: {
          id?: string
          counter_id?: string
          user_id?: string
          value?: number
          timestamp?: string
          note?: string | null
          synced?: boolean
        }
      }
    }
  }
}

// Convenience types for working with tables
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Counter = Database['public']['Tables']['counters']['Row']
export type CounterEntry = Database['public']['Tables']['counter_entries']['Row']

export type NewCounter = Database['public']['Tables']['counters']['Insert']
export type NewCounterEntry = Database['public']['Tables']['counter_entries']['Insert']
export type UpdateCounter = Database['public']['Tables']['counters']['Update']
