"use client";
import { Field } from "@/components/atoms/Field";
import MySelect from "@/components/molecules/select/MySelect";
import { Button } from "@/components/ui/button";
import { AppContants } from "@/lib/constants";
import { fetchIndustriesData } from "@/store/slices/industriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// app/page.tsx
export default function Home() {
  const [industries, setIndustries] = useState([]);
  const form = useForm({ defaultValues: { industry: "Information Technology & Services" } });

  const onSubmit = (values: any) => {
    console.log("----", values);
  };
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth !ease-[cubic-bezier(.21,1.77,.64,-0.46)]">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          {/* <MySelect removePortal options={industryItems} renderItem={(i) => i.name} getItemValue={(i) => i.name} /> */}
        </DialogContent>
      </Dialog>

      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {industryItems.map((item: any) => (
            <SelectItem value={item.name}>{item.name}</SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>
  );
}
