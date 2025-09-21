"use client";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import UserMenu from "@/components/UserMenu";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Payments() {
  const [sales, setSales] = useState<
    Array<{ name: string; price: number; category: string }>
  >([]);

  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-gray-200 rounded-2xl shadow-lg py-4 px-6 flex flex-col gap-2 items-center">
        <div className="flex items-center justify-between w-full">
          <img
            src="/tadim-logo.webp"
            alt="Tadım Logo"
            className="w-24 h-24 object-contain drop-shadow-lg"
          />
          <UserMenu />
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide font-sans text-neutral-800">
          Günlük Satış Paneli
        </h1>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Ödemeler</h2>
            <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded shadow">
              <PlusIcon className="inline-block mr-2" />
              Ödeme Ekle
            </Button>
          </div>
          <Table className="border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-white/10 border-b border-gray-200">
                <th className="p-2 text-center border-r border-gray-200">
                  Müşteri
                </th>
                <th className="p-2 text-center border-r border-gray-200">
                  Ödeme Yöntemi
                </th>
                <th className="p-2 text-center">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 text-center border-t border-gray-200"
                  >
                    Henüz satış eklenmedi.
                  </td>
                </tr>
              ) : (
                sales.map((sale, idx) => (
                  <tr
                    key={idx}
                    className="bg-white/20 border-b border-gray-200"
                  >
                    <td className="p-2 border-r border-gray-200">
                      {sale.name}
                    </td>
                    <td className="p-2 border-r border-gray-200">
                      {sale.category === "kart" ? "Kart" : "Nakit"}
                    </td>
                    <td className="p-2">{`₺${sale.price}`}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="mt-6 text-xs text-center">
          © {new Date().getFullYear()} Ek-Pa. All rights reserved.
        </div>
      </div>
    </main>
  );
}
