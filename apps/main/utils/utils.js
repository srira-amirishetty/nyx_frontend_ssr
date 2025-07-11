/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const art_icon = IMAGE_URL + "/assets/images/artists/art_icon.png";
const P1 = IMAGE_URL + "/assets/images/artists/p1.png";

const i1 = IMAGE_URL + "/assets/images/artists/i1.png";
const i2 = IMAGE_URL + "/assets/images/artists/i1.png";
const i3 = IMAGE_URL + "/assets/images/artists/i1.png";
const i4 = IMAGE_URL + "/assets/images/artists/i1.png";

const token = IMAGE_URL + "/assets/images/icons/token.svg";
const offer = IMAGE_URL + "/assets/images/icons/offer.svg";
const money = IMAGE_URL + "/assets/images/icons/money.png";
const refer = IMAGE_URL + "/assets/images/icons/refer.svg";

const AI = IMAGE_URL + "/assets/images/lyrics/success.svg";
const Probabilty = IMAGE_URL + "/assets/images/lyrics/probabilty.svg";

/**
 * BASE URLS
 * vercel prod: https://nyx-api.vercel.app
 * local: http://localhost:3000
 * vercel prod: https://api.nyx.today
 * vercel dev: https://nyx-backend-dev.vercel.app
 * aws prod: https://newapi.nyx.today
 * aws dev: https://newapi-dev.nyx.today
 */
export const BASEURL =
  process.env.NEXT_PUBLIC_API_URL || "https://newapi.nyx.today/v1";

const left = IMAGE_URL + "/assets/images/left.svg";
const right = IMAGE_URL + "/assets/images/right.svg";

const ilatest = IMAGE_URL + "/assets/images/save.svg";
const ilatest2 = IMAGE_URL + "/assets/images/font.svg";
const ilatest3 = IMAGE_URL + "/assets/images/help.svg";

const i5 = IMAGE_URL + "/assets/images/lyrics/toggle.svg";
const i6 = IMAGE_URL + "/assets/images/lyrics/untoggle.svg";
const i7 = IMAGE_URL + "/assets/images/lyrics/format_bold.svg";
const i8 = IMAGE_URL + "/assets/images/lyrics/format_color.svg";
const i9 = IMAGE_URL + "/assets/images/lyrics/format_italic.svg";
const i10 = IMAGE_URL + "/assets/images/lyrics/text_decrease.svg";
const i11 = IMAGE_URL + "/assets/images/lyrics/text_increase.svg";
const i13 = IMAGE_URL + "/assets/images/lyrics/filter.svg";
const i14 = IMAGE_URL + "/assets/images/lyrics/save.svg";
const i15 = IMAGE_URL + "/assets/images/lyrics/edit.svg";
const i16 = IMAGE_URL + "/assets/images/lyrics/delete.svg";
const i17 = IMAGE_URL + "/assets/images/lyrics/download.svg";
// export const BASEURL = "https://nyx-api.vercel.app"
// export const BASEURL = "https://nyx-api.onrender.com"
// export const BASEURL = "https://nyx-api.vercel.app";

export const AUTHSTATE = true;

export const TABS_DATA_PROFILE_ARTISTS = [
  { name: "Listings", route: false },
  { name: "Shares", route: false },
  { name: "ShareRequests", route: false },
  { name: "Wallet", route: false },
  // { name: "Settings", route: false },
];

export const TABS_DATA_PROFILE_USER = [
  { name: "Portfolio", route: false },
  { name: "Shares", route: false },
  { name: "Wallet", route: false },
  { name: "Leaderboard", route: false },
  // { name: "Settings", route: false }
];

export const LINKS = [
  { key: 0, route: "https://twitter.com/Nyx_today" },
  { key: 1, route: "https://www.instagram.com/nyx.today/" },
  { key: 2, route: "https://www.linkedin.com/company/nyx-today/" },
  { key: 3, route: "https://www.facebook.com/NYX.today" },
];

export const LOGIN_TABS = [
  { name: "user", route: true },
  { name: "artist", route: true },
];

export const ARTIST_ONBOARDING_TABS = [
  { name: "Basic Information" },
  { name: "Platform Details" },
];

export const ASSETS_TABS = [{ name: "Private" }, { name: "Shared with me" }];

export const CONTEXT_TABS = [
  { name: "Description" },
  { name: "Image Style" },
  { name: "Camera Setting" },
];

export const PLAN_TABS = [
  { name: "Monthly", offer: "", displayName: "Monthly" },
  { name: "Yearly", offer: "-20% Off", displayName: "Annually" },
];

export const Profile_TABS = [
  { name: "Profile", url: "/profile" },
  { name: "Workspaces", url: "/workspaces" },
  { name: "Plans", url: "/plans" },
  { name: "Billings", url: "/billing" },
  { name: "Credit History", url: "/credithistory" },
  { name: "User Management", url: "/usermanagement" },
];

export const MODEL_TABS = [
  { name: "All" },
  { name: "Text to Image" },
  { name: "Image to Image" },
  { name: "Prediction" },
  // { name: "Utility Functions" },
  // { name: "Controlnets" },
];

export const GALLERY_TABS = [
  { name: "All" },
  { name: "Text To Image" },
  { name: "Image To Image" },
  { name: "Image To Video" },
  { name: "Script To Video" },
  // { name: "Lyrics" },
  // { name: "Song" },
];

export const ASSET_MENU = [
  { name: "All" },
  { name: "Images" },
  { name: "Videos" },
  { name: "Music" },
];
export const STABLE_DIFFUSION_TABS = [
  { name: "Playground" },
  { name: "API" },
  { name: "Pricing" },
];

export const BRANDING_HEADLINE = [
  { name: "Title" },
  { name: "Sub headline" },
  { name: "CTA" },
  { name: "Logo" },
];
export const WRITING_STYLES = [
  { name: "Casual" },
  { name: "Dramatic" },
  { name: "Neutral" },
  { name: "Informative" },
  { name: "Funny" },
  { name: "Persuasive" },
  { name: "Engaging" },
  { name: "Professional" },
];

export const ASPECT_RATIO = [
  { name: "3:2" },
  { name: "4:3" },
  { name: "5:4" },
  { name: "16:10" },
  { name: "16:9" },
  { name: "9:16" },
  { name: "1.85:1" },
];
export const CREATIVES_TABS = [
  { name: "Add Logo" },
  { name: "Add Brand Plate" },
];

export const CREATIVES_TABS_IMAGE = [
  { name: "Essential" },
  { name: "Advanced" },
];

export const PROMPT_TYPE = [
  { name: "Manual Prompt" },
  { name: "Auto Generate" },
];

export const INPAINTING_TABS_GENAI = [{ name: "Draw" }, { name: "Erase" }];

