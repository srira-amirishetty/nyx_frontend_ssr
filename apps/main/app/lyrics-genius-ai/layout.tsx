import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unleash Your Creativity with Lyrics Genius AI - NYX",
  description:
    "Dive into the world of songwriting with Lyrics Genius AI by NYX. Harness the power of AI to effortlessly create captivating lyrics for your music projects.",
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/lyrics-genius-ai",
  },
  openGraph: {
    title: "Unleash Your Creativity with Lyrics Genius AI - NYX",
    description:
      "Dive into the world of songwriting with Lyrics Genius AI by NYX. Harness the power of AI to effortlessly create captivating lyrics for your music projects.",
    url: "https://nyx.today/lyrics-genius-ai",
    siteName: "NYX Today",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer></Footer>
      {/* <Navbar /> */}
      {/* <main>{children}</main> */}
      {/* {<Footer />} */}
    </>
  );
}
