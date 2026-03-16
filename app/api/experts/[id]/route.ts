import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

const select = { id: true, name: true, category: true, rating: true, sessions: true, duration: true, price: true, image: true, bio: true }

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const expert = await prisma.expert.findUnique({ where: { id }, select })
    if (!expert) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(expert)
  } catch {
    return NextResponse.json({ error: "Failed to fetch expert" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const expert = await prisma.expert.update({
      where: { id },
      data: {
        ...(body.name != null && { name: body.name }),
        ...(body.category != null && { category: body.category }),
        ...(body.rating != null && { rating: Number(body.rating) }),
        ...(body.sessions != null && { sessions: Number(body.sessions) }),
        ...(body.duration != null && { duration: body.duration }),
        ...(body.price != null && { price: body.price }),
        ...(body.image != null && { image: body.image }),
        ...(body.bio != null && { bio: body.bio }),
      },
      select,
    })
    return NextResponse.json(expert)
  } catch {
    return NextResponse.json({ error: "Failed to update expert" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.expert.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: "Failed to delete expert" }, { status: 500 })
  }
}
