"use client";
import { Field } from "@/components/atoms/Field";

import MultiSelectGroup from "@/components/molecules/multiSelectGroup";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface IProps {
  editRow?: any;
  addEditRender: (param: any) => void;
}

const AddEditSupportiveCenters: React.FC<IProps> = ({ editRow, addEditRender }) => {
  const form = useForm();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  console.log(` ---------------------------- `, editRow);

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

  const options = [
    { label: "Invest", value: "Invest" },
    { label: "Develop", value: "Develop" },
    { label: "Letter of support", value: "LetterOfSupport" },
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
  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="h-[80vh] lg:h-max w-max overflow-y-auto">
      <div className="hidden">
        <SectionTitle title="Add new supportive center" />
      </div>
      <div className="hidden lg:block">
        <SectionTitle title="Supportive center" />
      </div>

      <div className="p-1 space-y-6 overflow-y-auto lg:w-[48rem]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(addEditRender)}>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
              <div className="flex flex-col p-[0.44rem] items-center w-[6.625rem] lg:w-[7.625rem] h-[6.625rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
                {/* Custom Upload Div */}
                <div
                  onClick={triggerFileInput}
                  className="w-full max-w-xs h-48 flex flex-col items-center justify-center border-2 p-1 rounded-md gap-y-[0.48rem] border-dashed border-launchingBlue-2 dark:border-launchingBlue-6 cursor-pointer"
                >
                  <Icon
                    icon="solar:cloud-upload-bold-duotone"
                    className="text-display-xl text-launchingBlue-4 dark:text-launchingBlue-1.5"
                  />
                  <span className="text-[0.55rem] font-regular leading-[0.01rem] text-launchingBlue-6 dark:text-launchingBlue-1.5">
                    Document Upload
                  </span>
                </div>

                {/* Hidden file input */}
                <input type="file" ref={inputRef} onChange={handleFileSelect} className="hidden" />

                {/* Optional upload button */}
                {/* <Button onClick={triggerFileInput} className="mt-4">
                    Upload File
                  </Button> */}
              </div>
              {/* <Input
                  name="picture"
                  type="file"
                  className="w-[6.625rem] h-[6.625rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5"
                /> */}
              <Textarea
                className=" min-h-[6.625rem] w-full text-text-md font-regular text-launchingGray-3 dark:text-launchingBlue-2 bg-launchingBlue-05 dark:bg-launchingBlue-8.5"
                placeholder="Type a description here ..."
              />
            </div>

            <div className="flex flex-col lg:flex-row  lg:mt-6 mt-2 gap-2 lg:gap-4  ">
              <div className="flex flex-col justify-between w-full lg:w-1/2 gap-2 lg:gap-0">
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
                      value={countryItems.find((option) => option.value === field)}
                      onChange={(selectedOption: any) => field.onChange(selectedOption?.value)}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                    />
                  )}
                />

                <Field
                  name="address"
                  control={form.control}
                  value={editRow?.aaaa}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    placeholder: "Address",
                  }}
                />

                <Field
                  name="phoneNumber"
                  control={form.control}
                  value={editRow?.aaaa}
                  Input={Input}
                  InputProps={{
                    type: "number",
                    placeholder: "Phone Number ",
                  }}
                />

                <Field
                  name="website"
                  control={form.control}
                  value={editRow?.industry}
                  Input={Input}
                  InputProps={{
                    type: "text",
                    placeholder: "Website URL",
                  }}
                />

                <Field
                  name="email"
                  control={form.control}
                  value={editRow?.industry}
                  Input={Input}
                  InputProps={{
                    type: "email",
                    placeholder: "Email",
                  }}
                />
              </div>

              <Separator orientation="vertical" className="hidden lg:block h-80 w-[0.0625rem] bg-launchingBlue-05" />
              <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
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
                <div className="flex flex-col mt-2 my-auto">
                  <div className="flex flex-row">
                    <h2 className="w-1/2  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                      Type
                    </h2>
                    <h2 className="w-1/2 flex justify-center  text-text-md font-medium leading-[0.02rem] text-launchingBlue-5 dark:text-launchingBlue-1.5 px-6 py-4">
                      Startegy
                    </h2>
                  </div>

                  <Separator
                    orientation="horizontal"
                    className="h-[0.1rem] w-full col-span-12 bg-launchingBlue-05 pr-6"
                  />
                  <div className="flex flex-row">
                    <div className="flex justify-between my-2 w-1/2">
                      <Field
                        name="radioGroup"
                        renderInput={(field) => (
                          <RadioGroup {...field} className="">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Accelerator" id="r1" />
                              <Label htmlFor="r1">Accelerator</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={"VentureCapital"} id="r2" />
                              <Label htmlFor="r2">Venture Capital</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={"Individual/Angel"} id="r3" />
                              <Label htmlFor="r3">Individual/Angel</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={"Private Equity Firm"} id="r4" />
                              <Label htmlFor="r4">Private Equity Firm</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-40 w-[0.0625rem] bg-launchingBlue-05 mx-6 my-2  justify-self-center"
                    />
                    <MultiSelectGroup options={options} onChange={handleMultiSelectChange} className="col-span-5" />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 w-full ">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-md bg-gradient-to-tr from-[#37927D] to-[#6AC5B0]"
                  >
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
