"use client";
import { Session } from "next-auth";

import { Button } from "@heroui/button";

import HeroSection from "@/pages/landingsection/hero";
import FeatureSection from "./landingsection/feature";


type LandingProps = Readonly<{
  session: Session | null;
}>;


const Landing = ({ session }: LandingProps) => {

  return (
    <div className="bg-secondw">
      <HeroSection session={session} />
      <FeatureSection />
    </div>
  )
};

export default Landing;
