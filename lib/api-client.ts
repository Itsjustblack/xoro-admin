import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const koraBaseUrl = process.env.NEXT_PUBLIC_KORA_API_BASE_URL;

export const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		throw error;
	}
	throw new AxiosError("An unexpected error occurred");
};

export const koraApiClient = axios.create({
	baseURL: koraBaseUrl,
	withCredentials: false,
	headers: {
		"Content-Type": "application/json",
	},
});

const ApiClient = axios.create({
	baseURL: apiBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

ApiClient.interceptors.request.use(
	async (config) => {
		if (!apiBaseUrl) {
			return Promise.reject(
				new AxiosError(
					"NEXT_PUBLIC_API_URL is not configured. Set it in your environment before making API calls.",
					"ERR_MISSING_API_URL",
					config,
				),
			);
		}

		const cookieStore = await cookies();
		const token = cookieStore.get("auth_token")?.value;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default ApiClient;
