import Hero from "./_components2/Hero";
import OurProduct from "./_components2/OurProduct";
import Usecases from "./_components2/Usecases";
import TopNav from "./_components2/TopNav2";
import Recognition from "./_components2/Recognition";
import Integrate from "./_components2/Integrate";
import WhyNyx from "./_components2/WhyNyx";
import TrustedBy from "./_components2/TrustedBy";
import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";
import { HOW_IT_WORKS, PDP4HW, HOW_IT_WORKS_MOBILE } from "./_components2/tabs";

export default function Home() {
  return (
    <>
      <Header />
      <TopNav />
      <Hero />
      <div id="image">
        {" "}
        <Recognition />
      </div>

      <HOW_IT_WORKS data={PDP4HW}></HOW_IT_WORKS>
      <Integrate />
      <div className="max-sm:mt-[-50px]">
        <WhyNyx />
      </div>

      <OurProduct />

      <div id="whyNyxSection">
        <TrustedBy />
      </div>
      <Usecases />
      <Footer />
    </>
  );
}
