
import FormationCard from "@/biopilates/components/FormationCard";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '@/assets/styles/swiper.css';
import { Pagination, Navigation } from "swiper/modules";

// Import images directly
import reformerImage from '@/assets/images/reformer.jpg';
import formation2Image from '@/assets/images/formation-2.jpg';
import reformerGyrotonicImage from '@/assets/images/reformer-gyrotonic.jpg';
import formation1Image from '@/assets/images/formation-1.jpg';
import formation5Image from '@/assets/images/formation-5.png';

// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  prices: string[];
  levels?: string[];
}

export default function FormationSection() {
  const formations: Formation[] = [
    {
      title: "Reformer",
      image: reformerImage,
      prices: ["2299 €", "999 €"],
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Matwork",
      image: reformerImage,
      prices: ["1599 €", "399 €"],
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Chaise",
      image: formation2Image,
      prices: ["699 €", "299 €"],
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Cadillac",
      image: reformerGyrotonicImage,
      prices: ["999 €", "399 €"],
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Barrils",
      image: formation1Image,
      prices: ["399 €", "299 €"],
      levels: ["Débutant et intermédiaire", "Avancé"],
    },
    {
      title: "Anatomie Fonctionnelle et biomécanique en privée",
      image: formation5Image,
      prices: ["1199 €"],
    },
    {
      title: "Reformer",
      image: reformerImage,
      prices: ["1599 €"],
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-center items-center gap-4 md:gap-2">
        <p className="text-blueText text-3xl font-ebGaramond font-bold">
          Formations professionnelles pour devenir instructeur Pilates
        </p>
        <p className="lg:mx-40 text-center text-xl max-w-[1200px]">
          Explorez les bénéfices de sélectionner notre centre pour votre
          formation en Pilates : Nos programmes de premier ordre sont dirigés
          par des instructeurs chevronnés qui vous guideront tout au long de
          votre parcours.
        </p>
      </div>
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        slideToClickedSlide={true}
        pagination={{ clickable: true }}
        navigation={{}}
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
            <FormationCard formation={formation} />
          </SwiperSlide>
        ))}

        <div className="slider-controler flex justify-center gap-4 mb-10">
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
