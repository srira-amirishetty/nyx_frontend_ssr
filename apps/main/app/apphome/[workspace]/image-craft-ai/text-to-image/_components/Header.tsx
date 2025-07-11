import classNames from "@nyx-frontend/main/utils/classNames";
import ArrowIcon from "./ArrowIcon";

type HeaderProps = {
  isActive: boolean;
  onClick: () => void;
  title: string;
  className: string;
};

function Header({ isActive, onClick, title, className }: HeaderProps) {
  return (
    <h2 className={classNames(className)}>
      <div
        className={`group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-[#3B226F] text-[#FFFFFF] rounded-lg`}
        onClick={onClick}
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        <div className="flex w-full justify-between items-center">
          <div
            className={`w-[50%] md:w-full font-bold flex ${
              isActive ? "text-nyx-yellow text-xl" : "text-white text-sm"
            }`}
          >
            {title}
          </div>
        </div>

        <span
          className={classNames(
            "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
            isActive ? `rotate-[-180deg] -mr-1` : `dark:fill-white`,
          )}
        >
          <ArrowIcon className="h-6 w-6" />
        </span>
      </div>
    </h2>
  );
}

export default Header;
