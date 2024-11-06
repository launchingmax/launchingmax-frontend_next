"use client";
import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Search from "@/components/organisms/dashboard/common/search";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import StartupFilter from "@/app/dashboard/investors/startupFilter";
import { IStartup } from "@/lib/models/startup.model";
import { IPagination } from "@/lib/types/types";
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

const SearchStartup = () => {
  const [filteredStartup, setFilteredStartUp] = useState<IPagination<IStartup>>();
  const [activeTab, setActiveTab] = useState("");
  const [tabs, setTabs] = useState<string[]>(["All Industries"]);
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const { setIsLoading, isLoading } = useGlobal();
  const [activeSortItems, setActiveSortItems] = useState({ items: "", createdAt: 1 });

  const menuItems = {
    options: {
      items: [
        { label: "Name", value: "name" },
        { label: "Date", value: "date" },
      ],
    },
    actives: activeSortItems,
  };

  const params: IStartupsParams = {
    sort: { createdAt: 1 },
    // projection: "firstName lastName avatar email", sort=JSON.stringify({createAt: 01, name: --1})
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
    filters = flattenObject(filters);

    setActiveTab(filters?.industries);

    const sortBy = activeSortItems?.items;
    const cerateAt = activeSortItems?.createdAt;
    const sort = JSON.stringify({ [sortBy]: cerateAt });

    // const query = qs.stringify({ ...(filters ?? {}), sort }, { addQueryPrefix: true });
    const query = qs.stringify({ ...(filters ?? {}) }, { addQueryPrefix: true });

    try {
      const response = await NextFetch(`v1/startup${query ? query : ""}`, { method: "GET" });
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        return data;
      }
    } catch {}
  };

  useEffect(() => {
    if (isLoading) return;
    (async () => {
      setIsLoading(true);
      const data = await fetchData(filters);
      setFilteredStartUp(data);
      setIsLoading(false);
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
      />

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
