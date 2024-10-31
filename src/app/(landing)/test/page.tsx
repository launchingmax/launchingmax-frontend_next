"use client";
import { Field } from "@/components/atoms/Field";
import MySelect from "@/components/molecules/select/MySelect";
import { Button } from "@/components/ui/button";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// app/page.tsx
export default function Home() {
  const [industries, setIndustries] = useState([]);
  const form = useForm({ defaultValues: { industry: "Information Technology & Services" } });

  const dispatch = useAppDispatch();
  const { industryItems, loading, error } = useAppSelector((state) => state.industries);

  useEffect(() => {
    industryItems.length == 0 && dispatch(fetchIndustriesData());
  }, [dispatch]);

  console.log("mm 300 --- --    ", industryItems);

  // const fetchIndustry = async () => {
  //   const res = await Fetch({
  //     url: "/v1/industry",
  //     method: "GET",
  //     token: getCookie(AppContants.ParseSessionCookieName),
  //     next: { revalidate: 1 },
  //   });
  //   setIndustries(res.items);
  // };
  // useEffect(() => {
  //   console.log("mm -----------------  context  ", industries);
  //   fetchIndustry();
  // }, []);

  const onSubmit = (values: any) => {
    console.log("----", values);
  };
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth !ease-[cubic-bezier(.21,1.77,.64,-0.46)]">
      {/* Navigation */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field<"select">
            name={"industry"}
            Input={MySelect}
            control={form.control}
            InputProps={{
              options: industryItems,
              renderItem: (item: any) => item.name,
              getItemValue: (item: any) => item.name,
              placeholder: "Industry",
              classes: {
                trigger: "w-5/6 justify-self-center h-16 bg-launchingBlue-05 border border-launchingBlue-1",
              },
            }}
          />
          <Button type="submit">OK</Button>
        </form>
      </FormProvider>
    </div>
  );
}
