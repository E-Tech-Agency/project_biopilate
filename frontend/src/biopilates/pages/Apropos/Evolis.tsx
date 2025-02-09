import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";

import StartupAnimation from "./StartupAnimation";
import image1 from "@/assets/images/pourqui-1.jpg";
import image2 from "@/assets/images/pourqui-2.jpg";
import image3 from "@/assets/images/pourqui-3.jpg";
import image4 from "@/assets/images/pourqui-4.jpg";
import image5 from "@/assets/images/pourqui-5.jpg";
import image6 from "@/assets/images/pourqui-6.jpg";

import evolisImage from "@/assets/images/evolis.jpg";
import evolisEtirementImage from "@/assets/images/evolis-etirement.jpg";
import evolisSkeletonImage from "@/assets/images/evolis-skeleton.jpg";
import evolisPostureImage from "@/assets/images/evolis-posture.png";

type PourQui = {
  title: string;
  image: string;
  description: string;
};
function PourQuiCard({ pourqui }: { pourqui: PourQui }) {
  // Function to insert a line break before "et" in the text
  // function insertBreakBeforeEt(text: string) {
  //   return text.replace(/\bet/g, "<br>et");
  // }

  // Apply the function conditionally for mobile screens
  // function applyForMobile(inputText: string) {
  //   const isMobile = window.matchMedia("(max-width: 550px)").matches; // Tailwind's max-md breakpoint
  //   if (isMobile) {
  //     return insertBreakBeforeEt(inputText);
  //   }
  //   return inputText; // Leave the text unchanged for non-mobile screens
  // }

  return (
    <div className="relative w-[280px] h-[334px] sm:w-[393px] sm:h-[454px] rounded-lg shadow-lg font-lato mx-auto">
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
        <p className=" absolute flex flex-col justify-center text-sm sm:text-base rounded-lg px-4 py-3 bg-white text-black bg-opacity-80 font-lato font-bold mt-4 ml-4">
          {pourqui.title}
        </p>
        <p
          className="absolute bg-white h-[86px] px-4 rounded-lg rounded-t-none text-sm sm:text-base font-normal bottom-0 left-0 right-0 flex justify-center items-center"
          dangerouslySetInnerHTML={{
            __html: pourqui.description,
          }}
        ></p>
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
        "Soulagement des maux de dos <br>et renforcement  musculaire global.",
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
      description: "Conditionnement musculaire <br>et récupération physique.",
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
        className="centered-slide-carousel swiper-container relative w-full overflow-visible"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        initialSlide={1}
        // spaceBetween={40}
        // slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Pagination]} // Fix: Wrapping Pagination in an array
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1740: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1600: {
            slidesPerView: 3.5,
            spaceBetween: -70,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: -50,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          1100: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          990: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
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
        <div className="swiper-pagination m-auto z-[1] block"></div>
      </Swiper>
    </section>
  );
}

export default function Evolis() {
  const images = [
    evolisImage,
    evolisEtirementImage,
    evolisImage,
    evolisEtirementImage,
    evolisImage,
  ];
  return (
    <div className="relative overflow-hidden">
      <StartupAnimation images={images} />

      {/* Page Content */}
      <div className="flex flex-col mt-8 mx-5 md:mx-12 mb-12 gap-6 font-lato">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl sm:text-[34px] font-ebGaramond text-marron font-bold">
              Formation et Cours EVOLIS à Paris - Studio Biopilates
            </h1>
            <h2 className="text-lg sm:text-xl font-ebGaramond text-blueText font-medium">
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

        <p className="text-sm sm:text-base text-justify  sm:leading-8">
          Bienvenue au Studio Biopilates, situé au cœur de Paris, où nous
          proposons <strong>la méthode Evolis®</strong>, développée par{" "}
          <strong>Jean Frelat</strong>. Cette approche globale de santé repose
          sur un réflexe proprioceptif et une nouvelle manière de renforcer les
          muscles.
        </p>

        <h1 className="text-xl sm:text-3xl text-marron font-bold font-ebGaramond">
          Les Principes de la Méthode Evolis® :
        </h1>
        <ul className="text-sm sm:text-lg font-lato list-disc ml-5">
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
        <div className="flex flex-col gap-4 mt-4 sm:mt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-3xl text-marron font-bold font-ebGaramond">
              Bénéfices et adaptabilité :{" "}
            </h1>
            <p className="text-sm sm:text-base mb-4">
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
              <h2 className="w-[150px] sm:w-[165px] text-sm sm:text-base ">
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
              <h2 className="w-[150px] sm:w-[165px] text-sm sm:text-base ">
                améliore la posture
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={evolisEtirementImage}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px] sm:w-[165px] text-sm sm:text-base ">
                l'amplitude des mouvements
              </h2>
            </div>
          </div>
          <p className="text-base">
            Elle est idéale pour tous les âges et niveaux de forme physique.
          </p>
        </div>

        {/* Pour qui */}
        <div className="flex flex-col gap-4 mt-4 sm:mt-10">
          <h1 className="text-xl sm:text-3xl text-marron font-bold font-ebGaramond">
            Pour Qui ?
          </h1>
          <Slider />
        </div>

        {/* Reserver */}
        <div className="relative overflow-hidden flex max-md:flex-wrap justify-center xl:justify-between items-center gap-10 rounded-lg min-h-[300px] py-8 xl:py-4 px-6 xl:px-10 bg-marron text-white max-md:mx-[-26px]">
          <div className="max-lg:hidden absolute right-0 mr-10 max-xl:opacity-30 transition duration-300 ease-in-out transform">
            <svg
              width="571"
              height="314"
              viewBox="0 0 571 314"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M567.5 182C567.5 332.387 441.357 454.5 285.5 454.5C129.643 454.5 3.5 332.387 3.5 182C3.5 31.6131 129.643 -90.5 285.5 -90.5C441.357 -90.5 567.5 31.6131 567.5 182Z"
                stroke="#EBDCCD"
                stroke-width="7"
              />
            </svg>
          </div>

          <div className="max-lg:hidden absolute right-0">
            <svg
              width="370"
              height="314"
              viewBox="0 0 370 314"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                d="M625.7 93.3906C625.7 255.608 486.624 387.438 314.65 387.438C142.676 387.438 3.59961 255.608 3.59961 93.3906C3.59961 -68.8263 142.676 -200.656 314.65 -200.656C486.624 -200.656 625.7 -68.8263 625.7 93.3906Z"
                stroke="#EBDCCD"
                stroke-width="7"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="font-ebGaramond font-bold text-lg md:text-3xl max-sm:text-bgColor">
              Pour découvrir les bienfaits de la méthode Evolis®
            </p>
            <div className="md:hidden">
              <p className="font-lato text-xs md:text-xl sm:text-bgColor mb-2">
                Réservez dès maintenant une séance individuelle au Studio
                Biopilates, situé au 1 rue Boyer, 75020 Paris.
              </p>
              <p className="text-[13px] md:text-xl font-bold">
                Tarif de la séance : 64€
              </p>
            </div>
            <div className="max-md:hidden lg:w-[60%] xl:w-[50%]">
              <p className="font-lato text-xs md:text-xl sm:text-bgColor mb-2">
                Réservez dès maintenant une séance individuelle au Studio
                Biopilates, situé au 1 rue Boyer, 75020 Paris.{" "}
                <strong>Tarif de la séance : 64€</strong>
              </p>
            </div>
            <button
              className="button-hover flex mr-auto flex-col justify-center text-xs md:text-base rounded-lg bg-white text-marron font-lato font-bold transform"
              onClick={() => {
                window.open(
                  "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
                  "_blank"
                );
              }}
            >
              <div className="hover-circle-2" />
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
