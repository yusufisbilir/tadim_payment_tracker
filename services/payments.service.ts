import { PaymentsInsert } from "@/types/types";
import { supabase } from "@/utils/supabase/config";

export const paymentService = {
    async createPayment(data: PaymentsInsert) {
        const { data: payment, error } = await supabase
            .from('payments')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return payment;
    }
    

}