"use server";

import Fetch, { IFetch } from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { cookies } from "next/headers";

export async function StartupActions() {
  const res = await Fetch({
    url: `v1/startup/65e85649b8b60054a3a0431f?populate=${JSON.stringify([
      {
        path: "idea",
        populate: [
          { path: "team.user", select: "firstName lastName avatar email" },
        ],
      },
      {
        path: "supporters.supporter",
      },
    ])}`,
    method: "GET",

    token: cookies().get(AppContants.ParseSessionCookieName),
    next: { revalidate: 1 },
  });
  console.log("mm 00 0 -- -   ", res);

  return res;
}
