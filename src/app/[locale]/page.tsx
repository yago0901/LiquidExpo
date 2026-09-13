import { setRequestLocale } from "next-intl/server";
import { SectionSeam } from "@/components/decor/SectionSeam";
import { LiquidShapeAccent } from "@/components/decor/LiquidShapeAccent";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScrollProvider } from "@/lib/scroll/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { BrandStory } from "@/components/sections/BrandStory";
import { Manifesto } from "@/components/sections/Manifesto";
import { Founder } from "@/components/sections/Founder";
import { TeamConstellation } from "@/components/sections/TeamConstellation";
import { Board } from "@/components/sections/Board";
import { CarolinaInterview } from "@/components/sections/CarolinaInterview";
import { VideoClips } from "@/components/sections/VideoClips";
import { Articles } from "@/components/sections/Articles";
import { Exhibitions } from "@/components/sections/Exhibitions";
import { Teasers } from "@/components/sections/Teasers";
import { Newsletter } from "@/components/sections/Newsletter";
import { Partner } from "@/components/sections/Partner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <SkipLink />
      <Header />
      <SmoothScrollProvider>
        <main id="main-content" className="flex-1">
          <Hero />
          <Mission />
          <SectionSeam>
            <LiquidShapeAccent
              src="/images/liquid-shape-1.png"
              className="top-0 left-[2%] w-56 -translate-y-1/2 opacity-95 sm:w-72 lg:w-96"
              speed={0.35}
              rotate={-12}
            />
          </SectionSeam>
          <BrandStory />
          <SectionSeam>
            <LiquidShapeAccent
              src="/images/liquid-shape-2.png"
              className="top-0 right-[3%] w-52 -translate-y-1/2 opacity-95 sm:w-64 lg:w-80"
              speed={0.4}
              rotate={16}
              flip
            />
          </SectionSeam>
          <Manifesto />
          <Founder />
          <TeamConstellation />
          <SectionSeam>
            <LiquidShapeAccent
              src="/images/liquid-shape-3.png"
              className="top-0 right-[2%] w-48 -translate-y-1/2 opacity-90 sm:w-64 lg:w-80"
              speed={0.3}
              rotate={-10}
            />
          </SectionSeam>
          <Board />
          <CarolinaInterview />
          <VideoClips />
          <Articles />
          <Exhibitions />
          <Teasers />
          <Newsletter />
          <SectionSeam>
            <LiquidShapeAccent
              src="/images/liquid-shape-4.png"
              className="top-0 left-[3%] w-52 -translate-y-1/2 opacity-90 sm:w-64 lg:w-80"
              speed={0.35}
              rotate={14}
              flip
            />
          </SectionSeam>
          <Partner />
        </main>
      </SmoothScrollProvider>
      <Footer />
    </>
  );
}
