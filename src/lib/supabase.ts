import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  user_type: "resident" | "vigilante" | "authority"
  address?: string
  latitude?: number
  longitude?: number
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CrimeReport {
  id: string
  reporter_id?: string
  crime_type: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  location_address: string
  latitude: number
  longitude: number
  incident_time?: string
  is_ongoing: boolean
  is_anonymous: boolean
  status: "reported" | "dispatched" | "investigating" | "resolved" | "closed"
  contact_number?: string
  evidence_urls?: string[]
  created_at: string
  updated_at: string
}

export interface VigilanteResponse {
  id: string
  crime_report_id: string
  vigilante_id: string
  status: "notified" | "accepted" | "en_route" | "arrived" | "completed" | "declined"
  response_time?: string
  arrival_time?: string
  completion_time?: string
  notes?: string
  rating?: number
  created_at: string
  updated_at: string
}

export interface EmergencyBroadcast {
  id: string
  broadcaster_id: string
  title: string
  message: string
  broadcast_type: "general_alert" | "evacuation" | "lockdown" | "all_clear"
  location_address?: string
  latitude?: number
  longitude?: number
  radius_km: number
  is_active: boolean
  expires_at?: string
  created_at: string
}

export interface SafetyTip {
  id: string
  author_id: string
  title: string
  content: string
  category?: string
  location_specific?: string
  upvotes: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface CrimeHotspot {
  id: string
  location_name?: string
  latitude: number
  longitude: number
  radius_meters: number
  crime_count: number
  risk_level: "low" | "medium" | "high" | "critical"
  primary_crime_types: string[]
  analysis_period_start: string
  analysis_period_end: string
  created_at: string
  updated_at: string
}

export interface SOSAlert {
  id: string
  user_id: string
  latitude: number
  longitude: number
  alert_type: "general" | "medical" | "fire" | "crime" | "accident"
  status: "active" | "responded" | "resolved" | "false_alarm"
  message?: string
  responded_by?: string
  response_time?: string
  created_at: string
  resolved_at?: string
}
