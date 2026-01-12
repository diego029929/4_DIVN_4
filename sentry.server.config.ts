// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

// ⚠️ LOG TEMPORAIRE — À SUPPRIMER une fois que ça marche
console.log("✅ SENTRY SERVER DSN =", dsn ?? "UNDEFINED");

Sentry.init({
  dsn,

  // 100% pour le debug, réduis ensuite (ex: 0.1)
  tracesSampleRate: 1.0,

  // Optionnel mais utile
  environment: process.env.NODE_ENV,

  enabled: !!dsn, // empêche Sentry de planter si DSN absent
});
