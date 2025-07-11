function DisabledButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="shadow-[#8297BD] bg-[#8297BD] border-[#8297BD] text-black hover:bg-[#8297BD] rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 cursor-not-allowed">
      {children}
    </button>
  );
}

export default DisabledButton;
