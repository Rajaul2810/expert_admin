"use client"

import * as React from "react"
import { Search, Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEMO_USERS, type DemoUser } from "@/lib/demo-users"
import type { Role } from "@/components/auth-provider"

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<DemoUser[]>(DEMO_USERS)
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<string>("all")
  const [openId, setOpenId] = React.useState<string | null>(null)

  const filtered = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || u.role === roleFilter
    return matchSearch && matchRole
  })

  const updateRole = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)))
    setOpenId(null)
  }

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setOpenId(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm sm:w-36"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add user
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="capitalize">{u.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={u.status === "active" ? "default" : "outline"}>{u.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                    <td className="relative px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => setOpenId(openId === u.id ? null : u.id)}
                        aria-label="Actions"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                      {openId === u.id && (
                        <>
                          <div className="absolute right-0 top-full z-10 mt-1 min-w-40 rounded-md border border-border bg-popover py-1 shadow-md">
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                              onClick={() => updateRole(u.id, "admin")}
                            >
                              Set Admin
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                              onClick={() => updateRole(u.id, "manager")}
                            >
                              Set Manager
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                              onClick={() => updateRole(u.id, "viewer")}
                            >
                              Set Viewer
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                              onClick={() => removeUser(u.id)}
                            >
                              <Trash2 className="size-4" /> Remove
                            </button>
                          </div>
                          <div
                            className="fixed inset-0 z-0"
                            onClick={() => setOpenId(null)}
                            aria-hidden
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No users found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
