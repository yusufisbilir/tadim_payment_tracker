import { PaymentsInsert } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export const paymentService = {
  async createPayment(data: PaymentsInsert) {
    const supabase = await createClient();

    const { data: payment, error } = await supabase
      .from("payments")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return payment;
  },

  async getPayments(date: string | null = null) {
    const supabase = await createClient();
    const targetDate = date || new Date().toISOString().split("T")[0];

    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .gte("created_at", `${targetDate}T00:00:00.000Z`)
      .lt("created_at", `${targetDate}T23:59:59.999Z`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return payments;
  },
};
