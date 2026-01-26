"use client";

import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contactez-nous</h1>

      <p className="text-muted-foreground mb-6">
        Vous pouvez nous contacter via :
      </p>

      <div className="flex flex-col gap-4">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/4.divn.4?igsh=aXJ0NTU3MDdqbzQ5"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-pink-500 hover:underline"
        >
          <FaInstagram size={22} />
          <span>Instagram — Cliquez ici</span>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@4.divn.4?_r=1&_t=ZN-93P91IO10Cs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-black dark:text-white hover:underline"
        >
          <FaTiktok size={22} />
          <span>TikTok — Cliquez ici</span>
        </a>

        {/* Email */}
        <a
          href="mailto:wist.infodev@gmail.com"
          className="flex items-center gap-3 text-blue-600 hover:underline"
        >
          <FaEnvelope size={22} />
          <span>wist.infodev@gmail.com</span>
        </a>
      </div>
    </main>
  );
}
