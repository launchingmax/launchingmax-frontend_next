import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { IUserResponse } from "@/lib/models/user.model";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useGenerateLayout = () => {
  const [userDetail, setUserDetail] = useState<IUserResponse>();

  const fetchData = async () => {
    const res: IUserResponse = await Fetch({
      url: "v1/auth",
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 1 },
      token: getCookie(AppContants.ParseSessionCookieName),
    });
    console.log("SIDEBAR --- test fetch ----   .  ,  ", res);

    setUserDetail(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { userDetail };
};

export default useGenerateLayout;
