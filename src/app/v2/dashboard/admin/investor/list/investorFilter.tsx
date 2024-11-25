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

interface IProps {
  filterRender?: (param: any) => void;
  clearFilter?: () => void;
  initData?: Record<string, unknown>;
}

const minInvRange = 1000;
const maxInvRange = 1000000;

const InvestorFilter: React.FC<IProps> = ({ filterRender, clearFilter, initData }) => {
  const form = useForm();

  const dispatch = useAppDispatch();

  const [selectedCountryID, setSelectedCourtyID] = useState<string>("");
  const [cityItems, setCityItems] = useState([]);

  const { countryItems, loading: countriesLoading, error: countriesErr } = useAppSelector((state) => state.countries);

  useEffect(() => {
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
            <h2 className="pb-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
              Location
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="px-6 my-4">
              <Controller
                name="countries"
                control={form.control}
                render={({ field }) => (
                  <CustomReactSelect
                    {...field}
                    isLoading={countriesLoading}
                    isClearable
                    label="Country"
                    placeholder="all"
                    isMulti
                    options={countryItems}
                    getOptionLabel={(option: any) => (typeof option === "string" ? option : option.name)}
                    getOptionValue={(option: any) => (typeof option === "string" ? option : option.name)}
                    value={field?.value}
                    onChange={(selectedOption: any) => {
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

            <h2 className="py-4 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
              Funding Requirement
            </h2>
            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="flex flex-col items-center justify-between px-6 my-4">
              <DualRangeSlider
                label={(value) => value}
                value={[
                  (form.watch("invRange.$gte") as number) ?? minInvRange,
                  (form.watch("invRange.$lte") as number) ?? maxInvRange,
                ]}
                onValueChange={(e) => {
                  // @ts-ignore
                  form.setValue("invRange.$gte", e[0]);
                  // @ts-ignore
                  form.setValue("invRange.$lte", e[1]);
                }}
                min={minInvRange}
                max={maxInvRange}
                step={500}
              />
              <div className="flex justify-between w-full mt-3">
                <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Min</span>
                <span className="text-launchingBlue-6 dark:text-launchingBlue-2 font-bold text-text-md">
                  ${formatNumberWithCommas(form.watch("invRange.$gte") ?? minInvRange)} - $
                  {formatNumberWithCommas(form.watch("invRange.$lte") ?? maxInvRange)}
                </span>
                <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Max</span>
              </div>
            </div>

            <div className="flex flex-row">
              <h2 className="text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                Investment range
              </h2>
            </div>

            <Separator
              orientation="horizontal"
              className="w-full bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
            />

            <div className="flex flex-row px-6 ">
              <div className="flex justify-between my-2 flex-col">
                <FormField
                  control={form.control}
                  name="invTerm"
                  render={() => (
                    <FormItem>
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
                    </FormItem>
                  )}
                />
              </div>
            </div>
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

export default InvestorFilter;
