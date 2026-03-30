"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { validateDemoLogin, DEMO_CREDENTIALS } from "@/lib/demo-auth"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const { isLoggedIn, isAdmin, login } = useAuth()

  const [email, setEmail] = React.useState(DEMO_CREDENTIALS.email)
  const [password, setPassword] = React.useState(DEMO_CREDENTIALS.password)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isLoggedIn) return
    if (isAdmin) router.replace("/admin")
    else router.replace("/login")
  }, [isLoggedIn, isAdmin, router])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const user = validateDemoLogin(email.trim(), password)
    if (!user) {
      setError("Invalid email or password")
      return
    }

    login(user)
    router.replace("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <div className="text-xs text-muted-foreground">
              Demo: <span className="font-medium">{DEMO_CREDENTIALS.email}</span> /{" "}
              <span className="font-medium">{DEMO_CREDENTIALS.password}</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

