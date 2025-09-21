"use client";
import { Table } from "@/components/ui/table";
import { useState } from "react";

export default function Payments() {
  const [sales, setSales] = useState<
    Array<{ name: string; price: number; category: string }>
  >([]);

  return (
    <div className="w-full">
      <Table className="border border-gray-200">
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
              <tr key={idx} className="bg-white/20 border-b border-gray-200">
                <td className="p-2 border-r border-gray-200">{sale.name}</td>
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
  );
}
