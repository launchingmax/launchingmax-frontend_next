"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { CgAirplane, CgBell, CgMoon, CgSun } from "react-icons/cg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  }: {
    text: string;
    isOpen: boolean;
  }) => {
    return (
      <div className="flex">
        <motion.span
          initial={{ opacity: 0 }} // Start hidden
          animate={{ opacity: isOpen ? 1 : 0 }} // Fade in
          exit={{ opacity: 0 }} // Fade out
          transition={{
            duration: 0.5,
            delay: isOpen ? 0.1 : 0.1, // Sequential delay for entrance and reverse for exit
          }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ width: "15.625rem" }} // Initial width of the sidebar
      animate={{ width: isOpen ? "15.625rem" : "5.25rem" }}
      transition={{
        type: "keyframes",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
        ease: "easeInOut",
      }} // Smooth spring animation
      className={`relative hidden md:block flex-col w-64 bg-white dark:bg-launchingBlue-8.5 left-0 rounded-xl py-6 ${
        isOpen ? "px-6" : "px-3"
      } `}
    >
      <div
        className="absolute -right-3 top-12 w-8 h-8 bg-launchingBlue-5 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div className="flex items-center justify-center h-16 bg-gray-100 rounded-xl">
        <CgBell className="w-8 h-8 " />
        Hello
      </div>
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <div className="p-4">
          <div className="space-y-4">
            {/* Menu items with icons */}
            <div className="grid grid-cols-4 gap-6 ">
              <CgMoon size={24} className="col-span-1 mr-4" />
              <AnimatePresence>
                {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-4 gap-6 ">
              <CgSun size={24} className="col-span-1 mr-4" />
              <AnimatePresence>
                {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-4 gap-6 ">
              <CgAirplane size={24} className="col-span-1 mr-4" />
              <AnimatePresence>
                {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Command className="bg-red-300 h-max">
        <CommandList>
          <CommandGroup>
            <CommandItem className="bg-white dark:bg-launchingBlack" key="1">
              {""}
              <div className="grid grid-cols-4 gap-6 ">
                <CgMoon size={24} className="col-span-1 mr-4" />
                <AnimatePresence>
                  {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
                </AnimatePresence>
              </div>
            </CommandItem>
            <CommandItem>
              {""}
              <div className="grid grid-cols-4 gap-6 ">
                <CgSun size={24} className="col-span-1 mr-4" />
                <AnimatePresence>
                  {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
                </AnimatePresence>
              </div>
            </CommandItem>
            <CommandItem>
              <div className="grid grid-cols-4 gap-6 ">
                <CgAirplane size={24} className="col-span-1 mr-4" />
                <AnimatePresence>
                  {isOpen && <AnimatedText text="Dashboard" isOpen={isOpen} />}
                </AnimatePresence>
              </div>
            </CommandItem>
          </CommandGroup>
          {/* <CommandSeparator /> */}
        </CommandList>
      </Command>
    </motion.div>
  );
};

export default Sidebar;
