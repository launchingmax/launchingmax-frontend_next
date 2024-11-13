import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface OptionType {
  label: string;
  value: string;
}

interface MultiSelectGroupProps {
  options: OptionType[];
  onChange: (selectedOptions: string[]) => void;
  className?: string;
}

const MultiSelectGroup: React.FC<MultiSelectGroupProps> = ({ options, onChange, className }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    const newSelection = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value) // Unselect if already selected
      : [...selectedItems, value]; // Add to selection if not selected

    setSelectedItems(newSelection);
    onChange(newSelection);
  };

  return (
    <div className={cn("space-y-2 my-2", className)}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <Checkbox.Root
            className="aspect-square h-6 w-6 text-text-xl text-launchingBlue-5 dark:text-launchingGray-3 font-extrabold rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 shadow focus:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            checked={selectedItems.includes(option.value)}
            onCheckedChange={() => handleSelect(option.value)}
          >
            <Checkbox.Indicator className="flex items-center justify-center">
              <CheckIcon className="w-5 h-5" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelectGroup;
