import { Button } from "@/components/ui/button";

interface IProps {
  title?: string;
  desc?: string;
  note?: string;
  BodyContent?: React.ReactNode;
  actionButtonRender?: (value?: any) => void;
  cancelButtonRender?: (value?: any) => void;
  type?: "success" | "error" | "default";
  cancelButtonTitle?: string;
  actionButtonTitle?: string;
}

const YesNoDialogContent: React.FC<IProps> = ({
  title = "Title",
  desc,
  note,
  BodyContent,
  actionButtonRender,
  cancelButtonRender,
  type = "error",
  cancelButtonTitle = "Cancel",
  actionButtonTitle = "Yes",
}) => {
  return (
    <div className="w-full h-max flex flex-col">
      {/*title - desc*/}
      <div className="w-full h-max flex flex-row space-x-2 mb-8">
        <div
          className={`flex min-w-1.5 min-h-max rounded-lg ${
            type == "default"
              ? "bg-launchingBlue-5 dark:bg-launchingBlue-4"
              : type == "success"
              ? "bg-teal-5"
              : "bg-salmon-5 dark:bg-salmon-6"
          }`}
        ></div>
        <div
          className={`flex flex-col ${type == "success" ? "text-teal-7" : "text-launchingBlue-8.5 dark:text-fg-white"}`}
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

      <div className="w-full flex flex-row space-x-[0.625rem]">
        {cancelButtonRender && (
          <button
            className={`w-1/3 border-b-2 h-[2.6875rem] ${
              type == "default"
                ? "border-launchingBlue-5 dark:border-launchingBlue-4 text-launchingBlue-7 dark:text-fg-white"
                : type == "success"
                ? "border-teal-5 text-teal-7"
                : "border-salmon-5 text-salmon-7 dark:border-salmon-05 dark:text-fg-white"
            }`}
            onClick={cancelButtonRender}
          >
            {cancelButtonTitle}
          </button>
        )}
        {actionButtonRender && (
          <button
            className={`w-2/3 h-[2.6875rem] rounded-md text-fg-white ${
              type == "default"
                ? "bg-launchingBlue-5 dark:bg-launchingBlue-4"
                : type == "success"
                ? "bg-teal-5"
                : "bg-salmon-5 dark:bg-salmon-6 "
            }`}
            onClick={actionButtonRender}
          >
            {actionButtonTitle}
          </button>
        )}
      </div>
    </div>
  );
};

export default YesNoDialogContent;
