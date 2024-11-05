import { AppContants } from "@/lib/constants";
import { merge, trimStart } from "lodash-es";

const isServer = () => typeof window === "undefined";

export async function NextFetch(url: string, init?: RequestInit) {
  let token: string | undefined = undefined;
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    token = cookie.get(AppContants.ParseSessionCookieName)?.value;
  } else {
    const { getCookie } = require("cookies-next");
    token = getCookie(AppContants.ParseSessionCookieName);
  }

  const headers: Record<string, unknown> = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {};
  merge(options, { headers }, init);

  return fetch(`${process.env.NEXT_PUBLIC_BASIC_API}/${trimStart(url, "/")}`, options);
}
