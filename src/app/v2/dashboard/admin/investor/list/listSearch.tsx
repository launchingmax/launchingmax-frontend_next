"use client";

import Search from "@/components/organisms/dashboard/common/search";
import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import InvestorItems from "./investorItems";
import { IPagination } from "@/lib/types/types";

interface IProps {
  data: IPagination<IUser>;
}
const ListSearch: React.FC<IProps> = ({ data }) => {
  console.log(data);

  const filterRender = () => {};
  const sortRender = () => {};
  return (
    <div>
      <DashSection heading="Investor List" />

      <Search
        searchInputName="inputName"
        filterRender={filterRender}
        sortRender={sortRender}
        heading={
          <div className="flex flex-row justify-center items-center space-x-3">
            <Icon icon="solar:user-check-bold-duotone" className="text-2xl text-mauve-5 dark:text-mauve-3" />
            <h2 className="text-mauve-5 dark:text-mauve-3 tracking-wide text-md font-bold">
              Our investors in{" "}
              <span className="text-launchingBlue-5">
                Launching<span className="text-launchingGray-5">Max</span>
              </span>
            </h2>
          </div>
        }
        className={{
          separator: "bg-gradient-to-r from-mauve-5/100 to-mauve-5/0 dark:from-mauve-3/100 dark:to-mauve-3/0",
        }}
      />

      <InvestorItems data={data.items} />
    </div>
  );
};

export default ListSearch;
