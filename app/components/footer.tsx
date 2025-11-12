import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">DIVN</h3>
            <p className="text-sm text-muted-foreground">
              Mode premium et accessoires exclusifs pour un style intemporel.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/boutique?category=homme" className="hover:text-primary transition-colors">
                  Homme
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=femme" className="hover:text-primary transition-colors">
                  Femme
                </Link>
              </li>
              <li>
                <Link href="/boutique?category=accessoires" className="hover:text-primary transition-colors">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-primary transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DIVN. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
