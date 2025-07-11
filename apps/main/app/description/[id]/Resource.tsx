/* eslint-disable @next/next/no-img-element */
export default function Resource({ url }: { url: string }) {
  if (url.includes("youtube")) {
    if (!url.includes("/embed/")) {
      return (
        <iframe src={url.replace('/watch?v=', "/embed/")} className="w-full md:h-[32rem] rounded object-cover" />
      )
    }

    return (
      <iframe src={url} className="w-full md:h-[32rem] rounded object-cover" />
    )
  }

  return (
    <img src={url} alt={url} className="w-full md:h-[32rem] rounded object-cover" />
  )
}