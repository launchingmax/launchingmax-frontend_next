"use client";
import { Field } from "@/components/atoms/Field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormProvider, useForm } from "react-hook-form";
import StartupFilter from "../../investor/startupFilter";
import MyDialog from "@/components/molecules/MyDialog";

interface ISearch {
  className?: string;
  filterRender?: () => void;
  sortRender?: () => void;
  dialogBody?: React.ReactNode;
}
const Search: React.FC<ISearch> = ({ className, filterRender, sortRender, dialogBody }) => {
  const form = useForm();

  return (
    <div className={"flex items-center px-6 py-3 space-x-3"}>
      <div className="flex flex-col w-full ">
        <div className={cn(className, "flex space-x-3 pb-1 items-center")}>
          <Icon
            icon="solar:minimalistic-magnifer-bold-duotone"
            className="text-2xl text-launchingBlue-5 dark:text-launchingBlue-1"
          />

          <Separator orientation="vertical" className="h-6" />

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(() => console.log("mm 10 -  submited !!!"))}>
              <Field
                name={"input1"}
                Input={Input}
                InputProps={{
                  placeholder: "Search it...",
                  className: "border-0  focus-within:outline-none focus-within:border-0 focus-within:ring-0",
                }}
              />
            </form>
          </FormProvider>
        </div>
        <Separator orientation="horizontal" className="w-full" />
      </div>

      <MyDialog
        dialogTrigger={
          <Icon
            icon="solar:filter-bold-duotone"
            className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
            // onClick={filterRender}
          />
        }
        dialogTitle="ttt"
        dialogDes="desc---"
        body={dialogBody}
      />

      <Icon
        icon="solar:sort-from-bottom-to-top-line-duotone"
        className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
        onClick={sortRender}
      />
    </div>
  );
};

export default Search;
