"use client";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Notre vision</h1>

      <p className="text-muted-foreground mb-6">
        Notre marque est née d’une envie simple : créer des vêtements qui ont du sens.
        Pas seulement des pièces à porter, mais des créations qui racontent quelque chose,
        qui accompagnent un état d’esprit, une énergie, une manière d’avancer.
      </p>

      <p className="text-muted-foreground mb-6">
        Nous croyons en une mode plus réfléchie, loin de la surproduction.
        Chaque collection est pensée comme un projet à part entière, avec
        une identité forte et une direction claire.
      </p>

      <p className="text-muted-foreground mb-6">
        Notre travail se construit autour de l’équilibre : entre simplicité et caractère,
        entre esthétique et confort, entre créativité et exigence.
        Rien n’est laissé au hasard.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Plus qu’une marque</h2>

      <p className="text-muted-foreground mb-6">
        Ce projet représente une vision, une façon de voir les choses et de s’exprimer
        à travers ce que l’on porte. Il s’adresse à celles et ceux qui veulent affirmer
        leur identité sans en faire trop.
      </p>

      <p className="text-muted-foreground mb-6">
        Nous avançons avec une idée simple : créer moins, mais mieux.
        Et construire une communauté qui partage ces valeurs.
      </p>

      <p className="font-semibold tracking-widest mt-10">
        BUILT WITH INTENT.
      </p>
    </main>
  );
}
