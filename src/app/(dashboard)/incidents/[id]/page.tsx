"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import {

  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MapPin, Clock, Shield, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CrimeReport } from "@/lib/types"

export default function IncidentDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [incident, setIncident] = useState<CrimeReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIncident = async () => {
      const { data, error } = await supabase
        .from("crime_reports")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching incident:", error)
        setLoading(false)
        return
      }

      setIncident(data)
      setLoading(false)
    }

    fetchIncident()
  }, [id, supabase])

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading...</div>
  }

  if (!incident) {
    return (
      <div className="text-center py-12 text-red-600">
        Incident not found.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card className="shadow-lg border-blue-100 bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <Shield className="text-blue-500 h-5 w-5" />
            {incident.crime_type}
            <Badge
              variant={
                incident.severity === "critical"
                  ? "destructive"
                  : incident.severity === "high"
                  ? "default"
                  : "secondary"
              }
              className="capitalize"
            >
              {incident.severity}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{incident.location_address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{new Date(incident.created_at).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>
              Reported by: {incident.reported_by?.first_name || "Unknown"}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-800">
              <strong>Status:</strong>{" "}
              <Badge variant="outline" className="capitalize">
                {incident.status}
              </Badge>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-800 whitespace-pre-line">
              <strong>Description:</strong> {incident.description || "N/A"}
            </p>
          </div>

          {/* Optional Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button variant="outline">Mark as Resolved</Button>
            <Button variant="default" className="bg-blue-600 text-white">
              Assign Responders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
