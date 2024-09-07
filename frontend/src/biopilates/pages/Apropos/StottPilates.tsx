
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import StartupAnimation from "./StartupAnimation";

import { Pagination, Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// Importing images at the top
import stottRespiration from "@/assets/images/stott-respiration.jpg";
import stottDeadBodyExercise from "@/assets/images/stott-deadbody-exercice.jpg";
import stottPlacementBassin from "@/assets/images/stott-placement-bassin.png";
import stottEpaules from "@/assets/images/stott-epaules.png";
import stottPlacementTete from "@/assets/images/stott-placement-tete.jpg";
import reformer from "@/assets/images/reformer.jpg";
import stott2 from "@/assets/images/stott-2.jpg";
import stott3 from "@/assets/images/stott-3.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import stott from "@/assets/images/stott.jpg";
import stottWomanStanding from "@/assets/images/stott-woman-standing.jpg";
import stottPosture from "@/assets/images/stott-posture.png";
import stottDouleur from "@/assets/images/stott-douleur.jpg";
import gyrotonicCoordination from "@/assets/images/gyrotonic-coordination.jpg";
function PrincipeCard({ principe }) {
  return (
    <div className=" flex justify-center items-center max-w-[630px] xl:max-w-[680px] min-w-[220px] min-h-[350px] shadow-xl rounded-lg py-2 sm:py-4 px-4 sm:px-8 gap-4 mx-2">
      <img
        loading="lazy"
        src={principe.image}
        alt="Principe"
        className="rounded-full w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover"
      />
      <div className="flex flex-col gap-3 w-[62%]">
        <h1 className="text-2xl font-ebGaramond text-marron font-bold">
          {principe.title}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: principe.description,
          }}
          className="text-justify text-[#5a5a5a] text-sm sm:text-base"
        ></p>
      </div>
    </div>
  );
}

