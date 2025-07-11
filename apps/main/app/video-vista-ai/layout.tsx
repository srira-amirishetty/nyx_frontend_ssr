import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transform Scripts into Engaging Videos with Video Vista AI",
  description:
    "Explore how our innovative tool streamlines the video creation process, allowing you to bring your ideas to life with ease. Join us and revolutionise your video production.",
  keywords: [
    "Video Vista AI",
    "video creation",
    "script to video",
    "video production",
    "innovative video tools",
    "streamline video creation",
    "engaging videos",
    "creative ideas",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/video-vista-ai",
  },
  openGraph: {
    title: "Transform Scripts into Engaging Videos with Video Vista AI",
    description:
      "Explore how our innovative tool streamlines the video creation process, allowing you to bring your ideas to life with ease. Join us and revolutionise your video production.",
    url: "https://nyx.today/video-vista-ai",
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
