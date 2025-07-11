"use client";
import { DATA_FOR_DISTRIBUTE } from "@nyx-frontend/main/utils";
import { TOKEN_CELL } from "@nyx-frontend/main/components/Utils/Utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
const Share = IMAGE_URL + "/assets/images/artists/share.png";

export const TableComponent = () => {
  return (
    <div className=" m-auto w-[90%]  pt-4 rounded-sm">
      <div className="flex     bg-new h-20 pt-5 ">
        <div className="w-[20%] flex justify-center ">
          <p className="text-white text-center break-words w-[25%] text-sm font-light">
            Share Name
          </p>
        </div>
        <div className="w-[10%]">
          <p className="text-white break-words w-[65%] text-sm font-light">
            Total Streams
          </p>
        </div>
        <div className="w-[20%]">
          <p className="text-white break-words w-[75%] text-sm font-light">
            Streaming Target for 1.5x return
          </p>
        </div>
        <div className="w-[20%]">
          <p className="text-white break-words w-[55%] text-sm font-light">
            Total Shares
          </p>
        </div>
        <div className="w-[20%]">
          <p className="text-white break-words w-[45%] text-sm font-light">
            Streams Earned
          </p>
        </div>
        <div className="w-[20%]">
          <p className="text-white break-words w-[34%] text-sm font-light">
            Incentives Earned
          </p>
        </div>
      </div>
      {DATA_FOR_DISTRIBUTE.data.map((info) => (
        <div className="mt-10 border rounded-sm" key={info.name}>
          <div className="flex  h-[5rem] mt-3">
            <div className="w-[20%]">
              {TOKEN_CELL({
                name: info.name,
                image: info.image,
                subname: info.sub_name,
              })}
            </div>
            <div className="w-[10%]">
              <p className="text-white break-words text-center pt-5  w-[55%] text-sm font-light">
                {info.stream}
              </p>
            </div>
            <div className="w-[20%]">
              <p className="text-white break-words text-center pt-5  w-[55%] text-sm font-light">
                {info.stream_target}
              </p>
            </div>
            <div className="w-[20%]">
              <p className="text-white break-words text-center pt-5  w-[55%] text-sm font-light">
                {info.incentive}
              </p>
            </div>
            <div className="w-[20%]">
              <p className=" break-words text-center pt-5  w-[55%] text-sm font-light text-tabletext">
                {info.stream_earned}
              </p>
            </div>
            <div className="w-[20%]">
              <p className=" break-words text-center pt-5  w-[55%] text-sm font-light text-tabletext">
                {info.total_share}
              </p>
            </div>

            <div className="w-[5%] mt-5">
              <LazyLoadImage src={Share}></LazyLoadImage>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
