"use client"

import * as React from "react"

export type Role = "admin" | "manager" | "viewer"

export type AuthUser = {
  email: string
  role: Role
  name: string
}

type AuthContextValue = {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (user: AuthUser) => void
  logout: () => void
  isAdmin: boolean
}

const STORAGE_KEY = "expert_admin_session"

const AuthContext = React.createContext<AuthContextValue | null>(null)

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setUser(loadUser())
    setMounted(true)
  }, [])

  const login = React.useCallback((u: AuthUser) => {
    setUser(u)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch {}
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      logout,
      isAdmin: user?.role === "admin" || user?.role === "manager",
    }),
    [user, login, logout]
  )

  if (!mounted) return null
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export { AuthProvider, useAuth }
