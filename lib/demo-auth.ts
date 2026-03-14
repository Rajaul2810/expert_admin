import type { AuthUser, Role } from "@/components/auth-provider"

export const DEMO_CREDENTIALS = {
  email: "admin@admin.com",
  password: "admin123",
}

export function validateDemoLogin(email: string, password: string): AuthUser | null {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    return {
      email: DEMO_CREDENTIALS.email,
      role: "admin" as Role,
      name: "Admin User",
    }
  }
  return null
}
