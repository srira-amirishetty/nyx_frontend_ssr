import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="text-center text-sm md:text-base font-light lg:text-left">
        <div
          className="text-white"
          style={{
            background: `linear-gradient(180.45deg, #041414 2.09%, #003163 61.79%)`,
          }}
        >
          <div className="flex justify-between w-[90%] mx-auto md:px-4 py-8">
            <div className="flex flex-col gap-4 items-start justify-start">
              <div className="flex gap-16 md:gap-[7.6rem]">
                <Link href="/careers" className="cursor-pointer">
                  Careers
                </Link>
                <Link href="/terms-and-conditions" className="cursor-pointer">
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex gap-10 md:gap-24">
                <Link href="/contact-us" className="cursor-pointer">
                  Contact Us
                </Link>
                <Link href="/privacy-policy" className="cursor-pointer">
                  Privacy Policy
                </Link>
              </div>

              <div className="flex gap-[3.2rem] md:gap-[6.9rem]">
                <Link href="/about" className="cursor-pointer">
                  About Us
                </Link>
                <Link href="/risk-disclosure" className="cursor-pointer">
                  Risk Disclosure
                </Link>
              </div>

              <div className="flex">
                <Link href="/roadmap" className="cursor-pointer">
                  Roadmap
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-1">
              <a
                className="cursor-pointer"
                //  onClick={() => onNavigate(3)}
              >
                {/* <FaFacebookF /> */}
              </a>
              <a
                className="cursor-pointer"
                // onClick={() => onNavigate(2)}
              >
                {/* <FaLinkedinIn /> */}
              </a>

              <a
                className="cursor-pointer"
                // onClick={() => onNavigate(1)}
              >
                {/* <FaInstagram /> */}
              </a>
              <a
                className="cursor-pointer"
                // onClick={() => onNavigate(0)}
              >
                {/* <FaTwitter /> */}
              </a>
            </div>
          </div>
        </div>

        <div className="text-white text-center p-4 text-sm bg-black relative bottom-0 w-[100%]">
          &copy; 2023 ALL RIGHTS RESERVED
        </div>
      </footer>
    </>
  );
}
