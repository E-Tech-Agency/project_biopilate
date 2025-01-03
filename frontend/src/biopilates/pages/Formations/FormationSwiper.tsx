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
import blogBg from "@/assets/images/blog-bg.jpg";

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
      pdf: formation3,
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
      pdf: formation6,
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
      pdf: formation1,
    },
    {
      title: "Blessures et Population spécifiques et prénatal et postnatal-ISP",
      image: Blessures,
      prices: ["1599 €"],
      pdf: formation7,
    },
  ];

  return (
    <section className="relative mt-8">
      <div className="absolute inset-0">
        <img
          src={blogBg}
          alt=""
          className="w-full h-full object-cover blur-3xl opacity-65"
        />
      </div>
      <div className="relative">
        <div className="mb-8">
          <p className="text-marron text-xl sm:text-[34px] font-ebGaramond font-bold leading-snug mb-4">
            Formation Biopilates
          </p>
          <p className="text-sm sm:text-base leading-6">
            Devenez <strong>instructeur de Pilates</strong> : favorisez
            l'équilibre et le bien-être physique et mental, tout en vous
            transformant.{" "}
          </p>
          <p className="text-sm sm:text-base leading-6">
            Rejoignez notre formation et devenez un pilier d'harmonie.
          </p>
        </div>
        <Swiper
          className="centered-slide-carousel swiper-container relative mb-10"
          // centeredSlides={true}
          // grabCursor={true}
          loop={true}
          spaceBetween={30}
          initialSlide={2}
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
            1650: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1500: {
              slidesPerView: 4.5,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 4.1,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1020: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            860: {
              slidesPerView: 2.5,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 1.85,
              spaceBetween: 4,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            400: {
              slidesPerView: 1.5,
              spaceBetween: 2,
            },
            310: {
              slidesPerView: 1.2,
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
          <div className="slider-controler flex justify-center gap-10 mb-6 ">
            {/* <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
              <FaArrowLeftLong className="text-marron" />
            </div>
            <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
              <FaArrowRightLong className="text-marron" />
            </div> */}
            <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
          </div>
        </Swiper>
        <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute left-[-15px] top-[55%] transform -translate-y-1/2 z-20">
          <FaArrowLeftLong className="text-bgColor b" />
        </div>
        <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute right-[-15px] top-[55%] transform -translate-y-1/2 z-20">
          <FaArrowRightLong className="text-bgColor b" />
        </div>
      </div>
    </section>
  );
}
