"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SignOutIcon } from "@phosphor-icons/react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const UserMenu = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div>
      {user && (
        <div className="items-center justify-center flex gap-2">
          <p className="text-sm font-medium">
            {user?.user_metadata?.name ?? user?.email ?? ""}
          </p>
          <Button onClick={handleLogout} variant="ghost" size="icon">
            <SignOutIcon className="text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
