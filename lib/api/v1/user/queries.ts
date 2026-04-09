import ApiClient from "@/lib/api-client"
import { mockUser } from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import { IUser } from "@/lib/types"

export async function getUserInfo() {
  if (isMockDataMode()) {
    return mockUser
  }

  const res = await ApiClient.get<IUser>("/get-user")
  return res.data
}
