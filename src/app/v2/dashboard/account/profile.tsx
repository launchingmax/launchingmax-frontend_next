"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProfile } from "@/lib/models/profile.model";
import { IUser } from "@/lib/models/user.model";
import UserProfileCard from "./userProfileCard";
import InvestorInfo from "@/components/organisms/dashboard/common/investorInfo/investorInfo";
import { useForm } from "react-hook-form";
import RequiredInfo from "./requiredInfo";
import AdditionalInfo from "./additionalInfo";

interface IProps {
  userData?: IUser | null;
  profileData?: IProfile;
}

export function Profile({ userData, profileData }: IProps) {
  return (
    <div className="">
      <UserProfileCard userData={userData} />

      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requiredInfo">Required Information</TabsTrigger>
          <TabsTrigger value="additionalInfo">Additional Information</TabsTrigger>
          <TabsTrigger value="investmentInfo">Investment Information</TabsTrigger>
        </TabsList>
        <TabsContent value="requiredInfo">
          <RequiredInfo />
        </TabsContent>
        <TabsContent value="additionalInfo">
          <AdditionalInfo />
        </TabsContent>
        <TabsContent value="investmentInfo">
          <InvestorInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