export const VIDEO_CREATIVES_TABS = [
  { name: "AI Prompt" },
  { name: "Your Script" },
];
export const Elements_TABS_Emojis = [
  { name: "Icons" },
  { name: "Emojis" },
  { name: "Shapes" },
];

export const VIDEO_CONTENT = [
  { name: "Video Structure" },
  // { name: "Video Size" },
];
export const VIDEO_SETTINGS_CREATIVES_TABS = [
  { name: "Pace" },
  { name: "Voice" },
  { name: "Captions" },
];

export const VIDEO_SLATE = [{ name: "Start Slate" }, { name: "End Slate" }];
export const SUPPORT_TABS = [{ name: "New Ticket" }, { name: "My Tickets" }];

export const UPDATE_PASSWORD = [
  { name: "Update Password" },
  { name: "Verify OTP" },
];

export const IMAGE_BACKDROPS_TABS = [
  { name: "Prompt" },
  { name: "Reference Image" },
  { name: "Auto Generate" },
];

export const VIRTUAL_TRYON_BACKGROUND = [
  { name: "Background Color" },
  { name: "Reference Image" },
  { name: "Prompt" },
];

export const MODELS_POPUP_TRYON = [
  { name: "AI Generated" },
  { name: "Professionals" },
  { name: "Upload your Own" },
];

export const UPDATE_PHONE = [{ name: "Update Phone" }, { name: "Verify OTP" }];

export const UPDATE_PREFERENCE = [{ name: "Music" }, { name: "Videos" }];

