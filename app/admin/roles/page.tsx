"use client"

import * as React from "react"
import { Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEMO_ROLES } from "@/lib/demo-roles"
import { DEMO_USERS } from "@/lib/demo-users"

export default function AdminRolesPage() {
  const roleCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    DEMO_USERS.forEach((u) => {
      counts[u.role] = (counts[u.role] ?? 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Role management</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Assign roles to control access. Admin has full access; Manager can manage content; Viewer is read-only.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_ROLES.map((role) => (
          <Card key={role.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{role.label}</CardTitle>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  Users with this role
                </span>
                <Badge variant="secondary">{roleCounts[role.name] ?? 0}</Badge>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Manage permissions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Users by role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_USERS.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="py-3 text-muted-foreground">{u.email}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className="capitalize">{u.role}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
