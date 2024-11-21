import { NextFetch } from "@/configs/api/next-fetch";
import SupportiveCentersSearch from "./supportiveCentersSearch";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IPagination } from "@/lib/types/types";
import { getSupportiveCentersData } from "./utility";

export default async function SupportiveCenters() {
  const res = await getSupportiveCentersData();

  //console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  -----------  ", res);
  return (
    <div>
      <SupportiveCentersSearch initialData={res} />
    </div>
  );
}
