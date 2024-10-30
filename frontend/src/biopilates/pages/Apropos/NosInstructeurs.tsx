import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";
import instructeur1 from "@/assets/images/instructeur-1.png";
import instructeur2 from "@/assets/images/instructeur-2.png";
import instructeur3 from "@/assets/images/instructeur-3.png";
import instructeur4 from "@/assets/images/instructeur-4.png";
import instructeur5 from "@/assets/images/instructeur-5.png";
import instructeur6 from "@/assets/images/instructeur-6.png";

type Instructeur = {
  name: string;
  image: string;
};
function InstructeurCard({ instructeur }: { instructeur: Instructeur }) {
  return (
    <div className="">
      <div className="flex justify-center items-center w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] rounded-full shadow-lg bg-bgColor">
        <img
          loading="lazy"
          src={instructeur.image}
          alt="Gym"
          className={"size-[85%] self-center object-cover"}
        />
      </div>
      <p className="size-full text-center text-lg sm:text-[23px] rounded-lg text-black font-ebGaramond font-semibold mt-8">
        {instructeur.name}
      </p>
    </div>
  );
}

export default function NosInstructeurs() {
  const instructeurs = [
    {
      name: "Sarah Bellagamba",
      image: instructeur1,
    },
    {
      name: "Imrann Bana",
      image: instructeur2,
    },
    {
      name: "Jessica Cruz",
      image: instructeur3,
    },
    {
      name: "Violaine Danais",
      image: instructeur4,
    },
    {
      name: "Joelle",
      image: instructeur5,
    },
    {
      name: "Natasha",
      image: instructeur6,
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center w-full h-[320px] sm:h-[340px] mb-16">
      <p className="text-marron text-start w-full text-3xl leading-snug font-ebGaramond font-bold mb-12">
        Nos instructeurs
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container relative w-full overflow-hidden"
        grabCursor={true}
        // spaceBetween={40}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Pagination]} // Fix: Wrapping Pagination in an array
        breakpoints={{
          1920: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          1750: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
          1028: {
            slidesPerView: 5,
            spaceBetween: 14,
          },
          990: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          670: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
        }}
      >
        {instructeurs.map((Instructeur, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center xl:items-start"
          >
            <InstructeurCard instructeur={Instructeur} />
          </SwiperSlide>
        ))}
        {/* <div className="slider-controler flex justify-center items-center">
          <div className="swiper-pagination m-auto z-[1] block md:hidden"></div>
        </div> */}
      </Swiper>
    </section>
  );
}
