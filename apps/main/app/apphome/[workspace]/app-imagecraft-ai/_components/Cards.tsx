/* eslint-disable @next/next/no-img-element */
import TryOutButton from "@nyx-frontend/main/components/buttons/TryOutButton";
import ComingSoonButton from "@nyx-frontend/main/components/buttons/ComingSoonButton";

type ImageCraftCardProps = {
  href: string;
  comingsoon?: boolean;
  title: string;
  subTitle: string;
  src: string;
};

export function ImageCraftCard({
  href,
  comingsoon = false,
  title,
  subTitle,
  src,
}: ImageCraftCardProps) {
  return (
    <div className="flex flex-wrap md:flex-nowrap md:gap-[36px] w-full rounded-md bg-[#3B226F]">
      <div className="w-full md:w-[337px]">
        <img
          className="w-full rounded-lg object-cover h-full"
          src={src}
          alt="image craft card"
        />
      </div>
      <div className="flex-1 p-4 md:py-[22px] flex flex-col justify-between">
        <div>
          <p className="text-amber-300 font-bold text-xl mb-2">{title}</p>
          <p className="text-white font-normal text-base mb-5 max-w-lg text-balance">{subTitle}</p>
        </div>
        <div>
          {comingsoon ? <ComingSoonButton /> : <TryOutButton href={href} />}
        </div>
      </div>
    </div>
  );
}
