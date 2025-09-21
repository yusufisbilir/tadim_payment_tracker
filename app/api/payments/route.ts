import { paymentService } from "@/services/payments.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const payments = await paymentService.getPayments(date);
    return new Response(JSON.stringify(payments), { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch payments" }), {
      status: 500,
    });
  }
}
