"use server";

import ApiClient, { handleApiError } from "@/lib/api-client";
import { IMerchant } from "@/lib/types";

export async function createNewMerchant(payload: {
	name: string;
	email: string;
}) {
	try {
		const res = await ApiClient.post<IMerchant>("/create-merchant", payload);
		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}
