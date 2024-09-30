import "swiper/swiper-bundle.css";
import "@/assets/styles/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import BlogCard from "@/biopilates/components/BlogCard";

interface Article {
  id: number;
  title: string;
  ecrivain: string;
  description: string;
  jaimes: number;
  image: string;
}

export default function OtherArticles({ articles }: { articles: Article[] }) {
  return (
    <div className="w-full">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 2,
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
            slidesPerView: 1,
            spaceBetween: 5,
          },

          640: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
          550: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
        }}
      >
        <div className="flex flex-nowrap justify-center items-center gap-2 overflow-hidden w-full">
          {articles.map((article) => (
            <SwiperSlide
              key={article.id}
              className="flex flex-col justify-center items-center"
            >
              <BlogCard article={article} />
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-controler flex justify-center items-ce gap-4 mb-10">
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
