"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import LaunchinMaxLogo from "../../../public/assets/icons/LaunchingMax-logo.svg";
import MenuItem from "./menuItem";
import AnimatedText from "@/lib/helper";
import Fetch from "@/configs/api/fetch";
import { getCookie } from "cookies-next";
import { AppContants } from "@/lib/constants";
import { CgArrowLongDownE, CgSun } from "react-icons/cg";
import { IMenu } from "@/lib/models/user-level.model";
import { title } from "process";
import useGenerateLayout from "./hook/useGenerateLayout";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userDetail } = useGenerateLayout();

  const [theme, setTheme] = useState<string>("");
  const myTheme = localStorage.getItem("theme");

  const variants = {};

  const menuItems1: IMenu[] = [
    { title: "111", subMenus: [{ title: "sub 1", link: "/components" }] },
    {
      title: "222",
      subMenus: [
        { title: "sub 11", link: "/components" },
        { title: "sub 11", link: "/components" },
        { title: "sub 11", link: "/components" },
      ],
    },
    { title: "333" },
    { title: "444" },
  ];

  const menuItems2 = [
    { title: "test22", link: "#" },
    { title: "test22222", link: "#" },
    { title: "test 22", link: "#" },
    { title: "test 2222", link: "#" },
  ];

  const menuItems3 = [
    { title: "account", link: "#" },
    { title: "logout", link: "#" },
  ];

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <motion.div
      initial={{ width: "15.625rem", padding: "1.5rem" }} // Initial width of the sidebar
      animate={{
        width: isCollapsed ? "5.25rem" : "15.625rem",
        padding: isCollapsed ? "0 0.75rem" : "0 1.5rem",
      }}
      transition={{
        type: "keyframes",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
        ease: "easeInOut",
      }} // Smooth spring animation
      className={`relative hidden md:block w-64 bg-primary-alt  rounded-xl`}
    >
      <motion.div
        animate={{
          marginLeft: isCollapsed ? "0 3.25rem" : "0 14.875rem",
        }}
        transition={{
          type: "keyframes",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
          ease: "easeInOut",
        }} // Smooth spring animation
        className={`absolute -right-3 top-8 flex items-center justify-center `}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {/* {theme == "light" ? (
          isCollapsed ? ( */}
        <Icon icon="akar-icons:triangle-left-fill" />
        {/* ) : (
            <img src={"/assets/icons/menu-collapse.svg"} />
          )
        ) : isCollapsed ? (
          <img src={"/assets/icons/menu-expand-dark.svg"} />
        ) : (
          <img src={"/assets/icons/menu-collapse-dark.svg"} />
        )} */}
      </motion.div>

      <div className=" flex justify-start items-center h-16 rounded-xl text-primary text-text-xl font-bold leading-8 gap-2 px-2 mt-3">
        <img
          className=""
          width={40}
          height={40}
          src={"/assets/icons/LaunchingMax-logo.svg"}
        />

        <div className="flex flex-row">
          <AnimatePresence>
            {!isCollapsed && (
              <AnimatedText
                text="Launching"
                className="text-primary"
                isCollapsed={isCollapsed}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isCollapsed && (
              <AnimatedText
                text="Max"
                isCollapsed={isCollapsed}
                className="text-gray-500 dark:text-white"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="place-content-between h-[calc(100vh-9rem)] flex flex-col justify-between overflow-y-auto scroll-hidden overflow-x-hidden">
        <div>
          <MenuItem
            items={userDetail?.user?.level?.access?.menus}
            isCollapsed={isCollapsed}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            className="top-0"
          />
        </div>

        <div className="">
          <MenuItem
            items={menuItems1}
            isCollapsed={isCollapsed}
            className=" "
            showSeparator
          />

          <MenuItem
            items={menuItems3}
            isCollapsed={isCollapsed}
            className=""
            showSeparator
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
