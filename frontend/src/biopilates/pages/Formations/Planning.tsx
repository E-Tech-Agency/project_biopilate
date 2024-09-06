
import PlanningCard from "./PlanningCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";
type Plan = {
  title: string;
  niveau: string;
  image: string;
  date: string;
};

type Calendar = {
  timeSlots: string[];
};

interface PlanningProps {
  plans: Plan[];
  calendar: Calendar[];
}
export default function Planning({ plans, calendar }: PlanningProps) {
  return (
    <div className="mb-8">
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 25,
            allowSlideNext: false,
            allowSlidePrev: false,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 20,
            allowSlideNext: false,
            allowSlidePrev: false,
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
            spaceBetween: 2,
          },
        }}
      >
        <div className="flex flex-nowrap gap-8 overflow-hidden">
          {plans.map((plan, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <PlanningCard key={index} plan={plan} calendar={calendar[index]} />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination m-auto z-[1]"></div>
      </Swiper>
    </div>
  );
}
