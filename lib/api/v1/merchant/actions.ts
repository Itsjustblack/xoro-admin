import apiClient, { handleApiError } from "@/lib/axios";
import { IMerchant } from "@/lib/types";

export async function createNewMerchant(payload: {
  name: string;
  email: string;
}) {
  try {
    const res = await apiClient.post<IMerchant>("/create-merchant", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
