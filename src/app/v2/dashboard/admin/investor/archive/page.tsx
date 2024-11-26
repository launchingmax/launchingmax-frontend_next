import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import ListSearch from "./listSearch";

const fetchUserData = async () => {
  try {
    const response = await NextFetch(
      `/v1/startup?investors.status=${RequestStatus.Requested}&status=startup&populate=${JSON.stringify([
        { path: "owner" },
      ])}`
    );
    if (response.ok) {
      const data = response.json();
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
      <ListSearch initialData={res} />
    </>
  );
}
