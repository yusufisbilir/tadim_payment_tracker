"use client";
import CreatePaymentForm from "@/components/payments/CreatePaymentForm";
import { Table } from "@/components/ui/table";
import DeletePaymentDialog from "@/components/payments/DeletePaymentDialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/constants/api.routes.";

export default function Payments() {
  const [payments, setPayments] = useState<
    Array<{
      id?: number;
      customer: string;
      price: number;
      payment_method: "card" | "cash";
    }>
  >([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const fetchPayments = async () => {
    const res = await fetch(`${API_ROUTES.PAYMENTS}?date=${date}`);
    if (res.ok) {
      const data = await res.json();
      setPayments(data);
    }
  };

  const deletePayment = async (id: number) => {
    const res = await fetch(`${API_ROUTES.PAYMENTS}?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchPayments();
    }
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      await deletePayment(deletingId);
      setDeleteDialogOpen(false);
      setDeletingId(null);
      await fetchPayments();
    } catch (err) {
      // TODO: show error
    }
    setDeleteLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [date]);

  // Calculate statistics
  const totalCard = payments
    .filter((p) => p.payment_method === "card")
    .reduce((sum, p) => sum + p.price, 0);
  const totalCash = payments
    .filter((p) => p.payment_method === "cash")
    .reduce((sum, p) => sum + p.price, 0);

  const formatTL = (amount: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="w-full flex flex-col gap-6">
      <CreatePaymentForm fetchPayments={fetchPayments} />
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
                <td className="p-2 border-r border-gray-200 font-medium">
                  {payment.customer}
                </td>
                <td
                  className={cn(
                    "p-2 border-r border-gray-200 text-white font-medium",
                    payment?.payment_method === "card"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  )}
                >
                  {payment.payment_method === "card" ? "Kart" : "Nakit"}
                </td>
                <td className="p-2 font-semibold text-xl flex items-center gap-2 justify-between">
                  {formatTL(payment.price)}
                  {typeof payment.id === "number" && (
                    <button
                      type="button"
                      className="ml-2 text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => handleDelete(payment.id!)}
                    >
                      Sil
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <span className="font-semibold text-gray-700">Kart:</span>
          <span className="ml-2 text-blue-600 font-bold">
            {formatTL(totalCard)}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <span className="font-semibold text-gray-700">Nakit:</span>
          <span className="ml-2 text-green-600 font-bold">
            {formatTL(totalCash)}
          </span>
        </div>
      </div>
      <DeletePaymentDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setDeletingId(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
