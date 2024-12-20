import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SoonerToaster } from "@/components/ui/sonner";
import { I18N } from "@/configs/i18next/settings";

import { GlobalLayout } from "@/contexts/GlobalLayout";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { getCookie } from "cookies-next";
import { dir } from "i18next";
import { Lato } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "./providers";
import { CustomSonnerToaster } from "@/components/molecules/SonnerToasterWrapper";
// import { Provider } from "react-redux";
// import store from "@/store/store";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--lato-font-family",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = cookies().get(I18N.cookieName)?.value;
  return (
    <html suppressHydrationWarning dir={dir(lang)} lang={lang}>
      <body
        className={cn(
          "min-h-screen bg-backgroundDashboard dark:bg-launchingBlack text-fg-primary font-lato antialiased",
          lato.variable
        )}
      >
        <GlobalLayout>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
              <CustomSonnerToaster />
            </ThemeProvider>
          </Providers>
        </GlobalLayout>
      </body>
    </html>
  );
}
