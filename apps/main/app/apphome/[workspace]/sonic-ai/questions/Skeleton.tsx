import clsx from "clsx"

export default function Skeleton({ classNames = "" }: { classNames?: string }) {
  return (
    <div className={clsx("pb-10 pt-24 relative px-6 z-10 animate-pulse", classNames)} >
      <div className="absolute text-sm top-6 left-6 h-4 w-[calc(100%-3rem)] rounded-md bg-blue-400" />
      <div className="h-10 w-full mx-auto rounded-md bg-blue-400" />
      <div className="h-8 w-full mx-auto rounded-md bg-blue-400 mt-6" />
      <div className="h-14 w-full max-w-xs mx-auto rounded-md bg-blue-400 mt-6" />
      <div className="h-6 w-full max-w-xs mx-auto rounded-md bg-blue-400 mt-10" />
    </ div>
  )
}