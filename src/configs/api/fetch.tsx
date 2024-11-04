import { encodeQueryString } from "@/lib/helper";
import { trimStart } from "lodash-es";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type cacheTypes = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";

export interface IFetch {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  body?: Object;
  cache?: cacheTypes;
  next?: NextFetchRequestConfig;
  token?: string | RequestCookie;
  params?: any;
}

const Fetch = async ({ url, method, body, cache = "default", next, token, params }: IFetch) => {
  //   try {
  const myHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  //console.log(" mm 2020 -- -   - - -    ", params);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASIC_API}/${trimStart(url, "/") + encodeQueryString(params)}`,
      {
        method: method,
        //@ts-ignore
        headers: myHeaders,
        body: JSON.stringify(body),
        cache: cache,
        next: next,
      }
    );
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data);
  } catch (err) {
    throw err;
  }

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASIC_API}/${trimStart(url, "/") + encodeQueryString(params)}`,
  //   {
  //     method: method,
  //     //@ts-ignore
  //     headers: myHeaders,
  //     body: JSON.stringify(body),
  //     cache: cache,
  //     next: next,
  //   }
  // );

  //console.log(" reeees ---   ", response);

  //   if (!response.ok) {
  // toast({
  //   description:
  //     "Network response was not ok : " +
  //     response.status +
  //     response.statusText,
  //   variant: "error",
  // });
  //     throw new Error(
  //       "Network response was not ok : " + response.status + response.statusText
  //     );
  //   }

  // return response.json();
  //   } catch (err: any) {
  //     console.log(" ERR -- ", err);
  //      toast({ description: t(`auth.error.${err.code}`), variant: "error" });
  //   } finally {
  //   }
};

export default Fetch;
