# DIVN

Boutique en ligne de la marque DIVN (Next.js 14, Tailwind, Stripe Checkout).

## Lancer en local

```bash
pnpm install
cp .env.example .env.local   # puis remplis les clés Stripe de test
pnpm dev                     # http://localhost:3000
```

Le site démarre et se construit (`pnpm build`) sans aucune variable d'environnement. Seules les fonctions qui en ont besoin (paiement, emails, comptes) échouent proprement.

## Comment marche une commande

1. Le panier est stocké dans le navigateur (`localStorage`).
2. `POST /api/checkout` reçoit seulement les identifiants, tailles et quantités. Les prix viennent du catalogue `app/lib/products.ts`, jamais du navigateur.
3. Le client paie sur la page Stripe Checkout, sans créer de compte. Stripe demande l'adresse de livraison et le téléphone.
4. Stripe appelle `POST /api/webhooks/stripe` (signature vérifiée). Un email récapitulatif part vers `ORDER_NOTIFICATION_EMAIL` et vers le client.
5. Les commandes se consultent dans le tableau de bord Stripe.

L'envoi automatique à l'imprimeur (Gelato) sera branché sur le webhook une fois les produits créés chez Gelato.

## Configurer le webhook Stripe

- En local : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`, puis copie le `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`.
- En production : Stripe Dashboard → Webhooks → endpoint `https://<ton-site>/api/webhooks/stripe`, événements `checkout.session.completed` et `checkout.session.async_payment_succeeded`.

## Catalogue

Les produits sont dans `app/lib/products.ts`. Les photos vont dans `public/images/`, avec le chemin indiqué dans `images`.

## Comptes clients et admin (optionnels)

Inscription, connexion et pages `/admin` utilisent NextAuth + Prisma + PostgreSQL (`DATABASE_URL`). Les pages et routes `/admin` sont réservées au rôle `ADMIN` ou à l'email `ADMIN_EMAIL`.
