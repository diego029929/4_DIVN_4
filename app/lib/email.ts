"use server"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  size?: string
  price: number
}

interface ManufacturerNotification {
  orderId: string
  customerEmail: string
  items: OrderItem[]
  totalAmount: number
  orderDate: Date
}

export async function notifyManufacturer(notification: ManufacturerNotification) {
  const manufacturerEmail = process.env.MANUFACTURER_EMAIL || "fabricant@divn.com"

  const itemsList = notification.items
    .map(
      (item) =>
        `- ${item.productName} ${item.size ? `(Taille: ${item.size})` : ""} x ${item.quantity} - ${(item.price / 100).toFixed(2)}€`,
    )
    .join("\n")

  const emailBody = `
Nouvelle commande reçue sur DIVN

Commande ID: ${notification.orderId}
Date: ${notification.orderDate.toLocaleString("fr-FR")}
Client: ${notification.customerEmail}

Articles commandés:
${itemsList}

Montant total: ${(notification.totalAmount / 100).toFixed(2)}€

---
Veuillez préparer cette commande pour expédition.
  `.trim()

  console.log("[v0] Manufacturer notification:")
  console.log("To:", manufacturerEmail)
  console.log("Subject:", `Nouvelle commande DIVN - ${notification.orderId}`)
  console.log("Body:", emailBody)

  return { success: true, message: "Fabricant notifié avec succès" }
}

// -----------------------------------------------------
// Ajouter également notifyCustomer si tu veux l'utiliser
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

  return { success: true, message: "Client notifié avec succès" }
  }
