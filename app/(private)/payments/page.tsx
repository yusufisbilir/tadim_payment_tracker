"use client";
import { Table } from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState<
    Array<{ customer: string; price: number; payment_method: "card" | "cash" }>
  >([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    async function fetchPayments() {
      const res = await fetch(`/api/payments?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setPayments(data);
      }
    }
    fetchPayments();
  }, [date]);

  // Calculate statistics
  const totalCard = payments
    .filter((p) => p.payment_method === "card")
    .reduce((sum, p) => sum + p.price, 0);
  const totalCash = payments
    .filter((p) => p.payment_method === "cash")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-4 items-center">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <label htmlFor="date" className="font-semibold text-gray-700">
            Tarih:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="flex gap-6">
          <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
            <span className="font-semibold text-gray-700">Kart:</span>
            <span className="ml-2 text-blue-600 font-bold">₺{totalCard}</span>
          </div>
          <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
            <span className="font-semibold text-gray-700">Nakit:</span>
            <span className="ml-2 text-green-600 font-bold">₺{totalCash}</span>
          </div>
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
