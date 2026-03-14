"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function AdminSettingsPage() {
  const { user } = useAuth()

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Settings</h1>
      <div className="max-w-xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name ?? ""} className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email ?? ""} disabled className="h-9 bg-muted" />
            </div>
            <Button size="sm">Save changes</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Demo credentials</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Email: admin@admin.com</p>
            <p>Password: admin123</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
