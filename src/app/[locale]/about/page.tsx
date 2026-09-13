import { setRequestLocale } from "next-intl/server";
import { MissionSection } from "@/components/about/MissionSection";
import { BrandStorySection } from "@/components/about/BrandStorySection";
import { BoardSection } from "@/components/about/BoardSection";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <MissionSection />
      <BrandStorySection />
      <BoardSection />
    </div>
  );
}
