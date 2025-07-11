"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LoginRoutes({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      setShow(true);
    } else {
      router.push("/apphome/login");
    }
  }, [router]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
}

export default LoginRoutes;
