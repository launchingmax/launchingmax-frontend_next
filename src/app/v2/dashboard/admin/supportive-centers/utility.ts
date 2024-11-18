"use server";

import { NextFetch } from "@/configs/api/next-fetch";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IPagination } from "@/lib/types/types";

interface IProps {
  page?: number;
}
export async function getSupportiveCentersData() {
  const response = await NextFetch("/v1/supportive-center", { method: "GET" });
  if (response.ok) {
    const data: IPagination<ISupportiveCenter> = await response.json();
    return data;
  }
}
