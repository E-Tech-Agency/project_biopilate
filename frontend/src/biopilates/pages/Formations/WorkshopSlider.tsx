import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import workshop1 from "@/assets/images/workshop-1.jpg";
import workshop2 from "@/assets/images/formation-6.jpg";
import workshop3 from "@/assets/images/reformer.jpg";
import workshop4 from "@/assets/images/reformer-gyrotonic.jpg";
import workshop5 from "@/assets/images/workshop-2.jpg";
import workshop6 from "@/assets/images/workshop-3.jpg";
import workshop7 from "@/assets/images/formation-5.png";
import workshop8 from "@/assets/images/workshop-4.jpg";
// import ReserverButton from "@/biopilates/components/ReserverButton";
import { WorkShop } from "@/types/types";
import  { useEffect, useState } from "react";7
import api from "@/lib/api";


type Workshop = {
  title: string;
  image: string;
};
function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate("/login");
  };
  return (
    <div className="relative w-[206px] h-[270px] sm:w-[300px] sm:h-[360px] rounded-lg shadow-lg font-lato">
      <div className="absolute flex flex-col justify-center items-center gap-4 bottom-0 w-full rounded-lg mb-7 z-20">
        <p className="text-center text-sm sm:text-[23px] leading-normal text-white font-bold font-ebGaramond mx-6">
          {workshop.title}
        </p>
        <button
          className="reserver-button bg-bgColor flex flex-col justify-center rounded-lg transform cursor-pointer"
          onClick={navigateToContact}
        >
          <div className="hover-circle overflow-hidden" />
          Découvrir
        </button>
      </div>

      <div className="absolute inset-0 size-full self-start">
        <div className="absolute left-0 max-sm:ml-[-40px] max-sm:mt-[54px] ml-[-60px] mt-12 z-10 overflow-hidden">
          <svg
            width="408"
            height="312"
            viewBox="0 0 408 312"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" max-sm:size-[115%]"
          >
            <path
              opacity="0.5"
              d="M61.0062 309.5C68.2051 219.674 86.9402 161.845 107.398 144.136C121.129 132.258 134.087 131.461 148.79 129.39C157.241 128.197 165.868 126.933 175.216 124.93C201.949 119.203 216.818 110.175 243.519 89.8811C249.703 85.169 256.08 80.0451 262.846 74.648C298.114 46.4898 335.507 11.9275 359.247 21.8017"
              stroke="#EBDCCD"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            <path
              opacity="0.5"
              d="M72.3934 311.5C79.5923 221.674 86.9402 197.846 107.398 180.137C121.129 168.258 134.087 168.462 148.79 166.391C157.241 165.198 165.868 163.934 175.216 161.931C201.949 156.203 216.818 147.175 243.519 126.882C249.703 122.17 256.08 117.046 262.846 111.649C298.114 83.4904 335.507 48.9281 359.247 58.8023"
              stroke="#EBDCCD"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-[70%] rounded-lg opacity-70" />
        <img
          loading="lazy"
          src={workshop.image}
          alt="Gym"
          className={"size-full rounded-lg object-cover"}
        />
      </div>
    </div>
  );
}

export default function WorkshopSlider() {
  const [workShops, setWorkShops] = useState<WorkShop[]>([]);
  const getWorkShop = async () => {
    try {
        const res = await api.get("workshops-biopilate/");
        const workShopsPublic = res.data.filter(
          (workShops: WorkShop) => workShops.status === "approved"
        );
        setWorkShops(workShopsPublic);

       
    } catch (error) {
        console.error("Error fetching workshops-biopilate", error);
        
    }
};
useEffect(() => {
  getWorkShop();
}, []);

  const workshops = [
    {
      title: "Workshop en ligne",
      image: workshop1,
    },
    {
      title: "Workshop Matwork",
      image: workshop2,
    },
    {
      title: "Workshop Reformer",
      image: workshop3,
    },
    {
      title: "Workshop Cadillac, chaise et barril",
      image: workshop4,
    },
    {
      title: "Workshop golfeurs",
      image: workshop5,
    },
    {
      title: "Workshop prénatal et postnatal",
      image: workshop6,
    },
    {
      title: "Workshop Anatomie et fascias",
      image: workshop7,
    },
    {
      title: "Workshop de préparation aux examens",
      image: workshop8,
    },
  ];
  const workShopsData =
  workShops && workShops.length > 0
    ? workShops.map((workShop) => ({
        id: workShop.id,
        title: workShop.title,
       
        description: workShop.description,
        
        image: workShop.image,
       
      }))
    : workshops;

  return (
    <section className="flex flex-col justify-center items-start w-full">
      <div className="mb-8">
        <p className="text-marron text-xl sm:text-[34px] font-ebGaramond font-bold leading-snug mb-4">
          Workshop
        </p>
        <p className="sm:leading-6 text-sm sm:text-lg">
          Participez à notre workshop pour devenir{" "}
          <strong>instructeur de Pilates</strong> : cultivez l'équilibre et le
          bien-être physique et mental, tout en vous épanouissant
          personnellement. Intégrez notre programme et devenez une source
          d'harmonie.
        </p>
      </div>

      <Swiper
        className="centered-slide-carousel swiper-container relative w-full overflow-hidde"
        // grabCursor={true}
        loop={true}
        // spaceBetween={40}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1650: {
            slidesPerView: 4.8,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4.2,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 3.6,
            spaceBetween: 16,
          },
          1100: {
            slidesPerView: 3.2,
            spaceBetween: 14,
          },
          990: {
            slidesPerView: 2.8,
            spaceBetween: 10,
          },
          790: {
            slidesPerView: 2.2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 1.8,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2.1,
            spaceBetween: 5,
          },
          320: {
            slidesPerView: 1.4,
            spaceBetween: 5,
          },
        }}
      >
        {workShopsData.map((workshop, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <WorkshopCard workshop={workshop} />
          </SwiperSlide>
        ))}
        <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute left-0 top-[45%] transform -translate-y-1/2 z-20">
          <FaArrowLeftLong className="text-marron" />
        </div>
        <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10 absolute right-0 top-[45%] transform -translate-y-1/2 z-20">
          <FaArrowRightLong className="text-marron" />
        </div>
      </Swiper>
    </section>
  );
}
