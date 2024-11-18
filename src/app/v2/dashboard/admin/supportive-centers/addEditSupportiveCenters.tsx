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

interface IProps {
  editRow?: any;
  addEditRender: (param: any) => void;
  type: "add" | "edit";
}

const AddEditSupportiveCenters: React.FC<IProps> = ({ editRow, addEditRender, type }) => {
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
    console.log("mm 4040 -- --    ", industryItems);
    countryItems.find((item) => {
      if (item.name === editRow.country) setSelectedCourtyID(item._id);
    });
    if (editRow) {
      form.reset(editRow);
    }
  }, [editRow]);

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
    <div className="h-[80vh] lg:h-max w-max overflow-y-auto">
      <div className="hidden">
        <SectionTitle title={`${type == "add" ? "Add new supportive center" : "Edit supportive center"}`} />
      </div>
      <div className="hidden lg:block">
        <SectionTitle title={`${type == "add" ? "Add new supportive center" : "Edit supportive center"}`} />
      </div>

      <div className="p-1 space-y-6 overflow-y-auto lg:w-[48rem] h-max px-8">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(addEditRender)}>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
              <div className="w-[6.625rem] lg:w-[7.625rem] h-[6.625rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
                <Controller
                  name="logo"
                  control={form.control}
                  render={({ field }) => <FileUpload field={{ ...field }} />}
                />
              </div>
              <Controller
                name="about"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className=" min-h-[6.625rem] w-full text-text-md font-regular text-launchingGray-3 dark:text-launchingBlue-2 bg-launchingBlue-05 dark:bg-launchingBlue-8.5"
                    placeholder="Type a description here ..."
                  />
                )}
              />
            </div>

            <div className="flex flex-col lg:flex-row  lg:mt-6 mt-2 gap-2 lg:gap-4 ">
              <div className="w-full lg:w-1/2 flex flex-col gap-2">
                <Field
                  name="name"
                  control={form.control}
                  value={editRow?.name}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    label: "Name",
                    //placeholder: "Write the Adress",
                  }}
                />

                <Controller
                  name="industries"
                  control={form.control}
                  render={({ field, formState }) => (
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

                <Field
                  name="address"
                  control={form.control}
                  value={editRow?.address}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    label: "Address",
                    placeholder: "Write the Adress",
                  }}
                />

                <Field
                  name="tel.0"
                  control={form.control}
                  value={editRow?.tel}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    label: "Phone Number",
                    placeholder: "For example (+1)408 875 3000",
                  }}
                />

                <Field
                  name="website"
                  control={form.control}
                  value={editRow?.website}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    label: "Website URL",
                    placeholder: "www.example.com",
                  }}
                />

                <Field
                  name="email.0"
                  control={form.control}
                  value={editRow?.email}
                  Input={Input}
                  InputProps={{
                    type: "email",
                    label: "Email",
                    placeholder: "example@gmail.com",
                  }}
                />
              </div>
              <Separator orientation="vertical" className="hidden lg:block h-80 w-[0.0625rem] bg-launchingBlue-05" />
              <div className="w-full lg:w-1/2 flex flex-col gap-2">
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

                <div className="flex flex-col mt-2 my-auto">
                  <div className="flex flex-row">
                    <h2 className="w-1/2  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                      Type
                    </h2>
                    <h2 className="w-1/2 flex justify-start pl-10  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                      Startegy
                    </h2>
                  </div>

                  <Separator
                    orientation="horizontal"
                    className="h-[0.1rem] w-full col-span-12 bg-launchingBlue-05 pr-6"
                  />
                  <div className="flex flex-row ">
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
                                              : field.onChange(
                                                  field.value?.filter((value: string) => value !== item.value)
                                                );
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
                                              : field.onChange(
                                                  field.value?.filter((value: string) => value !== item.value)
                                                );
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

                <div className="flex justify-end space-x-4 w-full ">
                  <button type="submit" className="w-full h-14 rounded-md bg-gradient-to-r from-[#37927D] to-[#6AC5B0]">
                    <div className="flex justify-center items-center gap-x-[0.62rem] text-fg-white">
                      <span>Submit</span>
                      <span>
                        <Icon icon="solar:add-circle-bold-duotone" className="text-text-xl" />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddEditSupportiveCenters;
