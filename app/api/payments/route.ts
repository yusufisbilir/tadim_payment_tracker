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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    if (!idParam) {
      return new Response(JSON.stringify({ error: "Payment ID is required" }), {
        status: 400,
      });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid Payment ID" }), {
        status: 400,
      });
    }

    await paymentService.deletePayment(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return new Response(JSON.stringify({ error: "Failed to delete payment" }), {
      status: 500,
    });
  }
}
