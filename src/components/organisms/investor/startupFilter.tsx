"use client";
import React, { useState } from "react";
import DashSection from "../dashboard/DashSection";
import { Separator } from "@/components/ui/separator";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { Slider } from "@/components/ui/slider";
import MySelect from "@/components/molecules/select/MySelect";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Field } from "@/components/atoms/Field";
import { SelectItemType } from "@/lib/types/ui/ui.types";

interface IProps {
  trigger?: React.ReactNode;
}

const StartupFilter: React.FC<IProps> = ({ trigger }) => {
  const form = useForm();

  const [minMaxvalues, setMinMaxValues] = useState([0, 100]);

  const [value, setValue] = useState(50); // Initial slider value
  const min = 0;
  const max = 100;

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
  }

  const options: SelectItemType[] = [
    { label: "ssss", value: "moon" },
    { label: "ss", value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];

  return (
    <div className="h-[80vh]">
      <DashSection heading="Filters" className="">
        <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Valuation</h2>
        <Separator
          orientation="horizontal"
          className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded "
        />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full px-8 py-2 my-6">
              <DualRangeSlider
                label={(value) => value}
                value={minMaxvalues}
                onValueChange={setMinMaxValues}
                min={0}
                max={100}
                step={1}
              />

              <div className="flex justify-between w-full mt-3">
                <span className="text-launchingBlack text-sm font-regular">Min</span>
                <span className="text-launchingBlue-6 font-bold text-text-md">
                  {minMaxvalues[0]} - {minMaxvalues[1]} $
                </span>
                <span className="text-launchingBlack text-sm font-regular">Max</span>
              </div>
            </div>

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">
              Funding Requirement
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded "
            />

            <div className="flex flex-col items-center justify-between px-8 py-2 my-6">
              <Slider
                value={[value]}
                onValueChange={(val) => setValue(val[0])}
                min={min}
                max={max}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between w-full mt-3">
                <span className="text-launchingBlack text-sm font-regular">{min}</span>
                <span className="text-launchingBlue-6 font-bold text-text-md">{value} $</span>
                <span className="text-launchingBlack text-sm font-regular">{max}</span>
              </div>
            </div>

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Location</h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded "
            />

            <Field<"select"> name={"country"} Input={MySelect} InputProps={{ options, placeholder: "Select One" }} />

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Industry</h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded "
            />
            <Field<"select"> name={"industry"} Input={MySelect} InputProps={{ options, placeholder: "all" }} />

            <div className="flex flex-row space-x-2 p-3">
              <div
                className="w-max p-4 rounded-md bg-launchingBlue-1 font-regular text-text-md text-launchingBlue-8 cursor-pointer"
                onClick={() => console.log("clicked !!!")}
              >
                Clear
              </div>
              <div
                className="w-full p-4 rounded-md bg-launchingBlue-4 font-regular text-text-md text-fg-white cursor-pointer text-center"
                onClick={() => console.log("clicked !!!")}
              >
                Filter it
              </div>
            </div>
          </form>
        </FormProvider>
      </DashSection>
    </div>
  );
};

export default StartupFilter;
