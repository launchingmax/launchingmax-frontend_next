import { Button } from "@/components/ui/button";
import { ILink } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { trimStart } from "lodash-es";
import Link from "next/link";
import React from "react";

/**
 * I used heading as props. You can pass any {@link React.ReactNode}
 */
export interface IProps {
  children?: React.ReactNode;
  heading?: React.ReactNode;
  cta?: ILink | React.ReactNode;
  backUrl?: string;
  renderBackBtn?: (url?: string) => React.ReactNode;
  className?: string;
  showHorizontalLine?: boolean;
}

/**
 *
 * @param props The Props type is {@link IProps}
 * @returns
 */
const DashSection: React.FC<IProps> = ({
  backUrl,
  children,
  className,
  cta,
  heading,
  renderBackBtn,
  showHorizontalLine = true,
}) => {
  return (
    <section className={cn("flex flex-col w-full relative p-0 m-0", className)}>
      {/* Title of the section */}
      <div className="flex items-center w-full gap-x-6 sticky -top-1 pt-6 pb-6 md:pb-0 bg-white dark:bg-launchingBlue-8.5 z-10">
        {/* Back Url buttton */}
        {backUrl &&
          (renderBackBtn ? (
            renderBackBtn(backUrl)
          ) : (
            <Link href={`${"/" + trimStart(backUrl, "/")}`}>
              <Icon
                icon="solar:square-alt-arrow-left-bold-duotone"
                className="h-8 w-8 text-launchingBlue-5 dark:text-launchingBlue-2"
              />
            </Link>
          ))}

        {/* title of the section  */}
        {typeof heading === "string" ? (
          <h2 className="font-bold text-3xl tracking-wide text-launchingBlue-5 dark:text-white">
            <em>{heading}</em>
          </h2>
        ) : (
          heading
        )}

        {showHorizontalLine && (
          <span className="flex items-center flex-grow">
            <div
              className="w-0 h-0 translate-x-1 
              border-t-[8px] border-t-transparent
              border-l-[10px] border-l-launchingBlue-5 dark:border-l-white
              border-b-[8px] border-b-transparent"
            />
            <hr
              className=" h-0.5  flex-grow bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded md:my-10 "
            />
          </span>
        )}

        {cta instanceof ILink ? (
          <Link href={cta.href}>
            <Button className="w-max " variant={"secondaryColor"} size={"sm"}>
              {cta.title}
            </Button>
          </Link>
        ) : (
          cta
        )}
      </div>
      {children}
    </section>
  );
};

export default DashSection;
