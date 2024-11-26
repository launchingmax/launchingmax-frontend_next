"use client";

import DashSection from "@/components/organisms/dashboard/DashSection";
import { Button } from "@/components/ui/button";
import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";

const Documents = ({ data }: { data: IStartup }) => {
  return (
    <DashSection heading="Documents" className="z-0">
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: data.idea.pitchDeck.summery ?? "" }}
          className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem] whitespace-pre-wrap"
        />

        <a
          href={`${process.env.NEXT_PUBLIC_ALL_API}${data.idea.pitchDeck.pitchDeck}`}
          download="aaa"
          className="flex justify-self-center mt-6"
          target="_blank"
        >
          <Button className="group flex py-3 w-[16vw] h-[6vh]  gap-x-8 bg-gradient-to-tr from-[#347CBE] to-[#074A88] items-center  text-white font-semibold  transition-all duration-300 ">
            <span className="text-fg-white font-medium text-text-md transition-transform duration-300 transform group-hover:text-sm group-hover:translate-x-6">
              Request for document
            </span>
            <span className="bg-yell text-fg-white transition-transform duration-300 transform group-hover:translate-x-14 group-hover:mr-4">
              <Icon icon="solar:square-arrow-right-bold" className="text-xl group-hover:text-3xl" />
            </span>
          </Button>
        </a>
      </div>
    </DashSection>
  );
};

export default Documents;
