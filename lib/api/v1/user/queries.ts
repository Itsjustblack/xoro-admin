import ApiClient, { handleApiError } from "@/lib/api-client";
import { IUser } from "@/lib/types";

export async function getUserInfo() {
  try {
    const res = await ApiClient.get<IUser>("/get-user");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
