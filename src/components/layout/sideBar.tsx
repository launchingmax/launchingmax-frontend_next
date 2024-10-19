"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  CgAbstract,
  CgAirplane,
  CgBell,
  CgCoffee,
  CgMoon,
  CgSun,
  CgTemplate,
} from "react-icons/cg";

import LaunchinMaxLogo from "../../../public/assets/icons/LaunchingMax-logo.svg";
import MenuItem from "./menuItem";
import { merge } from "lodash-es";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const variants = {
    fInit: {
      opacity: 1,
      translateY: "70rem",
      scale: 0.7,
    },

    formAnimate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const AnimatedText = ({
    text,
    isOpen,
    className,
  }: {
    text: string;
    isOpen: boolean;
    className?: string;
  }) => {
    return (
      <div className="flex">
        <motion.span
          initial={{ opacity: 0 }} // Start hidden
          animate={{ opacity: isOpen ? 1 : 0 }} // Fade in
          exit={{ opacity: 0 }} // Fade out
          transition={{
            duration: 0.5,
            delay: isOpen ? 0.2 : 0.1, // Sequential delay for entrance and reverse for exit
          }}
          className={`inline-block ${className}`}
        >
          {text}
        </motion.span>
      </div>
    );
  };

  const menuItems = [
    { title: "test11 11", link: "#" },
    { title: "test22222", link: "#" },
    { title: "test 3", link: "#" },
    { title: "test 4", link: "#" },
    { title: "test 5", link: "#" },
    { title: "test 6", link: "#" },
  ];

  console.log("-------", LaunchinMaxLogo, typeof LaunchinMaxLogo);

  return (
    <motion.div
      initial={{ width: "15.625rem" }} // Initial width of the sidebar
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
      className={`relative hidden md:block flex-col w-64 bg-white dark:bg-launchingBlue-8.5 left-0 rounded-xl py-6`}
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
        className={`absolute -right-3 top-8 w-6 h-6 bg-launchingBlue-5 rounded-full  bg-white dark:bg-launchingBlue-8.5`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <img src={"/assets/icons/menu-expand.svg"} />
        ) : (
          <img src={"/assets/icons/menu-collapse.svg"} />
        )}
      </motion.div>

      <div className=" flex justify-start items-center h-16 rounded-xl text-launchingBlue-5 text-text-xl font-bold gap-2 px-2 ">
        {/* <CgBell className="fixed ml-2" /> */}
        {/* <img src={LaunchinMaxLogo} /> */}
        {/* {LaunchinMaxLogo} */}
        <img
          className=""
          width={40}
          height={40}
          src={"/assets/icons/LaunchingMax-logo.svg"}
        />

        <AnimatePresence>
          {!isCollapsed && (
            <AnimatedText text="Launching" isOpen={!isCollapsed} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isCollapsed && (
            <AnimatedText
              text="Max"
              isOpen={!isCollapsed}
              className="text-lightBlue-5"
            />
          )}
        </AnimatePresence>
      </div>

      <MenuItem items={menuItems} isCollapsed={isCollapsed} />
    </motion.div>
  );
};

export default Sidebar;
