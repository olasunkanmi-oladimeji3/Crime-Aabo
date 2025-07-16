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
  LogOut,
  ShieldOff,
  AlarmClock,
  FileWarning,
  Activity,
  UserX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { useAuth } from "@/context/userContext";
import { createClient } from "@/utils/supabase/client";

import { CrimeReport, User } from "@/lib/types";

const CrimeMap = dynamic(() => import("./CrimeMap"), {
  ssr: false,
});

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
    getAverageResponseTime();
    calculateSafetyScore();
  }, [supabase]);

  const [guardianMode, setGuardianMode] = useState(false);

  const handleGuardianMode = () => {
    // Example action
    setGuardianMode((prev) => !prev);
    alert(`Guardian Mode ${!guardianMode ? "Activated" : "Deactivated"}`);
    // You could also log activity, start location tracking, etc.
  };

  const [averageResponseTime, setAverageResponseTime] = useState<string | null>(
    null
  );

  const getAverageResponseTime = async () => {
    const { data, error } = await supabase
      .from("crime_reports")
      .select("created_at, response_time")
      .not("response_time", "is", null);

    if (error) {
      console.error("Error fetching response times:", error);
      return;
    }

    if (data && data.length > 0) {
      const totalMinutes = data.reduce((acc, report) => {
        const created = new Date(report.created_at).getTime();
        const responded = new Date(report.response_time).getTime();
        return acc + (responded - created) / 60000; // Convert ms to minutes
      }, 0);

      const avg = totalMinutes / data.length;
      setAverageResponseTime(`${avg.toFixed(1)} mins`);
    } else {
      setAverageResponseTime("N/A");
    }
  };

  const [safetyScore, setSafetyScore] = useState<string | null>(null);

  const calculateSafetyScore = () => {
    const incidents = activeIncidents.length;
    const vigilantes = nearbyVigilantes.length;

    if (incidents === 0 && vigilantes === 0) {
      setSafetyScore("0");
    } else if (incidents === 0) {
      setSafetyScore("100");
    } else {
      const score = Math.min(
        100,
        Number(((vigilantes / incidents) * 100).toFixed(0))
      );
      setSafetyScore(score.toString());
    }
  };
  const crimeTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "theft":
        return <ShieldOff className="h-5 w-5 text-red-500" />;
      case "assault":
        return <UserX className="h-5 w-5 text-orange-500" />;
      case "vandalism":
        return <FileWarning className="h-5 w-5 text-yellow-600" />;
      case "suspicious activity":
        return <Activity className="h-5 w-5 text-purple-500" />;
      default:
        return <AlarmClock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
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
          <Card className="bg-white shadow-md rounded-lg">
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

          <Card className="bg-white shadow-md rounded-lg">
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

          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Response Time
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {averageResponseTime ?? "15"} min
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Safety Score
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {safetyScore ?? "80"}%
                  </p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8bg-white shadow-md rounded-lg">
          {/* Report Crime */}
          <Button
            size="lg"
            className="h-16 w-full bg-red-600 hover:bg-red-700 text-white"
            asChild
          >
            <Link href="/report-crime">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Report Crime
            </Link>
          </Button>

          {/* SOS Emergency */}
          <a href="tel:112" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-full border-orange-300 text-white bg-orange-600 hover:bg-orange-50"
            >
              <Phone className="h-6 w-6 mr-2" />
              SOS Emergency
            </Button>
          </a>

          {/* Guardian Mode */}
          <Button
            size="lg"
            variant="outline"
            className={`h-16 w-full border-blue-300 text-white  bg-blue-600 hover:bg-blue-50 ${
              guardianMode ? "ring-2 ring-blue-600" : ""
            }`}
            onClick={handleGuardianMode}
          >
            <Eye className="h-6 w-6 mr-2" />
            Guardian Mode
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-2 rounded-xl p-2 mb-6 h-14 bg-neutral-100 shadow-md">
            <TabsTrigger
              value="incidents"
              className="rounded-lg px-4 py-2 font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
            >
              Active Incidents
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="rounded-lg px-4 py-2 font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
            >
              Crime Map
            </TabsTrigger>
            <TabsTrigger
              value="vigilantes"
              className="rounded-lg px-4 py-2 font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
            >
              Vigilantes
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="rounded-lg px-4 py-2 font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200"
            >
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Recent Incidents</h2>
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Link href="/report-crime">
                  <Plus className="h-4 w-4 mr-2" />
                  Report New Incident
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {activeIncidents.length > 0 ? (
                <TooltipProvider>
                  {activeIncidents.map((incident) => (
                    <Card
                      key={incident.id}
                      className="border border-blue-100 shadow-sm hover:shadow-lg transition duration-200 bg-white rounded-xl"
                    >
                      <CardContent className="p-5 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge
                                  variant={
                                    incident.severity === "critical"
                                      ? "destructive"
                                      : incident.severity === "high"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {incident.severity.charAt(0).toUpperCase() +
                                    incident.severity.slice(1)}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Severity level:{" "}
                                  {incident.severity === "critical"
                                    ? "Immediate danger to life or property"
                                    : incident.severity === "high"
                                    ? "Urgent but non-life-threatening"
                                    : "Minor issue"}
                                </p>
                              </TooltipContent>
                            </Tooltip>

                            <div className="flex items-center gap-1 font-semibold text-gray-800 text-lg">
                              {crimeTypeIcon(incident.crime_type)}
                              {incident.crime_type}
                            </div>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="capitalize">
                                  {incident.status}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Status: {incident.status}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>

                          <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4" />
                            {incident.location_address}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(incident.created_at).toLocaleString()}
                          </p>
                        </div>

                        <div className="self-center">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/incidents/${incident.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TooltipProvider>
              ) : (
                <div className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-6 shadow-inner">
                  <AlertTriangle className="h-10 w-10 mb-3 text-blue-500" />
                  <p className="text-center text-sm font-medium">
                    No active crime incidents at the moment.
                  </p>
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
                <CrimeMap
                  markers={activeIncidents.map((incident) => ({
                    id: incident.id,
                    lat: incident.latitude,
                    lng: incident.longitude,
                    type: "crime",
                    title: incident.crime_type,
                    description: incident.description,
                  }))}
                />
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
                          <h3 className="font-semibold">
                            {vigilante.first_name}
                          </h3>
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
