"use client";
import Loading from "@/components/molecules/LoadingWrapper";
import { NextFetch } from "@/configs/api/next-fetch";
import i18n from "@/configs/i18next/i18n";
import { IUser } from "@/lib/models/user.model";
import { DirectionProvider } from "@radix-ui/react-direction";
import React, { createContext, Suspense, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

interface ContextData {
  showLoading: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userDetail?: IUser | null;
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

  const [userDetail, setUserDetail] = useState<IUser | null | undefined>(null);

  const fetchData = async () => {
    const { user, isAuthenticated } = await NextFetch("v1/auth").then((r) => r.json());
    if (isAuthenticated) setUserDetail(user);
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
