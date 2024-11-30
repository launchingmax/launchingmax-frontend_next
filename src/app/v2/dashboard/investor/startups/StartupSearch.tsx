"use client";
import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Search from "@/components/organisms/dashboard/common/search";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { IStartup } from "@/lib/models/startup.model";
import { IPagination } from "@/lib/types/types";
import { isEmpty, isNil, omitBy, trimStart } from "lodash-es";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobal } from "@/contexts/GlobalLayout";
import { flattenObject } from "@/lib/utils";
import { NextFetch } from "@/configs/api/next-fetch";
import StartupFilter from "./startupFilter";
import Loading from "@/components/molecules/LoadingLayout";

interface IStartupsParams {
  sort?: { [key: string]: 1 | -1 };
  projection?: string;
  page?: number;
  itemsCount?: number;
}

const StartupSearch = () => {
  const [filteredStartup, setFilteredStartUp] = useState<IPagination<IStartup>>();
  const [activeTab, setActiveTab] = useState("");
  const [tabs, setTabs] = useState<string[]>(["All Industries"]);
  const [filters, setFilters] = useState<Record<string, unknown>>({ status: "startup" });
  const [activeSortItems, setActiveSortItems] = useState({ items: "", createdAt: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const menuItems = {
    options: {
      items: [
        { label: "Name", value: "name" },
        { label: "Date", value: "createdAt" },
      ],
    },
    actives: activeSortItems,
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
    filters = flattenObject(filters);

    setActiveTab(filters?.industries);
    let sort = undefined;
    if (activeSortItems?.items.length !== 0) {
      const sortBy = activeSortItems?.items;
      const cerateAt = activeSortItems?.createdAt;
      sort = JSON.stringify({ [sortBy]: cerateAt });
    }

    filters = omitBy({ ...(filters ?? {}), sort }, isNil);

    if (filters?.startupValue) {
      filters["minStartupValue.$lte"] = filters.startupValue;
      filters["maxStartupValue.$gte"] = filters.startupValue;
      delete filters.startupValue;
    }

    let and = [];
    if (filters && filters["investmentFee.$gte"]) {
      and.push({ investmentFee: { $gte: filters["investmentFee.$gte"] } });
      delete filters["investmentFee.$gte"];
    }
    if (filters && filters["investmentFee.$lte"]) {
      and.push({ investmentFee: { $lte: filters["investmentFee.$lte"] } });
      delete filters["investmentFee.$lte"];
    }

    if (filters && !isEmpty(and)) {
      filters["$and"] = and;
    }

    // if (filters && filters["brainStorming.title"]) {
    //   filters["brainStorming.title"] = `/${filters["brainStorming.title"]}/`;
    // }
    const query = JSON.stringify(filters);

    console.log("query", query);
    try {
      setIsLoading(true);
      const response = await NextFetch(`v1/startup/search?status=startup`, { method: "POST", body: query as any });
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        setIsLoading(false);
        return data;
      }
    } catch {}
  };

  useEffect(() => {
    (async () => {
      filters?.industries && setActiveTab(filters?.industries as string);
      const data = await fetchData(filters);
      console.log("mm 300 - -    ", data);
      setFilteredStartUp(data);
    })();
  }, [filters, activeSortItems]);

  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val }));
  };

  const sortRender = (val: any) => {
    setActiveSortItems((s) => ({ ...s, ...val }));
  };

  const clearFilter = () => {
    setFilters((s) => ({}));
  };

  return (
    <div className="py-6">
      <ScrollTab
        tabs={tabs}
        active={activeTab}
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

      <Search
        filterRender={filterRender}
        clearFilter={clearFilter}
        sortRender={sortRender}
        initData={filters}
        Filter={StartupFilter}
        menuItems={menuItems}
        searchInputName="brainStorming.title"
      />

      <div className="w-full flex justify-center 2xl:px-8 ">
        {!isLoading ? (
          <div className="w-full grid grid-cols-2 gap-6">
            {filteredStartup?.items?.map((item: IStartup) => (
              <div className="w-[100%] ">
                <Link href={`${"/" + trimStart(`/v2/dashboard/investor/startups/${item._id}/#Overview`, "/")}`}>
                  <StartupCard key={item._id} startup={item} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default StartupSearch;
