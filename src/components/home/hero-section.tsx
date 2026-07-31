"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export const HeroSection = () => {
  useGSAP(() => {
    const heroTitleSplit = new SplitText(".title", { type: "words" });
    const subtitleSplit = new SplitText(".subtitle", { type: "lines" });

    gsap.from(heroTitleSplit.words, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(subtitleSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(".cta-buttons", {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });
  }, []);

  return (
    <section className="w-full flex flex-col gap-6 items-center">
      <h1 className="title text-4xl md:text-6xl font-semibold text-center max-w-250 leading-[1.2em]">
        Find your best game through better practice.
      </h1>
      <p className="subtitle text-muted-foreground text-2xl md:text-3xl text-center max-w-250 leading-relaxed">
        Tennis and pickleball partners offering quality rallies, purposeful
        drills, and competitive match play for players who want to improve and
        have fun.
      </p>
      <div className="cta-buttons grid grid-cols-2 gap-4 w-full mt-4 max-w-180">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "h-12 text-xl",
          )}
        >
          View our services
        </Link>
        <Link
          href="/contact-us"
          className={cn(buttonVariants({ variant: "default" }), "h-12 text-xl")}
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};
