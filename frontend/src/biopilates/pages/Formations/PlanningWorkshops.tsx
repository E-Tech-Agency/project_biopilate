import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";
import PlanningWorkshopCard from "./PlanningWorkshopCard";

type Plan = {
  title: string;
  niveau: string;
  image: string;
  date?: string;
  timeSlots: string[];
  price: string;
};

interface PlanningProps {
  plans: Plan[];
}

export default function PlanningWorkshops({ plans }: PlanningProps) {
  const [showMoreStates, setShowMoreStates] = useState<boolean[]>(
    plans.map(() => false)
  );

  const toggleShowMore = (index: number) => {
    setShowMoreStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <section className="mb-14">
      <p className="text-marron text-xl sm:text-[34px] leading-snug mb-10 font-ebGaramond font-bold">
        Tarifs et Planning des workshop
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        grabCursor={true}
        spaceBetween={30}
        slideToClickedSlide={false}
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
          1650: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          1050: {
            slidesPerView: 2.5,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 1.5,
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
              <PlanningWorkshopCard
                plan={plan}
                showMore={showMoreStates[index]}
                toggleShowMore={() => toggleShowMore(index)}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination m-auto z-[1]"></div>
      </Swiper>
    </section>
  );
}
