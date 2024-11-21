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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  currentPage?: number;
  setCurrentPage: (page: number) => void;
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 5,
  //currentPage = 1,
  setCurrentPage,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  // const [pagination, setPagination] = useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: pageSize,
  // });

  const [currentPageState, setCurrentPageState] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    console.log("mmmm  page   , ", page);
    setCurrentPageState(page);
    setCurrentPage(page);
  };

  const table = useReactTable({
    data,
    columns,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    pageCount: Math.ceil(data.length / pagination.pageSize),
    onPaginationChange: setPagination, // Update parent pagination state
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

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

      <div className="mt-4 flex justify-center space-x-2">
        <button
          className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPageState - 1)}
          disabled={currentPageState === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${
                page === currentPageState ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="px-3 py-1 text-gray-500 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPageState + 1)}
          disabled={currentPageState === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
