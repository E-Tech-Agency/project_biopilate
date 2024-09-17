import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import StartupAnimation from "./StartupAnimation";

import { Pagination } from "swiper/modules";
import image1 from "@/assets/images/pourqui-1.jpg";
import image2 from "@/assets/images/pourqui-2.jpg";
import image3 from "@/assets/images/pourqui-3.jpg";
import image4 from "@/assets/images/pourqui-4.jpg";
import image5 from "@/assets/images/pourqui-5.jpg";
import image6 from "@/assets/images/pourqui-6.jpg";
type PourQui = {
  title: string;
  image: string;
  description: string;
};
function PourQuiCard({ pourqui }: { pourqui: PourQui }) {
  return (
    <div className="relative w-[280px] h-[334px] sm:w-[393px] sm:h-[454px] rounded-lg shadow-lg font-lato">
      <div className="absolute inset-0 size-full self-start h-[83%]">
        <img
          loading="lazy"
          src={pourqui.image}
          alt="Gym"
          className={"size-full rounded-lg object-cover"}
        />
      </div>
      {/* overlay */}
      <div className="relative size-full ">
        <button className="absolute reserver-button flex flex-col justify-center text-sm sm:text-base rounded-lg px-4 py-3 bg-white text-black bg-opacity-80 font-lato font-bold mt-4 ml-4">
          {pourqui.title}
        </button>
        <p className="absolute bg-white h-[86px] rounded-lg rounded-t-none text-sm sm:text-base font-normal bottom-0 left-0 right-0 text-center flex justify-center items-center">
          {pourqui.description}
        </p>
      </div>
    </div>
  );
}
function Slider() {
  const principes = [
    {
      title: "Tous publics",
      image: image1,
      description:
        "Modelage de la silhouette, amélioration du maintien postural et renforcement du périnée.",
    },
    {
      title: "Actifs surmenés",
      image: image2,
      description:
        "Réduction des douleurs dorsales, relaxation et redynamisation.",
    },
    {
      title: "Sédentaires",
      image: image3,
      description:
        "Soulagement des maux de dos et renforcement  musculaire global.",
    },
    {
      title: "Seniors",
      image: image4,
      description:
        "Lutte contre le vieillissement, amélioration de l'équilibre et de la coordination.",
    },
    {
      title: "Sportifs",
      image: image5,
      description: "Conditionnement musculaire et récupération physique.",
    },
    {
      title: "Adolescents",
      image: image6,
      description: "Prévention pendant la phase de croissance.",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center w-full h-[480px] sm:h-[530px]">
      <Swiper
        className="centered-slide-carousel swiper-container relative w-full"
        grabCursor={true}
        spaceBetween={40}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Pagination]} // Fix: Wrapping Pagination in an array
        breakpoints={{
          1920: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1750: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1028: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          990: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
        }}
      >
        {principes.map((pourqui, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center xl:items-start"
          >
            <PourQuiCard pourqui={pourqui} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-controler flex justify-center items-center">
        <div className="swiper-pagination m-auto z-[1]"></div>
      </div>
    </section>
  );
}

import evolisImage from "@/assets/images/evolis.jpg";
import evolisEtirementImage from "@/assets/images/evolis-etirement.jpg";
import evolisSkeletonImage from "@/assets/images/evolis-skeleton.jpg";
import evolisPostureImage from "@/assets/images/evolis-posture.png";

export default function Evolis() {
  const images = [    
    evolisImage,
    evolisEtirementImage,
    evolisSkeletonImage,
    evolisPostureImage,
    evolisImage,
   
  ];
  return (
    <div className="relative overflow-hidden">
      <StartupAnimation images={images} />

      {/* Page Content */}
      <div className="flex flex-col mt-8 mx-8 md:mx-12 mb-12 gap-6 font-lato">
        <div className="flex flex-col-reverse md:flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-ebGaramond text-marron font-bold">
              Formation et Cours EVOLIS à Paris - Studio Biopilates
            </h1>
            <h2 className="text-xl font-ebGaramond text-blueText">
              Découvrez les cours et formations Evolis à Paris au Studio
              Biopilates. Une méthode innovante pour améliorer posture,
              souplesse et bien-être général. Réservez votre séance dès
              aujourd'hui !
            </h2>
          </div>
          <img
            loading="lazy"
            src={evolisImage}
            alt="Stott Pilates"
            className="rounded-sm w-full max-h-[680px] object-cover shadow-lg my-6"
          />
        </div>

        <p className="text-justify leading-8">
          Bienvenue au Studio Biopilates, situé au cœur de Paris, où nous
          proposons <strong>la méthode Evolis®</strong>, développée par{" "}
          <strong>Jean Frelat</strong>
          Frelat . Cette approche globale de santé repose sur un réflexe
          proprioceptif et une nouvelle manière de renforcer les muscles.
        </p>

        <h1 className="text-3xl text-marron font-bold font-ebGaramond">
          Les Principes de la Méthode Evolis® :
        </h1>
        <ul className="text-lg font-lato list-disc ml-5">
          <li>
            <strong>Travail Musculaire Excentrique : </strong>
            Renforcement des muscles superficiels et profonds sans effort
            excessif.
          </li>
          <li>
            <strong>Étirements Actifs et Passifs : </strong>Alternance pour
            optimiser la contraction musculaire et améliorer la souplesse.
          </li>
          <li>
            <strong>Synchronisation de la Respiration : </strong>Pour une
            meilleure coordination et un bien-être général.
          </li>
        </ul>

        {/* Bénefices: */}
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-marron font-bold font-ebGaramond">
              Bénéfices :{" "}
            </h1>
            <p className="text-base mb-4">
              <strong>La méthode Evolis®</strong> favorise:
            </p>
          </div>

          <div className="flex justify-evenly md:items-start max-md:flex-col gap-16 md:m-auto text-center">
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={evolisSkeletonImage}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                la réorganisation du squelette
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={evolisPostureImage}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">améliore la posture</h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={evolisEtirementImage}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px] sm:w-[165px] ">
                l'amplitude des mouvements
              </h2>
            </div>
          </div>
          <p className="text-base">
            Elle est idéale pour tous les âges et niveaux de forme physique.
          </p>
        </div>

        {/* Pour qui */}
        <div className="flex flex-col gap-4 mt-10">
          <h1 className="text-3xl text-marron font-bold font-ebGaramond">
            Pour Qui ?
          </h1>
          <Slider />
        </div>

        {/* Reserver */}
        <div className="flex max-md:flex-wrap justify-center xl:justify-between items-center gap-10 rounded-lg min-h-[300px] py-8 xl:py-4 px-6 xl:px-10 bg-marron text-white max-md:mx-[-26px]">
          <div className="flex flex-col gap-4 w-full">
            <p className="font-ebGaramond font-medium text-xl md:text-2xl text-bgColor">
              Réservez Votre Premier Atelier :
            </p>
            <p className="font-lato max-md:text-sm">
              N'attendez plus pour découvrir les secrets de la méthode
              GYROTONIC® et ses nombreux bienfaits. Réservez dès maintenant et
              commencez votre transformation.
            </p>

            <button className=" reserver-button flex mr-auto flex-col justify-center text-base rounded-lg px-9 py-3 bg-white text-marron font-lato font-bold">
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
