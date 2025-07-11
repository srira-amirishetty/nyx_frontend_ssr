import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";

export default function BasicLayout({
  children,
  header_bg = "",
}: {
  children: React.ReactNode;
  header_bg?: string;
}) {
  return (
    <>
      <Header header_bg={header_bg} />
      {children}
      <Footer />
    </>
  );
}
