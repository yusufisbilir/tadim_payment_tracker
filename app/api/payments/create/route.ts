import { paymentService } from "@/services/payments.service";
import { PaymentsInsert } from "@/types/types";

export async function POST(request: Request) {
  try {
    const body: PaymentsInsert = await request.json();

    const payment = await paymentService.createPayment(body);

    return new Response(JSON.stringify(payment), { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(JSON.stringify({ error: "Failed to create payment" }), {
      status: 500,
    });
  }
}
