"use client";

import Search from "@/components/organisms/dashboard/common/search";
import DashSection from "@/components/organisms/dashboard/DashSection";

import { IPagination } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import MyReactPaginate from "@/components/molecules/MyReactPaginate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextFetch } from "@/configs/api/next-fetch";
import MyDialog from "@/components/molecules/MyDialog";
import RequestItems from "./requestItems";
import { IStartup } from "@/lib/models/startup.model";
import ConfirmDialog, { ConfirmDialogType } from "@/components/organisms/dashboard/common/ConfirmDialog";
import RequestDetail from "./requestDetail";
import { RequestStatus } from "@/lib/constants/request.enum";
import _ from "lodash";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SonnerToasterWrapper, SonnerType } from "@/components/molecules/SonnerToasterWrapper";

interface IProps {
  initialData?: IPagination<IStartup> | null;
}

const ListSearch: React.FC<IProps> = ({ initialData }) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 50,
  });

  const [shouldFetch, setShouldFetch] = useState(false); // Initially disabled
  const [isLoading, setIsLoading] = useState(false);

  const [openInfoDialog, setOpenInfoDialog] = useState<boolean>(false);
  const [selectedStartup, setSelectedStartup] = useState<IStartup>();
  const [openAcceptDialog, setOpenAcceptDialog] = useState<boolean>(false);
  const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false);
  const [acceptRejectType, setAcceptRejectType] = useState<RequestStatus>();
  const [requestsData, setRequestsData] = useState<IPagination<IStartup> | null | undefined>(initialData);

  useEffect(() => {
    setRequestsData(initialData);
  }, [initialData]);

  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val, page: 1 }));
    setPagination((s) => ({ ...s, pageIndex: 1 }));
  };
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isError } = useQuery({
    queryKey: ["requestsData", filters, pagination.pageIndex],
    queryFn: async () => {
      const response = await NextFetch(
        `/v1/startup?investors.status=${RequestStatus.Requested}&status=startup&populate=${JSON.stringify([
          { path: "investors.user", select: "firstName lastName avatar", populate: { path: "profile" } },
        ])}`,
        {
          method: "Get",
        }
      );
      if (response.ok) {
        const data: IPagination<IStartup> = await response.json();
        data.items = data?.items?.reduce((pre: any, cur: any) => {
          const investors = cur.investors?.reduce((p: any, c: any) => {
            const d = {
              ...cur,
              investors: [c],
            };
            if (c.status === "requested") p.push(d);
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
    data ? setRequestsData(data) : setRequestsData(initialData!);
  }, [data]);

  // filter client side
  useEffect(() => {
    const filteredData: IStartup[] = _.filter(
      requestsData?.items,
      (item: IStartup) =>
        item?.investors?.[0]?.user?.firstName?.toLowerCase().includes(filters?.inputSearch) ||
        item?.investors?.[0]?.user?.lastName?.toLowerCase().includes(filters?.inputSearch)
    ) as IStartup[];

    // setRequestsData((s) =>
    //   // @ts-ignore no need to check type.
    //   ({ ...s, items: filters?.inputSearch ? filteredData : data?.items ?? [] })
    // );
  }, [filters]);

  const mutation = useMutation({
    mutationFn: async () => {
      const userId = selectedStartup?.investors?.[0]?.user?._id;
      const body = {
        user: userId,
        status: acceptRejectType,
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
              description: `The request was ${
                acceptRejectType == RequestStatus.Accepted ? "accepted" : "rejected"
              } successfully.`,
            });
            setShouldFetch(true);
          } else {
            SonnerToasterWrapper("error!", {
              type: SonnerType.error,
              description: `The request was not ${
                acceptRejectType == RequestStatus.Accepted ? "accepted" : "rejected"
              } successfully.`,
            });
          }
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requestsData"] });
      setOpenAcceptDialog(false);
      setOpenRejectDialog(false);
    },
  });

  const handleAcceptOrRejectSubmit = async () => {
    setIsLoading(true);
    mutation.mutate();
  };

  return (
    <div>
      <DashSection heading="Request" />

      <Search
        searchInputName="inputSearch"
        //Filter={InvestorFilter}
        initData={filters}
        filterRender={filterRender}
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
            "bg-gradient-to-r from-[#1665AE]/100 to-[#1665AE00]/0 dark:from-[#FFF]/100 dark:to-launchingBlue-7",
        }}
        useRegex={false}
      />

      {requestsData?.items && (
        <RequestItems
          data={requestsData.items}
          setOpenInfoDialog={setOpenInfoDialog}
          setSelectedRow={setSelectedStartup}
          setOpenAcceptDialog={setOpenAcceptDialog}
          setOpenRejectDialog={setOpenRejectDialog}
          setAcceptRejectType={setAcceptRejectType}
        />
      )}

      {requestsData && (
        <MyReactPaginate total={requestsData?.total} pagination={pagination} setPagination={setPagination} />
      )}

      <MyDialog open={openInfoDialog} setOpen={setOpenInfoDialog} body={<RequestDetail data={selectedStartup} />} />

      <ConfirmDialog
        type={ConfirmDialogType.success}
        open={openAcceptDialog}
        setOpen={setOpenAcceptDialog}
        title="Are you sure you want to accept this request?"
        actionButtonRender={handleAcceptOrRejectSubmit}
        cancelButtonRender={() => setOpenAcceptDialog(false)}
        actionButtonTitle="Accept Request"
        cancelButtonTitle="Cancel"
        loading={isLoading}
      />

      <ConfirmDialog
        type={ConfirmDialogType.error}
        open={openRejectDialog}
        setOpen={setOpenRejectDialog}
        title="Are you sure you want to reject this request?"
        actionButtonRender={handleAcceptOrRejectSubmit}
        cancelButtonRender={() => setOpenRejectDialog(false)}
        actionButtonTitle="Reject Request"
        cancelButtonTitle="Cancel"
        loading={isLoading}
      />
    </div>
  );
};

export default ListSearch;
