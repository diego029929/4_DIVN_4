"use client";

export function CheckoutForm() {
  async function handlePay() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <button
      onClick={handlePay}
      className="w-full bg-black text-white py-3"
    >
      Payer maintenant
    </button>
  );
}
