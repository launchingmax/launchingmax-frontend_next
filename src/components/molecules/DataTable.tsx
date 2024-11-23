"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Icon } from "@iconify/react/dist/iconify.js";

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

  const pageCount = Math.ceil(total / pagination.pageSize);

  const handlePageClick = (event: any) => {
    setPagination((s) => ({ ...s, pageIndex: event.selected + 1 }));
  };

  return (
    <div>
      <div className="rounded-md border border-launchingBlue-05 dark:border-launchingBlue-7">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-launchingBlue-1 dark:bg-launchingBlue-6 dark:border-launchingBlue-7"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-3">
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
                    <TableCell className="px-3 py-[0.625rem]" key={cell.id}>
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
      </div>

      <div className="mt-1 flex justify-center space-x-2">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <span className="text-text-xl">
              <Icon icon="solar:alt-arrow-right-linear" />
            </span>
          }
          onPageChange={handlePageClick}
          marginPagesDisplayed={2} // Number of pages to show at the beginning and end
          pageRangeDisplayed={3} // Number of pages to show around the current page
          pageCount={pageCount}
          previousLabel={
            <span className="text-text-xl">
              <Icon icon="solar:alt-arrow-left-linear" />
            </span>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center  mt-4"
          pageClassName="w-8 h-8 flex items-center justify-center rounded-sm text-launchingGray-5 dark:text-fg-white hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 focus:bg-launchingBlue-2"
          activeClassName="bg-launchingBlue-5 !text-fg-white hover:!text-fg-white"
          previousClassName="px-2 py-2 text-launchingBlue-5 rounded-sm hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 dark:text-launchingBlue-2"
          nextClassName="px-2 py-2 text-launchingBlue-5 rounded-sm hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 dark:text-launchingBlue-2"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakClassName="w-8 h-8 flex items-center justify-center rounded-sm text-gray-600 hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 "
        />
      </div>
    </div>
  );
}
