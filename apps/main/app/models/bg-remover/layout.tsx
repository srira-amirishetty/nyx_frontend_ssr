import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seamlessly Remove Backgrounds with AI",
  description:
    "Effortlessly remove backgrounds from images with our AI-powered Background Remover. Perfect for creating clean, professional visuals for any project or presentation.",
  metadataBase: new URL("https://nyx.today/"),
  keywords: [
    "AI-powered Background Remover",
    "remove backgrounds",
    "professional visuals",
    "image editing",
    "clean images",
    "background removal tool",
    "seamless background removal",
    "presentation visuals",
  ],
  alternates: {
    canonical: "/models/bg-remover",
  },
  openGraph: {
    title: "Seamlessly Remove Backgrounds with AI",
    description:
      "Effortlessly remove backgrounds from images with our AI-powered Background Remover. Perfect for creating clean, professional visuals for any project or presentation.",
    url: "https://nyx.today/models/bg-remover/",
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
