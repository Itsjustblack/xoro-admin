export async function createBulkPayout(data: FormData) {
  const res = await fetch("/api/v1/bulk-payout/create", {
    method: "POST",
    body: data,
  })
  return res.json()
}