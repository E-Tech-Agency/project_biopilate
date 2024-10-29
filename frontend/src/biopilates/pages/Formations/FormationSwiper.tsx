import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";

// Import images directly
import reformerImage from "@/assets/images/reformer.jpg";
import formation2Image from "@/assets/images/formation-2.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
import formation1Image from "@/assets/images/formation-1.jpg";
import formation5Image from "@/assets/images/formation-5.png";
import Matwork from "@/assets/images/formation-6.jpg";
import Blessures from "@/assets/images/formation-3.png";
import FormationTarifCard from "@/biopilates/components/FormationTarifCard";

import formation1 from "@/assets/doc/1-Formation-Anatomie.pdf";
import formation2 from "@/assets/doc/2-Formation-Matwork.pdf";
import formation3 from "@/assets/doc/3-Formation-Reformer.pdf";
import formation4 from "@/assets/doc/4-Formation-Cadillac.pdf";
import formation5 from "@/assets/doc/5-Formation-Barils.pdf";
import formation6 from "@/assets/doc/6-Formation-Chaise.pdf";
import formation7 from "@/assets/doc/7-Formation-ISP.pdf";
// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  prices: string[];
  pdf: string;
  levels?: string[];
}

export default function FormationSwiper() {
  const formations: Formation[] = [
    {
      title: "Reformer",
      image: reformerImage,
      prices: ["2299 €", "999 €"],
      pdf: formation1,
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Matwork",
      image: Matwork,
      prices: ["1599 €", "399 €"],
      pdf: formation2,
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Chaise",
      image: formation2Image,
      prices: ["699 €", "299 €"],
      pdf: formation3,
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Cadillac",
      image: reformerGyrotonicImage,
      prices: ["999 €", "399 €"],
      pdf: formation4,
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Barrils",
      image: formation1Image,
      prices: ["399 €", "299 €"],
      pdf: formation5,
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Anatomie Fonctionnelle et biomécanique en privée",
      image: formation5Image,
      prices: ["1199 €"],
      pdf: formation6,
    },
    {
      title: "Blessures et Population spécifiques et prénatal et postnatal-ISP",
      image: Blessures,
      prices: ["1599 €"],
      pdf: formation7,
    },
  ];

  return (
    <div>
      <Swiper
        className="centered-slide-carousel swiper-container relative mb-10"
        centeredSlides={true}
        // grabCursor={true}
        loop={true}
        spaceBetween={30}
        // slideToClickedSlide={true}
        pagination={{ el: ".swiper-pagination", clickable: true }} // Move clickable here
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1028: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          990: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
        }}
      >
        {formations.map((formation, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <FormationTarifCard formation={formation} />
          </SwiperSlide>
        ))}

        <div className="slider-controler flex justify-center gap-10 mt-4 ">
          <div className="cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
            <FaArrowLeftLong className="text-marron" />
          </div>
          <div className="cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
            <FaArrowRightLong className="text-marron" />
          </div>
          <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
        </div>
      </Swiper>
    </div>
  );
}
