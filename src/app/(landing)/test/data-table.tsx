"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/molecules/MyDialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Field } from "@/components/atoms/Field";
import MyInput from "@/components/atoms/myInput";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed" | "aaa";
  email: string;
};

interface DataTableProps<TData, TValue> {
  columnssss?: ColumnDef<TData, TValue>[];
  dataa?: TData[];
}

export function DataTable<TData, TValue>({ columnssss, dataa }: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<any[]>([
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]);
  const [editRow, setEditRow] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (editRow) {
      form.reset(editRow);
    }
  }, [editRow]);

  const handleEditSubmit = (values: any) => {
    //setData((prevData) => prevData.map((row) => (true ? { status: "success" } : row)));
    console.log(values);
    // setData((prevData) => prevData.map((row) => (true ? { ...row, ...values } : row)));

    if (!values) return;

    // Only keep fields that have changed
    const changedFields = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => values[key as keyof Payment] !== undefined)
    ) as Partial<Payment>;
    console.log(changedFields);

    setData((prevData) => prevData.map((row) => (row.id === editRow.id ? { ...row, ...changedFields } : row)));

    setOpen(false);
  };

  const columns: ColumnDef<TData, TValue>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const form = useForm({
    defaultValues: {
      status: "processing",
      amount: "2020",
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="primary" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="primary" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

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
                      Input={Input}
                      InputProps={{
                        type: "text",
                        placeholder: "status",
                      }}
                    />

                    <Field
                      name="email"
                      control={form.control}
                      value={editRow?.email}
                      Input={Input}
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
  );
}
