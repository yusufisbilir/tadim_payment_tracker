"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Routes from "@/constants/Routes";
import { createClient } from "@/utils/supabase/client";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.replace(Routes.LOGIN);
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img
          src="/tadim-logo.webp"
          alt="Tadım Logo"
          className="w-32 h-32 object-contain drop-shadow-lg animate-pulse"
        />
      </div>
    );
  }

  return <>{isLoggedIn ? children : null}</>;
}
