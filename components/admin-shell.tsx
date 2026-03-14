"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { isLoggedIn, user } = useAuth()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    if (!isLoggedIn || !user || (user.role !== "admin" && user.role !== "manager")) {
      router.replace("/login")
    }
  }, [mounted, isLoggedIn, user, router])

  if (!mounted) return null
  if (!isLoggedIn || !user || (user.role !== "admin" && user.role !== "manager")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    )
  }

  const breadcrumb = pathname === "/admin"
    ? "Dashboard"
    : pathname?.replace("/admin/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? ""

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <p className="text-sm font-medium text-muted-foreground">{breadcrumb}</p>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
          </Button>
        </header>
        {children}
      </main>
    </div>
  )
}
