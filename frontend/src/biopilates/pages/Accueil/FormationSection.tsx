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

export default function FormationSection({
  text = "Voir nos tarifs",
  bgColor = "bg-bgColor",
}) {
  const formations: Formation[] = [
    {
      title: "Reformer",
      image: reformerImage,
      description:
        "Devenez instructeur <strong>Reformer Pilates</strong> et transformez la posture et la force de vos élèves.",
    },
    {
      title: "Matwork",
      image: Matwork,
      description:
        "Devenez instructeur <strong>Matwork Pilates</strong> et maîtrisez l’art du renforcement et de la mobilité.",
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
        "Devenez instructeur <strong>Cadillac Pilates</strong> et explorez de nouvelles dimensions de force et de flexibilité.",
    },
    {
      title: "Barrils",
      image: formation1Image,
      description:
        "Devenez instructeur <strong>Barril Pilates</strong> et développez la puissance et la fluidité de vos élèves.",
    },
    {
      title: "Anatomie Fonctionnelle et biomécanique en privée",
      image: formation5Image,
      description:
        "Devenez instructeur en <strong>anatomie</strong> et améliorez votre compréhension du corps pour mieux guider vos élèves.",
    },
    {
      title: "Blessures et Population spécifiques et prénatal et postnatal-ISP",
      image: Blessures,
      description:
        "Devenez instructeur en <strong>ISP</strong> et apprenez à équilibrer corps et esprit pour optimiser la performance.",
    },
  ];

  const navigate = useNavigate();
  const navigateToTarifs = () => {
    navigate("/formations#formations-prix");
  };
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
        className="centered-slide-carousel swiper-container overflow-hidden mx-[-20px] md:mx-[-48px]"
        centeredSlides={true}
        grabCursor={true}
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
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1028: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          820: {
            slidesPerView: 2.5,
            spaceBetween: 8,
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

        <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute left-5 top-1/2 transform -translate-y-1/2 z-20">
          <FaArrowLeftLong className="text-marron" />
        </div>
        <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute right-5 top-1/2 transform -translate-y-1/2 z-20">
          <FaArrowRightLong className="text-marron" />
        </div>
      </Swiper>

      <button
        className={`mx-auto max-md:mb-8 md:mb-16 overflow-hidden reserver-button ${bgColor} flex flex-col justify-center items-center text-base leading-6 rounded-md transform`}
        onClick={navigateToTarifs}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
