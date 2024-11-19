import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Retry failed queries once
        refetchOnWindowFocus: false, // Do not refetch on window focus
        staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      },
      mutations: {
        retry: 0, // Do not retry failed mutations
      },
    },
  });
}
