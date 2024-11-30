import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import ListSearch from "./listSearch";
import { Suspense } from "react";
import Loading from "@/components/molecules/LoadingLayout";

const fetchArchiveData = async () => {
  try {
    const response = await NextFetch(
      `/v1/startup?status=startup&populate=${JSON.stringify([
        { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
      ])}`
    );
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("mm archive errr ", error);
  }
};

export default async function AdminInvestorsArchiveList() {
  const res = await fetchArchiveData();

  res.items = res.items.reduce((pre: any, cur: any) => {
    const investors = cur.investors?.reduce((p: any, c: any) => {
      const d = {
        ...cur,
        investors: [c],
      };
      if (c.status === RequestStatus.Rejected) p.push(d);
      return p;
    }, []);

    pre.push(...investors);
    return pre;
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ListSearch initialData={res} />
      </Suspense>
    </>
  );
}
