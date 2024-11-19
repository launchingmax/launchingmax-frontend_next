"use server";

import { NextFetch } from "@/configs/api/next-fetch";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IPagination } from "@/lib/types/types";

export async function getSupportiveCentersData() {
  const response = await NextFetch(`/v1/supportive-center?page=1&sort=${JSON.stringify({ createdAt: -1 })}`, {
    method: "GET",
  });
  if (response.ok) {
    const data: IPagination<ISupportiveCenter> = await response.json();
    return data;
  }
}
