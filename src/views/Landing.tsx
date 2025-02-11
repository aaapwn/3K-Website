"use client";
import { Session } from "next-auth";

import HeroSection from "@/views/landingsection/hero";
import SportSection from "./landingsection/sportlist";
import Banner from "./landingsection/banner";


type LandingProps = Readonly<{
  session: Session | null;
}>;


const Landing = ({ session }: LandingProps) => {

  return (
    <div className="bg-secondw">
      <HeroSection session={session} />
      {/* <FeatureSection /> */}
      <Banner />
      <SportSection />
    </div>
  )
};

export default Landing;
