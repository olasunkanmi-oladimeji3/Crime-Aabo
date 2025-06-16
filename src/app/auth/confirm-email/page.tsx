"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"


export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <ConfirmEmailPage />
    </Suspense>
  )
}
function ConfirmEmailPage() {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [isResending, setIsResending] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const tokenParam = searchParams.get("token")

    if (emailParam) {
      setEmail(emailParam)
    }

    // If there's a token, automatically confirm the email
    if (tokenParam) {
      confirmEmail(tokenParam)
    }
  }, [searchParams])

  const confirmEmail = async (token: string) => {
    setIsConfirming(true)
    setError("")

    try {
      const response = await fetch("/api/auth/confirm-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsConfirmed(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login?message=Email confirmed successfully")
        }, 3000)
      } else {
        setError(data.error || "Failed to confirm email")
      }
    } catch (error) {
      console.error("Email confirmation error:", error)
      setError("Failed to confirm email. Please try again.")
    } finally {
      setIsConfirming(false)
    }
  }

  const resendConfirmation = async () => {
    if (!email) return

    setIsResending(true)
    setError("")

    try {
      const response = await fetch("/api/auth/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Confirmation email sent successfully!")
      } else {
        setError(data.error || "Failed to resend confirmation email")
      }
    } catch (error) {
      console.error("Resend confirmation error:", error)
      setError("Failed to resend confirmation email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle>Confirming Your Email</CardTitle>
              <CardDescription>Please wait while we verify your email address...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Crime Aabo</span>
            </div>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Email Confirmed!</CardTitle>
              <CardDescription>Your email address has been successfully verified</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  Welcome to Crime Aabo! Your account is now active and you can start using all features.
                </p>
              </div>

              <p className="text-sm text-gray-600">Redirecting to sign in page in 3 seconds...</p>

              <Button asChild className="w-full">
                <Link href="/auth/login">Continue to Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Crime Aabo</span>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>We&apos;ve sent a confirmation link to your email address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">We sent a confirmation link to:</p>
              {email && <p className="font-medium text-gray-900">{email}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Next Steps:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Check your email inbox</li>
                    <li>• Click the confirmation link</li>
                    <li>• Your account will be activated</li>
                    <li>• Sign in to start using Crime Aabo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>Didn&apos;t receive the email? Check your spam folder or</p>
              <Button
                variant="outline"
                size="sm"
                onClick={resendConfirmation}
                disabled={isResending || !email}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Confirmation Email"
                )}
              </Button>
            </div>

            <div className="pt-4 border-t text-center">
              <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
