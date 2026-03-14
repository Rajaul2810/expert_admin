"use client"

import * as React from "react"
import Image from "next/image"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEMO_EXPERTS, type ExpertItem } from "@/lib/experts-data"
import { EXPERT_CATEGORIES_FILTER } from "@/lib/experts-data"
import { cn } from "@/lib/utils"

export default function AdminExpertsPage() {
  const [experts, setExperts] = React.useState<ExpertItem[]>(DEMO_EXPERTS)
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")

  const filtered = experts.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === "All" || e.category === categoryFilter
    return matchSearch && matchCat
  })

  const removeExpert = (id: string) => {
    setExperts((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Experts</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search experts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            {EXPERT_CATEGORIES_FILTER.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add expert
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ex) => (
          <Card key={ex.id} className="overflow-hidden">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <Image
                src={ex.image}
                alt={ex.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{ex.name}</h3>
                  <Badge variant="secondary" className="mt-1">{ex.category}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="size-8" aria-label="Edit">
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    aria-label="Delete"
                    onClick={() => removeExpert(ex.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{ex.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{ex.rating} rating</span>
                <span>{ex.sessions} sessions</span>
                <span>{ex.duration}</span>
                <span className="font-medium text-foreground">{ex.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No experts found.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