function Slider() {
  const principes = [
    {
      title: "Respiration",
      image: stottRespiration,
      description:
        "Une respiration adéquate assure une oxygénation optimale et réduit les tensions musculaires. <strong>Notre technique</strong> vous apprendra à utiliser pleinement votre capacité pulmonaire. Le modèle de respiration utilisé dans la méthode <strong>STOTT PILATES</strong>® aidera à engager vos muscles abdominaux profonds et à stabiliser votre tronc.",
    },
    {
      title: "Placement de la Cage Thoracique",
      image: stottDeadBodyExercise,
      description:
        "Maintenir la bonne position de la cage thoracique est crucial pour l’alignement de la   colonne dorsale. <strong>Nos instructeurs</strong> vous guideront pour éviter les erreurs courantes.",
    },
    {
      title: "Placement du Bassin",
      image: stottPlacementBassin,
      description:
        "Apprenez à   stabiliser votre bassin en position neutre ou imprimée pour une meilleure   absorption des chocs et un soutien optimal du dos.",
    },
    {
      title: "Stabilité des épaules",
      image: stottEpaules,
      description:
        "Une bonne stabilisation des omoplates évite les tensions dans le cou et les épaules.   Découvrez les techniques pour un alignement parfait.",
    },
    {
      title: "Placement de la tête et du cou",
      image: stottPlacementTete,
      description:
        "Gardez une courbe cervicale naturelle et évitez les tensions grâce à nos conseils personnalisés",
    },
  ];
  return (
    <section className="flex flex-col justify-center items-center gap-8 w-full h-[480px] sm:h-[530px]">
      <Swiper
        className="centered-slide-carousel swiper-container relative w-full"
        grabCursor={true}
        spaceBetween={40}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1750: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1028: {
            slidesPerView: 1,
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
        <div className="flex flex-nowrap gap-2 overflow-hidden">
          {principes.map((principe, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-center items-center xl:items-start"
            >
              <PrincipeCard principe={principe} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className="slider-controler hidden sm:flex justify-center gap-4">
        <div className="cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
          <FaArrowLeftLong className="text-marron" />
        </div>
        <div className="cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
          <FaArrowRightLong className="text-marron" />
        </div>
      </div>
      <div className="slider-controler sm:hidden flex justify-center items-center">
        <div className="swiper-pagination m-auto z-[1] block"></div>
      </div>
    </section>
  );
}

export default function StottPilates() {
  const images = [
    reformer,
    stott2,
    stott3,
    formation1,
    stott,
  ];

  return (
    <div className="relative overflow-hidden">
      <StartupAnimation images={images} />
      {/* Page Content */}
      <div className="flex flex-col mt-8 mx-8 md:mx-12 mb-12 gap-6 font-lato">
        <div className="flex flex-col-reverse md:flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-ebGaramond text-marron font-bold">
              Formation et Cours STOTT PILATES à Paris - Studio Biopilates
            </h1>
            <h2 className="text-xl font-ebGaramond text-blueText">
              Découvrez les cours et formations STOTT PILATES à Paris.
              Techniques modernes pour rééquilibrer les muscles et restaurer la
              courbe naturelle du rachis. Rejoignez-nous au Studio Biopilates.
            </h2>
          </div>
          <img
            loading="lazy"
            src={stott}
            alt="Stott Pilates"
            className="rounded-sm w-full max-h-[680px] object-cover shadow-lg my-6"
          />
        </div>
        <div className="text-justify">
          <p>
            Bienvenue au <strong>Studio Biopilates à Paris</strong>, le premier
            centre de cours et formation <strong>STOTT PILATES</strong> en
            France.{" "}
          </p>
          <p>
            La méthode <strong>STOTT PILATES</strong>, une approche
            contemporaine et systématique qui incorpore des pratiques démontrées
            et reconnues en biomécanique, est conçue pour rééquilibrer les
            muscles et restaurer la courbe naturelle du rachis.
          </p>

          <p>
            <strong>Les Merrithews</strong> ont collaboré avec des
            physiothérapeutes et des experts en médecine sportive pour
            réinventer cette méthode d'entraînement. Ils ont développé une
            approche moderne, exhaustive et systématique, basée sur les
            principes originaux.{" "}
          </p>
          <p>
            <strong>Rejoignez-nous</strong> pour découvrir les bienfaits de
            cette méthode innovante.
          </p>
        </div>
        <div className="flex flex-col justify-center m-auto text-xl leading-6 rounded-lg px-4 py-1 bg-bgColor text-marron font-medium font-ebGaramond w-fit">
          Découvrez
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-ebGaramond text-marron font-bold">
            Les cinq principes de base de la méthode Stott Pilates
          </h1>
          <h2 className="text-xl font-ebGaramond text-blueText">
            <strong>La méthode Stott Pilates</strong> se distingue par 5
            principes de base et offre de nombreux bénéfices pour le corps et
            l’esprit
          </h2>
          <img
            loading="lazy"
            src={stottWomanStanding}
            alt="Stott"
            className="rounded-full w-[220px] h-[220px] sm:w-[393px] sm:h-[393px] object-cover mb-2"
          />
          <p className="text-lg leading-6 text-justify text-[#5a5a5a]">
            Commencer chaque exercice dans une position neutre et sans tension
            est crucial pour les principes de base du{" "}
            <strong>STOTT PILATES</strong>. Une bonne position de départ, par
            exemple allongé sur le dos avec le bassin et la colonne vertébrale
            en position neutre, nécessite une légère contraction musculaire.
            Cela permet de maintenir l'alignement idéal du bassin, de la cage
            thoracique et de la colonne vertébrale, réduisant ainsi les tensions
            et assurant une posture correcte tout au long de l'exercice.
          </p>
          <Slider />
        </div>

        {/* 3 pics Bénéfices et adaptabilité :  */}
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl text-marron font-bold">
              Bénéfices et adaptabilité :{" "}
            </h1>
            <p className="text-base">
              Les exercices <strong>STOTT PILATES</strong> sont adaptables à
              tous les niveaux et types corporels, que vous soyez débutant ou
              athlète professionnel. Cette méthode est idéale pour :
            </p>
          </div>

          <div className="flex justify-evenly md:items-start max-md:flex-col gap-16 md:m-auto text-center">
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={stottPosture}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                {" "}
                Améliorer la posture
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={stottDouleur}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                Soulager les douleurs dorsales
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonicCoordination}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                {" "}
                Augmenter la flexibilité
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}