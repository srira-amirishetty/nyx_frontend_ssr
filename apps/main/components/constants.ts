export const IMAGE_URL: string | undefined = process.env.NEXT_PUBLIC_IMAGE_URL;
export const MOBILE_NUMBER_THRESHOLD = 10;

type FooterType = {
  name: string;
  url: string;
};

export const FOOTER_PRODUCTS: Array<FooterType> = [
  { name: "ImageCraft AI", url: "/image-craft-ai" },
  // { name: "VideoVista AI", url: "/video-vista-ai" },
  { name: "CamPulse AI", url: "/campulse-ai" },
];

export const FOOTER_GET_STARTS: Array<FooterType> = [
  // { name: "Log in", url: "/apphome/login" },
  // { name: "Sign up", url: "/apphome/register" },
  { name: "Pricing", url: "/pricing" },
  { name: "Demo", url: "/demo" },
];

export const FOOTER_COMPANIES: Array<FooterType> = [
  { name: "About Us", url: "/about" },
  { name: "Roadmap", url: "/roadmap" },
  { name: "Careers", url: "/careers" },
  { name: "Contact Us", url: "/contact" },
  { name: "Feedback", url: "/feedback" },
];

export const FOOTER_RESOURCES: Array<FooterType> = [
  // { name: "Models", url: "/models" },
  { name: "Research", url: "/research" },
  { name: "Gallery", url: "/gallery" },
  { name: "Blogs", url: "https://nyx.today/blog" },

  { name: "Help Center", url: "/help" },
];

export const FOOTER_LEGALS: Array<FooterType> = [
  { name: "Terms of use", url: "/terms-of-use" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Risk Disclosure", url: "/risk-disclosure" },
  { name: "Data Security", url: "/data-security" },
];
