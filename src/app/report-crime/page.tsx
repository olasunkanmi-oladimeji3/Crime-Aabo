"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, MapPin, AlertTriangle, Upload, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ReportCrimePage() {
  const [formData, setFormData] = useState({
    crimeType: "",
    location: "",
    description: "",
    timeOfIncident: "",
    isOngoing: false,
    isAnonymous: false,
    hasEvidence: false,
    contactNumber: "",
    severity: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<string>("")
  const router = useRouter()

  const crimeTypes = [
    "Theft/Robbery",
    "Assault",
    "Vandalism",
    "Suspicious Activity",
    "Drug Activity",
    "Domestic Violence",
    "Fraud/Scam",
    "Vehicle Crime",
    "Burglary",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(currentLocation);

    // Simulate crime report submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard with success message
    router.push("/dashboard?reported=true")
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          setFormData((prev) => ({
            ...prev,
            location: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          }))
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Report Crime</span>
            </div>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Emergency Mode
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Emergency Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button size="lg" variant="destructive" className="h-16">
            <Phone className="h-6 w-6 mr-2" />
            Call 911 (Emergency)
          </Button>
          <Button size="lg" variant="outline" className="h-16 border-orange-300 text-orange-600">
            <AlertTriangle className="h-6 w-6 mr-2" />
            Activate SOS Mode
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Crime Report Form
            </CardTitle>
            <CardDescription>
              Provide as much detail as possible to help our vigilantes respond effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crime Type */}
              <div className="space-y-2">
                <Label htmlFor="crimeType">Type of Crime *</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, crimeType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent>
                    {crimeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Non-urgent</SelectItem>
                    <SelectItem value="medium">Medium - Requires attention</SelectItem>
                    <SelectItem value="high">High - Urgent response needed</SelectItem>
                    <SelectItem value="critical">Critical - Immediate danger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter address or landmark"
                    required
                  />
                  <Button type="button" variant="outline" onClick={getCurrentLocation}>
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Time of Incident */}
              <div className="space-y-2">
                <Label htmlFor="timeOfIncident">Time of Incident</Label>
                <Input
                  id="timeOfIncident"
                  type="datetime-local"
                  value={formData.timeOfIncident}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeOfIncident: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what happened, who was involved, and any other relevant details..."
                  rows={4}
                  required
                />
              </div>

              {/* Evidence Upload */}
              <div className="space-y-2">
                <Label>Evidence (Photos/Videos)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, MP4 up to 10MB</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number (Optional)</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                  placeholder="Your phone number for follow-up"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOngoing"
                    checked={formData.isOngoing}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isOngoing: checked as boolean }))}
                  />
                  <Label htmlFor="isOngoing" className="text-sm">
                    This crime is currently happening
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAnonymous: checked as boolean }))}
                  />
                  <Label htmlFor="isAnonymous" className="text-sm">
                    Submit this report anonymously
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasEvidence"
                    checked={formData.hasEvidence}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, hasEvidence: checked as boolean }))}
                  />
                  <Label htmlFor="hasEvidence" className="text-sm">
                    I have photo/video evidence
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Report..." : "Submit Crime Report"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-800">Safety Notice</h4>
                <p className="text-sm text-orange-700">
                  If you are in immediate danger, call 911 first. This app is designed to supplement, not replace,
                  emergency services. Vigilantes are community volunteers and response times may vary.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
