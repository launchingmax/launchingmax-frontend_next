import { Button } from "@/components/ui/button";

interface IProps {
  clearRender: () => void;
}

const FilterButtons: React.FC<IProps> = ({ clearRender }) => {
  return (
    <div className="flex  space-x-2 w-full p-4">
      <div className="w-1/5">
        <Button
          className="w-full p-4 rounded-md bg-launchingBlue-1 dark:bg-launchingBlue-7 dark:text-fg-white hover:bg-launchingBlue-2 dark:hover:bg-launchingBlue-3 shadow-none font-regular text-text-md text-launchingBlue-8 cursor-pointer"
          onClick={clearRender}
        >
          Clear
        </Button>
      </div>
      <div className="w-4/5">
        <Button
          className="w-full p-4 rounded-md bg-launchingBlue-4 font-regular text-text-md text-fg-white cursor-pointer text-center"
          type="submit"
        >
          Filter it
        </Button>
      </div>
    </div>
  );
};

export default FilterButtons;
