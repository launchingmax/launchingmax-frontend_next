import { IPagination } from "@/lib/types/types";

export type ApiError = {
  status?: string;
  message?: string;
  error?: any;
};

export type ResError = {
  message?: string | null | ApiError;
  status?: number;
  statusText?: string;
  error?: any;
};

export type FetchRes<T> = {
  error?: ResError | null;
  data?: IPagination<T> | null;
};
