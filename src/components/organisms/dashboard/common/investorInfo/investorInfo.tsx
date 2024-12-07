import { Field } from "@/components/atoms/Field";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { AppContants } from "@/lib/constants";
import { formatNumberWithCommas } from "@/lib/utils";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

const InvestorInfo = () => {
  const dispatch = useAppDispatch();

  const form = useForm();

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
    <div className="flex flex-col xl:flex-row w-full py-4 px-0  xl:px-8 gap-x-2 ">
      <FormProvider {...form}>
        <div className="flex flex-col w-full xl:w-1/2  gap-x-6 gap-y-2">
          <div className="w-full bg-launchingBlue-05 dark:bg-launchingBlue-8.5 rounded-md">
            <div
              className={`flex flex-col min-h-14 max-h-max  rounded-md py-2 px-4 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus-within:border-launchingBlue-3 focus-within:ring-1`}
              // onClick={triggerInput}
            >
              <label className="text-text-xs font-regular text-launchingGray-5 dark:text-fg-white hover:cursor-pointer">
                Investment Term
              </label>

              <div className="flex flex-row justify-start gap-x-10">
                {AppContants.investmentTerm.map((item, index) => (
                  <FormField
                    key={`${item.value}-${index}`}
                    control={form.control}
                    name="bbb"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row w-full items-center space-y-0 text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value === item.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? item.value : null); // Set the value or reset to null
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
          </div>

          <div className="w-full bg-launchingBlue-05 dark:bg-launchingBlue-8.5 rounded-md">
            <Field
              name="invExp"
              control={form.control}
              Input={CustomReactSelect}
              InputProps={{
                label: "Investment Experience",
                isClearable: true,
                isMulti: true,
                placeholder: "Select",
                options: AppContants.investmentExp,
                getOptionLabel: (option: any) => (typeof option === "string" ? option : option.label),
                getOptionValue: (option: any) => (typeof option === "string" ? option : option.label),
                onChange: (selectedOption: any) => {
                  form.setValue(
                    "invExp",
                    selectedOption?.map((a: any) => (typeof a === "string" ? a : a.label))
                  );
                },
                closeMenuOnSelect: false,
                hideSelectedOptions: false,
              }}
            />
          </div>

          <div className="w-full bg-launchingBlue-05 dark:bg-launchingBlue-8.5 rounded-md">
            <div
              className={`flex flex-col min-h-14 max-h-max  rounded-md py-2 px-4 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus-within:border-launchingBlue-3 focus-within:ring-1`}
              // onClick={triggerInput}
            >
              <label className="text-text-xs font-regular text-launchingGray-5 dark:text-fg-white hover:cursor-pointer">
                Investment Experience In Foreign Countries
              </label>

              <div className="flex flex-row justify-start gap-x-10">
                {AppContants.haveOrHaveNotOption.map((item, index) => (
                  <FormField
                    key={`${item.value}-${index}`}
                    control={form.control}
                    name="bbb"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row w-max items-center space-y-0 text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value === item.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? item.value : null); // Set the value or reset to null
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
          </div>
        </div>

        <div className="flex flex-col w-full xl:w-1/2 gap-y-2">
          <div
            className={`flex flex-col min-h-14 max-h-max  rounded-md py-2 px-4 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus-within:border-launchingBlue-3 focus-within:ring-1`}
            // onClick={triggerInput}
          >
            <label className="text-text-xs font-regular text-launchingGray-5 dark:text-fg-white hover:cursor-pointer">
              Investment Range
            </label>

            <div className="flex flex-col items-center justify-between px-6 mt-[0.62rem]">
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
              <div className="flex justify-between w-full mt-[0.62rem]">
                <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Min</span>
                <span className="text-launchingBlue-6 dark:text-launchingBlue-2 font-bold text-text-md">
                  {formatNumberWithCommas(form.watch("invRange.$gte") ?? AppContants.investmentRange.minInvRange)} -
                  {formatNumberWithCommas(form.watch("invRange.$lte") ?? AppContants.investmentRange.maxInvRange)} $
                </span>
                <span className="text-launchingBlack dark:text-fg-white text-sm font-regular">Max</span>
              </div>
            </div>
          </div>

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
      </FormProvider>
    </div>
  );
};

export default InvestorInfo;
