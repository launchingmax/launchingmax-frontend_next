import MyDialog from "@/components/molecules/MyDialog";
import { Button } from "@/components/ui/button";
import { RequestStatus } from "@/lib/constants/request.enum";
import { Dispatch, SetStateAction } from "react";

export enum ConfirmDialogType {
  success = "success",
  default = "default",
  error = "error",
  successResult = "successResult",
}
interface IProps {
  title?: string;
  desc?: string;
  note?: string;
  actionButtonRender?: (value?: any) => void;
  cancelButtonRender?: (value?: any) => void;
  type?: ConfirmDialogType;
  cancelButtonTitle?: string;
  actionButtonTitle?: string;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  dialogTrigger?: React.ReactNode;
  BodyContent?: React.ReactNode;
  loading?: boolean;
}

const ConfirmDialog: React.FC<IProps> = ({
  title = "Title",
  desc,
  note,
  actionButtonRender,
  cancelButtonRender,
  type = ConfirmDialogType.default,
  cancelButtonTitle = "Cancel",
  actionButtonTitle = "Yes",
  open = false,
  setOpen,
  dialogTrigger,
  BodyContent,
}) => {
  return (
    <MyDialog
      open={open}
      setOpen={setOpen}
      className={{ dialogContent: `${type == ConfirmDialogType.successResult ? "bg-teal-05 dark:bg-teal-05" : ""}` }}
      dialogTrigger={dialogTrigger}
      body={
        <div className="w-full h-max flex flex-col px-4 pt-4">
          {/*title - desc*/}
          <div className="w-full h-max flex flex-row space-x-2 mb-8">
            <div
              className={`flex min-w-1.5 min-h-max rounded-lg 
            ${
              type == ConfirmDialogType.default
                ? "bg-launchingBlue-5 dark:bg-launchingBlue-4"
                : type == ConfirmDialogType.successResult
                ? "bg-teal-5 dark:bg-teal-5"
                : type == ConfirmDialogType.success
                ? "bg-teal-6"
                : "bg-salmon-5 dark:bg-salmon-6"
            }
          `}
            ></div>
            <div
              className={`flex flex-col ${
                type == ConfirmDialogType.successResult ? "text-teal-7" : "text-launchingBlue-8.5 dark:text-fg-white"
              }`}
            >
              <h2 className={`text-display-xs leading-8`}>{title}</h2>
              <h2 className={`text-text-sm leading-5 text-justify`}>{desc}</h2>
            </div>
          </div>
          {/*note*/}
          {note && (
            <h2 className={`text-text-sm leading-5 text-justify px-[0.875rem] mb-6`}>
              wsssssssssssssssssssssssssssswwwwwwww
            </h2>
          )}

          {BodyContent && <div className="py-8 pl-4">{BodyContent}</div>}

          <div className="w-full flex flex-row justify-center space-x-[0.625rem]">
            {cancelButtonRender && (
              <button
                className={`w-full border-b-2 h-[2.6875rem] ${
                  type == ConfirmDialogType.default
                    ? "border-launchingBlue-5 dark:border-launchingBlue-4 text-launchingBlue-7 dark:text-fg-white"
                    : type == ConfirmDialogType.successResult
                    ? "border-teal-5 text-teal-7"
                    : type == ConfirmDialogType.success
                    ? "border-teal-6 text-teal-7 dark:border-teal-05 dark:text-teal-05"
                    : "border-salmon-5 text-salmon-7 dark:border-salmon-05 dark:text-fg-white"
                }`}
                onClick={cancelButtonRender}
              >
                {cancelButtonTitle}
              </button>
            )}
            {actionButtonRender && (
              <Button
                className={`w-full h-[2.6875rem] rounded-md text-fg-white ${
                  type == ConfirmDialogType.default
                    ? "bg-launchingBlue-5 dark:bg-launchingBlue-4"
                    : type == ConfirmDialogType.successResult
                    ? "bg-teal-5"
                    : type == ConfirmDialogType.success
                    ? "bg-teal-6"
                    : "bg-salmon-5 dark:bg-salmon-6 "
                }`}
                onClick={actionButtonRender}
              >
                {actionButtonTitle}
              </Button>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ConfirmDialog;
