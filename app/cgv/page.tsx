"use client";

export const dynamic = "force-dynamic";

export default function CgvPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-8 prose prose-invert text-muted-foreground">

        <h1 className="text-4xl font-bold">Conditions Générales de Vente (CGV)</h1>

        <section>
          <h2 className="text-2xl font-bold mt-6">1. Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent l’ensemble des ventes effectuées
            sur le site <strong>DIVN</strong>. Toute commande passée sur le site implique l’acceptation
            sans réserve des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">2. Produits</h2>
          <p>
            Les produits proposés à la vente sont ceux décrits sur le site au moment de la commande,
            dans la limite des stocks disponibles. Les descriptions sont fournies avec la plus grande
            exactitude possible. Les visuels ne sont pas contractuels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">3. Prix</h2>
          <p>
            Les prix sont indiqués en euros (€), toutes taxes comprises.  
            Le vendeur se réserve le droit de modifier ses prix à tout moment, sans effet rétroactif.
            Le prix appliqué est celui affiché au moment de la commande.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">4. Commande</h2>
          <p>
            Toute commande passée sur le site vaut acceptation complète des présentes CGV.
            Une fois la commande validée et le paiement effectué, celle-ci est considérée comme définitive.
          </p>
          <p>
            Le vendeur se réserve le droit de refuser ou d’annuler toute commande en cas de litige
            avec un client ou de suspicion de fraude.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">5. Paiement</h2>
          <p>
            Le paiement est exigible immédiatement lors de la commande.
            Les moyens de paiement acceptés sont ceux indiqués sur le site.
          </p>
          <p>
            Les transactions sont sécurisées via un système de paiement crypté.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">6. Livraison</h2>
          <p>
            Les produits sont livrés à l’adresse indiquée par le client lors de la commande.
            Les délais de livraison sont donnés à titre indicatif.
          </p>
          <p>
            Le vendeur ne pourra être tenu responsable d’un retard de livraison imputable
            au transporteur ou à un cas de force majeure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">7. Absence de droit de rétractation</h2>
          <p>
            <strong>Aucun retour, échange ou remboursement n’est accepté.</strong>
          </p>
          <p>
            En validant sa commande, le client reconnaît et accepte expressément
            renoncer à tout droit de rétractation.
          </p>
          <p>
            Toute commande est ferme et définitive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">8. Produit défectueux ou erreur</h2>
          <p>
            En cas de produit défectueux ou non conforme, le client doit contacter le service client
            dans un délai de 48 heures après réception, avec preuve à l’appui (photo ou vidéo).
          </p>
          <p>
            Une solution pourra être proposée au cas par cas, sans obligation de remboursement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">9. Responsabilité</h2>
          <p>
            Le vendeur ne saurait être tenu responsable des dommages indirects liés à l’utilisation
            des produits vendus.
          </p>
          <p>
            La responsabilité du vendeur est limitée au montant de la commande.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">10. Données personnelles</h2>
          <p>
            Les données personnelles collectées sont utilisées uniquement dans le cadre du traitement
            des commandes et ne sont jamais revendues.
          </p>
          <p>
            Conformément à la réglementation en vigueur, le client peut demander l’accès,
            la modification ou la suppression de ses données.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">11. Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site (textes, images, logo, design) sont protégés par le droit
            de la propriété intellectuelle. Toute reproduction est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-6">12. Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français.
            En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
          </p>
        </section>

      </div>
    </main>
  );
}
