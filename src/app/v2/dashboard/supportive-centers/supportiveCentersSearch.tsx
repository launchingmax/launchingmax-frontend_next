"use client";

import Search from "@/components/organisms/dashboard/common/search";
import { useEffect, useState } from "react";
import SupportiveCentersFilter from "./supportiveCentersFilter";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { DataTable } from "@/components/molecules/DataTable";
import MyDialog from "@/components/molecules/MyDialog";
import { Field } from "@/components/atoms/Field";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddEditSupportiveCenters from "./addEditSupportiveCenters";
import SupportiveCenterDetail from "./supportiveCenterDetail";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IPagination } from "@/lib/types/types";
import { NextFetch } from "@/configs/api/next-fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { encodeQueryString } from "@/lib/helper";
import { isNil, omitBy } from "lodash-es";
import SupportiveCenterCard from "./supportiveCenterCard";

interface IProps {
  initialData?: any; //IPagination<ISupportiveCenter>;
}

const SupportiveCentersSearch: React.FC<IProps> = ({ initialData }) => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [activeSortItems, setActiveSortItems] = useState({ items: "", createdAt: -1 });
  const [addOrEditType, setAddOrEditType] = useState<"add" | "edit">("add");
  const menuItems = {
    options: {
      items: [
        { label: "Name", value: "name" },
        { label: "Date", value: "createdAt" },
      ],
    },
    actives: activeSortItems,
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });

  const queryClient = useQueryClient();

  // Fetch data
  const {
    data: supportiveCentersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exampleData", filters, pagination.pageIndex],
    queryFn: async () => {
      const response = await NextFetch(
        `/v1/supportive-center${encodeQueryString({
          ...filters,
          // page: pagination.pageIndex,
        })}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data: IPagination<ISupportiveCenter> = await response.json();
        return data;
      }
    },
    initialData,
    enabled: true, //!!filters && !!pagination.pageIndex,
  });

  useEffect(() => {
    console.log("mm-888   ---   supportiveCentersData   ", supportiveCentersData);
  }, [supportiveCentersData]);

  // Mutate data
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      try {
        const response =
          addOrEditType == "edit"
            ? await NextFetch(`/v1/supportive-center/${values._id}`, {
                method: "PUT",
                body: JSON.stringify(values),
              })
            : await NextFetch(`/v1/supportive-center`, {
                method: "POST",
                body: JSON.stringify(values),
              });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async () => {
      // Invalidate query to refetch the latest data
      await queryClient.invalidateQueries({
        queryKey: ["exampleData"],
      });

      setOpenAddEditDialog(false);
    },
  });

  const filterRender = (val: any) => {
    console.log("val", val);
    setFilters((s) => ({ ...s, ...val, page: 1 }));
    setPagination((s) => ({ ...s, pageIndex: 1 }));
  };

  const clearFilter = () => {
    setFilters((s) => ({}));
  };

  const sortRender = (val: any) => {
    setActiveSortItems((s) => ({ ...s, ...val }));
  };

  // **************  TABLE  ****************

  const [selectedRowState, setSelectedRowState] = useState<any>({});
  const [openAddEditDialog, setOpenAddEditDialog] = useState<boolean>(false);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);

  const columns: ColumnDef<ISupportiveCenter>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name: any = row.getValue("name");
        const logo: any = row.original.logo;
        return (
          <div className="flex items-center gap-x-3">
            <Image
              src={
                logo ? `${process.env.NEXT_PUBLIC_ALL_API}${logo}` : `${process.env.NEXT_PUBLIC_ALL_API}/sc/${name}.png`
              }
              alt="Company Logo"
              width={200}
              height={200}
              className="w-6 h-6"
            />
            <h2 className="text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
              {name}
            </h2>
          </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => {
        const country: any = row.getValue("country");

        return (
          <div className="flex items-center gap-x-3">
            <Icon icon={`twemoji:flag-${country.toLowerCase().replaceAll(" ", "-")}`} className="h-4 w-4" />
            <h2 className="text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
              {country}
            </h2>
          </div>
        );
      },
    },
    {
      accessorKey: "industries",
      header: "Industry",
    },
    {
      accessorKey: "strategy",
      header: "Strategy",
    },
    {
      accessorKey: "group",
      header: "Group",
    },

    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const selectedRow = row.original;
        return (
          <div className="flex justify-center items-center gap-x-[0.88rem] ">
            <Icon
              icon="solar:info-square-bold-duotone"
              className="w-6 h-6 text-teal-5 dark:text-teal-3 cursor-pointer"
              onClick={() => {
                setSelectedRowState(selectedRow);
                setOpenDetailDialog(true);
              }}
            />
            <Icon
              icon="solar:pen-2-bold-duotone"
              className="w-6 h-6 text-launchingBlue-6 dark:text-launchingBlue-3 cursor-pointer"
              onClick={() => {
                setSelectedRowState(selectedRow);
                setOpenAddEditDialog(true);
                setAddOrEditType("edit");
              }}
            />
            <Icon
              icon="solar:folder-error-bold-duotone"
              className="w-6 h-6 text-salmon-6 dark:text-salmon-3 cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (values: ISupportiveCenter) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    let sort = undefined;
    if (activeSortItems?.items.length !== 0) {
      const sortBy = activeSortItems?.items;
      const cerateAt = activeSortItems?.createdAt;
      sort = JSON.stringify({ [sortBy]: cerateAt });
    }
    setFilters((s) => ({ ...s, sort }));
  }, [activeSortItems]);

  useEffect(() => {
    //@ts-ignore
    queryClient.invalidateQueries(["exampleData"]);
  }, [filters]);

  useEffect(() => {
    setFilters((s) => ({ ...s, page: pagination.pageIndex }));
  }, [pagination]);

  return (
    <div className="py-6">
      <Search
        filterRender={filterRender}
        clearFilter={clearFilter}
        sortRender={sortRender}
        searchInputName="name"
        initData={filters}
        Filter={SupportiveCentersFilter}
        menuItems={menuItems}
        children={
          <Icon
            icon="solar:add-circle-bold-duotone"
            className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
            onClick={() => {
              setAddOrEditType("add");
              setSelectedRowState({});
              setOpenAddEditDialog(true);
            }}
          />
        }
      />

      <div className="hidden md:block">
        {!isLoading ? (
          <DataTable
            //@ts-ignore
            columns={columns}
            data={supportiveCentersData?.items}
            pagination={pagination}
            setPagination={setPagination}
            total={supportiveCentersData.total}
          />
        ) : (
          <h2 className="text-text-xl font-bold text-red-300 leading-10 tracking-widest">LOADING ...</h2>
        )}
      </div>

      <div className="block md:hidden">
        {supportiveCentersData?.items.map((item: ISupportiveCenter) => (
          <SupportiveCenterCard
            item={item}
            setSelectedRowState={setSelectedRowState}
            setOpenAddEditDialog={setOpenAddEditDialog}
            setAddOrEditType={setAddOrEditType}
            setOpenDetailDialog={setOpenDetailDialog}
          />
        ))}
      </div>

      <MyDialog
        open={openAddEditDialog}
        setOpen={setOpenAddEditDialog}
        className={{ dialogContent: "" }}
        body={<AddEditSupportiveCenters editRow={selectedRowState} addEditRender={handleSubmit} type={addOrEditType} />}
      />

      <MyDialog
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        body={<SupportiveCenterDetail data={selectedRowState} />}
      />
    </div>
  );
};

export default SupportiveCentersSearch;
