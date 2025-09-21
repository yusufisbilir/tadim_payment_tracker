"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Routes from "@/constants/Routes";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.replace(Routes.PAYMENTS);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-400 px-4">
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center border border-red-100"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <img
          src="/tadim-logo.webp"
          alt="Tadım Logo"
          className="w-32 h-32 object-contain mb-2 drop-shadow-lg"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-wide mb-2 font-sans drop-shadow">
          Ek-Pa
        </h1>
        <p className="text-base text-white/90 font-medium mb-4 text-center">
          Ek-Pa Gıda Satış Takip Platformu
        </p>
        {error && (
          <p className="text-red-200 text-sm text-center bg-red-900/30 border border-red-200 rounded px-3 py-2 w-full">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-red-700 transition duration-300 disabled:opacity-50 cursor-pointer border border-white/30"
        >
          {loading ? "Yönlendiriliyor..." : "Google ile Giriş"}
        </button>
        <div className="mt-6 text-xs text-white/60 text-center">
          © {new Date().getFullYear()} Ek-Pa. All rights reserved.
        </div>
      </div>
    </main>
  );
}