export const MEDIA_TABS_AD_MANAGER = [
  {
    name: "Google",
    logo: `
     
      
      <svg width="17" height="17" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6046 0.00147559C12.3634 -0.00413183 12.1208 0.00607936 11.8793 0.0349044C11.2346 0.111884 10.5964 0.312535 10.0016 0.648561C9.21962 1.09032 8.67903 1.74714 8.25572 2.46565L8.18247 2.42267L0.681262 14.6481L0.715447 14.6672C0.284581 15.4324 0 16.2578 0 17.1098C0 18.2984 0.398415 19.5034 1.25264 20.4432C2.10687 21.3829 3.43805 22 5.0008 22C6.56355 22 7.89474 21.3829 8.74896 20.4432C8.99082 20.1771 9.11598 19.8548 9.28616 19.5525L9.32034 19.5716L12.502 14.3878L15.6715 19.5549C15.673 19.5575 15.6748 19.5595 15.6763 19.5621C17.0515 21.8829 20.1269 22.6884 22.5036 21.3458C24.8831 20.0032 25.7095 16.9914 24.335 14.6648L24.3276 14.6552L16.8338 2.43939C16.8323 2.43682 16.8304 2.43478 16.8289 2.43223C15.9267 0.909692 14.2929 0.040727 12.6046 0.00147559ZM12.6803 2.43939C12.84 2.45012 12.9977 2.47547 13.1515 2.5158C13.767 2.67711 14.3192 3.07099 14.6679 3.66193L14.6728 3.67148L14.6777 3.67864L22.1691 15.8873C22.8674 17.0693 22.462 18.5459 21.2534 19.2278C20.0446 19.9107 18.5347 19.5143 17.8373 18.3324L17.8325 18.3228L10.3361 6.107C9.63769 4.92475 10.0422 3.44987 11.2518 2.76651C11.7051 2.51044 12.2011 2.4072 12.6803 2.43939ZM8.14096 7.24119C8.15681 7.26929 8.15378 7.30164 8.17026 7.32954L8.17758 7.33909L11.0443 12.012L9.34965 14.7746C9.16849 14.4322 9.01985 14.0745 8.74896 13.7765C7.90982 12.8534 6.60351 12.2553 5.0765 12.234L8.14096 7.24119ZM5.0008 14.6648C5.93845 14.6648 6.48257 14.9646 6.87855 15.4002C7.27452 15.8358 7.50121 16.4646 7.50121 17.1098C7.50121 17.7551 7.27452 18.3839 6.87855 18.8195C6.48257 19.2551 5.93845 19.5549 5.0008 19.5549C4.06315 19.5549 3.51903 19.2551 3.12306 18.8195C2.72709 18.3839 2.5004 17.7551 2.5004 17.1098C2.5004 16.4818 2.7294 15.8795 3.10597 15.4456L3.13771 15.3954C3.53293 14.9652 4.0703 14.6648 5.0008 14.6648Z" fill="white"/>
</svg>
`,
  },
  {
    name: "Instagram",
    logo: `
<svg width="17" height="17" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.4321 0.396484C2.63069 0.396484 0.351562 2.67561 0.351562 5.47702V13.6059C0.351562 16.4073 2.63069 18.6864 5.4321 18.6864H13.561C16.3624 18.6864 18.6415 16.4073 18.6415 13.6059V5.47702C18.6415 2.67561 16.3624 0.396484 13.561 0.396484H5.4321ZM5.4321 2.4287H13.561C15.2416 2.4287 16.6093 3.79638 16.6093 5.47702V13.6059C16.6093 15.2865 15.2416 16.6542 13.561 16.6542H5.4321C3.75146 16.6542 2.38378 15.2865 2.38378 13.6059V5.47702C2.38378 3.79638 3.75146 2.4287 5.4321 2.4287ZM14.5771 3.44481C14.3076 3.44481 14.0491 3.55186 13.8586 3.74242C13.668 3.93297 13.561 4.19142 13.561 4.46091C13.561 4.7304 13.668 4.98885 13.8586 5.17941C14.0491 5.36997 14.3076 5.47702 14.5771 5.47702C14.8466 5.47702 15.105 5.36997 15.2956 5.17941C15.4861 4.98885 15.5932 4.7304 15.5932 4.46091C15.5932 4.19142 15.4861 3.93297 15.2956 3.74242C15.105 3.55186 14.8466 3.44481 14.5771 3.44481ZM9.49653 4.46091C6.69512 4.46091 4.41599 6.74004 4.41599 9.54145C4.41599 12.3429 6.69512 14.622 9.49653 14.622C12.2979 14.622 14.5771 12.3429 14.5771 9.54145C14.5771 6.74004 12.2979 4.46091 9.49653 4.46091ZM9.49653 6.49313C11.1772 6.49313 12.5448 7.86081 12.5448 9.54145C12.5448 11.2221 11.1772 12.5898 9.49653 12.5898C7.81589 12.5898 6.44821 11.2221 6.44821 9.54145C6.44821 7.86081 7.81589 6.49313 9.49653 6.49313Z" fill="currentColor"/>
</svg>
`,
  },
  {
    name: "LinkedIn",
    logo: `
<svg width="17" height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7333 0.880859C16.2438 0.880859 16.7333 1.08364 17.0943 1.44458C17.4552 1.80553 17.658 2.29508 17.658 2.80553V16.2782C17.658 16.7887 17.4552 17.2782 17.0943 17.6392C16.7333 18.0001 16.2438 18.2029 15.7333 18.2029H2.26061C1.75015 18.2029 1.26061 18.0001 0.899661 17.6392C0.538715 17.2782 0.335938 16.7887 0.335938 16.2782V2.80553C0.335938 2.29508 0.538715 1.80553 0.899661 1.44458C1.26061 1.08364 1.75015 0.880859 2.26061 0.880859H15.7333ZM15.2521 15.7971V10.6967C15.2521 9.86465 14.9216 9.06668 14.3333 8.47834C13.7449 7.89 12.947 7.55947 12.1149 7.55947C11.2969 7.55947 10.3442 8.05989 9.88231 8.81051V7.74232H7.19739V15.7971H9.88231V11.0528C9.88231 10.3118 10.479 9.70548 11.22 9.70548C11.5773 9.70548 11.92 9.84742 12.1726 10.1001C12.4253 10.3527 12.5672 10.6954 12.5672 11.0528V15.7971H15.2521ZM4.0698 6.23145C4.49858 6.23145 4.9098 6.06111 5.213 5.75792C5.51619 5.45473 5.68653 5.04351 5.68653 4.61472C5.68653 3.71975 4.96477 2.98838 4.0698 2.98838C3.63847 2.98838 3.2248 3.15972 2.9198 3.46472C2.6148 3.76972 2.44345 4.18339 2.44345 4.61472C2.44345 5.5097 3.17483 6.23145 4.0698 6.23145ZM5.40745 15.7971V7.74232H2.74178V15.7971H5.40745Z" fill="currentColor"/>
</svg>
`,
  },
  {
    name: "Facebook",
    logo: `
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.8307 8.54036C16.8307 3.94036 13.0974 0.207031 8.4974 0.207031C3.8974 0.207031 0.164062 3.94036 0.164062 8.54036C0.164062 12.5737 3.03073 15.932 6.83073 16.707V11.0404H5.16406V8.54036H6.83073V6.45703C6.83073 4.8487 8.13906 3.54036 9.7474 3.54036H11.8307V6.04036H10.1641C9.70573 6.04036 9.33073 6.41536 9.33073 6.8737V8.54036H11.8307V11.0404H9.33073V16.832C13.5391 16.4154 16.8307 12.8654 16.8307 8.54036Z" fill="currentColor"/>
    </svg>

`,
  },
  {
    name: "Googleads",
    logo: `
    <svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.56575 0.0459277C8.40499 0.0421054 8.24328 0.0490658 8.08236 0.0687142C7.65261 0.121187 7.22721 0.257959 6.83073 0.487008C6.30949 0.78813 5.94915 1.23584 5.66699 1.72562L5.61816 1.69632L0.618164 10.0297L0.640951 10.0427C0.353753 10.5643 0.164062 11.1269 0.164062 11.7077C0.164062 12.5179 0.42963 13.3393 0.999023 13.9798C1.56842 14.6204 2.45573 15.041 3.4974 15.041C4.53906 15.041 5.42637 14.6204 5.99577 13.9798C6.15698 13.7985 6.24041 13.5788 6.35384 13.3728L6.37663 13.3858L8.4974 9.85224L10.61 13.3744C10.611 13.3761 10.6123 13.3775 10.6133 13.3793C11.5299 14.9613 13.5799 15.5103 15.1641 14.5951C16.7501 13.6799 17.301 11.627 16.3848 10.041L16.3799 10.0345L11.3848 1.70771C11.3838 1.70596 11.3825 1.70457 11.3815 1.70283C10.7802 0.665006 9.69111 0.0726831 8.56575 0.0459277ZM8.61621 1.70771C8.72268 1.71503 8.82777 1.73231 8.93034 1.75979C9.3406 1.86975 9.70866 2.13824 9.94108 2.54104L9.94434 2.54756L9.94759 2.55244L14.9411 10.8744C15.4065 11.6801 15.1363 12.6866 14.3307 13.1514C13.525 13.6169 12.5186 13.3467 12.0537 12.541L12.0505 12.5345L7.05371 4.20771C6.58816 3.40184 6.85776 2.3965 7.66406 1.93069C7.96621 1.75614 8.2968 1.68577 8.61621 1.70771ZM5.59049 4.98082C5.60106 4.99997 5.59904 5.02203 5.61003 5.04105L5.61491 5.04756L7.52572 8.23278L6.39616 10.1159C6.27541 9.88251 6.17633 9.63871 5.99577 9.43558C5.43643 8.80632 4.5657 8.39867 3.54785 8.38414L5.59049 4.98082ZM3.4974 10.041C4.1224 10.041 4.48508 10.2454 4.74902 10.5423C5.01296 10.8393 5.16406 11.2679 5.16406 11.7077C5.16406 12.1475 5.01296 12.5761 4.74902 12.8731C4.48508 13.17 4.1224 13.3744 3.4974 13.3744C2.8724 13.3744 2.50971 13.17 2.24577 12.8731C1.98183 12.5761 1.83073 12.1475 1.83073 11.7077C1.83073 11.2796 1.98337 10.869 2.23438 10.5733L2.25553 10.5391C2.51897 10.2458 2.87716 10.041 3.4974 10.041Z" fill="currentColor"/>
    </svg>

`,
  },
  {
    name: "Snapchat",
    logo: `
    <svg
        width="25"
        height="25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.879 2a6 6 0 0 0-6 6v1.875l-.9-.675a1 1 0 1 0-1.2 1.6l1.865 1.4c-.444 1.168-1.527 2.39-3.28 3.443a1.01 1.01 0 0 0-.318 1.412C4.164 18.732 5.938 20 7.878 20c1.784 0 3.008 2 5 2 2.011 0 3.21-2 5-2 1.94 0 3.715-1.268 4.832-2.945a1.011 1.011 0 0 0-.318-1.412c-1.752-1.053-2.835-2.275-3.28-3.443l1.867-1.4a1 1 0 1 0-1.2-1.6l-.9.675V8a6 6 0 0 0-6-6Z"
          fill="currentColor"
        />
      </svg>
`,
  },
  {
    name: "Twitter",
    logo: `
    <svg
        width="25"
        height="25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m3.242 3 7.096 10.14L3.615 21h2.64l5.265-6.17L15.835 21h6.91l-7.422-10.620L21.615 3h-2.6l-4.869 5.688L10.175 3H3.242Zm3.84 2h2.049l9.777 14h-2.031L7.082 5Z"
          fill="currentColor"
        />
      </svg>`,
  },
];

