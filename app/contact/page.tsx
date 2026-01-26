"use client";

import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-white">
        Contactez-nous
      </h1>

      <div className="grid gap-6 max-w-md">
        {/* Instagram */}
        <button
          onClick={() =>
            openLink("https://www.instagram.com/4.divn.4?igsh=aXJ0NTU3MDdqbzQ5")
          }
          className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
        >
          <FaInstagram className="text-2xl" />
          <span className="text-lg font-medium">Instagram</span>
        </button>

        {/* TikTok */}
        <button
          onClick={() =>
            openLink("https://www.tiktok.com/@4.divn.4?_r=1&_t=ZN-93P91IO10Cs")
          }
          className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
        >
          <FaTiktok className="text-2xl" />
          <span className="text-lg font-medium">TikTok</span>
        </button>

        {/* Email */}
        <button
          onClick={() =>
            openLink("mailto:wist.infodev@gmail.com")
          }
          className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
        >
          <FaEnvelope className="text-2xl" />
          <span className="text-lg font-medium">
            wist.infodev@gmail.com
          </span>
        </button>
      </div>
    </main>
  );
}
