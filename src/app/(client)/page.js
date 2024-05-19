import CarouselHome from '@/Components/Client/carouselHome'
import MainGridHome from '@/Components/Client/mainGridHome';
import Footer from '@/Components/Client/footer';

import MeilleuresOffres from '@/Components/Client/meilleuresOffres';
export default function Home() {
return (
<>
<CarouselHome />
<MainGridHome />
<MeilleuresOffres />
<Footer/>
</>
)
}