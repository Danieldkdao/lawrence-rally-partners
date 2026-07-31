"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const AboutUsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 80%",
        },
      });

      const headingSplit = new SplitText(".about-us-heading", {
        type: "chars, words",
      });
      const descriptionSplit = new SplitText(".about-us-description", {
        type: "lines",
      });

      timeline
        .from(headingSplit.chars, {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
        })
        .from(
          descriptionSplit.lines,
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          0.5,
        )
        .from(
          ".read-more-button",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          "<",
        );
    },
    { scope: scrollRef },
  );

  return (
    <section
      className="flex flex-col items-center w-full gap-16"
      ref={scrollRef}
    >
      <h2 className="about-us-heading text-3xl md:text-5xl font-semibold text-center">
        About us
      </h2>
      <div className="w-full flex flex-col items-center gap-8">
        <p className="about-us-description text text-2xl text-muted-foreground text-center max-w-250">
          Lawrence Rally Partners was founded by Lawrence and Daniel Dao, two
          brothers from Lawrence, Kansas, who are passionate about tennis,
          pickleball, and helping others improve through consistent, purposeful
          practice.
        </p>
        <div className="w-full max-w-75 read-more-button">
          <Link
            href="/about-us"
            className={buttonVariants({
              variant: "secondary",
              className: "h-12 text-xl w-full",
            })}
          >
            Read more
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};
