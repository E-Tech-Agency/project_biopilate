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
export default function ServicesSection() {
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
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="font-bold font-ebGaramond text-center flex flex-col gap-2 md:gap-4">
          <p className="text-marron text-xl md:text-3xl">Nos services</p>
          <p className="text-blueText text-lg md:text-2xl">
            Cours de Pilates pour tous niveaux
          </p>
        </div>
        <div className="md:mx-20 text-center text-sm md:text-xl">
          <p className="">
            Découvrez une transformation de votre bien-être physique et mental
            grâce à nos cours de Pilates.
          </p>
          <p className="">
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
        <div className="flex flex-nowrap gap-2 overflow-hidden justify-around">
          {services.map((service, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
      </Swiper>
      {/* tarif button */}
      <button
        className="mx-auto max-md:my-8 md:mb-10 overflow-hidden reserver-button flex flex-col justify-center items-center text-base leading-6 rounded-md transform"
        onClick={navigateToTarifs}
      >
        <div className="hover-circle overflow-hidden" />
        Voir nos tarifs
      </button>
    </div>
  );
}
