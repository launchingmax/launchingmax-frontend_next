import { NextFetch } from "@/configs/api/next-fetch";
import SupportiveCentersSearch from "./supportiveCentersSearch";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IPagination } from "@/lib/types/types";

async function getSupportiveCentersData() {
  const response = await NextFetch("/v1/supportive-center", { method: "GET" });
  if (response.ok) {
    const data: IPagination<ISupportiveCenter> = await response.json();
    return data;
  }
}

export default async function SupportiveCenters() {
  const res = await getSupportiveCentersData();

  // console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  -----------  ", res);
  return (
    <div>
      <SupportiveCentersSearch data={res} />
    </div>
  );
}
