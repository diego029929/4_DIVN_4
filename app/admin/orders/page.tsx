"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Gestion des Commandes</h1>
            <p className="text-muted-foreground mb-8">
              Tableau de bord fabricant - Suivi des commandes en temps réel
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Notifications Automatiques</CardTitle>
                <CardDescription>
                  Le système notifie automatiquement le fabricant à chaque commande validée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border border-border/40 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Webhook Stripe configuré</h3>
                      <p className="text-sm text-muted-foreground">
                        Les paiements sont automatiquement détectés via{" "}
                        <code className="px-2 py-1 bg-muted rounded text-xs">/api/webhooks/stripe</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-border/40 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Notification fabricant</h3>
                      <p className="text-sm text-muted-foreground">
                        Un email est envoyé automatiquement à{" "}
                        <code className="px-2 py-1 bg-muted rounded text-xs">
                          {process.env.MANUFACTURER_EMAIL || "fabricant@divn.com"}
                        </code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-border/40 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Détails de commande inclus</h3>
                      <p className="text-sm text-muted-foreground">
                        Chaque notification contient: ID commande, articles, tailles, quantités, email client
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/40">
                  <h4 className="font-semibold mb-2 text-sm">Configuration Webhook Stripe</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>
                      Aller dans le{" "}
                      <a
                        href="https://dashboard.stripe.com/webhooks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Dashboard Stripe → Webhooks
                      </a>
                    </li>
                    <li>
                      Ajouter un endpoint:{" "}
                      <code className="px-2 py-1 bg-background rounded text-xs">
                        https://votre-domaine.com/api/webhooks/stripe
                      </code>
                    </li>
                    <li>
                      Sélectionner l'événement:{" "}
                      <code className="px-2 py-1 bg-background rounded text-xs">checkout.session.completed</code>
                    </li>
                    <li>
                      Copier le secret webhook et l'ajouter comme variable d'environnement{" "}
                      <code className="px-2 py-1 bg-background rounded text-xs">STRIPE_WEBHOOK_SECRET</code>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
                    }
