import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Realistic Images with NYX Diffusion",
  description:
    "Explore the capabilities of the NYX Diffusion Model, an AI tool designed to generate highly realistic images. Witness the fusion of creativity and technology in producing lifelike visuals.",
  keywords: [
    "NYX Diffusion",
    "realistic images",
    "AI - generated visuals",
    "creative technology",
    "lifelike visuals",
    "AI tools",
    "image generation",
    "diffusion model",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/models/nyx-diffusion",
  },
  openGraph: {
    title: "Generate Realistic Images with NYX Diffusion",
    description:
      "Explore the capabilities of the NYX Diffusion Model, an AI tool designed to generate highly realistic images. Witness the fusion of creativity and technology in producing lifelike visuals.",
    url: "https://nyx.today/models/nyx-diffusion/",
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
