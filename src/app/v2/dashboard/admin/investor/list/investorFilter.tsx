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

const minInvRange = 0;
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
    <Filter className="w-[24.9rem]">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(filterRender as any)}>
          <div className="flex flex-col">
            <FilterTitle title="Location" />
            <HorizontalSeparator />

            <div className="px-6 my-6">
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

            <FilterTitle title="Investment Range" />
            <HorizontalSeparator />

            <div className="flex flex-col items-center justify-between px-6 my-6">
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
              <FilterTitle title="Investment Term" />
            </div>

            <HorizontalSeparator />

            <div className="flex flex-row px-6 my-4 ">
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

          <FilterButtons clearRender={clearFilter} />
        </form>
      </FormProvider>
    </Filter>
  );
};

export default InvestorFilter;
