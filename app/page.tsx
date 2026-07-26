import type { Metadata } from "next";
import { PortfolioExperience } from "./portfolio-experience";

export const metadata: Metadata = {
  title: "Shaif Ahamed Tamim — AI Engineer & Researcher",
  description:
    "The portfolio of Shaif Ahamed Tamim: applied AI systems, research, cloud engineering, and visual stories from Dhaka.",
};

export default function Home() {
  return <PortfolioExperience />;
}