export const ROUTES = [
  "/addtoken",
  "/profile/TokenRequests",
  "/profile",
  "/auth",
  "/upload",
  "/support",
  "/notifications",
  "/distribute",
  "/share",
  "/description",
  "/sell",
  "/refer",
  "/buy",
  "/marketplace",
  "/cart",
  "/profile/Listings",
  "/profile/Tokens",
  "/profile/Wallet",
  "/profile/Settings",
  "/profile/Portfolio",
  "/profile/Tokens",
  "/profile/Wallet",
  "/profile/Leaderboard",
  "/profile/Settings",
  "/update-details",
  "/notifications",
  "/listing",
  "/success",
  "/apphome/register",
  "/apphome/register",
  "/apphome/login",
  "/apphome/login",
  "/experts",
];

export const USER_MENU = [
  { name: "Profile", route: "/profile/Portfolio" },
  { name: "Settings", route: "/profile/Settings" },
  { name: "Distribute", route: "/distribute" },
  { name: "Refer & Earn", route: "/refer" },
  { name: "Notifications", route: "/notifications" },
  { name: "Experts", route: "/experts" },
  { name: "Support", route: "/support" },
  { name: "Logout", route: "/apphome/login" },
];

export const ARTIST_MENU = [
  { name: "Profile", route: "/profile/Listings" },
  { name: "Settings", route: "/profile/Settings" },
  { name: "Distribute", route: "/distribute" },
  { name: "Add Shares", route: "/upload" },
  { name: "Refer & Earn", route: "/refer" },
  { name: "Notifications", route: "/notifications" },
  { name: "Support", route: "/support" },
  { name: "Experts", route: "/experts" },
  { name: "Logout", route: "/apphome/login" },
];

export const REGISTERWITHOTP = BASEURL + "/otp/get-otp";

export const VERIFY_OTP = "/verify_phone_OTP?";

export const LOGIN_USER = "/signin-phone-password";

export const LOGIN_OTP = "/signin-phone-otp";

export const GUEST_LOGIN = "/signup-guest-otp";

export const USER_PROFILE = "/get-profile";

export const VERIFY_USER = BASEURL + "/verifyToken";

export const _USER_SIGNUP_PHONE = "/signup-phone-otp";

export const CREATE_TICKET = "/support/create-ticket";

export const EDIT_ARTISTS = "/artists/edit-profile";

export const EDIT_USERS = "/users/edit-profile";

export const REFERRALS = "/get-referrals";

export const ADD_MONEY_PAYMENT_INTENT = "/order/add-money-payment-intent";

export const ADD_TO_WALLET = "/order/add-to-wallet";

export const REFERRAL_LEADERBOARD = "/get-referral-leaderboard";

export const WALLETS = "/get-wallet-details";

export const TOKENS = "/tokens/get-tokens";

export const SHARED_TOKEN = "/tokens/get-shared-token";

export const GET_USER_TOKEN = "get-portfolio";

export const GET_SUPPORTS = "/support/get-support-ticket";

export const ADD_TOKENS = "/tokens/launch-request";

export const GET_LAUNCH_REQUESTS = "/tokens/get-launch-request";

export const ARTIST_GET_LISTINGS = "/get-listing-porfolio";

export const REMOVE_ITEM_CART = "/order/remove-item-cart";

export const GET_TOKEN_TIER_QUANTITY = "/tokens/get-token-quantity";

export const GET_PRIMARY_LISTINGS = "/tokens/get-primary-listing";

export const GET_COUPON_CODES = "/order/get-coupon-codes";

export const ADD_TO_CART = "/order/add-to-cart";

export const UPDATE_CART = "/order/update-cart";

export const GET_SHOPPING_CART = "/order/get-shopping-cart";

export const PROCESS_CHECKOUT = "/order/process-checkout";

export const VALIDATE_PAYMENT = "/order/validate-payment";

export const ORDER_PAYMENT = "/order/complete-order-payment";

export const ORDER_PAYMENT_INTENT = "/order/order-payment-intent";

export const CONTACT_US = "/support/contact-us";

export const EXPERTS = "/experts";

export const WITHDRAWMONEY = "/order/withdraw-from-wallet";

export const SUBSCRIBE = "/notification/subscribe";

export const SET_USER_TYPE = (type) => {
  return type === "user" ? "/users" : "/artists";
};

export const TRANSACTION_TYPES = [
  {
    type: "COIN_CREDIT",
    coin_flag: true,
    rupee_flag: false,
    icon: "+",
  },
  {
    type: "COIN_DEBIT",
    coin_flag: true,
    rupee_flag: false,
    icon: "-",
  },
  {
    type: "INR_CREDIT",
    coin_flag: false,
    rupee_flag: true,
    icon: "+",
  },
  {
    type: "INR_DEBIT",
    coin_flag: false,
    rupee_flag: true,
    icon: "-",
  },
];

export const REASON_TRANSACTION_TYPE = [
  {
    type: "REFERRER",
    image_url: refer,
  },
  {
    type: "REFERRED",
    image_url: refer,
  },
  {
    type: "TOKEN_PURCHASE",
    image_url: token,
  },
  {
    type: "TOKEN_SELL",
    image_url: token,
  },
  {
    type: "CASHBACK",
    image_url: money,
  },
  {
    type: "REFUND",
    image_url: money,
  },
  {
    type: "DEPOSIT",
    image_url: money,
  },
  {
    type: "WITHDRAWAL",
    image_url: money,
  },
  {
    type: "OFFER",
    image_url: offer,
  },
  {
    type: "OTHERS",
    image_url: offer,
  },
];

export const SET_TOAST = (color, flag, data) => {
  return {
    flag: flag,
    color: color,
    message: data,
  };
};

export const FILTER_HEADERS = [
  "type",
  "availability",
  "category",
  "language",
  "artist",
  "genre",
];

export const Types = {
  login_user: { type: "signin", userType: "user" },
  login_guest_user: { type: "guestlogin", userType: "user" },
  login_artist: { type: "signin", userType: "ARTIST" },
  register_user: { type: "signup", userType: "user" },
  register_artist: { type: "signup", userType: "ARTIST" },
  reset_password_user: { type: "resetpassword", userType: "user" },
  reset_password_artist: { type: "resetpassword", userType: "ARTIST" },
  phone_update_user: { type: "phoneupdate", userType: "user" },
  phone_update_artist: { type: "phoneupdate", userType: "ARTIST" },
};

export const verifyJWTToken = (token) => {
  if (!token) {
    return {
      data: null,
    };
  }

  const [_, payloadEncoded] = token.split(".");
  try {
    const payload = JSON.parse(window.atob(payloadEncoded));
    if (Object.keys(payload).length > 0 && Date.now() <= payload?.exp * 1000) {
      return { data: payload };
    } else {
      return {
        data: null,
      };
    }
  } catch (error) {
    return {
      data: null,
    };
  }
};

