import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transform Your Images with AI Excellence",
  description:
    "Our Image Likelihood Model leverages advanced AI to improve and refine images. Enhance details, correct imperfections, and achieve professional-level results effortlessly.",
  keywords: [
    "Image Likelihood",
    "AI-powered image enhancement",
    "AI image refinement",
    "professional image correction",
    "image perfection",
    "AI tools for images",
    "image improvement",
    "advanced AI",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/models/image-likelihood",
  },
  openGraph: {
    title: "Transform Your Images with AI Excellence",
    description:
      "Our Image Likelihood Model leverages advanced AI to improve and refine images. Enhance details, correct imperfections, and achieve professional-level results effortlessly.",
    url: "https://nyx.today/models/image-likelihood/",
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
