import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body{
          background: linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%);
        }
      `}</style>
      {/* <Header /> */}
      {children}
      {/* {<Footer />} */}
    </>
  );
}
