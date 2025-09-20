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
};
