# DIVN - SaaS E-commerce Premium

Site e-commerce dark mode avec intégration Stripe et notifications automatiques fabricant.

## Fonctionnalités

- **Design dark premium** avec accents dorés
- **Catalogue produits** avec images, prix, tailles
- **Panier fonctionnel** avec localStorage
- **Paiement Stripe** (mode embedded checkout)
- **Notifications fabricant automatiques** via webhooks Stripe
- **Responsive** mobile et desktop
- **Navigation fluide** avec catégories

## Automatisation Fabricant

Lorsqu'une commande est validée sur Stripe:

1. Le webhook `/api/webhooks/stripe` reçoit l'événement `checkout.session.completed`
2. Le système extrait les détails de commande (articles, quantités, tailles, client)
3. Une notification est envoyée automatiquement au fabricant via `notifyManufacturer()`
4. Le fabricant reçoit un email avec tous les détails pour préparer l'expédition

### Configuration Webhook

1. Aller sur [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Ajouter un endpoint: `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionner l'événement: `checkout.session.completed`
4. Copier le secret webhook

### Variables d'environnement requises

\`\`\`env
# Stripe (déjà configurées)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook Stripe (à ajouter)
STRIPE_WEBHOOK_SECRET=whsec_...

# Email fabricant (optionnel)
MANUFACTURER_EMAIL=fabricant@divn.com

# Service email (production - optionnel)
RESEND_API_KEY=re_...
\`\`\`

### Service d'email (Production)

Pour envoyer de vrais emails en production, installer un service comme Resend:

\`\`\`bash
npm install resend
\`\`\`

Puis modifier `lib/email.ts` pour utiliser Resend au lieu de console.log.

## Démarrage

Le projet est prêt à déployer sur Vercel avec toutes les intégrations configurées.

## Pages

- `/` - Accueil avec hero et produits vedettes
- `/boutique` - Catalogue complet avec filtres catégories
- `/boutique/[id]` - Page produit individuelle
- `/cart` - Panier d'achat
- `/checkout` - Paiement Stripe
- `/admin/orders` - Dashboard fabricant
- `/about` - À propos
- `/contact` - Contact
