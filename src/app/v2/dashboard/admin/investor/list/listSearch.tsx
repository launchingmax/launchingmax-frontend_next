"use client";

import Search from "@/components/organisms/dashboard/common/search";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import InvestorItems from "./investorItems";
import { IPagination } from "@/lib/types/types";
import InvestorFilter from "./investorFilter";
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import MyReactPaginate from "@/components/molecules/MyReactPaginate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NextFetch } from "@/configs/api/next-fetch";
import { encodeQueryString } from "@/lib/helper";
import { UserType } from "@/lib/constants/user.const";
import { isObject } from "lodash-es";
import MyDialog from "@/components/molecules/MyDialog";
import InvestorDetail from "./investorDetail";
import InvestorInfo from "@/components/organisms/dashboard/common/investorInfo/investorInfo";

interface IProps {
  initialData: IPagination<IUser>;
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
    console.log("filter val   ", val);
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

  const buildQuery = (filters: any) => {
    const query: any = {};
    // Check each key and add only if it has a value
    if (filters.invTerm && filters.invTerm.length > 0) {
      query["profile.invTerm"] = { $in: filters.invTerm };
    }

    if (filters.countries && filters.countries.length > 0) {
      query["profile.targetCountries"] = { $in: filters.countries };
    }

    if (filters.invRange) {
      query["profile.invRange"] = filters.invRange;
    }

    if (filters.inputSearch) {
      query.$or = [
        { firstName: { $regex: filters.inputSearch, $options: "i" } },
        { lastName: { $regex: filters.inputSearch, $options: "i" } },
      ];
    }

    query["types.type"] = UserType.Investor; // Always include this
    console.log("filter val  ", query);

    return query;
  };

  // Fetch data
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["usersData", filters, pagination.pageIndex],
    queryFn: async () => {
      const body: Record<string, unknown>[] = [
        {
          $lookup:
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            {
              from: "profiles",
              localField: "profile",
              foreignField: "_id",
              as: "profile",
            },
        },
        {
          $match:
            /**
             * query: The query in MQL.
             */
            buildQuery(filters),
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$profile",
            },
        },
      ];
      if (filters.sort) {
        body.push({ $sort: JSON.parse(filters.sort as string) });
      }
      console.log("----", body);
      const response = await NextFetch(`/v1/aggregate/users`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data: IPagination<IUser> = await response.json();
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
    queryClient.invalidateQueries({ queryKey: ["usersData"] });
  }, [filters]);

  return (
    <div>
      <DashSection heading="Investor List" />
      <Search
        searchInputName="inputSearch"
        Filter={InvestorInfo} //InvestorFilter
        initData={filters}
        filterRender={filterRender}
        sortRender={sortRender}
        clearFilter={clearFilter}
        menuItems={menuItems}
        heading={
          <div className="flex flex-row justify-start items-center space-x-3 p-3">
            <Icon icon="solar:user-check-bold-duotone" className="text-2xl text-mauve-5 dark:text-mauve-3" />
            <h2 className="text-mauve-5 dark:text-mauve-3 tracking-wide text-md font-bold">
              Our investors in{" "}
              <span className="text-launchingBlue-5">
                Launching<span className="text-launchingGray-5">Max</span>
              </span>
            </h2>
          </div>
        }
        className={{
          headingSeparator: "bg-gradient-to-r from-mauve-5/100 to-mauve-5/0 dark:from-mauve-3/100 dark:to-mauve-3/0",
        }}
        useRegex={false}
      />
      {usersData?.items && (
        <InvestorItems data={usersData.items} setOpenDialog={setOpenInfoDialog} setSelectedRow={setSelectedRow} />
      )}
      {usersData && <MyReactPaginate total={usersData?.total} pagination={pagination} setPagination={setPagination} />}
      {selectedRow && (
        <MyDialog open={openInfoDialog} setOpen={setOpenInfoDialog} body={<InvestorDetail user={selectedRow} />} />
      )}
    </div>
  );
};

export default ListSearch;
