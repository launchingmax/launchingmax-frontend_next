import { NextFetch } from "@/configs/api/next-fetch";
import { UserType } from "@/lib/constants/user.const";
import ListSearch from "./listSearch";
import { Suspense } from "react";
import Loading from "@/components/molecules/LoadingLayout";

const fetchUserData = async () => {
  try {
    const response = await NextFetch(
      `v1/user?types.type=${UserType.Investor}&populate=${JSON.stringify([
        { path: "profile" },
        { path: "profile.country" },
      ])}`
    );

    if (response.ok) {
      const data = response.json();
      // console.log("mm 3030303030303003 ress ", data);
      return data;
    }
  } catch (error) {
    console.log("mm 3030303030303003 errr ", error);
  }
};

export default async function AdminInvestorsList() {
  const res = await fetchUserData();

  console.log("mm 3030303030303003 ress ", res);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ListSearch initialData={res} />
      </Suspense>
    </>
  );
}
