import React from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UseContextProvider } from "@nyx-frontend/main/hooks/usecontext";
import { MessagePopupContextProvider } from "@nyx-frontend/main/hooks/MessagePopupContext";
import QueryProvider from "@nyx-frontend/main/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import NavigationEvents from "@nyx-frontend/main/components/NavigationEvents";
import Script from "next/script";
import MessagePopup from "@nyx-frontend/main/components/_components/MessagePopup";
import { RiveProvider } from "./_components2/RiveProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "500", "700"],
});

export const metadata: Metadata = {
  title:
    "Maximise Your Marketing ROI - High Performing Creatives/Smart Ad Management",
  description:
    "Discover how NYX's AI-powered platform revolutionises content creation and campaign automation. Deliver impactful, audience-driven audio-visual experiences that convert effortlessly.",
  keywords: [
    "Marketing ROI",
    "AI-powered platform",
    "content creation",
    "campaign automation",
    "audio-visual experiences",
    "high-performing creatives",
    "smart ad management",
    "audience-driven campaigns",
  ],
  metadataBase: new URL("https://nyx.today/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Maximise Your Marketing ROI - High Performing Creatives/Smart Ad Management",
    description:
      "Discover how NYX's AI-powered platform revolutionises content creation and campaign automation. Deliver impactful, audience-driven audio-visual experiences that convert effortlessly.",
    url: "https://nyx.today/",
    siteName: "NYX Today",
    images: [
      {
        url: `/api/og`, // Must be an absolute URL
        width: 100,
        height: 70,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=1", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=1", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=1"],
    apple: [{ url: "/apple-touch-icon.png?v=1", sizes: "180x180" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest?v=1",
  authors: [{ name: "nyx.today" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="/safari-pinned-tab.svg?v=1"
          rel="mask-icon"
          color="#333333"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="language" content="English" />

        <meta name="copyright" content="nyx.today" />
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nyxify Technologies Private Limited",
              url: "https://www.nyx.today",
              logo: "https://assets.nyx.today/assets/logo.svg",
              description:
                "NYX was born from a vision to simplify marketing and amplify results. In a world overwhelmed by complexity, we empower brands and creators to thrive by blending the art of storytelling with the precision of AI.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Obeya Nest, 1126, 18th Cross Rd, Sector 7, HSR Layout",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560102",
                addressCountry: "India",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+917676088926",
                contactType: "customer service",
              },
              sameAs: [
                "https://www.facebook.com/NYX.today ",
                "https://www.instagram.com/nyx.today/",
                "https://x.com/Nyx_today",
                "https://twitter.com/Nyx_today",
              ],
            }),
          }}
        />
        <Script
          type="application/ld+json"
          id="website-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NYX",
              url: "https://www.nyx.today",
              description:
                "NYX is a multi-AI-agent, full stack customer acquisition platform for marketing teams to amplify conversion via high-converting content & automating campaign management. With NYX Cut efforts, Save time, Grow ROI.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.nyx.today/search?q={nyx}",
                "query-input": "required name=nyx",
              },
            }),
          }}
        />
        <Script
          type="application/ld+json"
          id="webpage-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Maximise your Marketing ROI - High performing Creatives/Smart Ad Management",
              url: "https://www.nyx.today",
              description:
                "Discover how NYX's AI-powered platform revolutionises content creation and campaign automation, delivering impactful, audience-driven audio-visual experiences that convert effortlessly.",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://nyx.today/toolimage2.png",
                caption: "NYX AI",
              },
              publisher: {
                "@type": "Organization",
                name: "Nyxify Technologies Private Limited",
                logo: {
                  "@type": "ImageObject",
                  url: "https://assets.nyx.today/assets/logo.svg",
                },
              },
            }),
          }}
        />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=GTM-K33VH8J3`}
        />

        {/* <Script
          strategy="afterInteractive"
          id="GTM-K33VH8J3"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-K33VH8J3');
      `,
          }}
        ></Script> */}
      </head>

      <body className={`antialiased ${montserrat.className}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K33VH8J3"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
          }}
        ></noscript>
        <UseContextProvider>
          <MessagePopupContextProvider>
            <QueryProvider>
              <RiveProvider>{children}</RiveProvider>

              <ToastContainer />
              <NavigationEvents />
              <MessagePopup />
            </QueryProvider>
          </MessagePopupContextProvider>
        </UseContextProvider>
        <Script
          id="serviceWorker"
          dangerouslySetInnerHTML={{
            __html: `
            navigator.serviceWorker.getRegistrations().then(registrations => {
              for (const registration of registrations) {
                  registration.unregister();
              } 
          });
        `,
          }}
        ></Script>
      </body>
    </html>
  );
}
