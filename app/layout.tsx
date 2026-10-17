import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./professional.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shaif-portfolio.vercel.app"),
  title: {
    default: "Shaif Ahamed Tamim — AI Engineer & Researcher",
    template: "%s — Shaif Ahamed Tamim",
  },
  description:
    "Applied AI engineer, researcher, and builder creating production-grade intelligent systems from Dhaka.",
  keywords: [
    "Shaif Ahamed Tamim",
    "AI Engineer",
    "Applied AI Developer",
    "AI Researcher",
    "RAG",
    "LangGraph",
    "Dhaka",
  ],
  authors: [{ name: "Shaif Ahamed Tamim", url: "https://github.com/shaif143" }],
  openGraph: {
    title: "Shaif Ahamed Tamim — AI Engineer • Researcher • Builder",
    description:
      "AI engineering, applied research, and thoughtful software. Explore my experience, projects, and research.",
    images: [
      {
        url: "/profile-social.png",
        width: 1200,
        height: 630,
        alt: "Shaif Ahamed Tamim — AI engineer and researcher",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaif Ahamed Tamim — AI Engineer • Researcher • Builder",
    description: "AI engineering, applied research, and thoughtful software.",
    images: ["/profile-social.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
