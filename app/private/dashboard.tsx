"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/config";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl bg-white border border-input-border rounded-xl shadow-lg p-8 flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-extrabold text-accent tracking-wide mb-2">TADIM Dashboard</h1>
        <p className="text-lg text-foreground">Welcome to your dashboard!</p>
        {user && (
          <div className="mt-4 w-full text-left">
            <h2 className="text-lg font-semibold mb-2">User Info</h2>
            <div className="bg-gray-50 border border-input-border rounded p-4 mb-4">
              <div><span className="font-medium">Email:</span> {user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-black transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
