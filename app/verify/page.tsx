"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status =
  | "loading"
  | "success"
  | "expired"
  | "invalid"
  | "error";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const success = searchParams.get("success");

    if (!success) {
      setStatus("error");
      return;
    }

    if (success === "true") setStatus("success");
    else if (success === "expired") setStatus("expired");
    else if (success === "invalid") setStatus("invalid");
    else setStatus("error");
  }, [searchParams]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
        color: "white",
        padding: "24px",
        textAlign: "center",
      }}
    >
      {status === "loading" && <p>Vérification en cours…</p>}

      {status === "success" && (
        <>
          <h1>Compte vérifié ✅</h1>
          <p>Ton compte a bien été activé. Tu peux te connecter.</p>
        </>
      )}

      {status === "expired" && (
        <>
          <h1>Lien expiré ⏰</h1>
          <p>Ce lien de vérification n’est plus valide.</p>
        </>
      )}

      {status === "invalid" && (
        <>
          <h1>Lien invalide ❌</h1>
          <p>Ce lien est incorrect ou a déjà été utilisé.</p>
        </>
      )}

      {status === "error" && (
        <>
          <h1>Erreur ⚠️</h1>
          <p>Une erreur est survenue lors de la vérification.</p>
        </>
      )}
    </main>
  );
}
