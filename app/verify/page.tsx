"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const isSuccess = searchParams.success === "true";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {isSuccess ? (
          <>
            <h1 className="text-3xl font-bold">
              ✅ Compte créé avec succès
            </h1>

            <p className="text-muted-foreground">
              Votre adresse email a été vérifiée.
              Vous pouvez maintenant vous connecter.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-blue-500 font-medium hover:underline"
            >
              Vous connecter
              <ArrowRight size={18} />
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">
              ❌ Lien invalide ou expiré
            </h1>

            <p className="text-muted-foreground">
              Le lien de vérification n’est plus valide.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-blue-500 font-medium hover:underline"
            >
              Aller à la connexion
              <ArrowRight size={18} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
