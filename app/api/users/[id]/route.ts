import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

const select = { id: true, name: true, email: true, role: true, status: true, joinedAt: true }

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await prisma.user.findUnique({ where: { id }, select })
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name != null && { name: body.name }),
        ...(body.email != null && { email: body.email }),
        ...(body.role != null && { role: body.role }),
        ...(body.status != null && { status: body.status }),
      },
      select,
    })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.user.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
