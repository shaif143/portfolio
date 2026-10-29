import type { Metadata } from "next";
import { PortfolioExperience } from "./portfolio-experience";

export const metadata: Metadata = {
  title: "Shaif Ahamed Tamim — AI Engineer & Researcher",
  description:
    "Shaif Ahamed Tamim: AI engineer and researcher in Guildford, UK, studying at the University of Surrey. Agentic AI, computer vision, healthcare research and full-stack software.",
};

export default function Home() {
  return <PortfolioExperience />;
}
