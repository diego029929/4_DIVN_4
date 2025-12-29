import "@/globals.css";
import type { ReactNode } from "react";

import Header from "@/components/header";
import { Footer } from "@/components/footer";
import Providers from "./providers";

// On supprime l'import de Google Fonts
// et on utilisera les polices self-hosted via CSS

export const metadata = {
  title: "DIVN",
  description: "Boutique DIVN",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        className="
          min-h-screen flex flex-col
          bg-[#0A0A0A] text-neutral-200
          antialiased
          transition-colors duration-300
          selection:bg-[#E6B400]/40 selection:text-white
          font-inter font-bebas
        "
      >
        <Providers>
          <Header />

          <main className="flex-1 px-4 sm:px-8 lg:px-16 pt-6 sm:pt-10">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
