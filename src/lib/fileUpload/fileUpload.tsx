"use client";

import "filepond/dist/filepond.min.css";
import "./fileUploadStyle.css";
// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { getCookie } from "cookies-next";
import { AppContants } from "../constants";

// // Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

type FileUploadProps = {
  field: {
    value: any;
    onChange: (value: any) => void;
  };
  name: string;
  logo?: string;
};

const FileUpload: React.FC<FileUploadProps> = ({ field, name, logo }) => {
  const [files, setFiles] = useState<any[]>(() => {
    const initialSource = logo
      ? `${process.env.NEXT_PUBLIC_ALL_API}${logo}`
      : name
      ? `${process.env.NEXT_PUBLIC_ALL_API}/sc/${name}.png`
      : null;

    return initialSource
      ? [
          {
            source: initialSource,
            options: {
              type: "local",
            },
          },
        ]
      : [];
  });

  const handleUpdateFiles = (updatedFiles: any[]) => {
    setFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      field.onChange(null);
    } else {
      const uploadedFile = updatedFiles[0];
      field.onChange(uploadedFile.source);
    }
  };

  const [fileID, setFileID] = useState<string>("");

  const token = getCookie(AppContants.ParseSessionCookieName);

  useEffect(() => {
    field.onChange(fileID);
    console.log("mm 100---  fileID ", fileID);
  }, [fileID]);

  return (
    <div className="w-full h-full">
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        name="files"
        acceptedFileTypes={["image/*"]}
        labelIdle={`
          <div class="!w-full !h-full flex flex-col items-center  rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5">
                <div
                  class="flex flex-col items-center justify-center border-2 p-1 rounded-md border-dashed border-launchingBlue-2 dark:border-launchingBlue-6 text-launchingBlue-4 dark:text-launchingBlue-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 18v-.09c0-.865 0-1.659.087-2.304c.095-.711.32-1.463.938-2.08c.618-.619 1.37-.844 2.08-.94c.646-.086 1.44-.086 2.306-.086h.178c.866 0 1.66 0 2.305.087c.711.095 1.463.32 2.08.938c.619.618.844 1.37.94 2.08c.085.637.086 1.416.086 2.267c2.573-.55 4.5-2.812 4.5-5.52c0-2.47-1.607-4.572-3.845-5.337C17.837 4.194 15.415 2 12.476 2C9.32 2 6.762 4.528 6.762 7.647c0 .69.125 1.35.354 1.962a4.4 4.4 0 0 0-.83-.08C3.919 9.53 2 11.426 2 13.765S3.919 18 6.286 18z" opacity="0.55"/><path fill="currentColor" fill-rule="evenodd" d="M12 14c-1.886 0-2.828 0-3.414.586S8 16.114 8 18s0 2.828.586 3.414S10.114 22 12 22s2.828 0 3.414-.586S16 19.886 16 18s0-2.828-.586-3.414S13.886 14 12 14m1.805 3.084l-1.334-1.333a.667.667 0 0 0-.942 0l-1.334 1.333a.667.667 0 1 0 .943.943l.195-.195v1.946a.667.667 0 0 0 1.334 0v-1.946l.195.195a.667.667 0 0 0 .943-.943" clip-rule="evenodd"/></svg>

                  <span class="!text-[0.55rem] font-regular leading-[0.01rem] text-launchingBlue-6 dark:text-launchingBlue-1.5">
                    Document Upload
                  </span>
                </div>

              </div>
        `}
        stylePanelLayout={"integrated"}
        stylePanelAspectRatio={"1:1"}
        server={{
          url: `${process.env.NEXT_PUBLIC_BASIC_API}`, // Replace with your API endpoint
          process: {
            url: "/v1/storage", // API route for file upload
            method: "POST",
            withCredentials: false,
            headers: {
              Authorization: `Bearer ${token}`, // Optional headers
            },
            onload: (response) => {
              console.log("File uploaded successfully:", response);
              const res = JSON.parse(response);
              setFileID(res.file);
              return response;
            },
            onerror: (error) => {
              console.error("File upload failed:", error);
            },
            ondata: (formData) => {
              const res = formData.getAll("files");
              if (res.length > 1) {
                formData.delete("files");
                formData.append("file", res[1]);
              }
              return formData;
            },
          },
          load: (source, load, error, progress, abort) => {
            fetch(source) // Source is the `downloadUrl` returned in process.onload
              .then((response) => {
                if (response.ok) {
                  return response.blob();
                }
                throw new Error("Failed to fetch file");
              })
              .then(load) // Pass blob to load
              .catch((err) => {
                console.error("Error loading file:", err);
                error("File could not be loaded.");
              });
            // Optional: Handle abort
            return {
              abort: () => {
                console.log("File load aborted");
                abort();
              },
            };
          },
          revert: {
            url: `/v1/storage/${fileID}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            //@ts-ignore
            onload: (response) => {
              if (response.status == 200) {
                setFileID("");
                //emit("update:modelValue", res.file);
              }
            },
          },
        }}
      />
    </div>
  );
};

export default FileUpload;
