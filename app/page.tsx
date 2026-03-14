"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "manager") {
      router.replace("/admin")
      return
    }
    router.replace("/login")
  }, [router, isLoggedIn, user?.role])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
