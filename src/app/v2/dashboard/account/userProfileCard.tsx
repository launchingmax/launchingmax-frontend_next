import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "@/lib/fileUpload/fileUpload";
import { IUser } from "@/lib/models/user.model";
import { Separator } from "@/components/ui/separator";
import { IProfile } from "@/lib/models/profile.model";
import { Button } from "@/components/ui/button";

registerPlugin(FilePondPluginImagePreview);

interface IProps {
  userData?: IUser | null;
  profileData?: IProfile;
}

const UserProfileCard: React.FC<IProps> = ({ userData }) => {
  const form = useForm();

  return (
    <div className="grid grid-cols-5 justify-self-center items-center w-[60vw] p-6 bg-white dark:bg-launchingBlue-8 rounded-lg  space-x-[0.88rem]">
      {/* Profile Image with FilePond */}

      <div className="w-[8.325rem] h-[8.325rem] flex justify-self-center bg-red-200">
        <Controller
          name="logo"
          control={form.control}
          render={({ field }) => <FileUpload field={{ ...field }} logo={userData?.avatar} />}
        />
      </div>

      <div className="col-span-4 flex-col">
        <div className="flex flex-row items-center ">
          <div className="w-full">
            <h2 className=" text-launchingGray-8 dark:text-fg-white text-nowrap text-text-md font-bold">
              Faramarz Faramarznia
            </h2>
            <p className=" text-launchingGray-7 dark:text-launchingBlue-05 text-nowrap text-base font-medium">
              Product Designer
            </p>
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block h-10 w-[0.0625rem] bg-launchingBlue-05 dark:bg-launchingBlue-7"
          />
          <Separator
            orientation="horizontal"
            className="hidden md:flex w-[50%] bg-launchingBlue-05 dark:bg-launchingBlue-7 mr-2"
          />

          <Button className="px-10 py-3 w-max text-text-xs font-medium bg-launchingBlue-05 dark:bg-launchingBlue-7 text-launchingGray-7 dark:text-fg-white">
            Preview
          </Button>
        </div>

        <p className="mt-2 text-launchingGray-6 dark:text-launchingGray-05 text-text-sm font-regular">
          Started with front-end development and React, but now I'm a UX enthusiast who is passionate about improving
          user experience and loves collaborating. I am creative, flexible, and hardworking. Let's work together.
        </p>

        <button className="mt-2 flex items-center text-blue-500 text-sm space-x-1">
          <span className="material-icons">edit</span>
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
