"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { Slider } from "@/components/ui/slider";
import MySelect from "@/components/molecules/select/MySelect";
import { FormProvider, useForm } from "react-hook-form";
import { Field } from "@/components/atoms/Field";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/lib/utils";
import { AppContants } from "@/lib/constants";
import Select from "react-select";

interface IProps {
  filterRender?: (param: any) => void;
  clearFilter?: () => void;
  initData?: Record<string, unknown>;
}

const StartupFilter: React.FC<IProps> = ({ filterRender, clearFilter, initData }) => {
  const form = useForm({
    defaultValues: {
      //@ts-ignore
      "minStartupValue.$gte": initData?.minStartupValue?.$gte ?? AppContants.minStartupValue,
      //@ts-ignore
      "maxStartupValue.$lte": initData?.maxStartupValue?.$lte ?? AppContants.maxStartupValue,
      investmentFee: initData?.investmentFee ?? AppContants.investmentFee,
      industries: initData?.industries ?? undefined,
    },
  });

  const dispatch = useAppDispatch();

  const {
    industryItems,
    loading: industriesLoading,
    error: industriesErr,
  } = useAppSelector((state) => state.industries);
  const { countryItems, loading: countriesLoading, error: countriesErr } = useAppSelector((state) => state.countries);

  useEffect(() => {
    industryItems?.length == 0 && dispatch(fetchIndustriesData());
    countryItems?.length == 0 && dispatch(fetchCountriesData());
  }, []);

  const reset = () => {
    clearFilter;
    //@ts-ignore
    form.setValue("minStartupValue.$gte", AppContants.minStartupValue);
    //@ts-ignore
    form.setValue("maxStartupValue.$lte", AppContants.maxStartupValue);
    //@ts-ignore
    form.setValue("investmentFee", AppContants.investmentFee);
    //@ts-ignore
    form.setValue("industries", undefined);
  };

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
              value={[form.watch("minStartupValue.$gte") as number, form.watch("maxStartupValue.$lte") as number]}
              onValueChange={(e) => {
                // @ts-ignore
                form.setValue("minStartupValue.$gte", e[0]);
                // @ts-ignore
                form.setValue("maxStartupValue.$lte", e[1]);
              }}
              min={AppContants.minStartupValue}
              max={AppContants.maxStartupValue}
              step={500}
            />

            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack text-sm font-regular">Min</span>
              <span className="text-launchingBlue-6 font-bold text-text-md">
                {formatNumberWithCommas(form.watch("minStartupValue.$gte"))} -{" "}
                {formatNumberWithCommas(form.watch("maxStartupValue.$lte"))} $
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
              value={[form.watch("investmentFee") as number]}
              //@ts-ignore
              onValueChange={(val) => form.setValue("investmentFee", val[0])}
              min={0}
              max={AppContants.investmentFee}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack text-sm font-regular">{0}</span>
              <span className="text-launchingBlue-6 font-bold text-text-md ml-12">
                {formatNumberWithCommas(form.watch("investmentFee"))} $
              </span>
              <span className="text-launchingBlack text-sm font-regular">
                {formatNumberWithCommas(AppContants.investmentFee)}
              </span>
            </div>
          </div>

          <h2 className="py-4 px-6 font-medium text-launchingBlue-5 tracking-wide text-text-md">Location</h2>
          <Separator
            orientation="horizontal"
            className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
          />

          {/* <Field<"select">
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
          /> */}

          <MySelect
            options={countryItems.map((option) => ({
              value: option.name,
              label: option.name,
            }))}
            renderItem={(item: any) => item.name}
            classes={{ trigger: " w-5/6 justify-self-center h-16 bg-launchingBlue-05 border border-launchingBlue-1" }}
          />

          <Select
            placeholder="Country"
            isLoading={countriesLoading}
            options={countryItems.map((option) => ({
              value: option.name,
              label: option.name,
            }))}
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
              onClick={reset}
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
