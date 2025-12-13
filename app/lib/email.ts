"use server"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  size?: string
  price: number
}

interface CustomerNotification {
  orderId: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: number
  estimatedDelivery: string
}

export async function notifyCustomer(notification: CustomerNotification) {
  const customerEmail = notification.customerEmail

  const itemsList = notification.items
    .map(
      (item) =>
        `- ${item.productName} ${item.size ? `(Taille: ${item.size})` : ""} x ${item.quantity} - ${(item.price / 100).toFixed(2)}€`
    )
    .join("\n")

  const emailBody = `
Merci pour votre commande sur DIVN !

Commande ID: ${notification.orderId}
Produits commandés:
${itemsList}

Montant total: ${(notification.totalAmount / 100).toFixed(2)}€
Délai estimé de livraison: ${notification.estimatedDelivery}

Nous vous remercions pour votre confiance.
  `.trim()

  console.log("[v0] Customer notification:")
  console.log("To:", customerEmail)
  console.log("Subject:", `Confirmation de commande DIVN - ${notification.orderId}`)
  console.log("Body:", emailBody)

  // En production, remplacer par un vrai service d'email (Resend, SendGrid, etc.)
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'contact@divn.com',
  //   to: customerEmail,
  //   subject: `Confirmation de commande DIVN - ${notification.orderId}`,
  //   text: emailBody,
  // })

  return { success: true, message: "Client notifié avec succès" }
}
