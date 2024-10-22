"use client";
import Loading from "@/components/molecules/LoadingWrapper";
import Fetch from "@/configs/api/fetch";
import i18n from "@/configs/i18next/i18n";
import "@/configs/parse/parse-browser";
import { AppContants } from "@/lib/constants";
import { IUserResponse } from "@/lib/models/user.model";
import { DirectionProvider } from "@radix-ui/react-direction";
import { getCookie } from "cookies-next";
import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";

interface ContextData {
  showLoading: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userDetail?: IUserResponse;
}

const defaultValue: ContextData = {
  showLoading: (show: boolean) => {},
  isLoading: true,
  setIsLoading: (value: boolean) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [localeReady, setLocaleReady] = useState<boolean>(false); // max 10

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userDetail, setUserDetail] = useState<IUserResponse>();

  const fetchData = async () => {
    const res: IUserResponse = await Fetch({
      url: "v1/auth",
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 1 },
      token: getCookie(AppContants.ParseSessionCookieName),
    });
    setUserDetail(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showLoading = (show: boolean) => {
    setIsLoading(show);
  };

  useEffect(() => setLocaleReady(true), []);

  return localeReady ? (
    <GlobalContext.Provider
      value={{
        showLoading,
        isLoading,
        setIsLoading,
        userDetail,
      }}
    >
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<p>Loading..</p>}>
          <DirectionProvider dir={i18n.dir(i18n.resolvedLanguage)}>
            {isLoading ? <Loading /> : null}

            {children}
          </DirectionProvider>
        </Suspense>
      </I18nextProvider>
    </GlobalContext.Provider>
  ) : (
    <Loading />
  );
}
