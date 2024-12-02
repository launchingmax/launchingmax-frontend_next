import { ResError } from "@/configs/api/error-types";
import React from "react";

export const ErrorWrapper: React.FC<ResError> = ({ message, status, statusText }) => {
  return (
    <div className="w-full flex justify-center items-center ">
      <p>{status}</p>
      <p>{statusText}</p>
      {message && <p className="text-destructive-500">{typeof message === "string" ? message : message.error}</p>}
    </div>
  );
};
