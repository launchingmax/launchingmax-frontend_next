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

export type DataTableType = {
  id: string;
  name: string;
  country: string;
  industry: string;
  strategy: string;
  group: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const SupportiveCentersSearch = () => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
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

  const filterRender = (val: any) => {
    setFilters((s) => ({ ...s, ...val }));
  };

  const clearFilter = () => {
    setFilters((s) => ({}));
  };

  const sortRender = (val: any) => {
    setActiveSortItems((s) => ({ ...s, ...val }));
  };

  // **************  TABLE  ****************

  const [editRow, setEditRow] = useState<any>({});
  const [openAddEditDialog, setOpenAddEditDialog] = useState<boolean>(false);
  const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);

  const [dataState, setDataState] = useState<DataTableType[]>([
    {
      id: "728ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728sds",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72ewrf",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "74rt5ed52f",
      name: "zzzzzzzzzzzzzzzzz",
      country: "Iran",
      industry: "frewf",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728bdbd2f",
      name: "zzzzzzzzzzzzzzzzz",
      country: "Iran",
      industry: "fewa",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72bdff",
      name: "zzzzzzzzzzzzzzzzz",
      country: "Iran",
      industry: "njhyt",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728sds",
      name: "bbbbbbbbbbbbbbbbbbbb",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72ewrf",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "74rt5ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "frewf",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728bdbd2f",
      name: "bbbbbbbbbbbbbbbbbbbb",
      country: "Iran",
      industry: "fewa",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72bdff",
      name: "bbbbbbbbbbbbbbbbbbbb",
      country: "Iran",
      industry: "njhyt",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728sds",
      name: "bbbbbbbbbbbbbbbbbbbb",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72ewrf",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "74rt5ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "frewf",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728bdbd2f",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "fewa",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72bdff",
      name: "fwerfwef",
      country: "Iran",
      industry: "njhyt",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728sds",
      name: "fwerfwef",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72ewrf",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "ssss",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "74rt5ed52f",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "frewf",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728bdbd2f",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "fewa",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "72bdff",
      name: "aaaaaaaaaaaaa",
      country: "Iran",
      industry: "njhyt",
      strategy: "cgfdacf",
      group: "gydawg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]);

  const columns: ColumnDef<DataTableType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const val: any = row.getValue("name");
        return (
          <div className="flex items-center gap-x-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_ALL_API}/ideas/65f6a15c58bda0151f8cfd95/vb/f4985ed7-2302-44bf-ac6b-bc17388a108e.png`}
              alt="Company Logo"
              width={200}
              height={200}
              className="w-6 h-6"
            />
            <h2>{val}</h2>
          </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => {
        const val: any = row.getValue("country");
        //.toLowerCase().replaceAll(" ", "-")}
        return (
          <div className="flex items-center gap-x-3">
            <Icon icon={`twemoji:flag-iran`} className="h-4 w-4" />
            <h2>{val}</h2>
          </div>
        );
      },
    },
    {
      accessorKey: "industry",
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

    // {
    //   accessorKey: "email",
    //   header: "Email",
    //   //@ts-ignore
    //   cell: (info) => <div className="text-center font-bold">{info?.getValue()}</div>,
    // },
    // {
    //   accessorKey: "amount",
    //   header: () => <div className="">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"));
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount);

    //     return <div className=" font-medium ">{formatted}</div>;
    //   },
    // },
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
                setEditRow(selectedRow);
                setOpenDetailDialog(true);
              }}
            />
            <Icon
              icon="solar:pen-2-bold-duotone"
              className="w-6 h-6 text-launchingBlue-6 dark:text-launchingBlue-3 cursor-pointer"
              onClick={() => {
                setEditRow(selectedRow);
                setOpenAddEditDialog(true);
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

  const handleEditSubmit = (values: any) => {
    if (!values) return;
    // Only keep fields that have changed
    const changedFields = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => values[key as keyof DataTableType] !== undefined)
    ) as Partial<DataTableType>;
    setDataState((prevData) => prevData.map((row) => (row.id === editRow.id ? { ...row, ...changedFields } : row)));
    setOpenAddEditDialog(false);
  };

  return (
    <div className="py-6">
      {/* <AddEditSupportiveCenters editRow={editRow} addEditRender={handleEditSubmit} /> */}

      <Search
        filterRender={filterRender}
        clearFilter={clearFilter}
        sortRender={sortRender}
        initData={filters}
        Filter={SupportiveCentersFilter}
        menuItems={menuItems}
        children={<h2>hello</h2>}
      />

      <div className="container mx-auto py-10">
        <DataTable
          //@ts-ignore
          columns={columns}
          data={dataState}
        />

        <MyDialog
          open={openAddEditDialog}
          setOpen={setOpenAddEditDialog}
          className={{ dialogContent: "" }}
          body={<AddEditSupportiveCenters editRow={editRow} addEditRender={handleEditSubmit} />}
        />

        <MyDialog
          open={openDetailDialog}
          setOpen={setOpenDetailDialog}
          body={<SupportiveCenterDetail data={editRow} />}
        />
      </div>
    </div>
  );
};

export default SupportiveCentersSearch;
