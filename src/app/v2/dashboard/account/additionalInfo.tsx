import { Field } from "@/components/atoms/Field";
import CustomReactSelect from "@/components/molecules/select/CustomReactSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-sider";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NextFetch } from "@/configs/api/next-fetch";
import { AppContants } from "@/lib/constants";
import FileUpload from "@/lib/fileUpload/fileUpload";
import { formatNumberWithCommas } from "@/lib/utils";
import { fetchCountriesData } from "@/store/slices/countriesSlice";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Controller, FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

// FilePond Plugins (Optional)
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

interface IProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

const AdditionalInfo = () => {
  const form = useForm();

  const [files, setFiles] = useState<any[]>([]);

  const handleUpdateFiles = (updatedFiles: any[]) => {
    setFiles(updatedFiles);
    // if (updatedFiles.length === 0) {
    //   field.onChange(null);
    // } else {
    //   const uploadedFile = updatedFiles[0];
    //   field.onChange(uploadedFile.source);
    // }
  };

  return (
    <div className="flex flex-col xl:flex-row w-full py-4 px-0  xl:px-8 gap-x-2 gap-y-2 ">
      <FormProvider {...form}>
        <div className="flex flex-col w-full xl:w-1/2  gap-x-6 gap-y-2">
          <Field
            name="aa"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Educational Field",
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
            name="aa"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Educational Degree",
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
            name="aa"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Other Languages",
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
            name="aa"
            control={form.control}
            Input={CustomReactSelect}
            InputProps={{
              label: "Mother Tongue",
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
        </div>

        <div className="flex flex-col w-full xl:w-1/2 gap-y-2">
          <div className="w-full h-[11.5rem] rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
            {/* <Controller
              name="logo"
              control={form.control}
              render={({ field }) => <FileUpload field={{ ...field }} />}
            /> */}

            <FilePond
              files={files}
              onupdatefiles={handleUpdateFiles}
              allowMultiple={false}
              maxFiles={1}
              acceptedFileTypes={["application/pdf", "application/msword"]}
              labelIdle={`<div class="flex flex-col items-center justify-center p-4">
            <div class="bg-launchingBlue-05 dark:bg-launchingBlue-8.5 text-launchingBlue-4 dark:text-launchingBlue-3 rounded-full  mt-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M14 4h-4C6.229 4 4.343 4 3.172 5.172S2 8.229 2 12s0 5.657 1.172 6.828S6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12s0-5.657-1.172-6.828S17.771 4 14 4" opacity="0.5"/><path fill="currentColor" d="M13.25 9a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M9 11a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 6c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2"/></svg>
            </div>
            <p class="text-text-xs font-regular text-launchingGray-5 dark:bg-launchingGray-05">Drag your CV here</p>
          </div>`}
              className="filepond-custom  bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border-dashed border-2 border-blue-200 rounded-lg"
            />
          </div>

          <Field
            name="sss"
            control={form.control}
            Input={Input}
            InputProps={{
              type: "text",
              label: "Last Job Activity",
            }}
          />
        </div>
      </FormProvider>
    </div>
  );
};

export default AdditionalInfo;
