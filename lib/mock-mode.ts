export function isMockDataMode() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "false") {
    return false
  }

  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return true
  }

  return process.env.NODE_ENV !== "production"
}
