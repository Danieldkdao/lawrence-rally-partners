"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 80%",
        },
      });

      const headingSplit = new SplitText(".cta-heading", {
        type: "chars, words",
      });
      const descriptionSplit = new SplitText(".cta-description", {
        type: "lines",
      });
      const phoneSplit = new SplitText(".phone-text", { type: "chars, words" });
      const emailSplit = new SplitText(".email-text", { type: "chars, words" });

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
          phoneSplit.chars,
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          "<",
        )
        .from(
          emailSplit.chars,
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          "<",
        )
        .from(
          ".contact-us-button",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          "<0.5",
        );
    },
    { scope: scrollRef },
  );

  return (
    <section
      className="flex flex-col items-center w-full gap-16"
      ref={scrollRef}
    >
      <h2 className="cta-heading text-3xl md:text-5xl font-semibold text-center">
        Ready to level up?
      </h2>
      <div className="w-full flex flex-col items-center gap-8">
        <p className="cta-description text text-2xl text-muted-foreground text-center max-w-250">
          Contact us to get started and upgrade your game today. We serve the
          Lawrence area.
        </p>
        <div className="w-full flex flex-col items-center gap-4">
          <span className="phone-text text-2xl text-foreground font-medium">
            <span className="font-normal text-muted-foreground">Phone: </span>
            (785) 393-7817
          </span>
          <Link href="mailto:lawrencerallypartners@gmail.com">
            <span className="email-text text-2xl text-foreground font-medium">
              <span className="font-normal text-muted-foreground">Email: </span>
              lawrencerallypartners@gmail.com
            </span>
          </Link>
        </div>
        <div className="w-full max-w-75 contact-us-button">
          <Link
            href="/contact-us"
            className={buttonVariants({
              variant: "secondary",
              className: "h-12 text-xl w-full",
            })}
          >
            Contact us
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};
