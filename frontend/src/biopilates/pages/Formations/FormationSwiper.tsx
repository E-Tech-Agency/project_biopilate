import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";

// Import images directly
import reformerImage from "@/assets/images/reformer.jpg";
import formation2Image from "@/assets/images/formation-2.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
import formation1Image from "@/assets/images/formation-1.jpg";
import formation5Image from "@/assets/images/formation-5.png";
import Matwork from "@/assets/images/formation-6.jpg";
import Blessures from "@/assets/images/formation-3.png";
import FormationTarifCard from "@/biopilates/components/FormationTarifCard";
import blogBg from "@/assets/images/blog-bg.jpg";

import formation1 from "@/assets/doc/1-Formation-Anatomie.pdf";
import formation2 from "@/assets/doc/2-Formation-Matwork.pdf";
import formation3 from "@/assets/doc/3-Formation-Reformer.pdf";
import formation4 from "@/assets/doc/4-Formation-Cadillac.pdf";
import formation5 from "@/assets/doc/5-Formation-Barils.pdf";
import formation6 from "@/assets/doc/6-Formation-Chaise.pdf";
import formation7 from "@/assets/doc/7-Formation-ISP.pdf";
import api from "@/lib/api";
import { FormationShow } from "@/types/formation";
import { useEffect, useState } from "react";

// Define TypeScript interface for formation data



export default function FormationSwiper() {
  const [formationsDataBackent, setFormations] = useState<FormationShow[]>([]);
  const getFormations = async () => {
    try {
      const res = await api.get("formation-bio-plates/");
      const publishedFormations = res.data.filter(
        (formation: FormationShow) => formation.status === "published"
      );
      setFormations(publishedFormations);
    } catch (error) {
      console.error("Error fetching formations", error);
    }
  };

  useEffect(() => {
    getFormations();
  }, []);
  const formations = [
    { 
      title: "Reformer",
      image: reformerImage,
    
      pdf_document: formation3,
     
      levels: [
        { name: "Débutant et intermédiaire", price: 2299 },
        { name: "Avancé", price: 999},
       
      ],
      status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"
    },
    {
      title: "Matwork",
      image: Matwork,
      pdf_document: formation2,
      levels: [
        { name: "Débutant et intermédiaire", price: 1599 },
        { name: "Avancé", price: 399},
       
      ],
       status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
    {
      
      title: "Chaise",
      image: formation2Image,
      
      pdf_document: formation6,
      levels: [
        { name: "Débutant et intermédiaire", price: 699 },
        { name: "Avancé", price: 299},
       
      ],
       status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
    {
      
      title: "Cadillac",
      image: reformerGyrotonicImage,
     
      pdf_document: formation4,
      levels: [
        { name: "Débutant et intermédiaire", price: 999 },
        { name: "Avancé", price: 399},
       
      ],
      status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
    {
      title: "Barrils",
      image: formation1Image,
     
      pdf_document: formation5,
      levels: [
        { name: "Débutant et intermédiaire", price: 399 },
        { name: "Avancé", price: 299},
       
      ],
      status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
    {
      title: "Anatomie Fonctionnelle et biomécanique en privée",
      image: formation5Image,
    
      pdf_document: formation1,
      levels: [
        { name: "tous les niveaux", price: 1199 },
      
       
      ],
      status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
    {
      title: "Blessures et Population spécifiques et prénatal et postnatal-ISP",
      image: Blessures,
     
      pdf_document: formation7,
      levels: [
        { name: "tous les niveaux", price: 1599 },
      
       
      ],
      status : "published",
      formation_line : "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ"

    },
  ];
  const dataFormation = formationsDataBackent.length > 0 ? formationsDataBackent : formations;

  return (
    <section className="relative mt-8">
      <div className="absolute inset-0">
        <img
          src={blogBg}
          alt=""
          className="w-full h-full object-cover blur-3xl opacity-65"
        />
      </div>
      <div className="relative">
        <div className="mb-8">
          <p className="text-marron text-xl sm:text-[34px] font-ebGaramond font-bold leading-snug mb-4">
            Formation Biopilates
          </p>
          <p className="text-sm sm:text-base leading-6">
            Devenez <strong>instructeur de Pilates</strong> : favorisez
            l'équilibre et le bien-être physique et mental, tout en vous
            transformant.{" "}
          </p>
          <p className="text-sm sm:text-base leading-6">
            Rejoignez notre formation et devenez un pilier d'harmonie.
          </p>
        </div>
        <Swiper
          className="centered-slide-carousel swiper-container relative mb-10"
          // centeredSlides={true}
          // grabCursor={true}
          loop={true}
          spaceBetween={30}
          initialSlide={2}
          // slideToClickedSlide={true}
          pagination={{ el: ".swiper-pagination", clickable: true }} // Move clickable here
          navigation={{
            nextEl: ".swiper-but-next",
            prevEl: ".swiper-but-prev",
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1920: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
            1650: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1500: {
              slidesPerView: 4.5,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 4.1,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1020: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            860: {
              slidesPerView: 2.5,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 1.85,
              spaceBetween: 4,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            400: {
              slidesPerView: 1.5,
              spaceBetween: 2,
            },
            310: {
              slidesPerView: 1.2,
              spaceBetween: 4,
            },
          }}
        >
          {dataFormation.map((formation, index) => (
         <SwiperSlide key={index} className="flex flex-col justify-center items-center">
         <FormationTarifCard
         // Add id here
           title={formation.title}
           image={formation.image}
           pdf_document={formation.pdf_document}
           levels={formation.levels}
           formation_line={formation.formation_line}
           status={formation.status}  // Add status here
         />
       </SwiperSlide>
       
          ))}
          <div className="slider-controler flex justify-center gap-10 mb-6 ">
            {/* <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
              <FaArrowLeftLong className="text-marron" />
            </div>
            <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
              <FaArrowRightLong className="text-marron" />
            </div> */}
            <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
          </div>
        </Swiper>
        <div className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute left-[-15px] top-[55%] transform -translate-y-1/2 z-20">
          <FaArrowLeftLong className="text-bgColor b" />
        </div>
        <div className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute right-[-15px] top-[55%] transform -translate-y-1/2 z-20">
          <FaArrowRightLong className="text-bgColor b" />
        </div>
      </div>
    </section>
  );
}
