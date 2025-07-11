import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH || ""}>
      <style>{`
        html {
          height: 100%;
        }
        body{
          background:#130625;
          height: 100%;
        }
      `}</style>
      {children}
    </GoogleOAuthProvider>
  );
}
