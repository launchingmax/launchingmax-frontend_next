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
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { Button } from "@/components/ui/button";

interface IProps {
  filterRender?: (param: any) => void;
}

const StartupFilter: React.FC<IProps> = ({ filterRender }) => {
  const form = useForm({
    defaultValues: { minVal: 0, maxVal: 100, fundingRequirement: 100 },
  });

  const dispatch = useAppDispatch();

  const {
    industryItems,
    loading: industriesLoading,
    error: industriesErr,
  } = useAppSelector((state) => state.industries);
  const { countryItems, loading: countriesLoading, error: countriesErr } = useAppSelector((state) => state.countries);

  useEffect(() => {
    industryItems.length == 0 && dispatch(fetchIndustriesData());
    countryItems.length == 0 && dispatch(fetchCountriesData());
  }, []);

  return (
    <div className="h-[80vh] overflow-y-auto">
      <SectionTitle title="Filters" />
      <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Valuation</h2>
      <Separator
        orientation="horizontal"
        className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(filterRender as any)}>
          <div className="w-full px-8 py-6 my-0">
            <DualRangeSlider
              label={(value) => value}
              value={[form.watch("minVal") as number, form.watch("maxVal") as number]}
              onValueChange={(e) => {
                form.setValue("minVal", e[0]);
                form.setValue("maxVal", e[1]);
              }}
              min={0}
              max={100}
              step={1}
            />

            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack text-sm font-regular">Min</span>
              <span className="text-launchingBlue-6 font-bold text-text-md">
                {form.watch("minVal")} - {form.watch("maxVal")} $
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
              value={[form.watch("fundingRequirement") as number]}
              onValueChange={(val) => form.setValue("fundingRequirement", val[0])}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack text-sm font-regular">{1}</span>
              <span className="text-launchingBlue-6 font-bold text-text-md">{form.watch("fundingRequirement")} $</span>
              <span className="text-launchingBlack text-sm font-regular">{100}</span>
            </div>
          </div>

          <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Location</h2>
          <Separator
            orientation="horizontal"
            className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
          />

          <Field<"select">
            name={"placement.country"}
            Input={MySelect}
            InputProps={{
              options: countryItems,
              removePortal: true,
              renderItem: (item: any) => item.name,
              getItemValue: (item: any) => item.name,
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
            name={"industries"}
            Input={MySelect}
            InputProps={{
              options: industryItems,
              removePortal: true,
              renderItem: (item: any) => item.name,
              getItemValue: (item: any) => item.name,
              placeholder: "Industry",
              classes: {
                trigger: "w-5/6 justify-self-center h-16 bg-launchingBlue-05 border border-launchingBlue-1",
              },
            }}
          />

          <div className="flex flex-row space-x-2 w-full mt-12">
            <div
              className="w-max p-4 rounded-md bg-launchingBlue-1 font-regular text-text-md text-launchingBlue-8 cursor-pointer"
              onClick={() => filterRender && filterRender({})}
            >
              Clear
            </div>
            <Button
              className="w-full p-4 rounded-md bg-launchingBlue-4 font-regular text-text-md text-fg-white cursor-pointer text-center"
              type="submit"
            >
              Filter it
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StartupFilter;
