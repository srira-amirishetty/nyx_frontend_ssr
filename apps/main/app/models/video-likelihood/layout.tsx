import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enhance Video Quality with AI Precision - NYX",
  description:
    "Experience the power of our Video Likelihood Model. This tool uses AI to analyze and enhance video content, ensuring top-notch quality and viewer satisfaction.",
  keywords: [
    "Video Likelihood Model",
    "AI video enhancement",
    "video quality",
    "AI precision",
    "video content analysis",
    "video enhancement",
    "viewer satisfaction",
    "AI tools for video",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/models/video-likelihood",
  },
  openGraph: {
    title: "Enhance Video Quality with AI Precision - NYX",
    description:
      "Experience the power of our Video Likelihood Model. This tool uses AI to analyze and enhance video content, ensuring top-notch quality and viewer satisfaction.",
    url: "https://nyx.today/models/video-likelihood/",
    siteName: "NYX Today",
    type: "website",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
