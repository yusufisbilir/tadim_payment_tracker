"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Routes from "@/constants/Routes";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Routes.HOME);
  }, [router]);
  return null;
};

export default NotFound;