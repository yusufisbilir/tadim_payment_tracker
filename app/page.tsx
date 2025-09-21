"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Routes from "@/constants/Routes";

const Page = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.replace(Routes.PAYMENTS);
      } else {
        router.replace(Routes.LOGIN);
      }
    };
    checkUser();
  }, [router, supabase]);

  return null;
};

export default Page;
