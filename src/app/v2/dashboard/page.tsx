"use client";

import { Field } from "@/components/atoms/Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useToast } from "@/hooks/use-toast";
import { DialogBase as Modal, PromptDialog as Prompt, TagDialog } from "@/lib/types/dialogs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Dashboard() {
  const [countState, setCountState] = useState<number>(1);

  const { showLoading } = useGlobal();

  const methods = useForm();

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
  }

  const { toast } = useToast();

  const showMyAlert = () => {
    setCountState(countState + 1);
    toast({
      title: `----------         hiii  ${countState}     ----------- `,
      variant: "error",
      position: "bottom",
    });
  };

  const showMyLoading = () => {
    showLoading(true);
  };

  return (
    <main>
      <div className="w-[600px] h-[150px] flex-wrap justify-center place-items-center bg-blue-950 rounded-2xl hover:shadow-2xl">
        <h1>DASHBOARD </h1>
        <div className="flex justify-end ml-4">
          <Button className="bg-yellow-400 text-blue-950">Show Alert</Button>

          <Button className="bg-green-400 text-blue-950 ml-2">Show global Dialog ede</Button>

          <Button className="bg-yellow-400 text-blue-950">Show Loading</Button>
        </div>
      </div>
    </main>
  );
}
