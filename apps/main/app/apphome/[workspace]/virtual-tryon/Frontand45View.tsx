
import React from "react";
import Image from "next/image";

const Frontand45View = ({ vtonResponse }: any, selectedTab: string) => {
  return (
    <div
      className="flex items-center justify-center w-[90%] h-[55vh] mt-10 rounded-lg"
      style={{
        background:
          "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
      }}
    >
      <Image
        width={500}
        height={500}
        src={
          vtonResponse.generated_photos.output_image[selectedTab] ||
          "https://picsum.photos/500"
        }
        alt={selectedTab}
        className="w-[352.8px] h-[100%]"
      />
    </div>
  );
};

export default Frontand45View;
