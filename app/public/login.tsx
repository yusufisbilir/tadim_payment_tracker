"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-white border border-input-border rounded-xl shadow-lg p-8 flex flex-col gap-6 items-center">
        <span className="text-3xl font-extrabold text-accent tracking-wide mb-2">TADIM</span>
        {error && <p className="text-accent text-sm text-center">{error}</p>}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2 rounded bg-black text-white font-semibold hover:bg-accent transition disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Sign in with Google"}
        </button>
      </div>
    </main>
  );
}
