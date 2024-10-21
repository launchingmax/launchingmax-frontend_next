import AnimatedText from "@/lib/helper";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CgArrowLongDownE, CgMoon, CgSun } from "react-icons/cg";
import { Separator } from "../ui/separator";
import { IMenu, IMenuItem } from "@/lib/models/user-level.model";
import { useState } from "react";
import { motion } from "framer-motion";

const MenuItem = ({
  items,
  isCollapsed,
  className,
  showSeparator = false,
}: {
  items?: IMenu[];
  isCollapsed: boolean;
  className?: string;
  showSeparator?: boolean;
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSubmenu = (menu: string) => {
    setIsSubmenuOpen((prev: any) => ({
      ...prev,
      [menu]: !prev[menu] ?? true,
    }));
  };

  return (
    <div className="w-full  bg-white dark:bg-launchingBlack text-white">
      {/* Menu Items */}
      {showSeparator && <Separator />}
      <ul className="space-y-1">
        {items?.map((item: IMenu, index) => (
          <li key={index}>
            <div
              className={`group flex items-center justify-between cursor-pointer hover:bg-launchingBlue-4 p-2 rounded h-10 ${
                item.subMenus ? "" : "space-x-2"
              }`}
              onClick={() => item.subMenus && toggleSubmenu(item.title)}
            >
              <div className="flex items-center space-x-2 group">
                <CgMoon className="text-launchingBlac group-hover:text-fg-white" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <AnimatedText
                      text={item.title}
                      isCollapsed={isCollapsed}
                      className="group-hover:text-fg-white text-launchingBlack font-semibold"
                    />
                  )}
                </AnimatePresence>
              </div>
              {item.subMenus && (
                <CgArrowLongDownE
                  className={`transition-transform duration-300 ${
                    isSubmenuOpen[item.title] ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </div>

            {/* Submenu */}
            {item.subMenus && isSubmenuOpen[item.title] && (
              <motion.ul
                className=" mt-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {item.subMenus.map((subItem: IMenuItem, subIndex) => (
                  <Link href={subItem.link}>
                    <AnimatePresence>
                      <li
                        key={subIndex}
                        className="group flex items-center space-x-2 cursor-pointer ml-6 rounded hover:underline hover:text-launchingGray-6"
                      >
                        <img
                          className="-mt-4"
                          width={5}
                          height={5}
                          src={"/assets/icons/VectorMenu.svg"}
                        />
                        {!isCollapsed && (
                          <AnimatedText
                            text={subItem.title}
                            isCollapsed={isCollapsed}
                            className="group-hover:text-launchingGray-6 text-lightBlue-4 font-semibold p-2 "
                          />
                        )}
                      </li>
                    </AnimatePresence>
                  </Link>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItem;