export const decodeToken = (token) => {
  const [_, payloadEncoded] = token.split(".");
  const payload = JSON.parse(window.atob(payloadEncoded));
  return { data: payload };
};

export const INPUT_DATA_FOR_STREAMING = {
  placeholder: "Add Streaming platform URL",
  data: [
    {
      value: "",
      radio_selected: "Youtube",
      options: [{ name: "Youtube" }, { name: "JioSaavn" }, { name: "Spotify" }],
    },
  ],
};

export const INPUT_DATA_FOR_STREAMING_MEDIA = {
  placeholder: "Add Social Media Platform URL",
  data: [
    {
      value: "",
      radio_selected: "Facebook",
      options: [
        { name: "Facebook" },
        { name: "Instagram" },
        { name: "Twitter" },
      ],
    },
  ],
};

export const OPTION_CATEGORY = {
  option: [
    { name: "How much of streaming rights do you own?", hidden: true },
    { name: "Option 2", hidden: false },
    { name: "option 3", hidden: false },
  ],
  background: "bg-transparent",
  width: 36.5,
  textColor: "text-blue",
};

export const OPTION_CATEGORY_V1 = {
  option: [
    {
      name: "How much of streaming rights ownership do you want to sell",
      hidden: true,
    },
    { name: "Option 2", hidden: false },
    { name: "option 3", hidden: false },
  ],
  background: "bg-transparent",
  width: 36.5,
  textColor: "text-blue",
};

export const SELECT_OPTION_CATEGORY = {
  option: [
    { name: "Category", hidden: true },
    { name: "Singer", hidden: false },
    { name: "Lyrics writer", hidden: false },
    { name: "Music Composer", hidden: false },
    { name: "Production house", hidden: false },
    { name: "Lyricist", hidden: false },
    { name: "Agent", hidden: false },
    { name: "Script writer", hidden: false },
    { name: "Model/Actors", hidden: false },
    { name: "Composer", hidden: false },
    { name: "Director", hidden: false },
    { name: "Actor", hidden: false },
    { name: "Others", hidden: false },
  ],
  background: "bg-transparent",
  width: 20,
  textColor: "text-blue",
};

export const SELECT_OPTION_CATEGORY2 = {
  option: [
    { name: "Category", hidden: true },
    { name: "Song(Audio only)", hidden: false },
    { name: "Music video", hidden: false },
    { name: "Short film", hidden: false },
    { name: "Regional movie", hidden: false },
    { name: "Series", hidden: false },
    { name: "Others", hidden: false },
  ],
  background: "bg-transparent",
  width: 20,
  textColor: "text-blue",
};

export const SELECT_TITLE = {
  option: [
    { name: "Title", hidden: true },
    { name: "Option 2", hidden: false },
    { name: "option 3", hidden: false },
  ],
  background: "bg-transparent",
  width: 12,
  textColor: "text-blue",
};

export const options = {
  responsive: true,
  aspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white", // specify the color of the x axis label
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
    },
    y: {
      ticks: {
        display: false,
        color: "white", // specify the color of the y axis label
        // callback: function (value, index, values) {
        //   if (index === 0 || index === values.length - 1) {
        //     return value;
        //   }
        //   return "";
        // },
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
    },
  },
};

export const options2 = {
  responsive: true,
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "DD MMM YYYY",
          },
        },
      },
    ],
  },
};

const labels = ["W1", "W2", "W3", "W4", "W5", "W6"];

