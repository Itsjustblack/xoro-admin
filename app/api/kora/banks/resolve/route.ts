import { NextRequest, NextResponse } from "next/server"

function normalizeKoraBaseUrl(value?: string) {
  if (!value) return undefined
  return value.replace("api.kora.com", "api.korapay.com")
}

const KORA_API_BASE_URL =
  normalizeKoraBaseUrl(process.env.NEXT_PUBLIC_KORA_API_BASE_URL) ??
  normalizeKoraBaseUrl(process.env.NEXT_PUBLIC_KORA_API_URL) ??
  "https://api.korapay.com"

export async function POST(req: NextRequest) {
  const body = await req.text()

  let upstreamRes: Response
  try {
    upstreamRes = await fetch(
      `${KORA_API_BASE_URL}/merchant/api/v1/misc/banks/resolve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    )
  } catch {
    return NextResponse.json(
      {
        message:
          "Unable to reach account verification service. Please try again.",
      },
      { status: 502 },
    )
  }

  const responseText = await upstreamRes.text()
  const contentType = upstreamRes.headers.get("content-type") ?? ""

  if (
    contentType.includes("text/html") ||
    responseText.toLowerCase().includes("<html")
  ) {
    return NextResponse.json(
      {
        message:
          "Account verification service is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    )
  }

  let responseBody: unknown
  try {
    responseBody = JSON.parse(responseText)
  } catch {
    responseBody = { message: responseText }
  }

  return NextResponse.json(responseBody, { status: upstreamRes.status })
}
