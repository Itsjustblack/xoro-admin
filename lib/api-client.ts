import axios from "axios"

const koraBaseUrl = process.env.NEXT_PUBLIC_KORA_API_BASE_URL
const subscriptionsBaseUrl = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_API_URL

export const koraApiClient = axios.create({
  baseURL: koraBaseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

export const SubscriptionsApiClient = axios.create({
  baseURL: subscriptionsBaseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

const ApiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default ApiClient
