import clsx from "clsx";
import React from "react";
import Select from "react-select";

const controlStyles = {
  base: "rounded-lg !w-full -my-2 pl-2 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5",
  focus: "",
  nonFocus: " hover:launchingBlue-3",
};
const placeholderStyles = "text-gray-500 dark:text-fg-white pl-1 py-0.5";
const selectInputStyles = "pl-1";
const valueContainerStyles = "gap-1 mt-2";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles = "bg-gray-100 dark:bg-launchingBlue-7 rounded items-center px-1 gap-1";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "hover:text-launchingBlue-3 dark:hover:text-launchingBlue-3 text-gray-500 hover:border-red-300 dark:hover:border-launchingBlue-4 rounded-md";
const indicatorsContainerStyles = " p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-200 dark:text-launchingBlue-7 p-1 -mt-4 hover:text-gray-300 dark:hover:text-launchingBlue-4";
const indicatorSeparatorStyles = "bg-transparent";
const dropdownIndicatorStyles =
  "pr-4 -mt-4 text-gray-500 dark:text-launchingBlue-3 dark:text-fg-white rounded-md hover:text-black dark:hover:text-launchingBlue-4";
const menuStyles = "p-1 mt-3 border border-gray-200 bg-white dark:bg-launchingBlue-9 rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 dark:bg-launchingGray-6 active:bg-gray-200",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles = "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

const CustomReactSelect = (props: any) => {
  const inputRef = React.useRef<any>(null);
  const triggerInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-col min-h-14 max-h-max  rounded-md py-2  hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus-within:border-launchingBlue-3 focus-within:ring-1  ${
        props.disabled && "opacity-50 cursor-not-allowed text-disabled"
      }`}
      onClick={triggerInput}
    >
      <label className="text-text-xs px-3 font-regular text-launchingBlack dark:text-fg-white hover:cursor-pointer z-[2]">
        {props.label}
      </label>

      <Select
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        unstyled
        ref={inputRef}
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
            display: "flex",
            flexDirection: "row", // Align selected items in a row
            borderRadius: "4px",
          }),
          multiValue: (base) => ({
            ...base,
            display: "flex",
            alignItems: "center",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
            //paddingLeft: 20,
          }),
        }}
        //components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
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
    </div>
  );
};

export default CustomReactSelect;
