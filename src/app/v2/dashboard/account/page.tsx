"use client";

import DashSection from "@/components/organisms/dashboard/DashSection";
import { Profile } from "./profile";
import { runFetch } from "@/configs/api/server-fetch";
import { ErrorWrapper } from "@/components/atoms/error-wrapper";
import { IProfile } from "@/lib/models/profile.model";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useQuery } from "@tanstack/react-query";
import { NextFetch } from "@/configs/api/next-fetch";
import { Suspense } from "react";

export default function account() {
  const { userDetail } = useGlobal();

  const { data, isError } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await NextFetch(
        `/v1/profile/${userDetail?.profile}`,
        // &populate=${JSON.stringify([
        //   { path: "user", select: "firstName lastName avatar", populate: { path: "profile" } },
        // ])}`
        {
          method: "Get",
        }
      );
      if (response.ok) {
        const data: IProfile = await response.json();
        console.log("mm 4040-- --  dataaaa ---- ", data);
        console.log("mm 4040-- --  dataaaa ---- ", userDetail?.avatar);
        return data;
      }
    },
    //enabled: shouldFetch,
  });

  return (
    <div>
      <DashSection heading="Profile" />
      <Profile userData={userDetail} />
    </div>
  );
}
