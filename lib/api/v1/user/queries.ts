import ApiClient from "@/lib/api-client"
import { IUser } from "@/lib/types"

export async function getUserInfo() {
  const res = await ApiClient.get<IUser>("/get-user")
  return res.data
}
