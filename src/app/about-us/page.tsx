"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const AboutUsPage = () => {
  useGSAP(() => {
    const headingSplit = new SplitText(".about-us-heading", {
      type: "chars, words",
    });
    const descriptionsSplit = new SplitText(".about-us-descriptions p", {
      type: "lines",
    });

    gsap.from(headingSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(".tennis-image", {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
    });
    gsap.from(descriptionsSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-400 w-full grid grid-cols-2 items-center gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="about-us-heading text-3xl md:text-5xl font-semibold text-center">
              About us
            </h2>
            <div className="about-us-descriptions flex flex-col gap-8">
              <p className="text-2xl text-muted-foreground text-center max-w-250">
                Hi there! We are Lawrence and Daniel, two brothers from
                Lawrence, Kansas, passionate about tennis, pickleball, and
                helping others improve. Lawrence is a varsity state qualifier,
                and Daniel is a rising varsity player. Through our own rigorous
                training, we know firsthand what it takes to level up, and
                we&apos;ve gained experience playing with everyone from
                beginners to competitive tournament athletes.
              </p>
              <p className="text-2xl text-muted-foreground text-center max-w-250">
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
          <div className="tennis-image w-full h-150 relative">
            <Image
              src="/tennisphoto.jpg"
              alt="Lawrence and Daniel tennis image"
              fill
              loading="eager"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
