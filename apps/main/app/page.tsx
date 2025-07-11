// import Hero from "./_components/Hero";
// import OurProduct from "./_components/OurProduct";
// import LyricGeniusAI from "./_components/LyricGeniusAI";
// import CamPulseAI from "./_components/SonicAI";
// import Usecases from "./_components/Usecases";
// import BrandVisionAI from "./_components/BrandVisionAI";
// import VideoVistaAI from "./_components/VideoVistaAI";
// import Advantages from "./_components/Advantages";
// import PoweredBy from "./_components/PoweredBy";
// import TopNav from "@nyx-frontend/main/components/home/TopNav";
// import { Metadata } from "next";
// import Footer from "@nyx-frontend/main/components/footer_home_new";
// import Header from "@nyx-frontend/main/components/header_home_new";

// // import TestToastify from "./_components/toastifyTest/toastify";

// // export const metadata: Metadata = {
// //   title: "NYX Home",
// //   description: "NYX Home",
// // };

// export default function Home() {
//   return (
//     <>

//       <Header />
//       <TopNav />

//       <Hero />

//       <div id="productsSection">
//         <OurProduct />
//       </div>

//       <div id="image">
//         <BrandVisionAI />
//       </div>
//       <div id="video">
//         <VideoVistaAI />
//       </div>
//       <Usecases />
//       <div id="music">
//         <CamPulseAI />
//       </div>
//       <div id="lyrics">
//         <LyricGeniusAI />
//       </div>

//       <div id="whyNyxSection">
//         <Advantages />
//       </div>
//       <PoweredBy />

//       <Footer />
//     </>
//   );
// }

// import ToastifyTest from "./_components/ToastifyTest/toastify";
import Hero from "./_components2/Hero";
import OurProduct from "./_components2/OurProduct";
import Usecases from "./_components2/Usecases";
import TopNav from "./_components2/TopNav2";
import Recognition from "./_components2/Recognition";
import NyxHire from "./_components2/NyxHire";
import AiAutopilot from "./_components2/AiAutopilot";
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
      <NyxHire />
      <HOW_IT_WORKS data={PDP4HW}></HOW_IT_WORKS>
      <AiAutopilot />
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
