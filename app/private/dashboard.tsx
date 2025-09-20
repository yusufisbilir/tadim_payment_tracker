"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { SignOutIcon } from "@phosphor-icons/react";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null);
  const [sales, setSales] = useState<Array<{ name: string; price: number; category: string }>>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "kart" });
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

  const handleAddSale = () => {
    setSales([...sales, { name: form.name, price: Number(form.price), category: form.category }]);
    setForm({ name: "", price: "", category: "kart" });
    setOpen(false);
  };

  return (
    <main className="flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl border border-gray-200 rounded-2xl shadow-lg py-4 px-6 flex flex-col gap-2 items-center"
      >
        <div className="flex items-center justify-between w-full">
        <img
          src="/tadim-logo.webp"
          alt="Tadım Logo"
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
        {user && (
          <div className="items-center justify-center flex gap-2">
              <p className="text-sm font-medium">{user?.user_metadata?.name ?? ''}</p>
            <Button
              onClick={handleLogout}
              variant='ghost'
              size='icon'
            >
             <SignOutIcon className="text-red-500" />
            </Button>
          </div>
        )}
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide font-sans text-neutral-800">Günlük Satış Paneli</h1>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Satışlar</h2>
            <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded shadow">Ekle</Button>
          </div>
          <Table>
            <thead>
              <tr className="bg-white/10">
                <th className="p-2 text-left">Müşteri</th>
                <th className="p-2 text-left">Kategori</th>
                <th className="p-2 text-left">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center">Henüz satış eklenmedi.</td>
                </tr>
              ) : (
                sales.map((sale, idx) => (
                  <tr key={idx} className="bg-white/20">
                    <td className="p-2">{sale.name}</td>
                    <td className="p-2">{sale.category === "kart" ? "Kart" : "Nakit"}</td>
                    <td className="p-2">₺{sale.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="mt-6 text-xs text-center">© {new Date().getFullYear()} Ek-Pa. All rights reserved.</div>
      </div>
    </main>
  );
}
