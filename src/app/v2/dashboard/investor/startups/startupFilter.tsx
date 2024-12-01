"use client";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { Slider } from "@/components/ui/slider";
import { Controller, FormProvider, useForm } from "react-hook-form";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/lib/utils";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import HorizontalSeparator from "@/components/organisms/dashboard/common/filter/HorizontalSeparator";
import Filter from "@/components/organisms/dashboard/common/filter/filter";
import FilterButtons from "@/components/organisms/dashboard/common/filter/filterButton";
import FilterTitle from "@/components/organisms/dashboard/common/filter/filterTitle";

interface IProps {
  filterRender: (param: any) => void;
  clearFilter: () => void;
  initData?: Record<string, unknown>;
}

const startupValue = 1000000;
const minInvestmentFee = 1000;
const maxInvestmentFee = 1000000;

const StartupFilter: React.FC<IProps> = ({ filterRender, clearFilter, initData }) => {
  console.log(" mm  7 777777777    ", initData);
  const form = useForm({
    defaultValues: {
      startupValue: initData?.startupValue,
      //@ts-ignore
      // "minStartupValue.$gte": initData?.minStartupValue?.$gte ,
      // //@ts-ignore
      // "maxStartupValue.$lte": initData?.maxStartupValue?.$lte ,
      //@ts-ignore
      "investmentFee.$gte": initData?.investmentFee?.$gte,
      //@ts-ignore
      "investmentFee.$lte": initData?.investmentFee?.$lte,
      //investmentFee: initData?.investmentFee ,
      industries: initData?.industries,
      //@ts-ignore
      //"placement.country": { label: initData?.placement?.country, value: initData?.placement?.country },
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

  const filterrr = () => {
    console.log("eeee");
    form.handleSubmit(filterRender as any);
  };

  return (
    <Filter className="md:w-[24.8rem] sm:w-[70vw] xs:w-[80vw]">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(filterRender as any)}>
          <FilterTitle title="Valuation" />
          <HorizontalSeparator />

          <div className="w-full px-6 my-6">
            <Slider
              value={[(form.watch("startupValue") as number) ?? startupValue / 2]}
              //@ts-ignore
              onValueChange={(val) => form.setValue("startupValue", val[0])}
              min={0}
              max={startupValue}
              step={500}
              className="w-full"
            />

            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">{0}</span>
              <span className="text-launchingBlue-6 dark:text-launchingBlue-2 font-bold text-text-md translate-x-8">
                ${formatNumberWithCommas(form.watch("startupValue") ?? startupValue)}
              </span>
              <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">
                ${formatNumberWithCommas(startupValue)}
              </span>
            </div>
          </div>

          <FilterTitle title="Funding Requirement" />
          <HorizontalSeparator />

          <div className="flex flex-col items-center justify-between  px-6 my-6">
            <DualRangeSlider
              label={(value) => value}
              value={[
                (form.watch("investmentFee.$gte") as number) ?? minInvestmentFee,
                (form.watch("investmentFee.$lte") as number) ?? maxInvestmentFee,
              ]}
              onValueChange={(e) => {
                // @ts-ignore
                form.setValue("investmentFee.$gte", e[0]);
                // @ts-ignore
                form.setValue("investmentFee.$lte", e[1]);
              }}
              min={minInvestmentFee}
              max={maxInvestmentFee}
              step={500}
            />
            <div className="flex justify-between w-full mt-3">
              <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Min</span>
              <span className="text-launchingBlue-6 dark:text-launchingBlue-2 font-bold text-text-md">
                ${formatNumberWithCommas(form.watch("investmentFee.$gte") ?? minInvestmentFee)} - $
                {formatNumberWithCommas(form.watch("investmentFee.$lte") ?? maxInvestmentFee)}
              </span>
              <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Max</span>
            </div>
          </div>

          <FilterTitle title="Location" />
          <HorizontalSeparator />

          <div className="px-6 my-6">
            <Controller
              name="placement.country"
              control={form.control}
              render={({ field }) => (
                <CustomReactSelect
                  {...field}
                  isLoading={countriesLoading}
                  isClearable
                  label="Country"
                  placeholder="Select"
                  options={countryItems.map((option) => ({
                    value: option.name,
                    label: option.name,
                  }))}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.value}
                  value={countryItems.find((option) => option === field)}
                  //value={{ label: field.value, value: field.value }}
                  onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                />
              )}
            />
          </div>

          <FilterTitle title="Industry" />
          <HorizontalSeparator />

          <div className="px-6 my-6">
            <Controller
              name="industries"
              control={form.control}
              render={({ field }) => (
                <CustomReactSelect
                  {...field}
                  isLoading={industriesLoading}
                  isClearable
                  label="Industry"
                  placeholder="Select"
                  options={industryItems.map((option: any) => ({
                    value: option.name,
                    label: option.name,
                  }))}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.value}
                  value={countryItems.find((option) => option.value === field)}
                  onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                />
              )}
            />
          </div>

          <FilterButtons clearRender={clearFilter} />
        </form>
      </FormProvider>
    </Filter>
  );
};

export default StartupFilter;
