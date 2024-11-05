"use client";
import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Search from "@/components/organisms/dashboard/common/search";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import StartupFilter from "@/app/dashboard/investors/startupFilter";
import { AppContants } from "@/lib/constants";
import { IStartup } from "@/lib/models/startup.model";
import { IPagination } from "@/lib/types/types";
import { getCookie } from "cookies-next";
import { trimStart } from "lodash-es";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobal } from "@/contexts/GlobalLayout";
import { flattenObject, objectToQueryParams } from "@/lib/utils";
import qs from "qs";
import { NextFetch } from "@/configs/api/next-fetch";

interface IStartupsParams {
  sort?: { [key: string]: 1 | -1 };
  projection?: string;
  page?: number;
  itemsCount?: number;
}

// interface IProps {
//   filterRender: (param: any) => void;
// }
const SearchStartup = () => {
  const token = getCookie(AppContants.ParseSessionCookieName); //cookies().get(AppContants.ParseSessionCookieName)?.value,

  const [filteredStartup, setFilteredStartUp] = useState<IPagination<IStartup>>();
  const [tabs, setTabs] = useState<string[]>(["All Industries"]);
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const { setIsLoading, isLoading } = useGlobal();
  const params: IStartupsParams = {
    sort: { createdAt: 1 },
    // projection: "firstName lastName avatar email",
    page: 1,
    itemsCount: 20,
  };

  const fetchIndustry = async () => {
    try {
      const response = await NextFetch("/v1/industry?page=0", { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setTabs((tabs) => [...tabs, ...data.map((item: any) => item.name)]);
      }
    } catch (error) {
      console.error(" Fetch ERR  :  ", error);
    }
  };

  useEffect(() => {
    fetchIndustry();
    fetchData();
  }, []);

  const fetchData = async (filters?: any): Promise<IPagination<IStartup> | undefined> => {
    delete filters?.maxVal;
    delete filters?.minVal;
    delete filters?.fundingRequirement;
    filters = flattenObject(filters);
    console.log(" *******  filters  ******", filters);
    const query = qs.stringify(filters, { addQueryPrefix: true });
    console.log(" *******  query  ******", query);

    try {
      const response = await NextFetch(`v1/startup${query ? query : ""}`, { method: "GET" });
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        return data;
      }
    } catch {}
    // return await Fetch({
    //   url: `v1/startup${query ? query : ""}`,
    //   method: "GET",
    // });
  };

  useEffect(() => {
    if (isLoading) return;
    (async () => {
      // try {
      setIsLoading(true);
      const data = await fetchData(filters);
      setFilteredStartUp(data);
      // } catch (error) {
      //   console.error("error happended", error);
      // } finally {
      setIsLoading(false);
      // }
    })();
  }, [filters]);

  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val }));
  };
  const clearFilter = (val: any) => {
    setFilters((s) => ({}));
  };

  return (
    <div className="py-6">
      <ScrollTab
        tabs={tabs}
        renderItemAction={(item) =>
          setFilters((current) => {
            if (item == "All Industries") {
              //remove "industries" from query
              const { industries, ...rest } = current;
              return rest;
            } else return { industries: item };
          })
        }
        className="flex flex-nowrap overflow-x-scroll scroll-hidden"
      />

      <Search filterRender={filterRender} Filter={StartupFilter} />

      <div className="w-full flex flex-wrap  justify-center px-8">
        {filteredStartup?.items?.map((item: IStartup) => (
          <div className="w-[100%] xl:w-[45%] m-3">
            <Link href={`${"/" + trimStart(`/dashboard/investors/${item._id}/#Overview`, "/")}`}>
              <StartupCard key={item._id} startup={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchStartup;
