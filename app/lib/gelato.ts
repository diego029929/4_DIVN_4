const GELATO_API_KEY = process.env.GELATO_API_KEY!

export async function createGelatoOrder(order: {
  name: string
  email: string
  address: {
    line1: string
    city: string
    postalCode: string
    country: string
  }
  productId: string
  quantity: number
}) {
  const res = await fetch("https://api.gelato.com/v1/orders", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GELATO_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      products: [
        {
          productId: order.productId,
          quantity: order.quantity,
          recipient: {
            name: order.name,
            email: order.email,
            address: {
              line1: order.address.line1,
              city: order.address.city,
              postalCode: order.address.postalCode,
              country: order.address.country
            }
          }
        }
      ]
    })
  })

  if (!res.ok) {
    throw new Error("Erreur création commande Gelato")
  }

  return res.json()
  }
      
