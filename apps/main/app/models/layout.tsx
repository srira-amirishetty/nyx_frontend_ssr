import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Our AI Models: NYX",
  description:
    "Dive into the world of AI creativity and unfold the future with NYX Today's innovative models.",
  keywords: [
    "AI models",
    "NYX AI",
    "innovative AI solutions",
    "AI creativity",
    "future of AI",
    "NYX models",
    "artificial intelligence",
    "AI tools",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/models",
  },
  openGraph: {
    title: "Explore Our AI Models: NYX",
    description:
      "Dive into the world of AI creativity and unfold the future with NYX Today's innovative models.",
    url: "https://nyx.today/models",
    siteName: "NYX Today",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH || ""}>
      <Header />

      {children}

      {<Footer />}
    </GoogleOAuthProvider>
  );
}
