
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Registry {
  id: string
  user_id: string
  title: string
  event_type: string
  event_date: string
  message?: string
  is_active: boolean
  created_at: string
  updated_at: string
  items?: RegistryItem[]
  profiles?: Profile
}

export interface RegistryItem {
  id: string
  registry_id: string
  name: string
  description?: string
  quantity: number
  image_url?: string
  created_at: string
  updated_at: string
  reservations?: Reservation[]
}

export interface Reservation {
  id: string
  registry_item_id: string
  guest_name: string
  guest_email?: string
  guest_phone?: string
  quantity_reserved: number
  message?: string
  created_at: string
}
