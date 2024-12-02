"use client";
import Search from "@/components/organisms/dashboard/common/search";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import { IStartup } from "@/lib/models/startup.model";
import { IPagination } from "@/lib/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ArchiveItem from "./archiveItem";
import MyReactPaginate from "@/components/molecules/MyReactPaginate";
import ConfirmDialog, { ConfirmDialogType } from "@/components/organisms/dashboard/common/ConfirmDialog";
import _ from "lodash";
import { SonnerToasterWrapper, SonnerType } from "@/components/molecules/SonnerToasterWrapper";

interface IProps {
  initialData: IPagination<IStartup>;
}

const ListSearch: React.FC<IProps> = ({ initialData }) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 50,
  });

  const [shouldFetch, setShouldFetch] = useState(false); // Initially disabled
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<IStartup>();
  const [openRestoreDialog, setOpenRestoreDialog] = useState<boolean>(false);
  const [requestsData, setRequestsData] = useState<IPagination<IStartup>>(initialData);
  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val, page: 1 }));
    setPagination((s) => ({ ...s, pageIndex: 1 }));
  };
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isError } = useQuery({
    queryKey: ["archiveData", filters, pagination.pageIndex],
    queryFn: async () => {
      const response = await NextFetch(
        `/v1/startup?status=startup&populate=${JSON.stringify([
          { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
        ])}`,
        {
          method: "Get",
        }
      );
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        data.items = data.items?.reduce((pre: any, cur: any) => {
          const investors = cur.investors?.reduce((p: any, c: any) => {
            const d = {
              ...cur,
              investors: [c],
            };
            if (c.status === RequestStatus.Rejected) p.push(d);
            return p;
          }, []);

          pre.push(...investors);
          setIsLoading(false);
          return pre;
        }, []);

        return data;
      }
    },
    initialData,
    enabled: shouldFetch, //!!filters && !!pagination.pageIndex,
  });

  useEffect(() => {
    data ? setRequestsData(data) : setRequestsData(initialData);
  }, [data]);

  // filter client side
  useEffect(() => {
    const filteredData: IStartup[] = _.filter(
      requestsData?.items,
      (item: IStartup) =>
        item?.investors?.[0]?.user?.firstName?.toLowerCase().includes(filters?.inputSearch) ||
        item?.investors?.[0]?.user?.lastName?.toLowerCase().includes(filters?.inputSearch)
    ) as IStartup[];

    setRequestsData((s) => ({ ...s, items: filters?.inputSearch ? filteredData : data?.items ?? [] }));
  }, [filters]);

  const mutation = useMutation({
    mutationFn: async () => {
      const userId = selectedStartup?.investors?.[0]?.user?._id;
      const body = {
        user: userId,
        status: RequestStatus.Requested,
      };
      try {
        const response = await NextFetch(`/v1/startup/${selectedStartup?._id}/investor-request/${userId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.acknowledged && data.modifiedCount > 0) {
            SonnerToasterWrapper("successful!", {
              type: SonnerType.success,
              description: "The request was restored successfully.",
            });
            setShouldFetch(true);
          } else {
            SonnerToasterWrapper("error!", {
              type: SonnerType.error,
              description: "The request was not restored successfully.",
            });
          }
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["archiveData"] });
      setOpenRestoreDialog(false);
    },
  });

  const handleAcceptOrRejectSubmit = async () => {
    setIsLoading(true);
    mutation.mutate();
  };

  return (
    <div>
      <DashSection heading="Archive" />

      <Search
        searchInputName="inputSearch"
        //Filter={InvestorFilter}
        initData={filters}
        filterRender={filterRender}
        heading={
          <div className="flex flex-row justify-start items-center space-x-3 p-3">
            <Icon icon="solar:archive-bold-duotone" className="text-2xl text-salmon-6 dark:text-salmon-5" />
            <h2 className="text-salmon-6 dark:text-salmon-5 tracking-wide text-md font-bold">Rejected requests</h2>
          </div>
        }
        className={{
          headingSeparator: "bg-gradient-to-r from-[#FF4B55]/100 to-white dark:to-launchingBlue-8 ",
        }}
        useRegex={false}
      />

      {requestsData?.items && (
        <ArchiveItem
          data={requestsData.items}
          setSelectedRow={setSelectedStartup}
          setOpenRestoreDialog={setOpenRestoreDialog}
        />
      )}

      {requestsData && (
        <MyReactPaginate total={requestsData?.total} pagination={pagination} setPagination={setPagination} />
      )}

      <ConfirmDialog
        type={ConfirmDialogType.default}
        open={openRestoreDialog}
        setOpen={setOpenRestoreDialog}
        title="Are you sure you want to restore this request?"
        actionButtonRender={handleAcceptOrRejectSubmit}
        cancelButtonRender={() => setOpenRestoreDialog(false)}
        actionButtonTitle="Restore Request"
        cancelButtonTitle="Cancel"
        loading={isLoading}
      />
    </div>
  );
};

export default ListSearch;
