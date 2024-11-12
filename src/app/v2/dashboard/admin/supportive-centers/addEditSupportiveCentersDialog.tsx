"use client";
import { Field } from "@/components/atoms/Field";
import MyInput from "@/components/atoms/myInput";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  editRow?: any;
  addEditRender: (param: any) => void;
}

const AddEditSupportiveCentersDialog: React.FC<IProps> = ({ editRow, addEditRender }) => {
  const form = useForm();

  console.log(` ---------------------------- `, editRow);

  // useEffect(() => {
  //   if (editRow) {
  //     form.reset(editRow);
  //   }
  // }, [editRow]);

  return (
    <div>
      <div className="h-max overflow-y-auto">
        <SectionTitle title="Add new supportxive center" />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(addEditRender)}>
            <Field
              name="name"
              control={form.control}
              Input={MyInput}
              InputProps={{
                type: "text",
                placeholder: "status",
              }}
            />

            <Field
              name="country"
              control={form.control}
              value={editRow?.country}
              Input={MyInput}
              InputProps={{
                type: "text",
                placeholder: "email",
              }}
            />

            <Field
              name="industry"
              control={form.control}
              value={editRow?.industry}
              Input={MyInput}
              InputProps={{
                type: "text",
                placeholder: "amount",
              }}
            />

            <div className="flex justify-end space-x-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddEditSupportiveCentersDialog;
