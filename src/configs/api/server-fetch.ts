"use server";

import { IPagination } from "@/lib/types/types";
import { NextFetch } from "./next-fetch";
import { FetchRes, ResError } from "./error-types";

export async function runFetch<T>(url: string): Promise<FetchRes<T>> {
  let res = null;
  let data: IPagination<T> | null = null;
  let error: ResError | null = null;
  try {
    res = await NextFetch(url);

    if (!res?.ok) {
      let errMsg;
      try {
        errMsg = await res.json();
      } catch (e) {
        errMsg = await res.text();
      }

      error = {
        message: errMsg,
        status: res.status,
        statusText: res.statusText,
      };
    } else {
      const sData = await res.json();
      data = sData ?? { page: 0, itemsCount: 0, pages: 0, total: 0, items: [] };
    }
  } catch (err) {
    let errMsg = "Network Error.";

    error = {
      message: errMsg,
      error: err,
    };
  }

  const response: FetchRes<T> = {
    error,
    data,
  };
  return response;
}
