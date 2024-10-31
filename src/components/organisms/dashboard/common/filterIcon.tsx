import MyDialog from "@/components/molecules/MyDialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  className?: string;
  filterRender?: () => void;
  dialogBody?: React.ReactNode;
  renderFilter?: () => void;
  renderClear?: () => void;
}

const FilterIcon: React.FC<IProps> = ({ dialogBody, renderFilter, renderClear }) => {
  return (
    <MyDialog
      dialogTrigger={
        <Icon
          icon="solar:filter-bold-duotone"
          className="text-3xl text-launchingBlue-5 dark:text-launchingBlue-1 cursor-pointer bg-launchingBlue-1 dark:bg-launchingBlue-6 p-1 rounded-md"
          // onClick={filterRender}
        />
      }
      body={dialogBody}
      footer={
        <div className="flex flex-row space-x-2 w-full">
          <div
            className="w-max p-4 rounded-md bg-launchingBlue-1 font-regular text-text-md text-launchingBlue-8 cursor-pointer"
            onClick={renderClear}
          >
            Clear
          </div>
          <Button
            className="w-full p-4 rounded-md bg-launchingBlue-4 font-regular text-text-md text-fg-white cursor-pointer text-center"
            type="submit"
            onClick={renderFilter}
          >
            Filter it
          </Button>
        </div>
      }
    />
  );
};

export default FilterIcon;
