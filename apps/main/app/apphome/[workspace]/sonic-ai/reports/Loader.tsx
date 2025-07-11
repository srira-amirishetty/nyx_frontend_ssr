import LoadingFile from "../analysis-and-compare/loader-file";

export default function Loader() {
  return (
    <div className="animate-pulse h-auto w-full bg-[rgba(42,16,75,0.5)] overflow-hidden">
      <LoadingFile height={600} />
      <div className="flex">
        <LoadingFile height={287} width={331} />
        <LoadingFile height={287} width={331} />
        <LoadingFile height={287} width={331} />
      </div>
    </div>
  );
}
