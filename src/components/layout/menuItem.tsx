import AnimatedText from "@/lib/helper";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CgMoon } from "react-icons/cg";

interface IMenuItem {
  title: string;
  icon?: React.ReactNode;
  link: string;
}

const MenuItem = ({
  items,
  isCollapsed,
}: {
  items: IMenuItem[];
  isCollapsed: boolean;
}) => {
  return (
    <div className="flex flex-col flex-1  w-full">
      <div className="">
        <div className="gap-y-1">
          {items.map((item: IMenuItem) => (
            <Link href={item.link}>
              <div className="grid grid-cols-4 group h-10 hover:bg-launchingBlue-4 p-2 rounded-md gap-3">
                <CgMoon
                  size={24}
                  className="col-span-1 text-launchingBlac group-hover:text-fg-white"
                />
                <div className="col-span-3 ">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
