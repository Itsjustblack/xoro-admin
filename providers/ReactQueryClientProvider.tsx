"use client";
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

type ErrorResponse = { detail: string } | { message: string };

interface CustomMutationMeta extends Record<string, unknown> {
  skipGlobalErrorHandler?: boolean;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
    mutationMeta: CustomMutationMeta;
  }
}

export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleErrors = (error: Error) => {
    const parsed = JSON.parse(error.message);
    const data = parsed.data as ErrorResponse | null;

    if (!data) {
      toast.error("Something went wrong");
      return;
    }

    if ("detail" in data) toast.error(data.detail);
    else if ("message" in data) toast.error(data.message);
    else toast.error("An unexpected error occurred");
  };

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 10 * 60 * 1000, // 10 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            retry: 2,
          },
        },
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (mutation.options.meta?.skipGlobalErrorHandler) {
              // Skip global error handling for this mutation
              return;
            }
            handleErrors(error);
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration> */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
