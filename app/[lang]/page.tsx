import { Suspense } from "react";
import HomeData from "@/components/home/HomeData";

export default async function page({
  params: paramsPromise,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang } = await paramsPromise;

  return (
    <Suspense fallback={<div aria-busy="true" />}>
      <HomeData lang={lang} />
    </Suspense>
  );
}
