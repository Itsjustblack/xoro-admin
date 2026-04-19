type ErrorPayload = {
  message?: string
  detail?: string | Array<{ msg?: string; message?: string }>
}

type ErrorWithResponse = {
  message?: string
  response?: {
    data?: ErrorPayload
  }
}

function hasResponse(error: unknown): error is ErrorWithResponse {
  return typeof error === "object" && error !== null && "response" in error
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (hasResponse(error)) {
    const data = error.response?.data

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message
    }

    if (typeof data?.detail === "string" && data.detail.trim()) {
      return data.detail
    }

    if (Array.isArray(data?.detail) && data.detail.length > 0) {
      const firstDetail = data.detail[0]

      if (typeof firstDetail?.msg === "string" && firstDetail.msg.trim()) {
        return firstDetail.msg
      }

      if (
        typeof firstDetail?.message === "string" &&
        firstDetail.message.trim()
      ) {
        return firstDetail.message
      }
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}
