"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  MapPin,
  AlertTriangle,
  Users,
  Phone,
  Eye,
  Plus,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/userContext";
import { createClient } from "@/utils/supabase/client";

import { CrimeReport, User } from "@/lib/types";

const CrimeMap = dynamic(() => import("./CrimeMap"), {
  ssr: false,
});

// type MarkerData = {
//   id: string;
//   lat: number;
//   lng: number;
//   label?: string;
// };

export default function DashboardPage() {
  const { logout, isAuthenticated } = useAuth();
  const supabase = createClient();
  const [activeIncidents, setActiveIncidents] = useState<CrimeReport[]>([]);
  const [nearbyVigilantes, setNearbyVigilantes] = useState<User[]>([]);

  useEffect(() => {
    const getIncidents = async () => {
      const { data: crimeReport, error: crimeError } = await supabase
        .from("crime_reports")
        .select("*")
        .eq("is_ongoing", true)
        .order("created_at", { ascending: false });

      if (crimeError) {
        console.error("Error fetching crime reports:", crimeError);
      } else {
        setActiveIncidents(crimeReport || []);
      }

      const { data: vigilantes, error: vigilanteError } = await supabase
        .from("users")
        .select("*")
        .eq("user_type", "vigilante")
        .eq("is_active", true);

      if (vigilanteError) {
        console.error("Error fetching vigilantes:", vigilanteError);
      } else {
        setNearbyVigilantes(vigilantes || []);
      }
    };

    getIncidents();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Crime Aabo</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Incidents
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {activeIncidents.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Available Vigilantes
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {nearbyVigilantes.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Response Time
                  </p>
                  <p className="text-3xl font-bold text-blue-600">-</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Safety Score
                  </p>
                  <p className="text-3xl font-bold text-purple-600">-</p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            className="h-16 bg-red-600 hover:bg-red-700 text-white"
            asChild
          >
            <Link href="/report-crime">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Report Crime
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Phone className="h-6 w-6 mr-2" />
            SOS Emergency
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Eye className="h-6 w-6 mr-2" />
            Guardian Mode
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4  rounded-lg p-1 mb-6">
            <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
            <TabsTrigger value="map">Crime Map</TabsTrigger>
            <TabsTrigger value="vigilantes">Vigilantes</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Incidents</h2>
              <Button asChild>
                <Link href="/report-crime">
                  <Plus className="h-4 w-4 mr-2" />
                  Report New Incident
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {activeIncidents.length > 0 ? (
                activeIncidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardContent className="p-6 flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant={
                              incident.severity === "critical"
                                ? "destructive"
                                : incident.severity === "high"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {incident.severity}
                          </Badge>
                          <h3 className="font-semibold">
                            {incident.crime_type}
                          </h3>
                          <Badge variant="outline">{incident.status}</Badge>
                        </div>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {incident.location_address}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(incident.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <AlertTriangle className="mx-auto h-10 w-10 text-red-400 mb-2" />
                  <p>No active crime incidents at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crime Hotspot Map</CardTitle>
                <CardDescription>
                  Interactive map showing crime incidents and hotspots in your
                  area
                </CardDescription>
              </CardHeader>
              <CardContent>

                <CrimeMap markers={activeIncidents.map((incident) => ({
                  id: incident.id,
                  lat: incident.latitude,
                  lng: incident.longitude,
                  type: "crime",
                  title: incident.crime_type,
                  description: incident.description,
                }))} />
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
                          <h3 className="font-semibold">{vigilante.first_name}</h3>
                          <p className="text-sm text-gray-600">
                            {vigilante.distance} away
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                vigilante.status === "Available"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {vigilante.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              ★ {vigilante.rating}
                            </span>
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
                  <CardDescription>
                    Latest safety advice from your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Stay Alert at Night</h4>
                      <p className="text-sm text-gray-600">
                        Avoid walking alone after 10 PM in the downtown area
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">New Security Cameras</h4>
                      <p className="text-sm text-gray-600">
                        Additional cameras installed on Main Street
                      </p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">Neighborhood Watch</h4>
                      <p className="text-sm text-gray-600">
                        Join the weekly community patrol meetings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anonymous Tips</CardTitle>
                  <CardDescription>
                    Report suspicious activities anonymously
                  </CardDescription>
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
  );
}
