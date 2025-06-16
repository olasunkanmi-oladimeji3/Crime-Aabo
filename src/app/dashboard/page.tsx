"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, MapPin, AlertTriangle, Users, Phone, Eye, Plus, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeIncidents] = useState([
    {
      id: 1,
      type: "Theft",
      location: "Main Street, Downtown",
      time: "2 minutes ago",
      status: "Active",
      priority: "High",
    },
    {
      id: 2,
      type: "Suspicious Activity",
      location: "Park Avenue",
      time: "15 minutes ago",
      status: "Investigating",
      priority: "Medium",
    },
    {
      id: 3,
      type: "Vandalism",
      location: "School District",
      time: "1 hour ago",
      status: "Resolved",
      priority: "Low",
    },
  ])

  const [nearbyVigilantes] = useState([
    { id: 1, name: "John Smith", distance: "0.3 miles", status: "Available", rating: 4.8 },
    { id: 2, name: "Sarah Johnson", distance: "0.5 miles", status: "On Duty", rating: 4.9 },
    { id: 3, name: "Mike Davis", distance: "0.8 miles", status: "Available", rating: 4.7 },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Crime Aabo</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                  <p className="text-3xl font-bold text-red-600">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Vigilantes</p>
                  <p className="text-3xl font-bold text-green-600">12</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-3xl font-bold text-blue-600">4.2m</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Safety Score</p>
                  <p className="text-3xl font-bold text-purple-600">8.7</p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button size="lg" className="h-16 bg-red-600 hover:bg-red-700" asChild>
            <Link href="/report-crime">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Report Crime
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-16 border-orange-300 text-orange-600 hover:bg-orange-50">
            <Phone className="h-6 w-6 mr-2" />
            SOS Emergency
          </Button>
          <Button size="lg" variant="outline" className="h-16 border-blue-300 text-blue-600 hover:bg-blue-50">
            <Eye className="h-6 w-6 mr-2" />
            Guardian Mode
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
            <TabsTrigger value="map">Crime Map</TabsTrigger>
            <TabsTrigger value="vigilantes">Vigilantes</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Incidents</h2>
              <Button asChild>
                <Link href="/report-crime">
                  <Plus className="h-4 w-4 mr-2" />
                  Report New Incident
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <Card key={incident.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant={
                              incident.priority === "High"
                                ? "destructive"
                                : incident.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {incident.priority}
                          </Badge>
                          <h3 className="font-semibold">{incident.type}</h3>
                          <Badge variant="outline">{incident.status}</Badge>
                        </div>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {incident.location}
                        </p>
                        <p className="text-sm text-gray-500">{incident.time}</p>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crime Hotspot Map</CardTitle>
                <CardDescription>Interactive map showing crime incidents and hotspots in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map will be displayed here</p>
                    <p className="text-sm text-gray-500">Showing crime incidents, hotspots, and vigilante locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vigilantes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Nearby Vigilantes</h2>
              <Button variant="outline">Join as Vigilante</Button>
            </div>

            <div className="grid gap-4">
              {nearbyVigilantes.map((vigilante) => (
                <Card key={vigilante.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{vigilante.name}</h3>
                          <p className="text-sm text-gray-600">{vigilante.distance} away</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={vigilante.status === "Available" ? "default" : "secondary"}>
                              {vigilante.status}
                            </Badge>
                            <span className="text-sm text-gray-500">★ {vigilante.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Safety Tips</CardTitle>
                  <CardDescription>Latest safety advice from your community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Stay Alert at Night</h4>
                      <p className="text-sm text-gray-600">Avoid walking alone after 10 PM in the downtown area</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">New Security Cameras</h4>
                      <p className="text-sm text-gray-600">Additional cameras installed on Main Street</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">Neighborhood Watch</h4>
                      <p className="text-sm text-gray-600">Join the weekly community patrol meetings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anonymous Tips</CardTitle>
                  <CardDescription>Report suspicious activities anonymously</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4">Submit Anonymous Tip</Button>
                  <div className="text-center text-sm text-gray-600">
                    <p>Your identity is protected</p>
                    <p>All tips are encrypted and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
