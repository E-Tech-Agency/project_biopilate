import "swiper/swiper-bundle.css";
import "@/assets/styles/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CircleSwiperCarouselProps {
  images: string[];
}

const CircleSwiperCarousel: React.FC<CircleSwiperCarouselProps> = ({
  images,
}) => {
  return (
    <div className="container overflow-hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-200}
        loop={true}
        slidesPerView={4}
        breakpoints={{
          1920: {
            slidesPerView: 4,
          },
          1600: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          },
          1028: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 5,
          slideShadows: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }} // Move clickable here
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        initialSlide={3}
        className="swiper_container"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`slide_image_${index}`}
              className="rounded-full object-cover w-[220px] h-[220px] sm:w-[327px] sm:h-[327px]"
            />
          </SwiperSlide>
        ))}

        <div className="slider-controler flex justify-center gap-20">
          <div className="swiper-but-prev slider-arrow cursor-pointer max-sm:hidden">
            <IoIosArrowBack className="text-marron text-4xl" />
          </div>
          <div className="swiper-but-next slider-arrow cursor-pointer max-sm:hidden">
            <IoIosArrowForward className="text-marron text-4xl" />
          </div>
          {/* <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div> */}
        </div>
      </Swiper>
    </div>
  );
};

export default CircleSwiperCarousel;
