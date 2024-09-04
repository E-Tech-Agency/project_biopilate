import React from "react";
import "swiper/swiper-bundle.css";
import "../assets/styles/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CircleSwiperCarousel({ images }) {
  return (
    <div className="container overflow-hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-160}
        loop={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 5,
          slideShadows: false,
        }}
        Pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        initialSlide={3}
        className="swiper_container"
      >
        <SwiperSlide>
          <img
            src={images[0]}
            alt="slide_image"
            className="rounded-full object-cover w-[220px] h-[220px] sm:w-[312px] sm:h-[312px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={images[1]}
            alt="slide_image"
            className="rounded-full object-cover w-[220px] h-[220px] sm:w-[312px] sm:h-[312px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={images[2]}
            alt="slide_image"
            className="rounded-full object-cover w-[220px] h-[220px] sm:w-[312px] sm:h-[312px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={images[3]}
            alt="slide_image"
            className="rounded-full object-cover w-[220px] h-[220px] sm:w-[312px] sm:h-[312px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={images[4]}
            alt="slide_image"
            className="rounded-full object-cover w-[220px] h-[220px] sm:w-[312px] sm:h-[312px]"
          />
        </SwiperSlide>
        <div className="slider-controler flex justify-center gap-20">
          <div className="swiper-but-prev slider-arrow cursor-pointer">
            <IoIosArrowBack className="text-marron text-4xl" />
          </div>
          <div className="swiper-but-next slider-arrow cursor-pointer">
            <IoIosArrowForward className="text-marron text-4xl" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

// return (
//   <div>
//     <Swiper
//       className="centered-slide-carousel swiper-container relative"
//       centeredSlides={true}
//       loop={true}
//       spaceBetween={10}
//       slideToClickedSlide={true}
//       pagination={{
//         el: ".swiper-pagination",
//         clickable: true,
//       }}
//       breakpoints={{
//         1920: {
//           slidesPerView: 5,
//           spaceBetween: 1,
//         },
//         1600: {
//           slidesPerView: 5,
//           spaceBetween: 1,
//         },
//         1440: {
//           slidesPerView: 5,
//           spaceBetween: 1,
//         },
//         1280: {
//           slidesPerView: 5,
//           spaceBetween: 1,
//         },
//         1028: {
//           slidesPerView: 5,
//           spaceBetween: 10,
//         },
//         990: {
//           slidesPerView: 5,
//           spaceBetween: 8,
//         },
//         768: {
//           slidesPerView: 2,
//           spaceBetween: 5,
//         },

//         640: {
//           slidesPerView: 2,
//           spaceBetween: 2,
//         },
//       }}
//     >
//       <div className="flex flex-nowrap gap-8 overflow-hidden w-[40%]">
//         {images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <div className="bg-bgColor rounded-full shadow-md min-w-[240px] sm:min-w-[340px] sm:max-w-[350px]">
//               <img
//                 src={image}
//                 alt={`Slide ${index}`}
//                 className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] object-cover"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </div>
//       <div className="swiper-pagination m-auto z-[1]"></div>
//     </Swiper>
//   </div>
// );
