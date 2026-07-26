import type { Metadata } from "next";
import { GalleryExperience } from "./gallery-experience";

export const metadata: Metadata = {
  title: "The Nocturne Gallery",
  description:
    "A cinematic collection of photographs by Shaif Ahamed Tamim—streets, weather, people, and light presented as an immersive digital gallery.",
};

export default function GalleryPage() {
  return <GalleryExperience />;
}
