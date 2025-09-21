"use server";
import { paymentService } from "@/services/payments.service";
import { PaymentsInsert } from "@/types/types";

export async function createPaymentAction(data: PaymentsInsert) {
  try {
    const payment = await paymentService.createPayment(data);
    return { success: true, payment };
  } catch (error: any) {
    return { success: false, error: error.message || "Ödeme eklenemedi" };
  }
}
