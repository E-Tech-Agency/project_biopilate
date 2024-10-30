import TemoignageCard from "./TemoignageCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";

export default function TemoignagesSection() {
  const temoignages = [
    {
      user: "Lyly de la Vallée",
      note: 5,
      title: "Cette adresse n'en est que plus précieuse.",
      review:
        "Un très beau studio à l'ambiance unique à Paris. Caro est une grande pro, incollable sur l'anatomie, à même d'adapter son cours à chacun quelle que soit sa condition pour progresser, récupérer d'une blessure, se remettre en forme, s'entretenir... Les endroits où chaque élève est considéré autrement que comme un numéro sont rares, cette adresse n'en est que plus précieuse.",
    },
    {
      user: "Mathilde Paquelier",
      note: 5,
      title: "Les cours sont variés, ludiques et très efficaces!",
      review:
        "J'ai la chance d'aller au studio depuis maintenant plusieurs années... c'est un vrai plaisir de faire du sport dans un tel environnement. Caroline est attentive et les cours sont variés, ludiques et très efficaces!",
    },
    {
      user: "Julia",
      note: 5,
      title: "Excellent Studio de Caroline BERGER.",
      review:
        "Excellent Studio de Caroline BERGER ! Caroline est très attentive à nos besoins et nous suit avec beaucoup d'attention. C'est un grand plaisir faire du sport, s'occuper de son corps avec une grande professionnelle, dans un beau studio et le tout accompagné de plein de petit poissons! 😍",
    },
    {
      user: "Julia",
      note: 5,
      title: "Excellent Studio de Caroline BERGER.",
      review:
        "Excellent Studio de Caroline BERGER ! Caroline est très attentive à nos besoins et nous suit avec beaucoup d'attention. C'est un grand plaisir faire du sport, s'occuper de son corps avec une grande professionnelle, dans un beau studio et le tout accompagné de plein de petit poissons! 😍",
    },
  ];
  return (
    <div>
      <section className="mb-10 flex flex-col justify-center items-center gap-12 w-full h-[480px] sm:h-[530px]">
        <div className="flex justify-center items-center gap-8">
          <svg
            width="111"
            height="89"
            viewBox="0 0 111 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-sm:w-[50px] max-sm:h-[40px]"
          >
            <path
              opacity="0.4"
              d="M9.45464 12.8681C-1.00249 24.2174 0.0504303 38.792 0.0836792 38.9583V83.2916C0.0836792 84.7613 0.667534 86.1709 1.70679 87.2101C2.74606 88.2494 4.1556 88.8333 5.62534 88.8333H38.8754C44.9878 88.8333 49.9587 83.8624 49.9587 77.7499V38.9583C49.9587 37.4885 49.3748 36.079 48.3356 35.0397C47.2963 34.0004 45.8868 33.4166 44.417 33.4166H27.3598C27.4769 30.6769 28.2954 28.0131 29.7371 25.6804C32.5523 21.2416 37.8557 18.2103 45.5087 16.6808L49.9587 15.7941V0.166595H44.417C28.9946 0.166595 17.2296 4.43922 9.45464 12.8681ZM70.4518 12.8681C59.9891 24.2174 61.0476 38.792 61.0808 38.9583V83.2916C61.0808 84.7613 61.6647 86.1709 62.7039 87.2101C63.7432 88.2494 65.1527 88.8333 66.6225 88.8333H99.8725C105.985 88.8333 110.956 83.8624 110.956 77.7499V38.9583C110.956 37.4885 110.372 36.079 109.333 35.0397C108.293 34.0004 106.884 33.4166 105.414 33.4166H88.3569C88.474 30.6769 89.2926 28.0131 90.7343 25.6804C93.5494 21.2416 98.8528 18.2103 106.506 16.6808L110.956 15.7941V0.166595H105.414C89.9917 0.166595 78.2267 4.43922 70.4518 12.8681Z"
              fill="#C4C4C4"
            />
          </svg>
          <div className="flex flex-col justify-center items-center gap-2 sm:gap-4">
            <p className="text-marron text-xl sm:text-2xl font-ebGaramond font-bold">
              Témoignages clients{" "}
            </p>
            <p className="text-gray-400 text-lg md:text-4xl font-bold">
              Nos clients formidables
            </p>
          </div>
        </div>
        <Swiper
          className="centered-slide-carousel swiper-container relative w-full"
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          spaceBetween={40}
          slideToClickedSlide={true}
          modules={[Pagination]}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          breakpoints={{
            1920: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1028: {
              slidesPerView: 1,
              spaceBetween: 14,
            },
            990: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 5,
            },

            640: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
          }}
        >
          <div className="flex flex-nowrap gap-2 overflow-hidden">
            {temoignages.map((temoignage, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <TemoignageCard temoignage={temoignage} />
              </SwiperSlide>
            ))}
          </div>
          <div className="slider-controler flex justify-center gap-10 mb-10">
            <div className="swiper-pagination m-auto z-[1]"></div>
          </div>
        </Swiper>
      </section>
    </div>
  );
}
