import { setRequestLocale } from "next-intl/server";
import { HomeCarousel } from "@/components/home/HomeCarousel";
import { videoClips } from "@/content/videoClips";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeCarousel clips={videoClips} />;
}