export const DATA_WALLET = {
  labels,
  datasets: [
    {
      label: "Wallet Balance",
      data: ["1500", "845", "845", "195", "195", "195"],
      borderColor: "rgba(226, 105, 113, 1)",
      backgroundColor: "rgba(226, 105, 113, 1)",
    },
    {
      label: "Coin Balance",
      data: ["0", "327", "327", "255", "255", "255"],
      borderColor: "rgba(0, 216, 216, 1)",
      backgroundColor: "rgba(0, 216, 216, 1)",
    },
  ],
};
const labels2 = ["19-Mar", "26-Mar", "09-Apr", "16-Apr", "23-Apr"];
export const STREAMING_TRENDS = {
  labels2,
  datasets: [
    {
      label: "",
      data: [350, 712, 1081, 1487, 1848, 2230],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const optionsStreamToken = {
  responsive: true,
  aspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    x: {
      ticks: {
        color: "white", // specify the color of the x axis label
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
      title: {
        display: true,
        text: "",
        color: "white", // specify the color of the x axis title
      },
    },
    y: {
      ticks: {
        display: true,
        color: "white", // specify the color of the y axis label
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return "";
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
      title: {
        display: true,
        text: "",
        color: "white", // specify the color of the y axis title
      },
    },
  },
};

export const graphData = {
  uploadId: 392,
  parameters: {
    main: {
      key: {
        tempo: "0.82",
        song_name: "Notification Notification.mp3",
        song_duration: "0.92",
        lyrics_clarity: "0.85",
        sound_loudness: "0.95",
        energetic_vibes: "0.96",
        hit_probability: 0.2830357263815697,
        emotional_appeal: "0.87",
        flop_probability: 0.6792590315620239,
        acoustic_presence: "0.12",
      },
      group: {
        mood: {
          danceability: "96",
          valence: "28",
          energy: "85",
        },
        properties: {
          loudness: "95",
          speechiness: "82",
          instrumentalness: "85",
        },
        context: {
          liveness: "85",
          acousticness: "95",
          tempo: "95",
        },
      },
    },
    original: {
      key: {
        tempo: "0.82",
        song_name: "Notification Notification.mp3",
        song_duration: "0.84",
        lyrics_clarity: "0.85",
        sound_loudness: "0.95",
        energetic_vibes: "0.96",
        hit_probability: 0.2830357263815697,
        emotional_appeal: "0.98",
        flop_probability: 0.6792590315620239,
        acoustic_presence: "0.12",
      },
      group: {
        mood: {
          danceability: "96",
          valence: "28",
          energy: "85",
        },
        properties: {
          loudness: "95",
          peechiness: "82",
          instrumentalness: "85",
        },
        context: {
          liveness: "70",
          acousticness: "89",
          tempo: "65",
        },
      },
    },
    reference: {
      key: {
        tempo: "0.82",
        song_name: "Notification Notification.mp3",
        song_duration: "0.84",
        lyrics_clarity: "850",
        sound_loudness: "0.95",
        energetic_vibes: "0.96",
        hit_probability: 0.2830357263815697,
        emotional_appeal: "980",
        flop_probability: 0.6792590315620239,
        acoustic_presence: "0.12",
      },
      group: {
        mood: {
          danceability: "97",
          valence: "28",
          energy: "85",
        },
        properties: {
          loudness: "97",
          peechiness: "78",
          instrumentalness: "95",
        },
        context: {
          liveness: "12",
          acousticness: "50",
          tempo: "98",
        },
      },
    },
  },
};

export const radarData1 = {
  labels: [
    "Accoustic Presence",
    "Danceability Factor",
    "Emotional Appeal",
    "Energetic Vibes",
    "Instrumental Elements",
    "Live Performance Energy",
    "Lyrics Clarity",
    "Song Duration",
    "Sound Loudness",
    "Tempo (Beats per minute)",
  ],
  datasets: [
    {
      label: "Dataset1",
      data: [65, 59, 90, 75, 56, 55, 45, 30, 77, 10],
      fill: true,
      backgroundColor: "rgba(94, 50, 255, 0.2)",
      borderColor: "rgba(94, 50, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Dataset2",
      data: [80, 48, 40, 69, 96, 47, 100, 87, 37, 47],
      fill: true,
      backgroundColor: "rgba(136, 254, 255, 0.5)",
      borderColor: "rgba(136, 254, 255, 1)",
      borderWidth: 1,
    },
  ],
};

export const radarData2 = {
  labels: ["Accoustic Presence", "Danceability Factor", "Emotional Appeal"],
  datasets: [
    {
      label: "Dataset1",
      data: [90, 75, 56],
      fill: true,
      backgroundColor: "rgba(94, 50, 255, 0.2)",
      borderColor: "rgba(94, 50, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Dataset2",
      data: [80, 10, 87],
      fill: true,
      backgroundColor: "rgba(136, 254, 255, 0.5)",
      borderColor: "rgba(136, 254, 255, 1)",
      borderWidth: 1,
    },
  ],
};

export const radarData3 = {
  labels: ["Song Loundness", "Live Performance", "Energetic Vibes", ,],
  datasets: [
    {
      label: "Dataset1",
      data: [55, 45, 30],
      fill: true,
      backgroundColor: "rgba(94, 50, 255, 0.2)",
      borderColor: "rgba(94, 50, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Dataset2",
      data: [60, 37, 47],
      fill: true,
      backgroundColor: "rgba(136, 254, 255, 0.5)",
      borderColor: "rgba(136, 254, 255, 1)",
      borderWidth: 1,
    },
  ],
};

export const radarData4 = {
  labels: [
    "Sound Loudness",
    "Tempo ",
    "Instrumental Elements",
    "Lyrics Clarity",
  ],
  datasets: [
    {
      label: "Dataset1",
      data: [65, 59, 90, 75],
      fill: true,
      backgroundColor: "rgba(94, 50, 255, 0.2)",
      borderColor: "rgba(94, 50, 255, 1)",
      borderWidth: 1,
    },
    {
      label: "Dataset2",
      data: [80, 48, 40, 69],
      fill: true,
      backgroundColor: "rgba(136, 254, 255, 0.5)",
      borderColor: "rgba(136, 254, 255, 1)",
      borderWidth: 1,
    },
  ],
};

export const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      pointLabels: {
        color: "white",
        font: {
          size: 14,
        },
      },
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        display: false,
        fontColor: "green",
      },
      angleLines: {
        display: true,
        color: "yellow",
      },
      grid: {
        color: "white",
        circular: true,
      },
    },
    // pointLabels: {
    //   callback: (label) => {
    //     return label.split('').join('\n')
    //   }
    // },
    fontSize: 14,
  },
  labels: {
    fontColor: "green",
  },
};

export const optionsDescriptions = {
  plugins: {
    legend: {
      position: "top",
      display: true,
      align: "center",
    },
  },
  responsive: true,
  aspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
    },
    y: {
      ticks: {
        display: true,
        color: "white",
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return "";
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
    },
  },
};

const labels3 = ["19-Mar", "26-Mar", "09-Apr", "16-Apr", "23-Apr", "30-Apr"];

