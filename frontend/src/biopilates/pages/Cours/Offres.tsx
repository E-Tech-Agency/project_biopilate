import tarifs from "@/assets/data/tarifs.json"; // Adjust the path as necessary
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";

export default function Offres() {
  return (
    <div>
      <p className="text-marron text-3xl leading-snug mb-6 font-ebGaramond font-bold">
        Nos offres - tarifs
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        slideToClickedSlide={true}
        autoplay={{
          delay: 3000, // 3 seconds delay between slides
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 35,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1028: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          990: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5,
          },

          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        <div className="flex flex-nowrap justify-center items-center gap-8 overflow-hidden">
          {tarifs.map((offre, index) => (
            <SwiperSlide key={index}>
              <div className="py-9 m-auto  flex flex-col justify-between items-center bg-bgColor p-4 rounded-lg shadow-md min-w-[240px] sm:min-w-[300px] max-w-[500px] h-[400px] gap-2 font-lato">
                <h3 className="text-xl  font-ebGaramond font-medium">
                  {offre.title}
                </h3>
                <p className="text-2xl text-marron pb-2 font-bold">
                  {offre.price}
                </p>
                {offre.pack1 !== "" && (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p>{offre.pack1}</p>
                    <p>{offre.pack2}</p>
                    <p>{offre.pack3}</p>
                  </div>
                )}
                <div className="flex flex-col justify-center items-center gap-2">
                  <p className="text-sm text-blueText pt-2">{offre.validity}</p>
                  <button
                    className="button-offre-hover font-bold flex flex-col justify-center text-marron rounded-lg px-16 sm:px-24 py-2 bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-controler flex justify-center gap-10 mb-10">
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
