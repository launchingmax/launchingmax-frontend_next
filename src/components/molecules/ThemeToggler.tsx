"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  useSwitch?: boolean;
}

const ThemeToggler: React.FC<Props> = ({ useSwitch = true }) => {
  const { theme, setTheme } = useTheme();

  return useSwitch ? (
    <div className=" place-content-center">
      <Icon
        onClick={() => setTheme("light")}
        icon="solar:sun-bold-duotone"
        className=" rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 absolute text-2xl cursor-pointer text-yellow-500"
      />
      <Icon
        onClick={() => setTheme("dark")}
        icon="solar:cloudy-moon-bold-duotone"
        className="rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-2xl cursor-pointer text-primary"
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" size="icon_md">
          <Icon
            color="var(--peach-5)"
            icon="solar:sun-bold-duotone"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 "
          />
          <Icon
            color="var(--primary)"
            icon="solar:cloudy-moon-bold-duotone"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggler;
