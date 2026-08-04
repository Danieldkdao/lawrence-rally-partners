"use client";

import {
  DumbbellIcon,
  LucideIcon,
  SwordsIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Hitting Partner Sessions",
    description:
      "Build confidence and consistency through competitive rallies tailored to your skill level. Perfect for players who want quality reps and reliable practice partners.",
    icon: TargetIcon,
  },
  {
    title: "Match Play & Point Training",
    description:
      "Prepare for real competition with practice sets, tiebreaks, point play, and match simulations designed to improve decision-making under pressure.",
    icon: SwordsIcon,
  },
  {
    title: "Drills & Skill Development",
    description:
      "Focused sessions featuring footwork, groundstrokes, serves, returns, and consistency drills to help players develop stronger fundamentals and better habits.",
    icon: DumbbellIcon,
  },
  {
    title: "Small Group Practices",
    description:
      "Train with friends or teammates in energetic group sessions that combine drills, games, and live-ball competition for an engaging learning experience.",
    icon: UsersIcon,
  },
];

export const ServicesGridSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText(".services-heading", {
        type: "chars, words",
      });
      const cards = gsap.utils.toArray<HTMLElement>(".service-card-wrapper");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 80%",
        },
        onComplete: () => {
          headingSplit.revert();
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
          cards,
          {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
          },
          0.5,
        );
    },
    { scope: scrollRef },
  );

  return (
    <section
      className="flex flex-col items-center w-full gap-8 md:gap-16"
      ref={scrollRef}
    >
      <h2 className="services-heading text-3xl md:text-5xl font-semibold text-center">
        Our services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="service-card-wrapper">
            <Card className="transition-transform duration-300 hover:scale-[1.03]">
              <CardContent className="flex flex-col gap-2 items-center">
                <service.icon className="size-10" />
                <h3 className="text-2xl font-semibold text-center">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-center text-xl">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
