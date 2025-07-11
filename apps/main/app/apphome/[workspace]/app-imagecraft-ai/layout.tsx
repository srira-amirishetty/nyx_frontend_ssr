import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to ImageCraft AI!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body{
          background: linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%);
          min-height: 100vh;
        }
      `}</style>
      {children}
    </>
  );
}
