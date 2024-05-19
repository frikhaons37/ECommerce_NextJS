const history= async ()=> {
    return (
    <>
    {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

<section
  className="relative bg-[url(https://www.nuwen.com/app/uploads/image.jpg)] bg-cover bg-center bg-no-repeat"
>
  <div
    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Bienvenue Sur Notre Site

        <strong className="block font-extrabold text-rose-700"> SOIN D'OR </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl/relaxed">
      Nous sommes ravis de vous accueillir dans notre univers de beauté et d'élégance. Découvrez notre gamme exclusive de produits cosmétiques et d'accessoires 
      soigneusement sélectionnés pour vous offrir le meilleur de la qualité et de l'innovation.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="/"
          className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto" style={{ textDecoration: 'none' }}
        >
          Get Started
        </a>

       
      </div>
    </div>
  </div>
</section>
    </>
    )
    }
    export default history;