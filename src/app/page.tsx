import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin, Users, AlertTriangle, Eye, Phone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Crime Aabo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="#community" className="text-gray-600 hover:text-blue-600">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Community Security
            <span className="text-blue-600 block">Reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Crime Aabo connects communities with real-time crime reporting, instant vigilante dispatch, and data-driven
            security insights. Building safer neighborhoods through technology and community collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/register">Join the Community</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/dashboard">View Crime Map</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Powerful Security Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle>Real-Time Crime Reporting</CardTitle>
                <CardDescription>
                  Report crimes instantly with location data, photos, and detailed descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Quick incident categorization</li>
                  <li>• Photo and video evidence upload</li>
                  <li>• GPS location tracking</li>
                  <li>• Anonymous reporting option</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Vigilante Dispatch System</CardTitle>
                <CardDescription>
                  Uber-like system connecting nearest vigilantes to crime scenes instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Proximity-based matching</li>
                  <li>• Real-time location tracking</li>
                  <li>• Response time optimization</li>
                  <li>• Route navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Eye className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Crime Hotspot Analysis</CardTitle>
                <CardDescription>Data-driven insights to identify crime patterns and high-risk areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Interactive heat maps</li>
                  <li>• Trend analysis</li>
                  <li>• Predictive modeling</li>
                  <li>• Resource allocation insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>
                  Build stronger, safer communities through collaboration and transparency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Community safety tips</li>
                  <li>• Neighborhood watch groups</li>
                  <li>• Safety rating system</li>
                  <li>• Regular security updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Phone className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle>Emergency Features</CardTitle>
                <CardDescription>Advanced emergency tools including SOS gestures and Guardian Mode</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• SOS gesture activation</li>
                  <li>• Guardian Mode recording</li>
                  <li>• Emergency broadcasts</li>
                  <li>• Silent alarm system</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-500 mb-4" />
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>End-to-end encryption and privacy-first approach to community safety</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Encrypted communications</li>
                  <li>• Anonymous tip line</li>
                  <li>• Data privacy controls</li>
                  <li>• Secure evidence storage</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How Crime Aabo Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Report Incident</h3>
              <p className="text-gray-600">
                Community members report crimes or suspicious activities through the app with location and evidence
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Dispatch Vigilantes</h3>
              <p className="text-gray-600">
                System automatically notifies nearest available vigilantes with incident details and navigation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Analyze & Improve</h3>
              <p className="text-gray-600">
                Data is analyzed to identify patterns, create hotspot maps, and improve community security strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make Your Community Safer?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of community members already using Crime Aabo to build safer neighborhoods
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/auth/register">Sign Up Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">Crime Aabo</span>
              </div>
              <p className="text-gray-400">Building safer communities through technology and collaboration.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Crime Reporting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Vigilante Dispatch
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Hotspot Analysis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency: 911</li>
                <li>Support: help@crimeaabo.com</li>
                <li>Community: community@crimeaabo.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Crime Aabo. All rights reserved. Building safer communities together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
