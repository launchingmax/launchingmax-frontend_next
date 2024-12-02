import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import ListSearch from "./listSearch";
import { ErrorWrapper } from "@/components/atoms/error-wrapper";
import { IPagination } from "@/lib/types/types";
import { IStartup } from "@/lib/models/startup.model";
import { runFetch } from "@/configs/api/server-fetch";

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
  const res = await runFetch<IStartup>(
    `/v1/startup?status=startup&populate=${JSON.stringify([
      { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
    ])}`
  );

  if (res.error) return <ErrorWrapper {...res.error} />;

  res.data!.items = res.data!.items?.reduce((pre: any, cur: any) => {
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
      <ListSearch initialData={res.data!} />
    </>
  );
}
