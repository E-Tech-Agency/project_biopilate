import { useState, useEffect } from "react";

import FormationCard from "@/biopilates/components/FormationCard";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// Import images directly
import reformerImage from "@/assets/images/reformer.jpg";
import formation2Image from "@/assets/images/formation-2.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
import formation1Image from "@/assets/images/formation-1.jpg";
import formation5Image from "@/assets/images/formation-5.png";
import Matwork from "@/assets/images/formation-6.jpg";
import Blessures from "@/assets/images/formation-3.png";
// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  description: string;
}
const formations: Formation[] = [
  {
    title: "Reformer",
    image: reformerImage,
    description:
      "Devenez instructeur <strong>Reformer Pilates</strong> <p>et transformez la posture et la force de vos élèves.</p>",
  },
  {
    title: "Matwork",
    image: Matwork,
    description:
      "Devenez instructeur <strong>Matwork Pilates</strong> <p>et maîtrisez l’art du renforcement et de la mobilité.</p>",
  },
  {
    title: "Chaise",
    image: formation2Image,
    description:
      "Devenez instructeur de la <strong>Chaise Pilates</strong> et optimisez la force et l'équilibre de vos élèves.",
  },
  {
    title: "Cadillac",
    image: reformerGyrotonicImage,
    description:
      "Devenez instructeur <strong>Cadillac Pilates</strong> <p>et explorez de nouvelles dimensions de force et de flexibilité.</p>",
  },
  {
    title: "Barrils",
    image: formation1Image,
    description:
      "Devenez instructeur <strong>Barril Pilates</strong> <p>et développez la puissance et la fluidité de vos élèves.</p>",
  },
  {
    title: "<p>Anatomie Fonctionnelle </p>et biomécanique en privée",
    image: formation5Image,
    description:
      "Devenez instructeur en <strong>anatomie</strong> <p>et améliorez votre compréhension du corps pour mieux guider vos élèves.</p>",
  },
  {
    title:
      "<p>Blessures et Population spécifiques et prénatal</p> et postnatal-ISP",
    image: Blessures,
    description:
      "<p>Devenez instructeur en <strong>ISP</strong> </p>et apprenez à équilibrer corps <p>et esprit pour optimiser la performance.</p>",
  },
];

const formationsSmallScreen: Formation[] = [
  {
    title: "Reformer",
    image: reformerImage,
    description:
      "Devenez instructeur <strong>Reformer Pilates</strong> <p>et transformez la posture </p>et la force de vos élèves.",
  },
  {
    title: "Matwork",
    image: Matwork,
    description:
      "Devenez instructeur <strong>Matwork Pilates</strong> <p>et maîtrisez l’art du renforcement et de la mobilité.</p>",
  },
  {
    title: "Chaise",
    image: formation2Image,
    description:
      "Devenez instructeur de la <strong>Chaise Pilates</strong> et optimisez la force et l'équilibre de vos élèves.",
  },
  {
    title: "Cadillac",
    image: reformerGyrotonicImage,
    description:
      "Devenez instructeur <strong>Cadillac Pilates</strong> et explorez de<p> nouvelles dimensions de force et de flexibilité.</p>",
  },
  {
    title: "Barrils",
    image: formation1Image,
    description:
      "Devenez instructeur <strong>Barril Pilates</strong> et développez<p> la puissance et la fluidité de vos élèves.</p>",
  },
  {
    title: "<p>Anatomie Fonctionnelle </p>et biomécanique en privée",
    image: formation5Image,
    description:
      "Devenez instructeur en <strong>anatomie</strong> et améliorez votre<p> compréhension du corps pour mieux guider vos élèves.</p>",
  },
  {
    title:
      "<p>Blessures et Population spécifiques et prénatal</p> et postnatal-ISP",
    image: Blessures,
    description:
      "<p>Devenez instructeur en <strong>ISP</strong> </p>et apprenez à équilibrer corps et esprit  optimiser la performance.",
  },
];

export default function FormationSection({
  text = "Voir nos tarifs",
  bgColor = "bg-bgColor",
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    // Initial check
    setIsSmallScreen(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const navigate = useNavigate();
  const navigateToTarifs = () => {
    navigate("/formations#ftarif");
  };

  const formationsToDisplay = isSmallScreen
    ? formationsSmallScreen
    : formations;

  return (
    <div className="z-20">
      <div className="mb-6 flex flex-col text-center justify-center items-center gap-4 md:gap-2">
        <p className="text-gray-500 text-xl md:text-[28px] font-ebGaramond font-bold">
          Formations professionnelles pour devenir instructeur Pilates
        </p>
        <p className="lg:mx-40 text-center text-sm md:text-xl max-w-[1200px]">
          Explorez les bénéfices de sélectionner notre centre pour votre
          formation en Pilates : Nos programmes de premier ordre sont dirigés
          par des instructeurs chevronnés qui vous guideront tout au long de
          votre parcours.
        </p>
      </div>
      <Swiper
        className="centered-slide-carousel swiper-container overflow-hidden mx-[-20px] md:mx-[-10px] px-4"
        // centeredSlides={true}
        grabCursor={true}
        loop={true}
        spaceBetween={20}
        slidesOffsetAfter={30}
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
          1690: {
            slidesPerView: 5.15,
            spaceBetween: 20,
          },
          1470: {
            slidesPerView: 4.4,
            spaceBetween: 15,
          },
          1320: {
            slidesPerView: 3.8,
            spaceBetween: 10,
          },
          1110: {
            slidesPerView: 3.2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 2.8,
            spaceBetween: 8,
          },
          850: {
            slidesPerView: 2.3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },

          620: {
            slidesPerView: 1.9,
            spaceBetween: 4,
          },
          450: {
            slidesPerView: 1.7,
            spaceBetween: 5,
          },
          355: {
            slidesPerView: 1.3,
            spaceBetween: 3,
          },
          320: {
            slidesPerView: 1.15,
            spaceBetween: 3,
          },
        }}
      >
        {formationsToDisplay.map((formation, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <FormationCard formation={formation} />
          </SwiperSlide>
        ))}

        <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute left-5 top-[45%] transform -translate-y-1/2 z-20">
          <FaArrowLeftLong className="text-marron" />
        </div>
        <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute right-5 top-[45%] transform -translate-y-1/2 z-20">
          <FaArrowRightLong className="text-marron" />
        </div>
      </Swiper>

      <button
        className={`mx-auto max-md:mb-8 md:mb-10 overflow-hidden bg-bgColor px-4 py-2 font-semibold text-marron hover:text-white ${bgColor} flex flex-col justify-center items-center text-base leading-6 rounded-md transform ease-in-out tr `}
        onClick={navigateToTarifs}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
