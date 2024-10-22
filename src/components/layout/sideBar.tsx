"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MenuItem from "./menuItem";
import AnimatedText from "@/lib/helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobal } from "@/contexts/GlobalLayout";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userDetail } = useGlobal();

  const menuItems = [
    { title: "Ticket", link: "#", icon: "solar:mailbox-bold-duotone" },
    { title: "Help", link: "#", icon: "solar:question-circle-bold-duotone" },
    { title: "Get in touch", link: "#", icon: "solar:dialog-bold-duotone" },
  ];

  const menuItemsAccount = [
    { title: "Account", link: "#", icon: "solar:user-rounded-bold-duotone" },
    { title: "Logout", link: "#", icon: "solar:exit-bold-duotone" },
  ];

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
        className={`absolute -right-3 top-8 flex items-center justify-center bg-primary-alt w-6 h-6 rounded-full border dark:border-launchingBlue-7`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <Icon
            icon="akar-icons:triangle-left-fill"
            className="text-gray-400 cursor-pointer"
          />
        ) : (
          <Icon
            icon="akar-icons:triangle-right-fill"
            className="text-gray-400 cursor-pointer"
          />
        )}
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
            items={menuItems}
            isCollapsed={isCollapsed}
            className=" "
            showSeparator
          />

          <MenuItem
            items={menuItemsAccount}
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
