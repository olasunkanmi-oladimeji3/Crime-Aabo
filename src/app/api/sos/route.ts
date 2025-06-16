import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, latitude, longitude, alertType, message } = body

    // Create SOS alert
    const { data, error } = await supabase
      .from("sos_alerts")
      .insert([
        {
          user_id: userId,
          latitude,
          longitude,
          alert_type: alertType,
          message,
          status: "active",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("SOS alert error:", error)
      return NextResponse.json({ error: "Failed to create SOS alert" }, { status: 400 })
    }

    // Find nearby vigilantes and authorities
    const { data: nearbyResponders } = await supabase
      .from("users")
      .select("*")
      .in("user_type", ["vigilante", "authority"])
      .eq("is_active", true)
      .not("latitude", "is", null)
      .not("longitude", "is", null)

    // TODO: Implement real-time notifications to nearby responders
    // This would typically use Supabase real-time subscriptions or push notifications

    return NextResponse.json({
      message: "SOS alert created successfully",
      alertId: data.id,
      nearbyResponders: nearbyResponders?.length || 0,
    })
  } catch (error) {
    console.error("SOS alert error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
