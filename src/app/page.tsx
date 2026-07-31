import { AboutUsSection } from "@/components/home/about-us-section";
import { CTASection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesGridSection } from "@/components/home/services-grid-section";

export default function Home() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[url('/tennis-bg.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-transparent via-background to-background" />
      <main className="min-h-screen">
        <div className="w-full h-screen flex items-center justify-center bg-linear-to-b from-transparent via-transparent to-background">
          <HeroSection />
        </div>
        <div className="w-full bg-background">
          <div className="mx-auto max-w-7xl flex flex-col items-center px-10 w-full bg-background gap-52">
            <ServicesGridSection />
            <AboutUsSection />
            <CTASection />
          </div>
        </div>
      </main>
    </>
  );
}
