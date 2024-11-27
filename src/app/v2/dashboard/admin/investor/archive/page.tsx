import { NextFetch } from "@/configs/api/next-fetch";
import { RequestStatus } from "@/lib/constants/request.enum";
import ListSearch from "./listSearch";

const fetchArchiveData = async () => {
  try {
    const response = await NextFetch(`/v1/startup?status=archive`);
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("mm archive errr ", error);
  }
};

export default async function AdminInvestorsArchiveList() {
  const res = await fetchArchiveData();

  console.log("mm archive ress ", res);

  return (
    <>
      <ListSearch initialData={res} />
    </>
  );
}
