"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPaymentAction } from "./actions";

const Page = () => {
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
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
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
        <div className="flex gap-4 pt-2">
          <Button
            type="button"
            variant="default"
            disabled={loading}
            onClick={() => handleSubmit("card")}
          >
            Kart ile Ekle
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => handleSubmit("cash")}
          >
            Nakit ile Ekle
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

export default Page;
