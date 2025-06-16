import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { crimeReportId, vigilanteId, status, notes } = body

    // Update vigilante response
    const { data, error } = await supabase
      .from("vigilante_responses")
      .update({
        status,
        notes,
        ...(status === "accepted" && { response_time: new Date().toISOString() }),
        ...(status === "arrived" && { arrival_time: new Date().toISOString() }),
        ...(status === "completed" && { completion_time: new Date().toISOString() }),
        updated_at: new Date().toISOString(),
      })
      .eq("crime_report_id", crimeReportId)
      .eq("vigilante_id", vigilanteId)
      .select()
      .single()

    if (error) {
      console.error("Vigilante response error:", error)
      return NextResponse.json({ error: "Failed to update response" }, { status: 400 })
    }

    // Update crime report status if vigilante has arrived or completed
    if (status === "arrived") {
      await supabase.from("crime_reports").update({ status: "investigating" }).eq("id", crimeReportId)
    } else if (status === "completed") {
      await supabase.from("crime_reports").update({ status: "resolved" }).eq("id", crimeReportId)
    }

    return NextResponse.json({
      message: "Response updated successfully",
      response: data,
    })
  } catch (error) {
    console.error("Vigilante response error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
