import { IStartup } from "@/lib/models/startup.model";

export const reduceItems = ({ res }: { res: any }) => {
  console.log("#########################################################");
  const a = res?.items.reduce((pre: any, cur: any) => {
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

  return a;
};
