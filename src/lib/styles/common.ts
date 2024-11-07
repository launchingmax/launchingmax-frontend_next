export const InputClasses: Record<string, any> = {
  size: {
    sm: {
      default: "px-lg py-md",
      px: "px-lg",
      py: "py-md",
      pl: "pl-lg",
      pr: "pr-lg",
    },
    md: {
      default: "py-[0.625rem] px-[0.875rem]",
      py: "py-[0.625rem]",
      px: "px-[0.875rem]",
      pl: "pl-[0.825rem]",
      pr: "pr-[0.825rem]",
    },
  },
};

export const ReactSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "bg-gray-900",
    borderRadius: "rounded-lg",
    padding: "py-2 px-4",
    borderWidth: "border border-gray-300",
    ":hover": {
      borderColor: "#d1d5db", // Tailwind gray-300
    },
    //boxShadow: "none",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "bg-red-500" : state.isFocused ? "bg-yellow-500" : "bg-white",
    color: state.isSelected ? "text-pink-500" : "text-blue-500",
    padding: "py-2 px-4",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "bg-white",
    borderRadius: "rounded-lg",
    boxShadow: "shadow-lg",
    marginTop: "mt-2",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "text-gray-900",
  }),
};
