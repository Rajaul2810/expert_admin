import type { Role } from "@/components/auth-provider"

export type RolePermission = {
  id: string
  name: Role
  label: string
  description: string
  userCount: number
}

export const DEMO_ROLES: RolePermission[] = [
  { id: "1", name: "admin", label: "Admin", description: "Full access to all settings and management", userCount: 1 },
  { id: "2", name: "manager", label: "Manager", description: "Manage users, experts, and content", userCount: 2 },
  { id: "3", name: "viewer", label: "Viewer", description: "Read-only access to dashboard and reports", userCount: 2 },
]
