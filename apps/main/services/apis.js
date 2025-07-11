
// LOGIN AND SIGNUP PAGES API END-POINTS

export const SIGNIN_PHONE = `/auth/signin-phone`
export const SIGNIN_EMAIL = `/auth/signin-email`
export const SIGNIN_USER = `/auth/signin-user`
export const SEND_OTP = `/otp/send`
export const VERIFY_OTP = `/otp/verify`
export const RESET_PASSWORD = `/auth/reset-password`
export const SIGNUP = `/auth/signup`
export const GOOGLE_LOGIN = `/oauth/google`
export const SEND_EMAIL_FOR_VERIFICATION = `/auth/send-verification-email`
export const EMAIL_VERIFICATION = `/auth/send-verification-email`


// PROFILE GET AND EDIT INFO API END-POINTS

export const EDIT_PROFILE = `/artists/edit-profile`
export const EDIT_PHONE = `/artists/update-phone`
export const EDIT_PROFILE_PICTURE = `/artists/update-profile-image`
export const UPDATE_PASSWORD = `/auth/update-password`


// USER CONTACT API END-POINTS

export const FEEDBACK = `/feedback/submit`


// PLATEFORM INTEGRATION API END-POINTS
export const ADS= "/campaign-ads/status/"
export const LINKEDIN = `/campaign-ads/linkedin/auth`
export const GOOGLE_AD = `/campaign-ads/google/auth`
export const META_AD = `/campaign-ads/meta/auth`
export const SHOPIFY_AD=`/campaign-ads/shopify/auth`
export const CLEVERTAP_AD=`/campaign-ads/clevertap/auth`
export const MOENGAGE_AD=`/campaign-ads/moengage/auth`
export const BRANCH_AD=`/campaign-ads/branch/auth`
export const GA_ad = "/campaign-ads/google-analytics/auth"
export const DELETE = "/campaign-ads/revoke-access"
export const GETGMCACCOUNTS = "/admanager/get-all-accessible-gmc"
export const CHECKGMC = "/admanager/get-linked-gmc"
export const MCLINKED = "/admanager/directLink"
export const DEFAULT = "/admanager/change-default-account"