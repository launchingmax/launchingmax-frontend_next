import { Suspense } from "react";
import Loading from "@/components/molecules/LoadingLayout";

export default function LoadingTemplate({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
