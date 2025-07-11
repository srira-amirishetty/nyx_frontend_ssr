import Link from "next/link";

type TAuth = {
  userType: "artist" | "user";
};

export function AuthLoginFooter({ userType }: TAuth) {
  return (
    <>
      <p className="text-center text-[12px] text-blue m-auto w-[75%] pt-16">
        By signing in you agree to the{" "}
        <Link
          href="/terms-and-conditions"
          className="cursor-pointer underline hover:text-white"
        >
          terms of service
        </Link>
        ,{" "}
        <Link
          href="/privacy-policy"
          className="cursor-pointer underline hover:text-white"
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link
          href="/risk-disclosure"
          className="cursor-pointer underline hover:text-white"
        >
          risk disclosure
        </Link>
      </p>
      <p className="text-center text-[12px] text-blue m-auto w-[75%] pt-7 pb-10">
        Not Registered yet?
        <Link
          href={`/${userType}/register`}
          className="cursor-pointer hover:text-white font-semibold ml-1"
          data-testid="create-account"
        >
          Create Account
        </Link>
      </p>
    </>
  );
}

export const AuthRegisterFooter = ({ userType }: TAuth) => {
  return (
    <>
      <p className="text-center text-xs text-blue m-auto w-[75%] pt-6">
        By signing up you agree to the{" "}
        <Link
          href={"/terms-and-conditions"}
          className="cursor-pointer underline hover:text-white"
        >
          terms of service
        </Link>
        ,{" "}
        <Link
          href="/privacy-policy"
          className="cursor-pointer underline hover:text-white"
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link
          href="/risk-disclosure"
          className="cursor-pointer underline hover:text-white"
        >
          risk disclosure
        </Link>
      </p>
      <p className="text-center text-[12px] text-blue m-auto w-[75%] pt-5 pb-10">
        Already have an account?
        <Link
          href={`/${userType}/login`}
          className="cursor-pointer font-semibold hover:text-white ml-1"
        >
          Log In
        </Link>
      </p>
    </>
  );
};
