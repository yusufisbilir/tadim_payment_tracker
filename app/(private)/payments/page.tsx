"use client";
import { Table } from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState<
    Array<{ customer: string; price: number; payment_method: "card" | "cash" }>
  >([]);

  useEffect(() => {
    async function fetchPayments() {
      const res = await fetch("/api/payments");
      if (res.ok) {
        const data = await res.json();
        setPayments(data);
      }
    }
    fetchPayments();
  }, []);

  // Calculate statistics
  const totalCard = payments
    .filter((p) => p.payment_method === "card")
    .reduce((sum, p) => sum + p.price, 0);
  const totalCash = payments
    .filter((p) => p.payment_method === "cash")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <span className="font-semibold text-gray-700">Kart:</span>
          <span className="ml-2 text-blue-600 font-bold">₺{totalCard}</span>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <span className="font-semibold text-gray-700">Nakit:</span>
          <span className="ml-2 text-green-600 font-bold">₺{totalCash}</span>
        </div>
      </div>
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
          {payments.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="p-4 text-center border-t border-gray-200"
              >
                Henüz ödeme eklenmedi.
              </td>
            </tr>
          ) : (
            payments.map((payment, idx) => (
              <tr key={idx} className="bg-white/20 border-b border-gray-200">
                <td className="p-2 border-r border-gray-200">
                  {payment.customer}
                </td>
                <td className="p-2 border-r border-gray-200">
                  {payment.payment_method === "card" ? "Kart" : "Nakit"}
                </td>
                <td className="p-2">{`₺${payment.price}`}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
