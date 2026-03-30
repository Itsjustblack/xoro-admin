import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

function buildUpstreamUrl(path: string[], searchParams: URLSearchParams): string {
  const joinedPath = path.join("/")
  const query = searchParams.toString()
  return `${API_BASE_URL}/${joinedPath}${query ? `?${query}` : ""}`
}

async function proxyRequest(req: NextRequest, path: string[]): Promise<NextResponse> {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "API URL is not configured" },
      { status: 500 },
    )
  }

  if (path.some((segment) => segment === ".." || segment.includes("\0"))) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  const upstreamUrl = buildUpstreamUrl(path, req.nextUrl.searchParams)

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD"

  let body: string | undefined
  if (hasBody) {
    body = await req.text()
  }

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: hasBody ? body : undefined,
  })

  const responseText = await upstreamRes.text()

  let responseBody: unknown
  try {
    responseBody = JSON.parse(responseText)
  } catch {
    responseBody = responseText
  }

  return NextResponse.json(responseBody, { status: upstreamRes.status })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path)
}
