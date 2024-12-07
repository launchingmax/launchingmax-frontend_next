import { Field } from "@/components/atoms/Field";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NextFetch } from "@/configs/api/next-fetch";
import { AppContants } from "@/lib/constants";
import { formatNumberWithCommas } from "@/lib/utils";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

const RequiredInfo = () => {
  const dispatch = useAppDispatch();

  const form = useForm();

  const [selectedCountryID, setSelectedCourtyID] = useState<string>("");
  const [cityItems, setCityItems] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);

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

  //   useEffect(() => {
  //     countryItems.find((item) => {
  //       if (item.name === editRow.country) setSelectedCourtyID(item._id);
  //     });
  //     if (editRow) {
  //       form.reset(editRow);
  //     }
  //   }, [editRow]);

  const fetchCitiesData = async (countryID: string) => {
    try {
      setIsLoadingCities(true);
      const response = await NextFetch(`/v1/city?page=0&country=${countryID}`, { method: "GET" });
      if (response.ok) {
        const res = await response.json();
        setCityItems(res);
        setIsLoadingCities(false);
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
    <div className="flex flex-col xl:flex-row w-full py-4 px-0  xl:px-8 gap-x-2 gap-y-2 ">
      <FormProvider {...form}>
        <div className="flex flex-col w-full xl:w-1/2  gap-x-6 gap-y-2">
          <Field
            name="firstName"
            control={form.control}
            Input={Input}
            InputProps={{
              type: "text",
              label: "First Name",
              require: true,
            }}
          />

          <Field
            name="lastName"
            control={form.control}
            Input={Input}
            InputProps={{
              type: "text",
              label: "Last Name",
              require: true,
            }}
          />

          <div className="w-full bg-launchingBlue-05 dark:bg-launchingBlue-8.5 rounded-md">
            <div
              className={`flex flex-col min-h-14 max-h-max  rounded-md py-2 px-4 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus-within:border-launchingBlue-3 focus-within:ring-1`}
              // onClick={triggerInput}
            >
              <label className="text-text-xs font-regular text-launchingGray-5 dark:text-fg-white hover:cursor-pointer">
                Birth Date
              </label>

              <div className="flex flex-row justify-start gap-x-10">
                {AppContants.haveOrHaveNotOption.map((item, index) => (
                  <FormField
                    key={`${item.value}-${index}`}
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row w-max items-center space-y-0 text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white"
                        >
                          <FormControl>
                            {/* <Checkbox
                              checked={field.value === item.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? item.value : null); // Set the value or reset to null
                              }}
                            /> */}
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Field
            name="gender"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Gender",
              isClearable: true,
              isMulti: true,
              placeholder: "Select",
              options: AppContants.genderOption,
              getOptionLabel: (option: any) => (typeof option === "string" ? option : option.label),
              getOptionValue: (option: any) => (typeof option === "string" ? option : option.label),
              onChange: (selectedOption: any) => {
                form.setValue(
                  "gender",
                  selectedOption?.map((a: any) => (typeof a === "string" ? a : a.label))
                );
              },
              closeMenuOnSelect: false,
              hideSelectedOptions: false,
            }}
          />

          <Field
            name="maritalStatus"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Marital Status",
              isClearable: true,
              isMulti: true,
              placeholder: "Select",
              options: AppContants.investmentExp,
              getOptionLabel: (option: any) => (typeof option === "string" ? option : option.label),
              getOptionValue: (option: any) => (typeof option === "string" ? option : option.label),
              onChange: (selectedOption: any) => {
                form.setValue(
                  "maritalStatus",
                  selectedOption?.map((a: any) => (typeof a === "string" ? a : a.label))
                );
              },
              closeMenuOnSelect: false,
              hideSelectedOptions: false,
            }}
          />
        </div>

        <div className="flex flex-col w-full xl:w-1/2 gap-y-2">
          <Field
            name="email.0"
            control={form.control}
            Input={Input}
            InputProps={{
              type: "email",
              label: "Email",
              placeholder: "example@gmail.com",
            }}
          />

          <div className="flex flex-row space-x-[0.38rem]">
            <div className="w-1/3">
              <Field
                name="phoneCode"
                control={form.control}
                Input={CustomReactSelect}
                InputProps={{
                  //isLoading: ,
                  isClearable: true,
                  placeholder: "Select",
                  //options: countryItems,
                  getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
                  getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),
                  // value:
                  //   countryItems.find(
                  //     (option: any) => form.watch("country") === (typeof option === "string" ? option : option.name)
                  //   ) || null,
                  // onChange: (selectedOption: any) => {
                  //   form.setValue("country", selectedOption.name);
                  //   setSelectedCourtyID(selectedOption?._id);
                  // },
                  closeMenuOnSelect: false,
                  hideSelectedOptions: false,
                }}
              />

              {/* <Field
                name="phoneCode"
                control={form.control}
                Input={Select}
                InputProps={{
                  //isLoading: ,
                  isClearable: true,
                  placeholder: "Select",
                  //options: countryItems,
                  getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
                  getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),
                  // value:
                  //   countryItems.find(
                  //     (option: any) => form.watch("country") === (typeof option === "string" ? option : option.name)
                  //   ) || null,
                  // onChange: (selectedOption: any) => {
                  //   form.setValue("country", selectedOption.name);
                  //   setSelectedCourtyID(selectedOption?._id);
                  // },
                  closeMenuOnSelect: false,
                  hideSelectedOptions: false,
                }}
              /> */}
            </div>
            <div className="w-full">
              <Field
                name="phoneNumber"
                control={form.control}
                Input={Input}
                InputProps={{
                  type: "text",
                  label: "Phone Number",
                  placeholder: "408 875 3000",
                }}
              />
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
              placeholder: "Select",
              options: countryItems,
              getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
              getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),
              value:
                countryItems.find(
                  (option: any) => form.watch("country") === (typeof option === "string" ? option : option.name)
                ) || null,
              onChange: (selectedOption: any) => {
                console.log("selectedOption-----", selectedOption);
                form.setValue("country", selectedOption.name);
                setSelectedCourtyID(selectedOption?._id);
              },
              closeMenuOnSelect: false,
              hideSelectedOptions: false,
            }}
          />
          <Field
            name="city"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              isLoading: isLoadingCities,
              isClearable: true,
              label: "City",
              options: cityItems,
              getOptionLabel: (option: any) => (typeof option === "string" ? option : option.name),
              getOptionValue: (option: any) => (typeof option === "string" ? option : option.name),
              value:
                cityItems.find(
                  (option: any) => form.watch("city") === (typeof option === "string" ? option : option.name)
                ) || null,
              onChange: (selectedOption: any) => {
                console.log("-----", selectedOption);
                form.setValue("city", typeof selectedOption === "string" ? selectedOption : selectedOption.name);
              },
              closeMenuOnSelect: false,
              hideSelectedOptions: false,
            }}
          />

          <Field
            name="postalCode"
            control={form.control}
            Input={Input}
            InputProps={{
              type: "number",
              label: "Zip postal code",
              placeholder: "5698745",
            }}
          />
        </div>
      </FormProvider>
    </div>
  );
};

export default RequiredInfo;
