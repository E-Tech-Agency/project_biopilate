import { Swiper, SwiperSlide } from "swiper/react";
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
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-marron text-3xl font-bold font-ebGaramond">
          Nos services
        </p>
        <p className="text-blueText text-2xl font-bold font-ebGaramond">
          Cours de Pilates pour tous niveaux
        </p>
        <div>
          <p className=" md:mx-20 text-center text-xl leading-6">
            Découvrez une transformation de votre bien-être physique et mental
            grâce à nos cours de Pilates.
          </p>
          <p className=" md:mx-20 text-center text-xl">
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
            slidesPerView: 2,
            spaceBetween: 2,
          },
          550: {
            slidesPerView: 2,
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
    </div>
  );
}
