import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";
import ServiceCard from "@/biopilates/components/ServiceCard";
import reformerImg from "@/assets/images/reformer.jpg";
import reformerGyrotonicImg from "@/assets/images/reformer-gyrotonic.jpg";
import reformerGyrotonicEvolisImg from "@/assets/images/reformer-gyrotonic-evolis.png";
import blogBg from "@/assets/images/blog-bg.jpg";

export default function ServicesSection({
  text = "Voir nos tarifs",
  bgColor = "bg-bgColor",
}) {
  const services = [
    {
      id: 1,
      title: "Cours Reformer",
      description: "Force et souplesse unies",
      image: reformerImg,
    },
    {
      id: 2,
      title: "Cours Reformer & Gyrotonic",
      description: "Synergie et équilibre",
      image: reformerGyrotonicImg,
    },
    {
      id: 3,
      title: "Cours Reformer, Gyrotonic & Evolis",
      description: "Trio dynamique pour vitalité",
      image: reformerGyrotonicEvolisImg,
    },
  ];

  const navigate = useNavigate();
  const navigateToTarifs = () => {
    navigate("/cours#tarifs");
  };

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src={blogBg}
          alt=""
          className="w-full h-full object-cover blur-3xl opacity-65"
        />
      </div>

      <div className="relative flex flex-col justify-center items-center gap-4 mb-6 z-10">
        <div className="font-bold font-ebGaramond text-center flex flex-col gap-2 md:gap-6">
          <p className="text-marron text-xl md:text-[34px]">Nos services</p>
          <p className="text-blueText text-lg md:text-[28px]">
            Cours de pilates et gyrotonic pour tous niveaux
          </p>
        </div>
        <div className="md:mx-20 text-center text-sm md:text-xl">
          <p>
            Découvrez une transformation de votre bien-être physique et mental
            grâce à nos cours de Pilates.
          </p>
          <p>
            Chaque mouvement vous guide vers une vitalité et une harmonie
            intérieure.
          </p>
        </div>
      </div>
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        centeredSlides={true}
        grabCursor={true}
        loop={false}
        spaceBetween={20}
        slideToClickedSlide={true}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[Pagination, Navigation]}
        initialSlide={1}
        breakpoints={{
          1920: {
            slidesPerView: 3,
            spaceBetween: 25,
            allowSlideNext: false,
            allowSlidePrev: false,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 20,
            allowSlideNext: false,
            allowSlidePrev: false,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1028: {
            slidesPerView: 2,
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
            slidesPerView: 1,
            spaceBetween: 2,
          },
          550: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* tarif button */}
      <button
        className={`mx-auto max-md:mb-8 md:mb-10 overflow-hidden reserver-button ${bgColor} flex flex-col justify-center items-center text-base leading-6 rounded-md transform`}
        onClick={navigateToTarifs}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
