"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  NewspaperIcon,
  StarIcon,
  AwardIcon,
  ListChecksIcon,
  TrophyIcon,
  FlowerIcon,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const articles = [
  {
    title: "Lawrence boys tennis hosts Free State, others in home quad",
    description:
      "A 2026 Lawrence Journal-World meet recap noting that Free State's Lawrence Dao defeated Oliver Hester 8-0 in singles.",
    href: "https://www2.ljworld.com/sports/2026/apr/06/lawrence-boys-tennis-hosts-free-state-others-in-home-quad/",
    icon: NewspaperIcon,
  },
  {
    title: "Journal-World Athletes of the Week: Lawrence Dao and Sienna Wesley",
    description:
      "An athlete-of-the-week feature recognizing Dao after he won six matches across two days as Free State's No. 2 singles player.",
    href: "https://www2.ljworld.com/sports/2025/apr/10/journal-world-athletes-of-the-week-lawrence-dao-and-sienna-wesley/",
    icon: StarIcon,
  },
  {
    title: "2025 Journal-World All-Area Boys Tennis Team",
    description:
      "The Lawrence Journal-World's 2025 all-area boys tennis selections, featuring Lawrence Dao of Free State.",
    href: "https://www2.ljworld.com/sports/2025/jun/28/2025-journal-world-all-area-boys-tennis-team/",
    icon: AwardIcon,
  },
  {
    title: "Kansas high school boys tennis state tournament qualifiers",
    description:
      "A statewide list of Kansas boys tennis qualifiers identifying Lawrence Dao of Lawrence Free State as a Class 6A qualifier with a 16-4 record.",
    href: "https://www.kshsaa.org/Public/Tennis/StateQualifiers-Singles.cfm?ActivityID=19&Year=2025&Gender=1&Class=1&ClassDesc=6A",
    icon: ListChecksIcon,
  },
  {
    title:
      "Lawrence boys tennis takes third, Free State fourth following final round of the Sunflower League tournament",
    description:
      "A Sunflower League tournament recap reporting that Lawrence Dao won the seventh-place singles match and finished above his original seed.",
    href: "https://www2.ljworld.com/sports/2025/may/05/lawrence-boys-tennis-takes-third-free-state-fourth-following-final-round-of-the-sunflower-league-tournament/",
    icon: TrophyIcon,
  },
  {
    title:
      "Free State, Lawrence boys tennis teams compete in first four rounds of Sunflower League tournament",
    description:
      "Coverage of the rain-delayed opening rounds of the league tournament, including Lawrence Dao's 8-5 victory over Asher Sikes.",
    href: "https://www2.ljworld.com/sports/2025/may/02/free-state-lawrence-boys-tennis-teams-compete-in-first-four-rounds-of-sunflower-league-tournament-before-rain-delay-postpones-final-round-for-monday/",
    icon: FlowerIcon,
  },
];

const MediaPage = () => {
  useGSAP(() => {
    const headingSplit = new SplitText(".media-heading", {
      type: "chars, words",
    });
    const descriptionSplit = new SplitText(".media-description", {
      type: "lines",
    });
    const cards = gsap.utils.toArray(".article-card");

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
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-8 md:gap-16 max-w-400 mt-32 md:mt-52 mx-auto p-5">
      <div className="flex flex-col gap-4 items-center w-full">
        <h2 className="media-heading text-3xl md:text-5xl font-semibold text-center">
          Media
        </h2>
        <p className="media-description text-xl md:text-2xl text-muted-foreground max-w-250 text-center">
          Coverage for Lawrence Rally Partners. Here you can find our best
          highlights, updates, and some cool tips and tricks.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {articles.map((article) => (
          <div key={article.href} className="article-card w-full h-full">
            <Link target="_blank" href={article.href}>
              <Card className="w-full h-full transition-all duration-300 hover:scale-103">
                <CardContent className="flex flex-col items-center gap-2 w-full">
                  <article.icon className="size-10" />
                  <h3 className="text-2xl font-semibold text-center">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-lg text-center">
                    {article.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaPage;
