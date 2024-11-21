"use client";

import Search from "@/components/organisms/dashboard/common/search";
import { useEffect, useState } from "react";
import SupportiveCentersFilter from "./supportiveCentersFilter";
import { ColumnDef } from "@tanstack/react-table";
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
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const queryClient = useQueryClient();

  // Fetch data
  const {
    data: supportiveCentersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exampleData", JSON.stringify(filters), currentPage],
    queryFn: async () => {
      const response = await NextFetch(
        `/v1/supportive-center${encodeQueryString({
          ...filters,
          // page: currentPage,
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
    enabled: !!filters && Object.keys(filters).length > 0,
  });

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
    // val.page = 1;

    setFilters((s) => ({ ...s, ...val }));
  };

  const clearFilter = () => {
    setFilters((s) => ({}));
  };

  const sortRender = (val: any) => {
    setActiveSortItems((s) => ({ ...s, ...val }));
  };

  useEffect(() => {
    console.log(" mm 303030 - ---    ", currentPage);
    setFilters((s) => ({ ...s, page: currentPage }));
  }, [currentPage]);

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
            <h2>{name}</h2>
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
            <h2>{country}</h2>
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
    // else {
    //   const cerateAt = activeSortItems?.createdAt;
    //   sort = JSON.stringify({ cerateAt: cerateAt });
    // }
    setFilters((s) => ({ ...s, sort }));
  }, [activeSortItems]);

  useEffect(() => {
    //@ts-ignore
    queryClient.invalidateQueries(["exampleData"]);
  }, [filters]);

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

      <div className="container mx-auto ">
        {!isLoading ? (
          <DataTable
            //@ts-ignore
            columns={columns}
            data={supportiveCentersData?.items}
            //currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagination={pagination}
            setPagination={setPagination}
          />
        ) : (
          <h2 className="text-text-xl font-bold text-red-300 leading-10 tracking-widest">LOADING ...</h2>
        )}

        <MyDialog
          open={openAddEditDialog}
          setOpen={setOpenAddEditDialog}
          className={{ dialogContent: "" }}
          body={
            <AddEditSupportiveCenters editRow={selectedRowState} addEditRender={handleSubmit} type={addOrEditType} />
          }
        />

        <MyDialog
          open={openDetailDialog}
          setOpen={setOpenDetailDialog}
          body={<SupportiveCenterDetail data={selectedRowState} />}
        />
      </div>
    </div>
  );
};

export default SupportiveCentersSearch;
