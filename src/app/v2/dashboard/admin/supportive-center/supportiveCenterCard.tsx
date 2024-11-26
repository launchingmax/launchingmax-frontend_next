import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface IProps {
  item: ISupportiveCenter;
  setSelectedRowState: (selectedRow: ISupportiveCenter) => void;
  setOpenAddEditDialog: (open: boolean) => void;
  setOpenDetailDialog: (open: boolean) => void;
  setAddOrEditType: (type: "edit") => void;
}
const SupportiveCenterCard: React.FC<IProps> = ({
  item,
  setSelectedRowState,
  setOpenDetailDialog,
  setOpenAddEditDialog,
  setAddOrEditType,
}) => {
  return (
    <div className="felx flex-col bg-launchingBlue-05 dark:bg-launchingBlue-8.5 rounded-md my-2 p-2 space-y-2">
      <div className="grid grid-cols-3 justify-between">
        <div className="flex items-center gap-x-1 col-span-2">
          <div className="w-8 h-8 rounded-md bg-white dark:bg-launchingBlue-7 p-1 ">
            <Image
              src={
                item.logo
                  ? `${process.env.NEXT_PUBLIC_ALL_API}${item.logo}`
                  : `${process.env.NEXT_PUBLIC_ALL_API}/sc/${item.name}.png`
              }
              alt="Company Logo"
              width={200}
              height={200}
              className="w-6 h-6"
            />
          </div>
          <h2 className="truncate text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
            {item.name}
          </h2>
        </div>

        <div className="flex items-center justify-self-end gap-x-1">
          <Icon icon={`twemoji:flag-${item.country.toLowerCase().replaceAll(" ", "-")}`} className="h-4 w-4" />
          <h2 className="truncate text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
            {item.country}
          </h2>
        </div>
      </div>

      <h2 className="truncate text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
        {item.industries}
      </h2>
      <h2 className="truncate text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
        {item.strategy}
      </h2>
      <h2 className="truncate text-launchingGray-6 dark:text-fg-white text-text-sm font-regular leading-[1.1375rem]">
        {item.group}
      </h2>

      <div className="flex justify-center items-center gap-x-[0.88rem] mt-2 ">
        <Icon
          icon="solar:info-square-bold-duotone"
          className="w-6 h-6 text-teal-5 dark:text-teal-3 cursor-pointer"
          onClick={() => {
            setSelectedRowState(item);
            setOpenDetailDialog(true);
          }}
        />
        <Icon
          icon="solar:pen-2-bold-duotone"
          className="w-6 h-6 text-launchingBlue-6 dark:text-launchingBlue-3 cursor-pointer"
          onClick={() => {
            setSelectedRowState(item);
            setOpenAddEditDialog(true);
            setAddOrEditType("edit");
          }}
        />
        <Icon
          icon="solar:folder-error-bold-duotone"
          className="w-6 h-6 text-salmon-6 dark:text-salmon-3 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SupportiveCenterCard;
