export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Élégance. Minimalisme. Excellence.
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Découvrez les pièces essentielles de DIVN — conçues pour un style intemporel.
        </p>

        <a
          href="/boutique"
          className="px-8 py-3 bg-black text-white rounded-lg text-lg hover:bg-neutral-800 transition"
        >
          Découvrir la collection
        </a>
      </section>

      {/* PRODUITS EN AVANT */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Nos Best Sellers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="/premium-black-tshirt-minimalist.jpg" className="w-full h-72 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">T-shirt Premium Noir</h3>
                <p className="text-sm text-gray-600 mt-1">Collection Essentielle</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="/luxury-fashion-dark-minimalist.jpg" className="w-full h-72 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Veste Oversize Luxe</h3>
                <p className="text-sm text-gray-600 mt-1">Nouvelle Collection</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="/premium-black-leather-bag-gold-details.jpg" className="w-full h-72 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Sac en Cuir Premium</h3>
                <p className="text-sm text-gray-600 mt-1">Edition Gold</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
              }
