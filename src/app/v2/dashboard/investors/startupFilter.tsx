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

interface IProps {
  filterRender?: (param: any) => void;
  clearFilter?: () => void;
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

  return (
    <div className="h-max w-max overflow-y-auto">
      <SectionTitle title="Filters" />
      <h2 className="py-2 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
        Valuation
      </h2>
      <Separator
        orientation="horizontal"
        className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
      />

      <div className="p-1 space-y-6 overflow-y-auto md:w-[24.8rem] sm:w-[70vw] xs:w-[80vw]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(filterRender as any)}>
            <div className="w-full px-8 my-6">
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

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
              Funding Requirement
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="flex flex-col items-center justify-between px-8  my-6">
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

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
              Location
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full mb-6 bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="px-4">
              <Controller
                name="placement.country"
                control={form.control}
                render={({ field }) => (
                  <CustomReactSelect
                    {...field}
                    isLoading={countriesLoading}
                    isClearable
                    placeholder="Country"
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

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
              Industry
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded mb-6"
            />

            <div className="px-4">
              <Controller
                name="industries"
                control={form.control}
                render={({ field }) => (
                  <CustomReactSelect
                    {...field}
                    isLoading={industriesLoading}
                    isClearable
                    placeholder="Industry"
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

            <div className="flex flex-row space-x-2 w-full mt-12">
              <Button
                className="w-max p-4 rounded-md bg-launchingBlue-1 dark:bg-launchingBlue-7 dark:text-fg-white hover:bg-launchingBlue-2 dark:hover:bg-launchingBlue-3 shadow-none font-regular text-text-md text-launchingBlue-8 cursor-pointer"
                onClick={clearFilter}
              >
                Clear
              </Button>
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
    </div>
  );
};

export default StartupFilter;