export const STREAMING_TRENDS_DESCRIPTION = [
  {
    name: "Obsessed",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [780, 836, 890, 953, 997, 1054],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [350, 712, 1081, 1487, 1848, 2230],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },

  {
    name: "Our Lives",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [867, 910, 959, 975, 1043, 1084],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [310, 670, 1081, 1038, 1368, 1785],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Last Love",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [757, 789, 853, 910, 961, 1017],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [276, 594, 952, 1343, 1684, 2022],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Under 24 festival",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [642, 683, 720, 771, 796, 816],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [350, 712, 1081, 1487, 1848, 2230],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Song of Souls",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [642, 683, 720, 771, 796, 816],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [350, 712, 1081, 1487, 1848, 2230],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "1920 Records",
    labels: labels3,
    datasets: [
      {
        label: "Streams   (in '000s)",
        data: [642, 683, 720, 771, 796, 816],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Royalty payout (in Rs)",
        data: [350, 712, 1081, 1487, 1848, 2230],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
];

export const TOKEN_VALUE_USER = [
  {
    name: "Neha",
    labels: labels3,
    datasets: [
      {
        label: "Share Value (in Rs)",
        data: [0, 1647, 1746, 1849, 1928, 2040, 2138],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Gain %",
        data: [-100, -4, 2, 8, 12, 19, 25],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Sumit",
    labels: labels3,
    datasets: [
      {
        label: "Share Value (in Rs)",
        data: [688, 1399, 1472, 1574, 1681, 1757, 1833],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Gain %",
        data: [-45, 12, 18, 26, 34, 41, 47],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
];

export const TOKEN_VALUE_ARTIST = [
  {
    name: "Neha",
    labels: labels3,
    datasets: [
      {
        label: "Share Value (in Rs)",
        data: [0, 1647, 1746, 1849, 1928, 2040, 2138],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Gain %",
        data: [0, -4, 2, 8, 12, 19, 25],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "flappy",
    labels: labels3,
    datasets: [
      {
        label: "Share Value (in Rs)",
        data: [688, 1399, 1472, 1574, 1681, 1757, 1833],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Gain %",
        data: [-45, 12, 18, 26, 34, 41, 47],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
];

export const STREAMING_TRENDS_NEW = [
  {
    name: "Obsessed",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [350, 712, 1081, 1487, 1848, 2230],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },

  {
    name: "Our Lives",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [310, 670, 1038, 1368, 1785, 2135],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },
  {
    name: "Last Love",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [657, 1019, 1416, 1810, 2198, 2593],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },
  {
    name: "Under 24 festival",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [254, 594, 952, 1343, 1684, 2022],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },
  {
    name: "Song of Souls",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [254, 594, 952, 1343, 1684, 2022],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },
  {
    name: "1920 Records",
    labels: labels3,
    datasets: [
      {
        label: "Streams (in '000s)",
        data: [254, 594, 952, 1343, 1684, 2022],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
    ],
  },
];

export const TOKEN_VISITOR_SALE = [
  {
    name: "Obsessed",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [16000, 30000, 40000, 54000, 66000, 76000],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [800, 1500, 2000, 2700, 3300, 3800],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },

  {
    name: "Our Lives",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [10000, 24000, 36000, 46000, 54000, 60000],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [500, 1200, 1800, 2300, 2700, 3000],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Last Love",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [15000, 25000, 31800, 37800, 41800, 45800],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [750, 1250, 1590, 1890, 2090, 2290],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Under 24 festival",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [4000, 9000, 13900, 20380, 31720, 45220],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [200, 450, 695, 1019, 1576, 2252],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "Song of Souls",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [4000, 9000, 13900, 20380, 31720, 45220],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [200, 450, 695, 1019, 1576, 2252],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
  {
    name: "1920 Records",
    labels: labels3,
    datasets: [
      {
        label: "Page Visitors",
        data: [4000, 9000, 13900, 20380, 31720, 45220],
        borderColor: "rgba(226, 105, 113, 1)",
        backgroundColor: "rgba(226, 105, 113, 1)",
      },
      {
        label: "Share Sales",
        data: [200, 450, 695, 1019, 1576, 2252],
        borderColor: "rgba(0, 216, 216, 1)",
        backgroundColor: "rgba(0, 216, 216, 1)",
      },
    ],
  },
];

export const Doughoptions = {
  responsive: true,
  aspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
export const DOUGH_DATA = [
  {
    name: "Our Lives",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [1.2, 98],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  {
    name: "Obsessed",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [22, 78],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  {
    name: "Last Love",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [44, 66],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  {
    name: "Under 24 festival",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [20, 80],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  {
    name: "Song of Souls",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [20, 80],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  {
    name: "1920 Records",
    labels: ["No Distribution", "Distribution"],
    datasets: [
      {
        label: "Steams%",
        data: [20, 80],
        backgroundColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderColor: [
          "rgba(226, 105, 113, 1)",
          "rgba(0, 216, 216, 1)",
          "rgba(255, 203, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
];

export const Baroptions = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
  },
  responsive: true,
  aspectRatio: false,

  scales: {
    x: {
      ticks: {
        color: "white",
        callback: function (value, index, values) {
          if (index === 0 || index === values.length - 1) {
            return value;
          }
          return "";
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "white",
      },

      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

const BarLabels = ["Without distribution (₹)", "With distribution (₹)"];

export const barData = [
  {
    labels: BarLabels,
    name: "Our Lives",
    datasets: [
      {
        data: [100, 5000],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
  {
    labels: BarLabels,
    name: "Obsessed",
    datasets: [
      {
        data: [100, 2000],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
  {
    labels: BarLabels,
    name: "Last Love",
    datasets: [
      {
        data: [100, 1300],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
  {
    labels: BarLabels,
    name: "Under 24 festival",
    datasets: [
      {
        data: [100, 1500],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
  {
    labels: BarLabels,
    name: "Song of Souls",
    datasets: [
      {
        data: [100, 1500],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
  {
    labels: BarLabels,
    name: "1920 Records",
    datasets: [
      {
        data: [100, 1500],
        borderColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
        backgroundColor: ["rgba(226, 105, 113, 1)", "rgba(0, 216, 216, 1)"],
      },
    ],
  },
];

export const LANGUAGE = {
  option: [
    { name: "Language", hidden: true },
    { name: "Hindi", hidden: false },
    { name: "English", hidden: false },
    { name: "Punjabi", hidden: false },
    { name: "Telegu", hidden: false },
    { name: "Tamil", hidden: false },
    { name: "Bengali", hidden: false },
    { name: "Marathi", hidden: false },
    { name: "Assamese", hidden: false },
    { name: "Bhojpuri", hidden: false },
    { name: "Hinglish", hidden: false },
    { name: "Others", hidden: false },
  ],
  background: "bg-transparent",
  width: 20,
  textColor: "text-blue",
};

export const SELECT_GENRE = {
  option: [
    { name: "Genre", hidden: true },
    { name: "Pop", hidden: false },
    { name: "Jazz", hidden: false },
    { name: "Rock", hidden: false },
    { name: "Dance", hidden: false },
    { name: "Classical Music", hidden: false },
    { name: "Folk Music", hidden: false },
    { name: "Hiphop", hidden: false },
    { name: "Ghazal", hidden: false },
    { name: "Qawwali", hidden: false },
    { name: "Others", hidden: false },
  ],
  background: "bg-transparent",
  width: 20,
  textColor: "text-blue",
};

export const SELECT_DESIRED = {
  option: [
    { name: "Desired Time Frame to launch the share", hidden: true },
    { name: "Option 2", hidden: false },
    { name: "option 3", hidden: false },
  ],
  background: "bg-transparent",
  width: 36.5,
  textColor: "text-blue",
};

export const ARTIST_TEXTAREA = {
  background: "bg-transparent",
  width: 12.5,
  textColor: "text-blue",
  placeholder: "Description",
};

export const BUTTON_PARAMS = {
  name: "Submit",
};

export const LISTINGS = {
  Listing_Amount: "XXX,XX",
  Current_Value: "XXX,XX",
  Returns: "XXX,XX",
  Sold: "XXX,XX",
  Sale_Amount: "XXX,XX",
};

export const HEADER_TABLE = [
  "",
  "Listing Amount",
  "Current Value",
  "Returns",
  "Sold",
  "Sale Amount",
  "Share",
];
export const HEADER_TABLE_DATA = [
  {
    name: "Listing",
    Listing_Amount: "XXX",
    Current_Value: "XXX",
    Returns: "XXX",
    Sold: "XXXX",
    Sale_Amount: "XXX",
  },
  {
    name: "Listing",
    Listing_Amount: "XXX",
    Current_Value: "XXX",
    Returns: "XXX",
    Sold: "XXXX",
    Sale_Amount: "XXX",
  },
  {
    name: "Listing",
    Listing_Amount: "XXX",
    Current_Value: "XXX",
    Returns: "XXX",
    Sold: "XXXX",
    Sale_Amount: "XXX",
  },
  {
    name: "Listing",
    Listing_Amount: "XXX",
    Current_Value: "XXX",
    Returns: "XXX",
    Sold: "XXXX",
    Sale_Amount: "XXX",
  },
  {
    name: "Listing",
    Listing_Amount: "XXX",
    Current_Value: "XXX",
    Returns: "XXX",
    Sold: "XXXX",
    Sale_Amount: "XXX",
  },
];

export const TABSCLASSPROFILE =
  "flex justify-center pt-0 gap-2 md:gap-20 m-auto md:w-[90%] w-[100%]]";
export const TABSCLASSAUTH = "flex justify-center pt-0 m-auto w-[90%]";

export const ADD_BG = (flag) => {
  if (flag) {
    document.body.classList.add("bg_auto");
  } else {
    document.body.classList.remove("bg_auto");
  }
};

export const NOTIFICATIONS = [
  {
    message:
      "Your updates mades in the the profile is live now. Please raise a support ticket in case of any concern or query.",
    date: "Saturday 11.30",
  },
  {
    message: "Your updates mades in the the share page are active.",
    date: "Saturday 11.30",
  },
  {
    message: "Your updates mades in the the share page are active.",
    date: "Saturday 11.30",
  },
];

export const TABLE_REFER = {
  header: ["UserName", "Referrals", "Coins"],
  data: [
    { user_name: "username", referrals: "ref", coins: "coins" },
    { user_name: "username", referrals: "ref", coins: "coins" },
    { user_name: "username", referrals: "ref", coins: "coins" },
  ],
};

export const TABLE_LEADER_BOARD = {
  header: ["User Name", "Shares", "Earned Streams"],
  data: [
    { user_name: "sumixxxx", referrals: "referrals", coins: "200" },
    { user_name: "userxxx", referrals: "referrals", coins: "100" },
  ],
};

export const SHARE = {
  imageUrl: art_icon,
  views: 24,
  like: 10,
  share: 2,
  title: "Midnight moon on the window side",
  author: "Piyush Mishra",
};

export const VERIFICATION = {
  phone_number: false,
  email: true,
  password: true,
};

export const ALLOWED_ARTISTS_ROUTES = ["/support", "/notifications"];
export const ALLOWED_USER_ROUTE = ["/", "/support", "/notifications"];
export const PROTECT_ROUTE = (location, type) => {
  let logged_type_routes =
    type === "user" ? ALLOWED_USER_ROUTE : ALLOWED_ARTISTS_ROUTES;
  return logged_type_routes.filter((x) => x === location).length != 0;
};

export const DATA_FOR_DISTRIBUTE = {
  headers: [
    "Share Name",
    "Total Streams",
    "Streaming target for 1.5x",
    "Total Shares",
    "Streams earned",
    "Incentives earned",
  ],
  width: ["w-[35%]", "w-[20%]", "w-[15%]", "w-[15%]", "w-[15%]", "w-[10%]"],
  header_text_width: [
    "w-[65%]",
    "w-[65%]",
    "w-[65%]",
    "w-[65%]",
    "w-[65%]",
    "w-[95%]",
  ],
  data: [
    {
      name: "Takashi",
      image: P1,
      subname: "Jim Herris",
      stream: 10,
      stream_target: 1500,
      total_share: 5,
      stream_earned: 20,
      incentive: 20,
    },
    {
      name: "Takashi",
      image: P1,
      subname: "Jim Herris",
      stream: 10,
      stream_target: 1500,
      total_share: 5,
      stream_earned: 20,
      incentive: 20,
    },
    {
      name: "Takashi",
      image: P1,
      subname: "Jim Herris",
      stream: 10,
      stream_target: 1500,
      total_share: 5,
      stream_earned: 20,
      incentive: 20,
    },
  ],
};

export const GENDER = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

export const GENRES = {
  songs: [
    { value: "Pop", label: "Pop" },
    { value: "Jazz", label: "Jazz" },
    { value: "Rock", label: "Rock" },
    { value: "Dance", label: "Dance" },
    { value: "Classical music", label: "Classical music" },
    { value: "Folk Music", label: "Folk Music" },
    { value: "Hiphop", label: "Hiphop" },
    { value: "Ghazal", label: "Ghazal" },
    { value: "Qawwali", label: "Qawwali" },
    { value: "Others", label: "Others" },
  ],
  videos: [
    { value: "Comedy", label: "Comedy" },
    { value: "Mythology", label: "Mythology" },
    { value: "Thriller", label: "Thriller" },
    { value: "Drama", label: "Drama" },
    { value: "Action", label: "Action" },
    { value: "Sci-fi", label: "Sci-fi" },
    { value: "RomCom", label: "RomCom" },
    { value: "Animation", label: "Animation" },
    { value: "Horror", label: "Horror" },
    { value: "Others", label: "Others" },
  ],
};

export const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Telegu", label: "Telegu" },
  { value: "Tamil", label: "Tamil" },
  { value: "Bengali", label: "Bengali" },
  { value: "Marathi", label: "Marathi" },
  { value: "Assamese", label: "Assamese" },
  { value: "Bhojpuri", label: "Bhojpuri" },
  { value: "Others", label: "Others" },
];

export const CAT = [
  { value: "Singer", label: "Singer" },
  { value: "Music Composer", label: "Music Composer" },
  { value: "Production House", label: "Production House" },
  { value: "Lyricist", label: "Lyricist" },
  { value: "Agent", label: "Agent" },
  { value: "Script Writer", label: "Script Writer" },
  { value: "Model/Actors", label: "Model/Actors" },
  { value: "Composer", label: "Composer" },
  { value: "Director", label: "Director" },
  { value: "Actor", label: "Actor" },
  { value: "Others", label: "Others" },
];

export const JOINING = [
  {
    value: "Already have a song/ share that I want to shareize",
    label: "Already have a song/ share that I want to shareize",
  },
  {
    value: "Looking for collaboration for content creation",
    label: "Looking for collaboration for content creation",
  },
];

export const IND_EXP = [
  { value: "1 Yr or less", label: "1 Yr or less" },
  { value: "1-5 Yrs", label: "1-5 Yrs" },
  { value: "5-10 Yrs", label: "15-10 Yrs" },
  { value: "10+ Yrs", label: "10+ Yrs" },
];

export const QUERY_TYPES = [
  { value: "Wallet help", label: "Wallet help" },
  { value: "Partnerships", label: "Partnerships" },
  { value: "Purchasing a share", label: "Purchasing a share" },
  { value: "Launching a share", label: "Launching a share" },
  { value: "Job Opportunities", label: "Job Opportunities" },
  { value: "Others", label: "Others" },
];

export const LYRICS_PAGE_DATA = [
  { TYPE: "AI", IMAGE_URL: AI },
  { TYPE: "Probability", IMAGE_URL: Probabilty },
];

export const VECTORS = {
  left: left,
  right: right,
  n1: ilatest,
  n2: ilatest2,
  n3: ilatest3,
  i5: i5,
  i6: i6,
  i7: i7,
  i8: i8,
  i9: i9,
  i10: i10,
  i11: i11,
  i13: i13,
  i14: i14,
  i15: i15,
  i16: i16,
  i17: i17,
};
