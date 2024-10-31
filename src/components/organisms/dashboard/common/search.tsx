"use client";
import { Field } from "@/components/atoms/Field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormProvider, useForm } from "react-hook-form";
import StartupFilter from "../../../../app/dashboard/investors/startupFilter";
import MyDialog from "@/components/molecules/MyDialog";
import FilterIcon from "./filterIcon";
import { useState } from "react";

interface ISearch {
  className?: string;
  filterRender?: () => void;
  sortRender?: () => void;
  dialogBody?: React.ReactNode;
}
const Search: React.FC<ISearch> = ({ className, filterRender, sortRender, dialogBody }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
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
            value={searchValue}
            onChange={handleChange}
            placeholder="Search it..."
            className="border-0  focus-within:outline-none focus-within:border-0 focus-within:ring-0"
          />
        </div>
        <Separator orientation="horizontal" className="w-full" />
      </div>

      <FilterIcon dialogBody={dialogBody} />

      <Icon
        icon="solar:sort-from-bottom-to-top-line-duotone"
        className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
        onClick={sortRender}
      />
    </div>
  );
};

export default Search;
