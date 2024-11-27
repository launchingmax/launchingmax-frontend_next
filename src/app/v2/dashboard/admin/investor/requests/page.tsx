import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import { UserType } from "@/lib/constants/user.const";
import ListSearch from "./listSearch";
import { reduceItems } from "./helper";

const fetchRequestData = async () => {
  try {
    const response = await NextFetch(
      `/v1/startup?investors.status=${RequestStatus.Requested}&status=startup&populate=${JSON.stringify([
        { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
      ])}`
    );
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("mm 3030303030303003 errr ", error);
  }
};

export default async function AdminInvestorsRequestList() {
  const res = await fetchRequestData();

  res.items = res.items.reduce((pre: any, cur: any) => {
    const investors = cur.investors?.reduce((p: any, c: any) => {
      const d = {
        ...cur,
        investors: [c],
      };
      if (c.status === "requested") p.push(d);
      return p;
    }, []);

    pre.push(...investors);
    return pre;
  }, []);

  return (
    <>
      <ListSearch initialData={res} />
    </>
  );
}
