import { ErrorWrapper } from "@/components/atoms/error-wrapper";
import { runFetch } from "@/configs/api/server-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import { IStartup } from "@/lib/models/startup.model";
import ListSearch from "./listSearch";
import { IPagination } from "@/lib/types/types";

export default async function AdminInvestorsRequestList() {
  const res = await runFetch<IStartup>(
    `/v1/startup?investors.status=${RequestStatus.Requested}&status=startup&populate=${JSON.stringify([
      { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
    ])}`
  );

  if (res.error) return <ErrorWrapper {...res.error} />;

  res.data!.items = res.data?.items?.reduce((pre: any, cur: any) => {
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
      <ListSearch initialData={res.data} />
    </>
  );
}
