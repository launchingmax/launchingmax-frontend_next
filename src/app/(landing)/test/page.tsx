"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "./columns";
import { DataTable } from "../../../components/molecules/DataTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import MyDialog from "@/components/molecules/MyDialog";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { Field } from "@/components/atoms/Field";
import MyInput from "@/components/atoms/myInput";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default function DemoPage() {
  //const data = await getData();

  const form = useForm();
  const [editRow, setEditRow] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);

  const [dataState, setDataState] = useState<any[]>([
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edwe52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728reed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edty52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edyj52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728eiod52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728eid52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edkh52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },

    {
      id: "728ed5.hl2f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed5fuuy2f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edkyu52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },

    {
      id: "728evdsd52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "Status",
      meta: { style: "text-center text-red bg-red-400" },
    },
    {
      accessorKey: "email",
      header: "Email",
      //@ts-ignore
      cell: (info) => <div className="text-center font-bold">{info?.getValue()}</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className=" font-medium ">{formatted}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div className="flex ">
            <Button
              onClick={() => {
                setEditRow(payment);
                setOpen(true);
              }}
            >
              Edit
            </Button>
            <Button>aaa</Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (editRow) {
      form.reset(editRow);
    }
  }, [editRow]);

  const handleEditSubmit = (values: any) => {
    if (!values) return;
    // Only keep fields that have changed
    const changedFields = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => values[key as keyof Payment] !== undefined)
    ) as Partial<Payment>;
    setDataState((prevData) => prevData.map((row) => (row.id === editRow.id ? { ...row, ...changedFields } : row)));
    setOpen(false);
  };

  return (
    <>
      <div className="container mx-auto py-10">
        {/* <DataTable
          //@ts-ignore
          columns={columns}
          data={dataState}
        /> */}

        <MyDialog
          open={open}
          setOpen={setOpen}
          body={
            <div>
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 h-max">
                <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-1/3">
                  <h2 className="text-lg font-medium">Edit Row</h2>

                  <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleEditSubmit)}>
                      <Field
                        name="status"
                        control={form.control}
                        Input={MyInput}
                        InputProps={{
                          type: "text",
                          placeholder: "status",
                        }}
                      />

                      <Field
                        name="email"
                        control={form.control}
                        value={editRow?.email}
                        Input={MyInput}
                        InputProps={{
                          type: "text",
                          placeholder: "email",
                        }}
                      />

                      <Field
                        name="amount"
                        control={form.control}
                        value={editRow?.amount}
                        Input={MyInput}
                        InputProps={{
                          type: "text",
                          placeholder: "amount",
                        }}
                      />

                      <div className="flex justify-end space-x-4">
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
