import { ErrorWrapper } from "@/components/atoms/error-wrapper";
import { NextFetch } from "@/configs/api/next-fetch";
import { runFetch } from "@/configs/api/server-fetch";
import { UserType } from "@/lib/constants/user.const";
import { IUser } from "@/lib/models/user.model";
import ListSearch from "./listSearch";

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
  const res = await runFetch<IUser>(
    `v1/user?types.type=${UserType.Investor}&populate=${JSON.stringify([
      { path: "profile" },
      { path: "profile.country" },
    ])}`
  );

  if (res.error) return <ErrorWrapper {...res.error} />;

  return (
    <>
      <ListSearch initialData={res.data!} />
    </>
  );
}
