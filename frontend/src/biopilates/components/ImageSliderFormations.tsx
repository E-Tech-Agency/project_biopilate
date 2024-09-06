import { useState, useEffect } from "react";
import "@/assets/styles/image-slider.css";
import "swiper/swiper-bundle.css";
import "@/assets/styles/swiper.css";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

type ListItem = {
  title: string;
  description: string;
  image: string;
  formation: string;
};

interface ImageSliderFormationsProps {
  list: ListItem[];
  action: string;
}

export default function ImageSliderFormations({
  list,
  action,
}: ImageSliderFormationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Animation timeout
  };

  // Check if list is empty or currentIndex is out of bounds
  const currentItem = list[currentIndex] || null;

  return (
    <div className="mb-14 flex flex-col-reverse lg:flex-row gap-5 xl:gap-8 max-lg:flex-wrap overflow-hidden lg:h-[530px]">
      <div className="flex flex-col justify-center max-md:items-center px-3 xl:px-2 md:px-5 lg:min-w-[40%] lg:max-w-[50%] gap-5 font-lato">
        {currentItem && (
          <>
            <div className="text-wrapper overflow-hidden relative h-fit">
              <p
                className={`text-marron text-3xl leading-snug hidden lg:block title-animation ${
                  isAnimating ? "slide-out-bottom" : "slide-in-top"
                }`}
              >
                {currentItem.title}
              </p>
            </div>
            <div className="text-wrapper overflow-hidden relative min-h-[150px]">
              <p
                className={`leading-7 ${
                  isAnimating ? "slide-out-bottom" : "slide-in-top"
                }`}
                dangerouslySetInnerHTML={{
                  __html: currentItem.description,
                }}
              ></p>
            </div>
            <button className="reserver-button flex justify-center md:mr-auto text-base rounded-lg px-10 py-4 max-md:w-full bg-bgColor text-marron font-lato">
              <div>{action}</div>
            </button>
          </>
        )}
      </div>

      <div className="container">
        <Swiper
          className="relative"
          grabCursor={true}
          slidesPerView={3}
          loop={true}
          spaceBetween={10}
          slideToClickedSlide={true}
          onSlideChange={(swiper) => handleImageClick(swiper.realIndex)}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          modules={[Pagination, Navigation]}
          initialSlide={1}
          breakpoints={{
            1920: { slidesPerView: 5, spaceBetween: 20 },
            1600: { slidesPerView: 4, spaceBetween: 20 },
            1440: { slidesPerView: 4, spaceBetween: 15 },
            1280: { slidesPerView: 3, spaceBetween: 10 },
            1028: { slidesPerView: 3, spaceBetween: 10 },
            990: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 2, spaceBetween: 5 },
            640: { slidesPerView: 1, spaceBetween: 4 },
            550: { slidesPerView: 1, spaceBetween: 4 },
            310: { slidesPerView: 1, spaceBetween: 4 },
          }}
        >
          {/* Add your Swiper slides here */}
        </Swiper>
      </div>

      <p className="text-marron text-3xl leading-snug text-center lg:hidden title-animation">
        {currentItem ? currentItem.title : ""}
      </p>
    </div>
  );
}
