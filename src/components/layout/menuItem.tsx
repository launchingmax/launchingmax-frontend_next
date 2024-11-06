import AnimatedText from "@/lib/helper";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CgArrowLongDownE, CgMoon, CgSun } from "react-icons/cg";
import { Separator } from "../ui/separator";
import { IMenu } from "@/lib/models/user-level.model";
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";

const MenuItem = ({
  items,
  isCollapsed,
  className,
  toggleCollapse,
  showSeparator = false,
  openMultiple = true,
}: {
  items?: IMenu[];
  isCollapsed: boolean;
  className?: string;
  toggleCollapse?: () => void;
  showSeparator?: boolean;
  openMultiple?: boolean;
}) => {
  const pathname = usePathname();

  const router = useRouter();

  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSubmenu = (menu: string) => {
    setIsSubmenuOpen((prev: any) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-full text-white">
      {/* Menu Items */}
      {showSeparator && <Separator />}
      <ul className="space-y-2  my-3">
        {items?.map((item: IMenu, index) => {
          const isActive = pathname.toLowerCase().includes(item.title.toLowerCase());
          return (
            <li key={index} className="">
              <Link href={item.subMenus ? "" : `/v2/dashboard/${item.title.toLowerCase()}`} replace key={index}>
                <div
                  className={`relative group flex items-center justify-between cursor-pointer p-2 rounded h-10 ${
                    item.subMenus ? "" : "space-x-2"
                  } ${
                    isActive
                      ? "bg-launchingBlue-5 dark:bg-launchingBlue-7 text-fg-white"
                      : "text-launchingBlack dark:text-fg-white hover:bg-launchingBlue-05 dark:hover:bg-launchingBlue-1.5 "
                  }`}
                  onClick={() => {
                    item.subMenus && toggleSubmenu(item.title);
                    isCollapsed && toggleCollapse && toggleCollapse();
                  }}
                >
                  <div className="flex items-center space-x-8 group">
                    {item.icon && (
                      <Icon
                        className={`text-2xl absolute  ${
                          isActive
                            ? "text-fg-white"
                            : "group-hover:text-launchingBlue-4 dark:group-hover:text-launchingBlue-5"
                        }`}
                        icon={item.icon}
                      />
                    )}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <AnimatedText
                          text={item.title}
                          isCollapsed={isCollapsed}
                          className={` text-sm leading-[0.875rem] font-semibold line-clamp-1 overflow-x-hidden ${
                            isActive
                              ? "text-fg-white"
                              : " text-launchingBlack dark:text-fg-white dark:group-hover:text-launchingBlack  "
                          }`}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  {item.subMenus && !isCollapsed && (
                    <Icon
                      icon={"solar:double-alt-arrow-down-bold-duotone"}
                      className={`transition-transform duration-300 group-hover:text-launchingBlue-4 dark:group-hover:text-launchingBlue-5 ${
                        isSubmenuOpen[item.title] ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </div>
              </Link>
              {/* Submenu */}
              {item.subMenus && (
                <motion.ul
                  className={`overflow-hidden ${isSubmenuOpen[item.title] && "pb-1"}`}
                  initial={isSubmenuOpen[item.title] && !isCollapsed ? { opacity: 1, height: "auto" } : { height: 0 }}
                  animate={isSubmenuOpen[item.title] && !isCollapsed ? { opacity: 1, height: "auto" } : { height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.subMenus.map((subItem: IMenu, subIndex) => {
                    //console.log(subItem);
                    return (
                      <li
                        key={subIndex}
                        className={`-mt-2 pt-4 group flex items-center cursor-pointer ml-6  hover:underline hover:text-launchingGray-6 ${
                          !isCollapsed && "border-l border-b border-l-gray-300 border-b-gray-300 rounded-bl-lg"
                        }`}
                      >
                        <Link
                          href={`/v2/dashboard/${item.title.toLowerCase()}/${subItem.title.toLowerCase()}` ?? "#"}
                          replace
                          key={subIndex}
                        >
                          {subItem.icon && <Icon icon={subItem.icon} />}

                          <span
                            className={`-mb-2 line-clamp-1 group-hover:text-launchingGray-6 ml-1.5 bg-primary-alt !w-[300%] text-lightBlue-4 px-2 text-sm`}
                          >
                            {subItem.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuItem;
