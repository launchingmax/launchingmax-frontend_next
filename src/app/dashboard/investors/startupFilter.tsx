"use client";
import React, { useEffect, useState } from "react";
import DashSection from "../../../components/organisms/dashboard/DashSection";
import { Separator } from "@/components/ui/separator";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { Slider } from "@/components/ui/slider";
import MySelect from "@/components/molecules/select/MySelect";
import { FormProvider, useForm } from "react-hook-form";
import { Field } from "@/components/atoms/Field";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import SectionTitle from "../../../components/organisms/dashboard/common/sectionTitle";
import { useAppSelector } from "@/store/store";

interface IProps {
  trigger?: React.ReactNode;
}

const StartupFilter: React.FC<IProps> = ({ trigger }) => {
  const form = useForm({ defaultValues: { industry: "Information Technology & Services" } });

  // const dispatch = useAppDispatch();
  const { industryItems, loading, error } = useAppSelector((state) => state.industries);

  // useEffect(() => {
  //   industryItems.length == 0 && dispatch(fetchIndustriesData());
  // }, [dispatch]);

  const [minMaxvalues, setMinMaxValues] = useState([0, 100]);

  const [value, setValue] = useState(50); // Initial slider value
  const min = 0;
  const max = 100;

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values, minMaxvalues, value);
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
    <div className="h-[80vh] overflow-y-auto">
      <SectionTitle title="Filters" />
      <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Valuation</h2>
      <Separator
        orientation="horizontal"
        className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
      />

      <div className="w-full px-8 py-6 my-0">
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

      <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Funding Requirement</h2>
      <Separator
        orientation="horizontal"
        className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
      />

      <div className="flex flex-col items-center justify-between px-8  mt-6">
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
        className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field<"select">
            name={"country"}
            Input={MySelect}
            InputProps={{
              options,
              placeholder: "Country",
              classes: {
                trigger: "w-5/6 justify-self-center h-16 bg-launchingBlue-05 border border-launchingBlue-1",
              },
            }}
          />

          <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Industry</h2>
          <Separator
            orientation="horizontal"
            className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded mb-6"
          />
          <Field<"select">
            name={"industry"}
            Input={MySelect}
            InputProps={{
              options: industryItems,
              renderItem: (item: any) => item.name,
              getItemValue: (item: any) => item.name,
              placeholder: "Industry",
              classes: {
                trigger: "w-5/6 justify-self-center h-16 bg-launchingBlue-05 border border-launchingBlue-1",
              },
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default StartupFilter;
