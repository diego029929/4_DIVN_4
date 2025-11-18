import { Header } from "app/components/header"
import { Footer } from "app/components/footer"
import { CheckoutForm } from "app/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Paiement</h1>
          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
