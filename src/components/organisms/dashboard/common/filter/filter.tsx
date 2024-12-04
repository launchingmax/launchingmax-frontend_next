import { cn } from "@/lib/utils";
import SectionTitle from "../sectionTitle";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  filterTitle?: string;

  children: React.ReactNode;
  className?: string;
}

const Filter: React.FC<IProps> = ({ filterTitle = "Filters", children, className }) => {
  const form = useForm();
  return (
    <div className=" w-max h-max max-h-screen overflow-y-auto">
      <SectionTitle title={filterTitle} />
      <div className={cn("overflow-hidden h-full", className)}>{children}</div>
    </div>
  );
};

export default Filter;
