import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shaif-ahamed-tamim.hyperglow1.chatgpt.site"),
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
      "Production intelligence. Research with consequence. Systems built to ship.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Shaif Ahamed Tamim portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaif Ahamed Tamim — AI Engineer • Researcher • Builder",
    description: "Production intelligence. Research with consequence.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
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
