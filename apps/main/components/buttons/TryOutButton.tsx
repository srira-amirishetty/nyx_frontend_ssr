import Link from "next/link";

function TryOutButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <span className="text-[20px] w-[180px] inline-flex  justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D]	border-[#FFC01D] h-12 hover:bg-[#FFC01D]  py-5 px-8 border-solid cursor-pointer hover:text-black">
        Try It Out
      </span>
    </Link>
  );
}

export default TryOutButton;
