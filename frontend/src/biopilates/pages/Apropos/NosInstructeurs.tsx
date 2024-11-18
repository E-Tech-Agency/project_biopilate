import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";
import instructeur1 from "@/assets/images/instructeur-1.png";
import instructeur2 from "@/assets/images/instructeur-2.png";
import instructeur3 from "@/assets/images/instructeur-3.png";
import instructeur4 from "@/assets/images/instructeur-4.png";
import instructeur5 from "@/assets/images/instructeur-5.png";
import instructeur6 from "@/assets/images/instructeur-6.png";
import PrincipeCard from "@/biopilates/components/PrincipeCard";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function NosInstructeurs() {
  const instructeurs = [
    {
      name: "Sarah Bellagamba",
      image: instructeur1,
      description:
        "Ancienne danseuse et professeure de yoga vinyasa, est <strong>instructrice certifiée Stott Pilates</strong> chez Biopilates Paris. Avec son expertise, elle propose des cours enrichissants, alliant professionnalisme et passion.",
    },
    {
      name: "Imrann Bana",
      image: instructeur2,
      description:
        "Coach <strong>certifié Stott Pilates</strong> chez Biopilates Paris, allie passion des arts martiaux et expertise Pilates. Son savoir-faire unique en Matwork et équipements en fait un instructeur très recherché.",
    },
    {
      name: "Violaine Danais",
      image: instructeur4,
      description:
        "<strong>Instructrice invitée</strong> chez Biopilates Paris, est passionnée de mouvement et rayonne par sa bienveillance. Certifiée <strong>Stott Pilates</strong>, elle transmet une énergie positive dans chaque cours.",
    },
    {
      name: "Jessica Cruz",
      image: instructeur3,
      description:
        "Instructrice Pilates et Lagree chez Biopilates Paris, allie ses racines brésiliennes et orientales à un enseignement lumineux et unique. Son approche artistique et dynamique rend chaque cours captivant.",
    },
    {
      name: "Joelle Berckmans",
      image: instructeur5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Natasha Lodhi",
      image: instructeur6,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <section className="relative flex flex-col justify-center items-center w-full h-[440px] sm:h-[470px]">
      <p className="text-marron text-start w-full text-[34px] leading-snug font-ebGaramond font-bold mb-8">
        Nos instructeurs
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container w-full overflow-hidden mx-[-20px] md:mx-[-48px]"
        grabCursor={true}
        spaceBetween={40}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true, // Keep clickable here for pagination
        }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }} // Remove clickable from navigation
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1750: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1540: {
            slidesPerView: 2.5,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 16,
          },

          990: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.25,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 1.1,
            spaceBetween: 2,
          },
        }}
      >
        <div className="flex flex-nowrap gap-2 overflow-hidden">
          {instructeurs.map((instructeur, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-center items-center xl:items-start "
            >
              <PrincipeCard principe={instructeur} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-marron text-bgColor hover:text-marron rounded-full w-10 h-10 absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-20">
        <FaArrowLeftLong className="" />
      </div>
      <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-marron text-bgColor hover:text-marron rounded-full w-10 h-10 absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-20">
        <FaArrowRightLong className="" />
      </div>
      <div className="slider-controler flex justify-center gap-10 mb-10">
        <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
      </div>
    </section>
  );
}
