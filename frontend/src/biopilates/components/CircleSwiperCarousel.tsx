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
    <div className="container sm:overflow-hidden sm:mt-12 px-0 max-sm:mx-[-20px]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-200}
        loop={true}
        slidesPerView={3}
        breakpoints={{
          1280: {
            slidesPerView: 4,
          },
          1028: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 3.5,
            spaceBetween: -100,
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
        className="swiper_container pb-[-64px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`slide_image_${index}`}
              className="rounded-full object-cover w-[170px] h-[170px] sm:w-[327px] sm:h-[327px] mx-auto"
            />
          </SwiperSlide>
        ))}

        {/* <div className="slider-controler flex justify-center gap-20">
          <div className="swiper-but-prev slider-arrow cursor-pointer max-sm:hidden">
            <IoIosArrowBack className="text-marron text-4xl" />
          </div>
          <div className="swiper-but-next slider-arrow cursor-pointer max-sm:hidden">
            <IoIosArrowForward className="text-marron text-4xl" />
          </div>
        </div> */}

        <div className="cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center w-10 h-10 absolute left-5 top-[45%] transform -translate-y-1/2 z-20">
          <IoIosArrowBack className="text-marron text-5xl" />
        </div>
        <div className="cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center w-10 h-10 absolute right-5 top-[45%] transform -translate-y-1/2 z-20">
          <IoIosArrowForward className="text-marron text-5xl" />
        </div>
      </Swiper>
    </div>
  );
};

export default CircleSwiperCarousel;
