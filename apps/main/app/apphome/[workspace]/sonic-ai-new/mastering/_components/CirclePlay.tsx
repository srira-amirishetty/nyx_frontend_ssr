import clsx from "clsx";

type Props = {
  onClick: () => void;
  name: string | undefined;
  title: string;
  className?: string;
  isPlaying: boolean;
};

export default function CirclePlay({
  onClick,
  name,
  title,
  className = "bg-nyx-blue",
  isPlaying = false,
}: Props) {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <div
      className={clsx(
        "hover:scale-110 relative transition duration-700 ease-in-out rounded-full",
        "w-40 h-40 md:w-48 md:h-48 p-1"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 border-dashed transition-all border-nyx-yellow rounded-full"
        )}
      ></div>
      <div
        className={clsx(
          "p-4 rounded-full relative justify-center w-full h-full items-center flex flex-col ",
          className
        )}
        onClick={onClickHandler}
      >
        <span className="mb-3 text-purple-800 text-sm font-bold">{title}</span>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="#3B226F"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="#3B226F"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        <span className="text-purple-800 pl-3 text-sm">{name}</span>
      </div>
    </div>
  );
}
