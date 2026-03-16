import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

const select = { id: true, name: true, category: true, rating: true, sessions: true, duration: true, price: true, image: true, bio: true }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100)
    const cursor = searchParams.get("cursor") ?? undefined
    const category = searchParams.get("category") ?? undefined

    const items = await prisma.expert.findMany({
      select,
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      where: category ? { category } : undefined,
      orderBy: { rating: "desc" },
    })

    const hasMore = items.length > limit
    const data = hasMore ? items.slice(0, limit) : items
    const nextCursor = hasMore ? data[data.length - 1]?.id : null

    return NextResponse.json({ data, nextCursor })
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, rating, sessions, duration, price, image, bio } = body
    if (!name || !category || rating == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const expert = await prisma.expert.create({
      data: {
        name,
        category,
        rating: Number(rating),
        sessions: Number(sessions) ?? 0,
        duration: duration ?? "",
        price: price ?? "",
        image: image ?? "",
        bio: bio ?? "",
      },
      select,
    })
    return NextResponse.json(expert)
  } catch (e) {
    return NextResponse.json({ error: "Failed to create expert" }, { status: 500 })
  }
}
