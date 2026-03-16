import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

const select = { id: true, name: true, email: true, role: true, status: true, joinedAt: true }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100)
    const cursor = searchParams.get("cursor") ?? undefined
    const role = searchParams.get("role") ?? undefined
    const status = searchParams.get("status") ?? undefined

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        select,
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        where: {
          ...(role && { role }),
          ...(status && { status }),
        },
        orderBy: { joinedAt: "desc" },
      }),
      prisma.user.count({ where: { ...(role && { role }), ...(status && { status }) } }),
    ])

    const hasMore = items.length > limit
    const data = hasMore ? items.slice(0, limit) : items
    const nextCursor = hasMore ? data[data.length - 1]?.id : null

    return NextResponse.json({
      data,
      nextCursor,
      total,
    })
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role, status } = body
    if (!name || !email || !role || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        status,
        joinedAt: new Date(body.joinedAt ?? Date.now()),
      },
      select,
    })
    return NextResponse.json(user)
  } catch (e) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
