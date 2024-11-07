"use client";

import { Field } from "@/components/atoms/Field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useRedirectQuery } from "@/hooks/use-redirect";

import { NextFetch } from "@/configs/api/next-fetch";
import { useToast } from "@/hooks/use-toast";
import { AppContants } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import qs from "qs";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast as soonerToast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function SignInPage() {
  const { t } = useTranslation("translation");
  const { setIsLoading } = useGlobal();
  const [redirect] = useRedirectQuery();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const body = { username: values.username, password: values.password };
    const res = await NextFetch("v2/auth", { method: "PUT", body: JSON.stringify(body) });
    if (res.ok) {
      const { clientID } = await res.json();

      const { accessToken } = await NextFetch(`/v2/auth` + qs.stringify({ clientID }, { addQueryPrefix: true })).then(
        (r) => r.json()
      );
      setCookie(AppContants.ParseSessionCookieName, accessToken);
      redirect("/v2/dashboard");
    } else {
      const data = await res.json();
      soonerToast(" --- ", {
        description: `${data.message}`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      //showAlert({ message: data.message });
    }

    // try {
    //   setIsLoading(true);

    //   const user = await ParseBrowser.User.logIn(
    //     values.username,
    //     values.password
    //   );
    //   const token = user.getSessionToken();
    //   setCookie(AppContants.ParseSessionCookieName, token);
    //   redirect();
    // } catch (err: any) {
    //   toast({ description: t(`auth.error.${err.code}`), variant: "error" });
    // } finally {
    //   setIsLoading(false);
    // }
  }

  const [countToast, setCountToast] = useState<number>(1);
  const [countSooner, setCountSooner] = useState<number>(1);

  const showToast = () => {
    setCountToast(countToast + 1);
    toast({
      title: `----------         hiii  ${countToast}     ----------- `,
      variant: "error",
      position: "bottom",
    });
  };

  const showSooner = () => {
    setCountSooner(countSooner + 1);
    soonerToast(` --- --- -- ${countToast}  ----- `, {
      description: "uhad edbqabn ejdjwejd",
    });
  };

  return (
    <Suspense fallback={"Loading"}>
      <div className="h-dvh flex justify-center items-center">
        <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
          {/* <Button className="bg-yellow-400 text-blue-950" onClick={showToast}>
            Toast
          </Button>
          <Button className="bg-yellow-400 text-blue-950" onClick={showSooner}>
            Sooner
          </Button> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Field name="username" control={form.control} Input={Input} label={t("auth.username")} />
              <Field<"input"> name={"password"} Input={Input} label={t("auth.password")} />
              <Input type="submit" className="w-[50%] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer" />
            </form>
          </Form>
        </div>
      </div>
    </Suspense>
  );
}
