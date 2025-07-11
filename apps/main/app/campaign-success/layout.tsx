import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      {<Footer />}
    </>
  );
}
