"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Routes from "@/constants/Routes";
import { redirect } from "next/navigation";
import { CreditCardIcon, MoneyIcon } from "@phosphor-icons/react";
import { createPaymentAction } from "@/app/(private)/payments/actions";

const CreatePaymentForm = () => {
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (method: "card" | "cash") => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await createPaymentAction({
        customer,
        price: Number(price),
        payment_method: method,
      });
      if (result.success) {
        setSuccess("Ödeme başarıyla eklendi!");
        setCustomer("");
        setPrice("");
        redirect(Routes.PAYMENTS);
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    });
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Ödeme Ekle</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="customer" className="block mb-1 font-medium">
            Müşteri
          </label>
          <Input
            id="customer"
            type="text"
            placeholder="Müşteri adı"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">
            Tutar
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Tutar"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <Button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("card")}
            className="bg-blue-500 hover:bg-blue-600 h-12"
          >
            <CreditCardIcon />
            Kart
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("cash")}
            className="bg-green-600 hover:bg-green-700 h-12"
          >
            <MoneyIcon />
            Nakit
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm pt-2">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm pt-2">{success}</div>
        )}
      </form>
    </div>
  );
};

export default CreatePaymentForm;
