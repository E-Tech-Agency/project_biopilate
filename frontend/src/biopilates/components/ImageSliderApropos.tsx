import { useState, useEffect } from "react";
import "@/assets/styles/image-slider.css";
import "@/assets/styles/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Define types for the props
type ListItem = {
  title: string;
  image: string;
  description: string;
};

interface ImageSliderAproposProps {
  list: ListItem[];
  action: string;
}

export default function ImageSliderApropos({ list, action }: ImageSliderAproposProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isMobile) setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setHoverIndex(null);
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const navigateToMethode = (title: string) => {
    const formattedTitle = title.replace(/\s/g, "");
    navigate(`/a-propos/${formattedTitle}`);
  };

  return (
    <div className="mb-14 flex flex-col-reverse lg:flex-row gap-5 xl:gap-8 max-lg:flex-wrap overflow-hidden lg:h-[530px]">
      <div className="flex flex-col justify-center max-md:items-center px-3 xl:px-2 md:px-5 lg:min-w-[35%] lg:max-w-[50%] gap-5 font-lato">
        <div className="text-wrapper overflow-hidden relative h-[50px]">
          <p
            className={`text-marron text-3xl leading-snug hidden lg:block title-animation ${
              isAnimating ? "slide-out-bottom" : "slide-in-top"
            }`}
          >
            {list[currentIndex].title}
          </p>
        </div>
        <div className="text-wrapper overflow-hidden relative min-h-[150px]">
          <p
            className={`leading-7 ${
              isAnimating ? "slide-out-bottom" : "slide-in-top"
            }`}
            dangerouslySetInnerHTML={{ __html: list[currentIndex].description }}
          ></p>
        </div>
        <button className="reserver-button flex justify-center md:mr-auto text-base rounded-lg px-10 py-4 max-md:w-full bg-bgColor text-marron font-lato">
          <div>{action}</div>
        </button>
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
          pagination={{ el: ".swiper-pagination", clickable: true }} // Correct property name
          modules={[Pagination]}
          initialSlide={1}
          breakpoints={{
            1920: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 4,
              spaceBetween: 20,
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
              slidesPerView: 1,
              spaceBetween: 4,
            },
            550: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
            310: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
          }}
        >
          {list.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`flex flex-col justify-center items-center ${
                currentIndex === index ? "active-slide" : ""
              }`}
            >
              <div
                className={`relative rounded-lg cursor-pointer transition-all duration-400 ${
                  currentIndex === index
                    ? "w-[300px] h-[450px]"
                    : "w-[206px] h-[309px] sm:w-[240px] sm:h-[360px]"
                }`}
                onClick={() => handleImageClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 size-full">
                  <img
                    loading="lazy"
                    src={item.image}
                    alt="Gym"
                    className="size-full rounded-lg object-cover"
                  />
                </div>
                <div className="relative text-bgColor size-full">
                  <div
                    className={`flex flex-col pb-2 gap-5 transition-all duration-500 ease-in-out ${
                      hoverIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-[70%] rounded-lg ${
                        hoverIndex === index ? "opacity-75" : "opacity-15"
                      }`}
                    />
                    <div className="absolute rounded-md size-full flex flex-col justify-center flex-nowrap items-center gap-4 py-16 px-8 font-ebGaramond">
                      <h3 className="text-base font-normal absolute bottom-0 left-0 right-0 text-center pb-20">
                        Découvrir notre méthode
                      </h3>
                      <div
                        className="flex justify-center items-center text-lg font-semibold absolute bottom-0 left-0 right-0 text-center pb-12"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when button is clicked
                          navigateToMethode(item.title); // Navigate when button is clicked
                        }}
                      >
                        <h3>{item.title}</h3>
                        <BsArrowUpRight className="text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination m-auto z-[1] block"></div>
        </Swiper>
      </div>
      <p className="text-marron text-3xl leading-snug text-center lg:hidden title-animation">
        {list[currentIndex].title}
      </p>
    </div>
  );
}