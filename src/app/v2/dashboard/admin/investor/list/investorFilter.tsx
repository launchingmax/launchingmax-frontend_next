"use client";

import { Field } from "@/components/atoms/Field";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileUpload from "@/lib/fileUpload/fileUpload";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { NextFetch } from "@/configs/api/next-fetch";
import { group } from "console";
import { AppContants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { formatNumberWithCommas } from "@/lib/utils";
import Filter from "@/components/organisms/dashboard/common/filter/filter";
import FilterButtons from "@/components/organisms/dashboard/common/filter/filterButton";
import HorizontalSeparator from "@/components/organisms/dashboard/common/filter/HorizontalSeparator";
import FilterTitle from "@/components/organisms/dashboard/common/filter/filterTitle";

interface IProps {
  filterRender?: (param: any) => void;
  clearFilter: () => void;
  initData?: Record<string, unknown>;
}

const InvestorFilter: React.FC<IProps> = ({ filterRender, clearFilter, initData }) => {
  const form = useForm();

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

  useEffect(() => {
    if (initData) {
      form.reset(initData);
    }
  }, [initData]);

  return (
    <Filter className="lg:w-[50.875rem] w-max " filterTitle="Investor Filter">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(filterRender as any)}>
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col  lg:w-1/2">
              <FilterTitle title="Investment Term" />

              <HorizontalSeparator />
              <div className="flex flex-row px-6 my-1 ">
                <div className="flex my-2 w-1/2 flex-col">
                  {AppContants.investmentTerm.map((item, index) => (
                    <FormField
                      key={`${item.value}-${index}`}
                      control={form.control}
                      name="invTerm"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.value}
                            className="flex flex-row items-center space-y-0 mb-1 text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value ?? []), item.value])
                                    : field.onChange(field.value?.filter((value: string) => value !== item.value));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>

              <FilterTitle title="Investment Experience" />
              <HorizontalSeparator />
              <div className="px-6 my-4">
                <Field
                  name="aaa"
                  Input={CustomReactSelect}
                  InputProps={{
                    label: "Year",
                  }}
                />
              </div>

              <FilterTitle title="Investment Experience In Foreign Countries" />
              <HorizontalSeparator />
              <div className="px-6 my-4 flex flex-row gap-6">
                {AppContants.yesNoOption.map((item, index) => (
                  <FormField
                    key={`${item.value}-${index}`}
                    control={form.control}
                    name="bbb"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-center space-y-0 mb-1 text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value === item.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? item.value : null); // Set the value or reset to null
                              }}
                              // checked={field.value?.includes(item.value)}
                              // onCheckedChange={(checked) => {
                              //   return checked
                              //     ? field.onChange([...(field.value ?? []), item.value])
                              //     : field.onChange(field.value?.filter((value: string) => value !== item.value));
                              // }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>

              <FilterTitle title="Investment Range" />
              <HorizontalSeparator />
              <div className="flex flex-col items-center justify-between px-6 my-6">
                <DualRangeSlider
                  label={(value) => value}
                  value={[
                    (form.watch("invRange.$gte") as number) ?? AppContants.investmentRange.minInvRange,
                    (form.watch("invRange.$lte") as number) ?? AppContants.investmentRange.maxInvRange,
                  ]}
                  onValueChange={(e) => {
                    // @ts-ignore
                    form.setValue("invRange.$gte", e[0]);
                    // @ts-ignore
                    form.setValue("invRange.$lte", e[1]);
                  }}
                  min={AppContants.investmentRange.minInvRange}
                  max={AppContants.investmentRange.maxInvRange}
                  step={500}
                />
                <div className="flex justify-between w-full mt-3">
                  <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Min</span>
                  <span className="text-launchingBlue-6 dark:text-launchingBlue-2 font-bold text-text-md">
                    ${formatNumberWithCommas(form.watch("invRange.$gte") ?? AppContants.investmentRange.minInvRange)} -
                    ${formatNumberWithCommas(form.watch("invRange.$lte") ?? AppContants.investmentRange.maxInvRange)}
                  </span>
                  <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Max</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:w-1/2">
              <FilterTitle title="Location" />
              <HorizontalSeparator />
              <div className="px-6 my-4">
                <Field
                  name="country"
                  control={form.control}
                  Input={CustomReactSelect}
                  InputProps={{
                    label: "Country",
                    isLoading: countriesLoading,
                    isClearable: true,
                    isMulti: true,
                    placeholder: "Select",
                    options: countryItems,
                    getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
                    getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),
                    onChange: (selectedOption: any) => {
                      form.setValue(
                        "country",
                        selectedOption?.map((a: any) => (typeof a === "string" ? a : a.name))
                      );
                    },
                    closeMenuOnSelect: false,
                    hideSelectedOptions: false,
                  }}
                />
              </div>
              <FilterTitle title="Industry" />
              <HorizontalSeparator />
              <div className="px-6 my-4">
                <Field
                  name="industries"
                  control={form.control}
                  Input={CustomReactSelect}
                  InputProps={{
                    isLoading: industriesLoading,
                    isClearable: true,
                    label: "Industry",
                    placeholder: "Select",
                    isMulti: true,
                    options: industryItems,
                    getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
                    getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),

                    onChange: (selectedOption: any) => {
                      console.log("-----", selectedOption);
                      form.setValue(
                        "industries",
                        selectedOption?.map((a: any) => (typeof a === "string" ? a : a.name))
                      );
                    },
                    closeMenuOnSelect: false,
                    hideSelectedOptions: false,
                  }}
                />
              </div>
            </div>
          </div>

          <FilterButtons leftButtonRender={clearFilter} />
        </form>
      </FormProvider>
    </Filter>
  );
};

export default InvestorFilter;
