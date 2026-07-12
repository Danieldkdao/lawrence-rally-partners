import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SessionForm } from "@/features/sessions/components/session-form";
import { cn } from "@/lib/utils";
import Link from "next/link";

const links = [
  {
    label: "About us",
    href: "#about-us",
  },
  {
    label: "Our services",
    href: "#our-services",
  },
  {
    label: "Contact us",
    href: "#contact-us",
  },
];

import {
  Target,
  Swords,
  Dumbbell,
  Users,
  type LucideIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Hitting Partner Sessions",
    description:
      "Build confidence and consistency through competitive rallies tailored to your skill level. Perfect for players who want quality reps and reliable practice partners.",
    icon: Target,
  },
  {
    title: "Match Play & Point Training",
    description:
      "Prepare for real competition with practice sets, tiebreaks, point play, and match simulations designed to improve decision-making under pressure.",
    icon: Swords,
  },
  {
    title: "Drills & Skill Development",
    description:
      "Focused sessions featuring footwork, groundstrokes, serves, returns, and consistency drills to help players develop stronger fundamentals and better habits.",
    icon: Dumbbell,
  },
  {
    title: "Small Group Practices",
    description:
      "Train with friends or teammates in energetic group sessions that combine drills, games, and live-ball competition for an engaging learning experience.",
    icon: Users,
  },
];

const reachOutOptions = [
  {
    title: "Email",
    value: "danieldkdao@gmail.com",
    icon: MailIcon,
  },
  {
    title: "Phone or text",
    value: "785-393-7817",
    icon: PhoneIcon,
  },
];

export default function Home() {
  return (
    <div>
      <header className="px-6 py-4 border-b w-full flex items-center gap-6">
        <Link href="/">
          <span className="text-2xl font-semibold">
            Lawrence Tennis Partners
          </span>
        </Link>
        <div className="items-center gap-6 hidden sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground font-medium text-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="max-w-7xl mx-auto w-full flex flex-col items-center gap-52 px-10">
        <section className="w-full flex flex-col gap-6 items-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-center max-w-250 leading-[1.2em] mt-32">
            Find your best game through better practice.
          </h1>
          <p className="text-muted-foreground text-2xl md:text-3xl text-center max-w-250 leading-relaxed">
            Tennis and pickleball partners offering quality rallies, purposeful
            drills, and competitive match play for players who want to improve
            and have fun.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <Link
              href="#our-services"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-12 text-xl",
              )}
            >
              View our services
            </Link>
            <Link
              href="#contact-us"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 text-xl",
              )}
            >
              Contact Us
            </Link>
          </div>
        </section>
        <section
          id="about-us"
          className="flex flex-col items-center w-full gap-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-center">
            About us
          </h2>
          <div className="flex flex-col gap-8">
            <p className="text-2xl text-muted-foreground text-center max-w-250">
              Hi there! Our names are Lawrence and Daniel and we are two
              brothers from Lawrence, Kansas, who are passionate about tennis,
              pickleball, and helping others improve through consistent,
              purposeful practice. Over the past three years, we have trained
              together extensively, pushing each other to become stronger and
              more competitive players. Through that journey, we have gained
              experience playing with beginners, recreational players, high
              school athletes, and competitive tournament players.
            </p>
            <p className="text-2xl text-muted-foreground text-center max-w-250">
              Lawrence is a varsity tennis player and state qualifier, while
              Daniel is a rising varsity-level player continuing to develop
              through regular training and competition. Our greatest strength is
              not just our playing ability. It&apos;s our first-hand
              understanding of what it takes to improve through hard work,
              discipline, and quality practice. We provide affordable and
              reliable tennis and pickleball practice sessions for players of
              various ages and skill levels.{" "}
            </p>
            <p className="text-2xl text-muted-foreground text-center max-w-250">
              Our services include hitting partner sessions, rally practice,
              consistency drills, match play, serve and return practice,
              tournament preparation, and small-group training. Whether
              you&apos;re a beginner looking to build confidence, an adult
              seeking a dependable practice partner, or a competitive player
              preparing for matches, we create engaging, goal-oriented sessions
              tailored to your needs.  Our mission is simple: help players spend
              less time searching for someone to practice with and more time
              improving their game while having fun on the court.
            </p>
          </div>
        </section>
        <section
          id="our-services"
          className="flex flex-col items-center w-full gap-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-center">
            Our services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-103"
              >
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
            ))}
          </div>
        </section>
        <section
          id="contact-us"
          className="flex flex-col items-center w-full gap-16"
        >
          <div className="flex flex-col gap-4 items-center w-full">
            <h2 className="text-3xl md:text-5xl font-semibold text-center">
              Contact us
            </h2>
            <p className="text-2xl text-muted-foreground max-w-250 text-center">
              Interested? Reach out to use to book a session or for more
              information about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full max-w-200">
            {reachOutOptions.map((option, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-103"
              >
                <CardContent className="flex flex-col items-center gap-2">
                  <option.icon className="size-10" />
                  <h3 className="text-2xl font-semibold text-center">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-xl">
                    {option.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full max-w-200">
            <Separator className="flex-1 border-3 text-foreground border-foreground rounded-full" />
            <h3 className="text-xl font-semibold">or</h3>
            <Separator className="flex-1 border-3 text-foreground border-foreground rounded-full" />
          </div>

          <Card className="w-full max-w-200">
            <CardContent className="w-full">
              <SessionForm />
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mt-32 border-t px-6 py-4 flex items-center justify-center">
        <span className="text-muted-foreground text-xl font-medium text-center">
          Lawrence Tennis Partners
        </span>
      </footer>
    </div>
  );
}
