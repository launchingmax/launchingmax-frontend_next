"use client";

import Search from "@/components/organisms/dashboard/common/search";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IPagination } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import MyReactPaginate from "@/components/molecules/MyReactPaginate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NextFetch } from "@/configs/api/next-fetch";
import { encodeQueryString } from "@/lib/helper";
import { UserType } from "@/lib/constants/user.const";
import { isObject } from "lodash-es";
import MyDialog from "@/components/molecules/MyDialog";
import RequestItems from "./requestItems";
import { IStartup } from "@/lib/models/startup.model";

interface IProps {
  initialData: IPagination<IStartup>;
}
const ListSearch: React.FC<IProps> = ({ initialData }) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [activeSortItems, setActiveSortItems] = useState({ items: "", createdAt: -1 });
  const menuItems = {
    options: {
      items: [
        { label: "First name", value: "firstName" },
        { label: "Last name", value: "lastName" },
        // { label: "Date", value: "createdAt" },
      ],
    },
    actives: activeSortItems,
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });

  const [shouldFetch, setShouldFetch] = useState(false); // Initially disabled

  const [openInfoDialog, setOpenInfoDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IUser>();

  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val, page: 1 }));
    setPagination((s) => ({ ...s, pageIndex: 1 }));
  };

  const clearFilter = () => {
    setFilters((s) => ({}));
  };

  const sortRender = (val: any) => {
    setActiveSortItems((s) => ({ ...s, ...val }));
  };

  const queryClient = useQueryClient();

  // const buildQuery = (filters: any) => {
  //   const query: any = {};
  //   // Check each key and add only if it has a value
  //   if (filters.invTerm && filters.invTerm.length > 0) {
  //     query["profile.invTerm"] = { $in: filters.invTerm };
  //   }

  //   if (filters.countries && filters.countries.length > 0) {
  //     query["profile.targetCountries"] = { $in: filters.countries };
  //   }

  //   if (filters.invRange) {
  //     query["profile.invRange"] = filters.invRange;
  //   }

  //   if (filters.inputSearch) {
  //     query.$or = [
  //       { firstName: { $regex: filters.inputSearch, $options: "i" } },
  //       { lastName: { $regex: filters.inputSearch, $options: "i" } },
  //     ];
  //   }

  //   query["types.type"] = UserType.Investor; // Always include this

  //   return query;
  // };

  // Fetch data
  const {
    data: requestsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requestsData", filters, pagination.pageIndex],
    queryFn: async () => {
      // if (filters.sort) {
      //   body.push({ $sort: JSON.parse(filters.sort as string) });
      // }
      // console.log("----", body);
      const response = await NextFetch(``, {
        method: "POST",
        // body: JSON.stringify(body),
      });
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        return data;
      }
    },
    initialData,
    enabled: shouldFetch, //!!filters && !!pagination.pageIndex,
  });

  useEffect(() => {
    let sort = undefined;
    if (activeSortItems?.items.length !== 0) {
      const sortBy = activeSortItems?.items;
      const cerateAt = activeSortItems?.createdAt;
      sort = JSON.stringify({ [sortBy]: cerateAt });
    }
    setFilters((s) => ({ ...s, sort }));
  }, [activeSortItems]);

  // Enable fetching when `filters` changes
  useEffect(() => {
    if (Object.keys(filters).length !== 0) {
      setShouldFetch(true);
    }
    queryClient.invalidateQueries({ queryKey: ["requestsData"] });
  }, [filters]);

  return (
    <div>
      <DashSection heading="Request" />

      <Search
        searchInputName="inputSearch"
        //Filter={InvestorFilter}
        initData={filters}
        filterRender={filterRender}
        sortRender={sortRender}
        clearFilter={clearFilter}
        menuItems={menuItems}
        heading={
          <div className="flex flex-row justify-start items-center space-x-3 p-3">
            <Icon
              icon="solar:hand-money-bold-duotone"
              className="text-2xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-launchingBlue-5 dark:text-fg-white tracking-wide text-md font-bold">
              Investor reaquest
            </h2>
          </div>
        }
        className={{
          headingSeparator:
            "bg-gradient-to-r from-[#1665AE]/100 to-[#1665AE00]/0 dark:from-mauve-3/100 dark:to-mauve-3/0",
        }}
        useRegex={false}
      />

      {requestsData && (
        <RequestItems data={requestsData.items} setOpenDialog={setOpenInfoDialog} setSelectedRow={setSelectedRow} />
      )}

      {requestsData && (
        <MyReactPaginate total={requestsData.total} pagination={pagination} setPagination={setPagination} />
      )}

      {/* {selectedRow && (
        <MyDialog open={openInfoDialog} setOpen={setOpenInfoDialog} body={<InvestorDetail user={selectedRow} />} />
      )} */}
    </div>
  );
};

export default ListSearch;
