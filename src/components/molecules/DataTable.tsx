"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import MyReactPaginate from "./MyReactPaginate";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  total: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  total,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    //onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  return (
    <div>
      <div className="rounded-md border border-launchingBlue-05 dark:border-launchingBlue-7">
        <Table className="border-b-[1px] border-launchingBlue-05 dark:border-launchingBlue-7 ">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-launchingBlue-1 dark:bg-launchingBlue-6 dark:border-launchingBlue-7"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-3 border-l-[1px] border-r-[1px] border-launchingBlue-05 dark:border-launchingBlue-7"
                    >
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
                <TableRow
                  className="hover:bg-launchingBlue-05 dark:bg-launchingBlue-8 border-launchingBlue-05 dark:border-launchingBlue-7"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="px-3 py-[0.625rem] border-l-[1px] border-r-[1px] border-launchingBlue-05 dark:border-launchingBlue-7 !text-red-500 dark:!text-fg-white !text-text-sm !font-regular leading-[1.1375rem]"
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
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

        <MyReactPaginate total={total} pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
}
