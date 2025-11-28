"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contactez-nous</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FORMULAIRE */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Envoyez-nous un message</h2>

                <form className="space-y-4">
                  <Input placeholder="Nom" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Sujet" />
                  <Textarea placeholder="Votre message" rows={5} />
                  <Button className="w-full">Envoyer</Button>
                </form>
              </CardContent>
            </Card>

            {/* INFORMATIONS */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      contact@divn.fr
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="text-sm text-muted-foreground">
                      +33 1 23 45 67 89
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Rue de la Mode<br />
                      75001 Paris, France
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
