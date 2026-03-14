"use client"

import * as React from "react"
import {
  Users,
  UserCircle,
  Shield,
  Calendar,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMO_EXPERTS } from "@/lib/experts-data"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Users", value: "1,240", icon: Users, color: "text-primary bg-primary/10" },
  { label: "Experts", value: String(DEMO_EXPERTS.length), icon: UserCircle, color: "text-emerald-600 bg-emerald-500/10" },
  { label: "Active Roles", value: "3", icon: Shield, color: "text-amber-600 bg-amber-500/10" },
  { label: "Bookings (Month)", value: "89", icon: Calendar, color: "text-violet-600 bg-violet-500/10" },
  { label: "Revenue", value: "$12,400", icon: DollarSign, color: "text-green-600 bg-green-500/10" },
  { label: "Growth", value: "+12%", icon: TrendingUp, color: "text-blue-600 bg-blue-500/10" },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={cn("flex size-12 items-center justify-center rounded-xl", stat.color)}>
                  <Icon className="size-6" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent experts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Sessions</th>
                  <th className="pb-3 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_EXPERTS.slice(0, 5).map((ex) => (
                  <tr key={ex.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{ex.name}</td>
                    <td className="py-3 text-muted-foreground">{ex.category}</td>
                    <td className="py-3">{ex.rating}</td>
                    <td className="py-3">{ex.sessions}</td>
                    <td className="py-3">{ex.price}</td>
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
