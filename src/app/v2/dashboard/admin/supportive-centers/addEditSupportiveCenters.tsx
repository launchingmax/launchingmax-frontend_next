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
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import FileUpload from "@/lib/fileUpload/fileUpload";

interface IProps {
  editRow?: any;
  addEditRender: (param: any) => void;
  type: "add" | "edit";
}

const AddEditSupportiveCenters: React.FC<IProps> = ({ editRow, addEditRender, type }) => {
  const form = useForm();

  const { toast } = useToast();

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
    if (editRow) {
      form.reset(editRow);
    }
  }, [editRow]);

  const strategyOptions = [
    { label: "Invest", value: "Invest" },
    { label: "Develop", value: "Develop" },
    { label: "Letter of support", value: "LOS" },
  ];

  const typeOptions = [
    { label: "Accelerator", value: "Accelerator" },
    { label: "Incubator", value: "Incubator" },
    { label: "Venture Capital", value: "Venture Capital" },
    { label: "Individual/Angel", value: "Individual/Angel" },
    { label: "Private Equity Firm", value: "Private Equity Firm" },
  ];

  const handleMultiSelectChange = (selectedOptions: string[]) => {
    console.log("Selected options:", selectedOptions);
  };

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Selected",
        description: `You selected ${file.name}`,
      });
      // Do something with the file, like uploading it
    }
  };

  // Function to trigger file input click
  // const triggerFileInput = () => {
  //   inputRef.current?.triggerFileDialog();
  // };

  return (
    <div className="h-[80vh] lg:h-max w-max overflow-y-auto">
      <div className="hidden">
        <SectionTitle title={`${type == "add" ? "Add new supportive center" : "Edit supportive center"}`} />
      </div>
      <div className="hidden lg:block">
        <SectionTitle title={`${type == "add" ? "Add new supportive center" : "Edit supportive center"}`} />
      </div>

      <div className="p-1 space-y-6 overflow-y-auto lg:w-[48rem] h-max">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(addEditRender)}>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
              {/* <div className="flex flex-col p-[0.44rem] items-center w-[6.625rem] lg:w-[7.625rem] h-[6.625rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
                <div
                  //onClick={triggerFileInput}
                  className="w-full max-w-xs h-48 flex flex-col items-center justify-center border-2 p-1 rounded-md gap-y-[0.48rem] border-dashed border-launchingBlue-2 dark:border-launchingBlue-6 cursor-pointer"
                >
                  <Icon
                    icon="solar:cloud-upload-bold-duotone"
                    className="text-display-xl text-launchingBlue-4 dark:text-launchingBlue-1.5"
                  />

                  <span className="text-[0.55rem] font-regular leading-[0.01rem] text-launchingBlue-6 dark:text-launchingBlue-1.5">
                    Document Upload
                  </span>
                </div> */}
              {/* <input type="file" ref={inputRef} onChange={handleFileSelect} className="hidden" /> */}

              <div className="w-[6.625rem] lg:w-[7.625rem] h-[6.625rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
                <FileUpload renderFiles={(files: any) => console.log("Submitted files:", files)} />
              </div>
              {/* </div> */}

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
              <div className="flex flex-col justify-between w-full lg:w-1/2 gap-2">
                <Field
                  name="name"
                  control={form.control}
                  value={editRow?.name}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    label: "Name",
                    placeholder: "Write the Adress",
                  }}
                />

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
                  name="tel"
                  control={form.control}
                  value={editRow?.tel}
                  Input={Input}
                  InputProps={{
                    type: "number",
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
                  name="email"
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
              <div className="w-full lg:w-1/2 flex flex-col justify-between gap-2 space-y-4">
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
                      options={industryItems.map((option: any) => ({
                        value: option.name,
                        label: option.name,
                      }))}
                      getOptionLabel={(option: any) => option.label}
                      getOptionValue={(option: any) => option.value}
                      value={field?.value?.map((item: any) => {
                        return { label: item, value: item };
                      })}
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
                  <div className="flex flex-row">
                    <div className="flex justify-between my-2 w-1/2">
                      <Controller
                        name="group"
                        control={form.control}
                        render={({ field }) => (
                          <div className={cn("space-y-2 my-2")}>
                            {typeOptions.map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <Checkbox.Root
                                  className="aspect-square h-6 w-6 text-text-xl text-launchingBlue-5 dark:text-launchingGray-3 font-extrabold rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 shadow focus:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  checked={field?.value?.includes(option.value)}
                                  onCheckedChange={(isChecked) => {
                                    const newValue = isChecked
                                      ? [...field?.value, option?.value] // Add if checked
                                      : field?.value?.filter((val: any) => val !== option.value); // Remove if unchecked
                                    field.onChange(newValue); // Update form state
                                  }}
                                >
                                  <Checkbox.Indicator className="flex items-center justify-center">
                                    <CheckIcon className="w-5 h-5" />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                                <span className="text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white">
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-40 w-[0.0625rem] bg-launchingBlue-05 mx-6 my-2  justify-self-center"
                    />
                    <div className="flex justify-between my-2 w-1/2">
                      <Controller
                        name="strategy"
                        control={form.control}
                        render={({ field }) => (
                          <div className={cn("space-y-2 my-2")}>
                            {strategyOptions.map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <Checkbox.Root
                                  className="aspect-square h-6 w-6 text-text-xl text-launchingBlue-5 dark:text-launchingGray-3 font-extrabold rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 shadow focus:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  checked={field?.value?.includes(option.value)}
                                  onCheckedChange={(isChecked) => {
                                    const newValue = isChecked
                                      ? [...field?.value, option?.value] // Add if checked
                                      : field?.value?.filter((val: any) => val !== option.value); // Remove if unchecked
                                    field.onChange(newValue); // Update form state
                                  }}
                                >
                                  <Checkbox.Indicator className="flex items-center justify-center">
                                    <CheckIcon className="w-5 h-5" />
                                  </Checkbox.Indicator>
                                </Checkbox.Root>
                                <span className="text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white">
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
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
