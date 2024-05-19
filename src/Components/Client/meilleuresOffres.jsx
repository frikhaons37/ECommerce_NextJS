import React from 'react'
import Image from 'next/image'
const MeilleuresOffres = () => {
const tabOffres = [

{src: "https://res.cloudinary.com/iset-sfax/image/upload/v1703774819/images/balai-flora-rose_a5kfdb.webp"},

{src: "https://res.cloudinary.com/iset-sfax/image/upload/v1703774828/images/pesePersonne_tnlpyk.webp"},

{src: "https://res.cloudinary.com/iset-sfax/image/upload/v1703774825/images/chariot6roues_pmsfuq.webp"},

{src: "https://res.cloudinary.com/iset-sfax/image/upload/v1703774813/images/balai2_bjpaek.webp"}

]

return (
<section style={{ marginTop: '-250px' }}>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
      <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
        <div className="mx-auto max-w-md text-center lg:text-left">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Montres</h2>

            <p className="mt-4 text-gray-500">
            Explorez notre collection exquise de montres, conçues pour allier style et fonctionnalité. Chaque montre est méticuleusement sélectionnée pour son artisanat exceptionnel, son design élégant et sa précision inégalée. Que vous recherchiez une 
            montre classique pour une occasion spéciale ou une montre sportive pour un style de vie actif
            </p>
          </header>

          <a
            href='/client/cartProducts'
            className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring "style={{ textDecoration: 'none' }}
          >
            Shop All
          </a>
        </div>
      </div>

      <div className="lg:col-span-2 lg:py-8">
        <ul className="grid grid-cols-2 gap-4" >
          <li>
            <a href="#" className="group block" style={{ textDecoration: 'none' }}>
              <img
                src="https://citywatch.com.tn/31988-large_default/lee-cooper-lc07612130.jpg"
                alt=""
                className="aspect-square w-full rounded object-cover"
              />

              <div className="mt-3">
                <h3
                  className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                  Montre Femme Lee Cooper LC07612.130
                </h3>

                <p className="mt-1 text-sm text-gray-700">$150</p>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group block" style={{ textDecoration: 'none' }}>
              <img
                src="https://citywatch.com.tn/30268-large_default/bhpc-bp3291c520.jpg"
                alt=""
                className="aspect-square w-full rounded object-cover"
              />

              <div className="mt-3">
                <h3
                  className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                 Montre Femme Beverly Hills Polo Club BP3291C.520
                </h3>

                <p className="mt-1 text-sm text-gray-700">$148</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
);
}
export default MeilleuresOffres