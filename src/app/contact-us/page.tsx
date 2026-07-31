"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SessionForm } from "@/features/sessions/components/session-form";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";

const ContactUsPage = () => {
  useGSAP(() => {
    const headingSplit = new SplitText(".contact-us-heading", {
      type: "chars, words",
    });
    const descriptionSplit = new SplitText(".contact-us-description", {
      type: "lines",
    });

    gsap.from(headingSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(descriptionSplit.lines, {
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
      <div className="max-w-400 mx-auto w-full flex flex-col items-center gap-16 mt-52">
        <div className="flex flex-col gap-8">
          <h2 className="contact-us-heading text-3xl md:text-5xl font-semibold text-center">
            Contact us
          </h2>
          <p className="contact-us-description text-2xl text-muted-foreground text-center max-w-250">
            Interested? Reach out to book a session or for more information
            about our services.
          </p>
          <div className="w-full flex flex-col items-center gap-4">
            <span className="phone-text text-2xl text-foreground font-medium">
              <span className="font-normal text-muted-foreground">Phone: </span>
              (785) 393-7817
            </span>
            <Link href="mailto:lawrencerallypartners@gmail.com">
              <span className="email-text text-2xl text-foreground font-medium">
                <span className="font-normal text-muted-foreground">
                  Email:{" "}
                </span>
                lawrencerallypartners@gmail.com
              </span>
            </Link>
          </div>
        </div>
        <Card>
          <CardContent>
            <SessionForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ContactUsPage;
