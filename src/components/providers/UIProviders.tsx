"use client";

import { HeroUIProvider } from "@heroui/react";

type Props = {
  children: React.ReactNode;
};

const UIProviders = ({ children }: Props) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default UIProviders;
