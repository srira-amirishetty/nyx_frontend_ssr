/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  FOOTER_GET_STARTS,
  IMAGE_URL,
  FOOTER_PRODUCTS,
  FOOTER_COMPANIES,
  FOOTER_RESOURCES,
  FOOTER_LEGALS,
} from "./constants";
import BackToTopButton from "./BackToTopButton";
import Link from "next/link";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const logo = IMAGE_URL + "/assets/logo.svg";
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className="footer_background bg-[#130625] text-white pt-[3rem] pb-[5rem] sm:pt-[3rem] sm:pb-[6rem] xl:py-[6rem] relative"
      style={{
        backgroundImage: `url(${IMAGE_URL}/assets/images/home/FooterBg.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="m-auto sm:flex sm:flex-col xl:flex-row  w-[80%] sm:w-full sm:px-[40px] xl:px-[100px] sm:flex-wrap gap-20 sm:gap-[47px] xl:gap-[5rem] hidden ">
        <div className="sm:mx-auto">
          <Image
            src={logo}
            width={160}
            height={116}
            alt="NYX Logo"
            className="mx-auto"
          />
          <div className="flex items-center justify-center gap-[8px] cursor-pointer">
            <Link
              href="https://www.facebook.com/NYX.today"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX Facebook"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/NYXFacebook.svg`}
                alt="facebook"
                width={28}
                height={28}
              />
              <span className="sr-only">NYX Facebook</span>
            </Link>
            <Link
              href="https://www.instagram.com/nyx.today/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX Instagram"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/NYXInstagram.svg`}
                alt="Instagram"
                width={32}
                height={32}
              />
              <span className="sr-only">NYX Instagram</span>
            </Link>
            <Link
              href="https://twitter.com/Nyx_today"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX Twitter/X"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/NYXTwitterX.svg`}
                alt="Twitter"
                width={32}
                height={32}
              />
              <span className="sr-only">NYX Twitter/X</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/nyx-today/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX LinkedIn"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/NYXLinkedin.svg`}
                alt="Linkedin"
                width={32}
                height={32}
              />
              <span className="sr-only">NYX LinkedIn</span>
            </Link>
            <Link
              href="https://discord.gg/e9mQUNAxWS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX Discord"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/Discord.svg`}
                alt="Discord"
                width={32}
                height={32}
              />
              <span className="sr-only">NYX Discord</span>
            </Link>
            <Link
              href="https://medium.com/@nyx-today"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NYX Medium"
            >
              <Image
                src={`${IMAGE_URL}/assets/images/home/medium.svg`}
                alt="medium"
                width={28}
                height={28}
              />
              <span className="sr-only">NYX Medium</span>
            </Link>
          </div>
        </div>

        <div className="flex sm:gap-[40px]  md:gap-[60px] lg:gap-[80px] sm:mx-auto xl:gap-[5rem]">
          {/* Products */}

          <ul className="">
            <li className="mb-5 text-white   sm:text-[14px] lg:text-[18px] font-semibold">
              {" "}
              Products
            </li>
            {FOOTER_PRODUCTS.map((footerProduct) => (
              <li
                key={`product-${footerProduct.name}`}
                style={{ width: "max-content" }}
              >
                <Link
                  href={footerProduct.url}
                  className="text-white font-[300] sm:text-[14px] lg:text-[18px] cursor-pointer"
                >
                  {footerProduct.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Get Started */}
          <ul className="">
            <li
              className="mb-5 text-white  sm:text-[14px] lg:text-[18px] font-semibold"
              style={{ width: "max-content" }}
            >
              {" "}
              Get Started
            </li>
            {FOOTER_GET_STARTS.map((footerGetStart) => (
              <li
                key={`get-start-${footerGetStart.name}`}
                style={{ width: "max-content" }}
              >
                <Link
                  href={footerGetStart.url}
                  className="text-white font-[300] sm:text-[14px] lg:text-[18px] cursor-pointer"
                >
                  {footerGetStart.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Company */}
          <ul className="min-w-[110px]">
            <li className="mb-5 text-white font-semibold sm:text-[14px] lg:text-[18px] ">
              {" "}
              Company
            </li>
            {FOOTER_COMPANIES.map((footerCompany) => (
              <li key={`company-${footerCompany.name}`}>
                <Link
                  href={footerCompany.url}
                  className="text-white font-[300] sm:text-[14px] lg:text-[18px] cursor-pointer"
                >
                  {footerCompany.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Resources */}
          <ul className="min-w-[110px]">
            <li className="mb-5 text-white font-semibold sm:text-[14px] lg:text-[18px] ">
              {" "}
              Resources
            </li>
            {FOOTER_RESOURCES.map((footerResource) => (
              <li key={`resource-${footerResource.name}`}>
                <Link
                  href={footerResource.url}
                  className="text-white font-[300] sm:text-[14px] lg:text-[18px] cursor-pointer"
                >
                  {footerResource.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Legal */}
          <ul className="w-1/6">
            <li className="mb-5 text-white font-semibold sm:text-[14px] lg:text-[18px] ">
              Legal
            </li>
            {FOOTER_LEGALS.map((footerLegal) => (
              <li key={`legal-${footerLegal.name}`}>
                <Link
                  href={footerLegal.url}
                  className="text-white font-[300] sm:text-[14px] lg:text-[18px] cursor-pointer"
                >
                  {footerLegal.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End of desktop view */}

      {/* Mobile View */}
      <div className="m-auto sm:hidden w-[100%] block">
        <div className="flex justify-center">
          <Image width={153} height={84} src={logo} alt="logo"></Image>
        </div>

        {/* Products and Get Started Section */}
        <div className="flex m-auto w-[70%] gap-10 pt-16">
          <ul className="w-1/2">
            <li className="text-white  text-[13px] font-semibold">Products</li>
            {FOOTER_PRODUCTS.map((footerProduct) => (
              <li key={`product-small-${footerProduct.name}`}>
                <Link
                  href={footerProduct.url}
                  className="text-white font-[300] text-[13px]"
                >
                  {footerProduct.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="w-1/2">
            <li className="text-white  text-[13px] font-semibold">
              Get Started
            </li>
            {FOOTER_GET_STARTS.map((footerGetStart) => (
              <li key={`get-start-small-${footerGetStart.name}`}>
                <Link
                  href={footerGetStart.url}
                  className="text-white font-[300] text-[13px]"
                >
                  {footerGetStart.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company and Resources Section */}
        <div className="flex m-auto w-[70%] gap-10 pt-5">
          <ul className="w-1/2">
            <li className="text-white font-semibold text-[13px]"> Company</li>
            {FOOTER_COMPANIES.map((footerCompany) => (
              <li key={`company-small-${footerCompany.name}`}>
                <Link
                  href={footerCompany.url}
                  className="text-white font-[300] text-[13px]"
                >
                  {footerCompany.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="w-1/2">
            <li className="text-white  text-[13px] font-semibold">
              {" "}
              Resources
            </li>
            {FOOTER_RESOURCES.map((footerResource) => (
              <li key={`resource-small-${footerResource.name}`}>
                <Link
                  href={footerResource.url}
                  className="text-white font-[300] text-[13px]"
                >
                  {footerResource.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Section */}
        <div className="flex m-auto w-[70%] gap-10 pt-5">
          <ul className="w-1/2">
            <li className="text-white font-semibold text-[13px]">Legal</li>
            {FOOTER_LEGALS.map((footerLegal) => (
              <li key={`legal-${footerLegal.name}`}>
                <Link
                  href={footerLegal.url}
                  className="text-white font-[300] text-[13px]"
                >
                  {footerLegal.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* back to top */}
      <div className="absolute top-[-150px] right-10 z-50">
        <BackToTopButton />
      </div>

      <div
        className="absolute block sm:hidden left-[50%] top-36"
        style={{ transform: "translate(-45%, 0%)" }}
      >
        <div className="flex items-center justify-center gap-[8px] ml-[-20px] cursor-pointer">
          <Link
            href="https://www.facebook.com/NYX.today"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX Facebook"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/NYXFacebook.svg`}
              width={28}
              height={28}
              alt="facebook"
            />
            <span className="sr-only">NYX Facebook</span>
          </Link>

          <Link
            href="https://www.instagram.com/nyx.today/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX Instagram"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/NYXInstagram.svg`}
              width={32}
              height={32}
              alt="Instagram"
            />
            <span className="sr-only">NYX Instagram</span>
          </Link>
          <Link
            href="https://twitter.com/Nyx_today"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX Twitter/X"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/NYXTwitterX.svg`}
              width={32}
              height={32}
              alt="twitter"
            />
            <span className="sr-only">NYX Twitter/X</span>
          </Link>
          <Link
            href="https://www.linkedin.com/company/nyx-today/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX LinkedIn"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/NYXLinkedin.svg`}
              width={40}
              height={40}
              alt="linkedin"
              className="-ml-[6px]"
            />
            <span className="sr-only">NYX LinkedIn</span>
          </Link>
          <Link
            href="https://discord.gg/e9mQUNAxWS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX Discord"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/Discord.svg`}
              width={32}
              height={32}
              alt="Discord"
            />
            <span className="sr-only">NYX Discord</span>
          </Link>
          <Link
            href="https://medium.com/@nyx-today"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NYX Discord"
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/medium.svg`}
              alt="medium"
              width={28}
              height={28}
            />
            <span className="sr-only">NYX Medium</span>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-[20px] left-[32%] sm:left-[50%]  transform -translate-x-[20%] sm:-translate-x-1/2 ">
        <p className="text-white text-[12px] sm:text-[16px]">
          © {year} All Rights Reserved, NYX®
        </p>
      </div>
    </footer>
  );
}
