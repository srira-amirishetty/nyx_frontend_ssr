import classNames from '@nyx-frontend/main/utils/classNames';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  hasBorder?: boolean;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ColorFullCircle = ({
  children,
  className = "",
  isActive = false,
  isError = false,
  isLoading = false,
  isDisabled = false,
  onClick,
}: Props) => {
  return (
    <motion.div
      whileHover={{
        scale: isDisabled ? 1: 1.1
      }}
      onClick={onClick} 
      className={classNames(
        "group relative rounded-full w-[120px] h-[120px] sm:w-40 sm:h-40 md:w-48 md:h-48 p-1",
      )}
    >
      <div className={classNames(
        "absolute inset-0 group-hover:border-dashed border-dashed group-hover:border rounded-full",
        isLoading ? "animate-spin border-[5px] group-hover:border-[5px]" : isActive ? "border" : "",
        isActive ? "border-nyx-yellow " : "border-nyx-yellow ",
        isError ? "border-nyx-red " : "border-nyx-yellow",
        isDisabled ? "border-gray-600" : "border-nyx-yellow"
      )}></div>
      <div className={classNames(
        "p-4 rounded-full relative justify-center w-full h-full items-center flex flex-col",
        isActive ? "bg-nyx-yellow" : "",
        isError ? "bg-nyx-red" : "",
        isDisabled ? "bg-gray-600" : "",
        (!isActive && !isError && !isDisabled) ? "bg-nyx-blue" : "",
      )}>
        {children}
      </div>
    </motion.div>
  );
};

export default ColorFullCircle;