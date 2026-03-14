import type { Role } from "@/components/auth-provider"

export type DemoUser = {
  id: string
  name: string
  email: string
  role: Role
  status: "active" | "inactive"
  joined: string
}

export const DEMO_USERS: DemoUser[] = [
  { id: "1", name: "Admin User", email: "admin@admin.com", role: "admin", status: "active", joined: "2024-01-15" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "viewer", status: "active", joined: "2024-02-20" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "manager", status: "active", joined: "2024-03-10" },
  { id: "4", name: "Bob Wilson", email: "bob@example.com", role: "viewer", status: "inactive", joined: "2024-01-08" },
  { id: "5", name: "Alice Brown", email: "alice@example.com", role: "manager", status: "active", joined: "2024-04-01" },
]
