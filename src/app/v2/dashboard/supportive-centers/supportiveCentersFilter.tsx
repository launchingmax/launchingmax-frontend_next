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

interface IProps {
  filterRender?: (param: any) => void;
  clearFilter?: () => void;
  initData?: Record<string, unknown>;
}

const SupportiveCentersFilter: React.FC<IProps> = ({ filterRender, clearFilter, initData }) => {
  const form = useForm();

  const dispatch = useAppDispatch();

  const [selectedCountryID, setSelectedCourtyID] = useState<string>("");
  const [cityItems, setCityItems] = useState([]);

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
    countryItems.find((item) => {
      if (item.name === initData?.country) setSelectedCourtyID(item._id);
    });
    if (initData) {
      form.reset(initData);
    }
  }, [initData]);

  const fetchCitiesData = async (countryID: string) => {
    try {
      const response = await NextFetch(`/v1/city?page=0&country=${countryID}`, { method: "GET" });
      if (response.ok) {
        const res = await response.json();
        setCityItems(res);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedCountryID.length > 0 && fetchCitiesData(selectedCountryID);
  }, [selectedCountryID]);

  return (
    <div className="h-max w-[24.9rem] overflow-y-auto">
      <SectionTitle title="Filters" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(filterRender as any)}>
          <div className="flex flex-col mt-2 my-auto">
            <div className="flex flex-row">
              <h2 className="w-1/2  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                Type
              </h2>
              <h2 className="w-1/2 flex justify-start  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                Startegy
              </h2>
            </div>

            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="flex flex-row px-6 ">
              <div className="flex justify-between my-2 w-1/2 flex-col">
                <FormField
                  control={form.control}
                  name="group"
                  render={() => (
                    <FormItem>
                      {AppContants.groupOptions.map((item, index) => (
                        <FormField
                          key={`${item.value}-${index}`}
                          control={form.control}
                          name="group"
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
                    </FormItem>
                  )}
                />
              </div>
              <Separator
                orientation="vertical"
                className="h-40 w-[0.0625rem] bg-launchingBlue-05 mx-6 my-2  justify-self-center"
              />
              <div className="flex justify-between my-2 w-1/2">
                <FormField
                  control={form.control}
                  name="strategy"
                  render={() => (
                    <FormItem>
                      {AppContants.strategyOptions.map((item, index) => (
                        <FormField
                          key={`${item.value}-${index}`}
                          control={form.control}
                          name="strategy"
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
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <h2 className="py-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
            Location
          </h2>
          <Separator
            orientation="horizontal"
            className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
          />
          <div className="flex flex-col gap-y-2 my-4 px-6">
            <Controller
              name="country"
              control={form.control}
              render={({ field }) => (
                <CustomReactSelect
                  {...field}
                  label="Country"
                  isLoading={countriesLoading}
                  isClearable
                  placeholder="Select"
                  options={countryItems.map((option: any) => ({
                    value: option.name,
                    label: option.name,
                    id: option._id,
                  }))}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.value}
                  value={{ label: field.value, value: field.value }}
                  onChange={(selectedOption: any) => {
                    console.log("mm 4040 - - -   ", selectedOption);
                    setSelectedCourtyID(selectedOption?.id);
                    field.onChange(selectedOption?.value);
                  }}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                />
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field }) => (
                <CustomReactSelect
                  {...field}
                  label="City"
                  // isLoading={countriesLoading}
                  isClearable
                  placeholder="Select"
                  options={cityItems.map((option: any) => ({
                    value: option.name,
                    label: option.name,
                  }))}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.value}
                  value={{ label: field.value, value: field.value }}
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
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
          />

          <div className="px-6 my-4">
            <Controller
              name="industries"
              control={form.control}
              render={({ field }) => (
                <CustomReactSelect
                  {...field}
                  isLoading={industriesLoading}
                  isClearable
                  label="Industry"
                  placeholder="all"
                  isMulti
                  options={industryItems}
                  getOptionLabel={(option: any) => (typeof option === "string" ? option : option.name)}
                  getOptionValue={(option: any) => (typeof option === "string" ? option : option.name)}
                  value={field?.value}
                  onChange={(selectedOption: any) => {
                    console.log("-----", selectedOption);
                    form.setValue(
                      field.name,
                      selectedOption?.map((a: any) => (typeof a === "string" ? a : a.name))
                    );
                  }}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                />
              )}
            />
          </div>

          <div className="flex flex-row space-x-2 w-full p-4">
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
  );
};

export default SupportiveCentersFilter;
