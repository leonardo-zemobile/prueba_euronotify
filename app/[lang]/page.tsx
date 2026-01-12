// app/[lang]/page.tsx
import HomeData from "@/components/home/HomeData";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return <HomeData lang={lang} />;
}
