"use client";
import MyDialog from "@/components/molecules/MyDialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface ISearch {
  className?: string;
  filterRender?: (params: any) => void;
  sortRender?: () => void;
  Filter?: React.ComponentType<any>;
}
const Search: React.FC<ISearch> = ({ className, filterRender, sortRender, Filter }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const callback = (val: any) => {
    setDialogOpen(false);
    filterRender && filterRender(val);
  };

  return (
    <div className={"flex items-center px-6 py-3 space-x-3"}>
      <div className="flex flex-col w-full ">
        <div className={cn(className, "flex space-x-3 pb-1 items-center")}>
          <Icon
            icon="solar:minimalistic-magnifer-bold-duotone"
            className="text-2xl text-launchingBlue-5 dark:text-launchingBlue-1"
          />

          <Separator orientation="vertical" className="h-6" />
          <Input
            name="search"
            onChange={(v) => {
              filterRender && filterRender({ name: `/${v.target.value}/` });
            }}
            placeholder="Search it..."
            className="border-0  focus-within:outline-none focus-within:border-0 focus-within:ring-0"
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
          body={<Filter filterRender={callback} />}
        />
      )}

      <Icon
        icon="solar:sort-from-bottom-to-top-line-duotone"
        className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
        onClick={sortRender}
      />
    </div>
  );
};

export default Search;
