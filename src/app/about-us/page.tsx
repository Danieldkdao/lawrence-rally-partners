"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const headingSplit = new SplitText(".about-us-heading", {
      type: "chars, words",
    });
    const descriptionsSplit = new SplitText(".about-us-descriptions p", {
      type: "lines",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 80%",
      },
      onComplete: () => {
        headingSplit.revert();
        descriptionsSplit.revert();
      },
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
        ".tennis-image",
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
        },
        0.5,
      )
      .from(
        descriptionsSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
        },
        0.5,
      );
  }, []);

  return (
    <main className="min-h-screen">
      <div className="w-full mt-32 xl:mt-0 xl:h-screen xl:flex xl:items-center xl:justify-center p-5">
        <div className="max-w-400 w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-4 md:gap-16">
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="about-us-heading text-3xl md:text-5xl font-semibold text-center">
              About us
            </h2>
            <div className="about-us-descriptions flex flex-col items-center w-full gap-8">
              <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-250">
                Hi there! We are Lawrence and Daniel, two brothers from
                Lawrence, Kansas, passionate about tennis, pickleball, and
                helping others improve. Lawrence is a varsity state qualifier,
                and Daniel is a rising varsity player. Through our own rigorous
                training, we know firsthand what it takes to level up, and
                we&apos;ve gained experience playing with everyone from
                beginners to competitive tournament athletes.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-250">
                We provide affordable, reliable practice sessions including
                hitting partnerships, consistency drills, match play, and
                small-group training. Whether you&apos;re building confidence or
                prepping for tournaments, we tailor our goal-oriented sessions
                to your needs. Our mission is simple: help you spend less time
                searching for a practice partner and more time improving your
                game while having fun on the court.
              </p>
            </div>
          </div>
          <div className="tennis-image h-150 w-full max-w-150 mx-auto">
            <div className="relative size-full overflow-hidden rounded-3xl">
              <Image
                src="/tennisphoto.jpg"
                alt="Lawrence and Daniel playing tennis"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
