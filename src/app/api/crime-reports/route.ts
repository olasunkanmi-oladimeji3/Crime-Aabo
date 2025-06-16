import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      reporterId,
      crimeType,
      severity,
      description,
      locationAddress,
      latitude,
      longitude,
      incidentTime,
      isOngoing,
      isAnonymous,
      contactNumber,
      evidenceUrls,
    } = body

    // Insert crime report
    const { data, error } = await supabase
      .from("crime_reports")
      .insert([
        {
          reporter_id: isAnonymous ? null : reporterId,
          crime_type: crimeType,
          severity,
          description,
          location_address: locationAddress,
          latitude,
          longitude,
          incident_time: incidentTime,
          is_ongoing: isOngoing,
          is_anonymous: isAnonymous,
          contact_number: contactNumber,
          evidence_urls: evidenceUrls,
          status: "reported",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Crime report error:", error)
      return NextResponse.json({ error: "Failed to submit crime report" }, { status: 400 })
    }

    // Find nearby vigilantes and notify them
    const { data: nearbyVigilantes } = await supabase
      .from("users")
      .select("*")
      .eq("user_type", "vigilante")
      .eq("is_active", true)
      .not("latitude", "is", null)
      .not("longitude", "is", null)

    // TODO: Implement geospatial query for actual proximity
    // For now, we'll notify all active vigilantes

    if (nearbyVigilantes && nearbyVigilantes.length > 0) {
      const notifications = nearbyVigilantes.map((vigilante) => ({
        crime_report_id: data.id,
        vigilante_id: vigilante.id,
        status: "notified",
      }))

      await supabase.from("vigilante_responses").insert(notifications)
    }

    return NextResponse.json({
      message: "Crime report submitted successfully",
      reportId: data.id,
    })
  } catch (error) {
    console.error("Crime report submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let query = supabase
      .from("crime_reports")
      .select(`
        *,
        reporter:users(first_name, last_name),
        vigilante_responses(
          *,
          vigilante:users(first_name, last_name)
        )
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Fetch crime reports error:", error)
      return NextResponse.json({ error: "Failed to fetch crime reports" }, { status: 400 })
    }

    return NextResponse.json({ reports: data })
  } catch (error) {
    console.error("Fetch crime reports error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
