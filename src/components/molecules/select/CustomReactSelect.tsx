import clsx from "clsx";
import Select from "react-select";

const controlStyles = {
  base: "h-[3rem] rounded-lg hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7",
  focus: "border-launchingBlue-3 ring-1",
  nonFocus: "border-launchingBlue-2 hover:launchingBlue-3",
};
const placeholderStyles = "text-gray-500 dark:text-fg-white pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles = "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = " p-1 gap-1";
const clearIndicatorStyles = "text-gray-200 p-1 hover:text-gray-300";
const indicatorSeparatorStyles = "bg-transparent";
const dropdownIndicatorStyles = "pr-4 text-gray-500 dark:text-fg-white rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white dark:bg-launchingBlue-9 rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 dark:bg-launchingGray-6 active:bg-gray-200",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles = "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

const CustomReactSelect = (props: any) => (
  <Select
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    unstyled
    styles={{
      input: (base) => ({
        ...base,
        "input:focus": {
          boxShadow: "none",
        },
      }),
      // On mobile, the label will truncate automatically, so we want to
      // override that behaviour.
      multiValueLabel: (base) => ({
        ...base,
        whiteSpace: "normal",
        overflow: "visible",
      }),
      control: (base) => ({
        ...base,
        transition: "none",
        paddingLeft: 20,
      }),
    }}
    //components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
    classNames={{
      control: ({ isFocused }) => clsx(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
      placeholder: () => placeholderStyles,
      input: () => selectInputStyles,
      valueContainer: () => valueContainerStyles,
      singleValue: () => singleValueStyles,
      multiValue: () => multiValueStyles,
      multiValueLabel: () => multiValueLabelStyles,
      multiValueRemove: () => multiValueRemoveStyles,
      indicatorsContainer: () => indicatorsContainerStyles,
      clearIndicator: () => clearIndicatorStyles,
      indicatorSeparator: () => indicatorSeparatorStyles,
      dropdownIndicator: () => dropdownIndicatorStyles,
      menu: () => menuStyles,
      groupHeading: () => groupHeadingStyles,
      option: ({ isFocused, isSelected }) =>
        clsx(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
      noOptionsMessage: () => noOptionsMessageStyles,
    }}
    {...props}
  />
);

export default CustomReactSelect;
