"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { CheckCircle2Icon, ChevronDownIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const serviceDetails = [
  {
    name: "Hitting Partner Sessions",
    description:
      "Sometimes the hardest part of improving is simply finding someone reliable to practice with. Our hitting partner sessions give you quality court time tailored to your level and goals.",
    greatFor: [
      "Players looking for consistent practice",
      "Adults who need a dependable hitting partner",
      "Juniors wanting extra reps outside of lessons",
      "Anyone who loves getting on court and hitting",
    ],
    whatIncluded: [
      "Rally practice and consistency training",
      "Cross-court and down-the-line drills",
      "Serve and return practice",
      "Controlled point play",
      "Endurance and movement-focused hitting",
      "Tennis and pickleball sessions available",
    ],
  },
  {
    name: "Match Play & Point Training",
    description:
      "Build confidence when the score matters through practice matches, point play, tiebreaks, and realistic competitive situations.",
    greatFor: [
      "Tournament players",
      "High school athletes",
      "Players preparing for team matches",
      "Anyone wanting more match experience",
    ],
    whatIncluded: [
      "Practice sets and match simulations",
      "Tiebreak and pressure situations",
      "Serve plus one and return plus one drills",
      "Singles and doubles strategy",
      "Point construction and shot selection",
      "Tournament and team-match preparation",
    ],
  },
  {
    name: "Drills & Skill Development",
    description:
      "Improve your fundamentals through purposeful, goal-oriented drills focused on consistency, movement, technique, and confidence.",
    greatFor: [
      "Beginners learning the game",
      "Players developing fundamentals",
      "Juniors working toward competitive play",
      "Anyone wanting more structured practice",
    ],
    whatIncluded: [
      "Groundstroke and volley drills",
      "Footwork and movement training",
      "Serve and return development",
      "Consistency and accuracy challenges",
      "Live-ball and competitive drills",
      "Skill-specific improvement plans",
    ],
  },
  {
    name: "Small Group Practices",
    description:
      "Practice with friends, teammates, or family through energetic sessions combining drills, games, and live competition.",
    greatFor: [
      "Friends who want to practice together",
      "Junior groups",
      "High school teammates",
      "Families interested in learning together",
    ],
    whatIncluded: [
      "Group rally and consistency drills",
      "Team competitions and games",
      "Live-ball and king-of-the-court formats",
      "Doubles practice and positioning",
      "Match-play rotations",
      "Tennis and pickleball group sessions",
    ],
  },
];

const ServicesPage = () => {
  useGSAP(() => {
    const headingSplit = new SplitText(".service-heading", {
      type: "chars, words",
    });
    const descriptionSplit = new SplitText(".service-description", {
      type: "lines",
    });
    const cards = gsap.utils.toArray(".service-card");

    gsap.from(headingSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      onComplete: () => {
        headingSplit.revert();
      },
    });
    gsap.from(descriptionSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.5,
      onComplete: () => {
        descriptionSplit.revert();
      },
    });
    gsap.from(cards, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.75,
    });
    gsap.from(".cta-section", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.1,
      delay: 1,
    });
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:pt-44">
      <section className="mx-auto mb-12 flex max-w-4xl flex-col items-center gap-4 text-center">
        <h1 className="service-heading text-4xl font-semibold tracking-tight md:text-6xl">
          Find the right service for you
        </h1>
        <p className="service-description max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          Purposeful practice, dependable partners, and sessions tailored to
          your goals.
        </p>
      </section>
      <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {serviceDetails.map((service, index) => (
          <Collapsible key={service.name} className="group service-card">
            <Card className="overflow-hidden py-0 gap-0 transition-colors hover:border-primary/30">
              <CollapsibleTrigger className="w-full cursor-pointer text-left">
                <div className="flex items-start gap-4 p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold md:text-2xl">
                      {service.name}
                    </h2>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="border-t bg-muted/20 p-5">
                  <p className="mb-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {service.description}
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <TargetIcon className="size-5 text-primary" />
                        <h3 className="font-semibold text-lg md:text-xl">
                          Great for
                        </h3>
                      </div>

                      <ul className="space-y-2">
                        {service.greatFor.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-base md:text-lg text-muted-foreground"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2Icon className="size-5 text-primary" />
                        <h3 className="font-semibold text-lg md:text-xl">
                          What may be included
                        </h3>
                      </div>

                      <ul className="space-y-2">
                        {service.whatIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-base md:text-lg text-muted-foreground"
                          >
                            <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-primary/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </section>

      <section className="cta-section mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border bg-muted/30 p-6 text-center sm:flex-row sm:text-left md:p-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            Ready to get on the court?
          </h2>
          <p className="mt-1 text-muted-foreground text-lg md:text-xl">
            Tell us what you want to improve and we’ll help you choose a
            session.
          </p>
        </div>

        <Link
          href="/contact-us"
          className={cn(
            buttonVariants({
              size: "lg",
              className: "w-full shrink-0 sm:w-auto px-10 h-12 text-lg",
            }),
          )}
        >
          Get started
        </Link>
      </section>
    </main>
  );
};

export default ServicesPage;
