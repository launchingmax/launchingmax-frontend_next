"use client";
import MyDialog from "@/components/molecules/MyDialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ISearch {
  className?: string;
  initData?: Record<string, unknown>;
  filterRender?: (params: any) => void;
  clearFilter?: () => void;
  sortRender?: (params: any) => void;
  clearSort?: () => void;
  Filter?: React.ComponentType<any>;
  menuItems?: any;
  resetForm?: boolean;
  children?: React.ReactNode;
  searchInputName: string;
}
const Search: React.FC<ISearch> = ({
  className,
  initData,
  filterRender,
  clearFilter,
  sortRender,
  clearSort,
  Filter,
  menuItems,
  resetForm,
  searchInputName,
  children,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const callback = (val: any) => {
    setDialogOpen(() => {
      filterRender && filterRender(val);
      return false;
    });
  };

  const clearCallback = (val: any) => {
    setDialogOpen(() => {
      clearFilter && clearFilter();
      return false;
    });
  };

  const createAtSortItems = [
    { label: "Ascending", value: 1 },
    { label: "Descending", value: -1 },
  ];

  return (
    <div className={"flex items-center md:px-6 py-3 space-x-2 md:space-x-3"}>
      <div className="flex flex-col w-full ">
        <div className={cn(className, "flex space-x-3 pb-1 items-center")}>
          <Icon
            icon="solar:minimalistic-magnifer-bold-duotone"
            className="text-2xl text-launchingBlue-5 dark:text-launchingBlue-1"
          />

          <Separator orientation="vertical" className="h-6" />
          <Input
            name="search"
            onKeyDown={(v: any) => {
              v.code === "Enter" &&
                filterRender &&
                filterRender({ [searchInputName]: v.target.value !== "" ? `/${v.target.value}/` : undefined });
            }}
            placeholder="Search it..."
            className="border-0 w-full bg-transparent focus-within:outline-none focus-within:border-0 focus-within:ring-0"
          />
        </div>
        <Separator orientation="horizontal" className="w-full" />
      </div>

      {Filter && (
        <MyDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          dialogTrigger={
            <Icon
              onClick={() => setDialogOpen(!isDialogOpen)}
              icon="solar:filter-bold-duotone"
              className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
            />
          }
          body={
            <Filter filterRender={callback} clearFilter={clearCallback} initData={initData} resetForm={resetForm} />
          }
        />
      )}

      {sortRender && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Icon
              icon="solar:sort-from-bottom-to-top-line-duotone"
              className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="start" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {menuItems?.options?.items.map((item: any) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => sortRender({ items: item.value })}
                className="flex items-center justify-between"
              >
                {item.label}
                {menuItems?.actives?.items === item.value && (
                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            {createAtSortItems.map((item: any) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => sortRender({ createdAt: item.value })}
                className="flex items-center justify-between"
              >
                {item.label}
                {menuItems?.actives?.createdAt === item.value && (
                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {children}
    </div>
  );
};

export default Search;
