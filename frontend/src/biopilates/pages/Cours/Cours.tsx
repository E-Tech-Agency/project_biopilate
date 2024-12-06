import { useEffect } from "react";

import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";
import ImageSliderCours from "@/biopilates/components/ImageSliderCours";
import Offres from "./Offres";
import reformerImage from "@/assets/images/reformer.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
import evolisImage from "@/assets/images/reformer-gyrotonic-evolis.png";
import mobileImage from "@/assets/images/mobile.png";
import cours2 from "@/assets/images/cours-2.jpg";
import blogBg from "@/assets/images/blog-bg.jpg";
import cours1 from "@/assets/images/cours-1.jpg";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function Cours() {
  const images = [
    cours2,
    cours1,
    reformerGyrotonicImage,
    reformerImage,
    evolisImage,
  ];

  const cours = [
    {
      title: "COURS REFORMER",
      image: reformerImage,
      description:
        "Découvrez le cours <strong>REFORMER</strong> , le plus populaire en cours de groupe (<strong>12 participants max</strong>).Renforcez vos muscles en profondeur,améliorez votre posture etdéveloppez votre souplesse avec notre méthode Pilates. Cours pourtous niveaux. Réservez votre séance découverte dès aujourd'hui.",
      cours: "Reformer",
    },
    {
      title: "COURS REFORMER & GYROTONIC",
      image: reformerGyrotonicImage,
      description:
        "Découvrez nos cours semi-privés,(à <strong>6 participants max</strong>), avec un accès à un équipement complet :REFORMER,CADILLAC, CHAISE, TOUR GYROTONIC et tous les accessoires. Unique cours à Paris offrant autant d'équipement pour un seul participant. Bénéficiez d'une expérience Pilates unique et personnalisée au Studio Biopilates.",
      cours: "Gyrotonoic",
    },
    {
      title: "COURS REFORMER & GYROTONIC & EVOLIS",
      image: evolisImage,
      description:
        "Découvrez nos cours privés, ou duo avec unaccompagnement sur mesure et un accès totalsur tous les équipements Gyrotonic (Archway,les extensiounit, Gyrotoner, Poley Tower, Jumpingstretching board),PILATES (Reformer, Cadillac, Chaise, Barils,accessoires) et EVOLIS (la machine qui soulage lesmaux de dos).",
      cours: "Evolis",
    },
    {
      title: "COURS REFORMER",
      image: reformerImage,
      description:
        "Découvrez le cours <strong>REFORMER</strong> , le plus populaire en cours de groupe (<strong>12 participants max</strong>).Renforcez vos muscles en profondeur,améliorez votre posture etdéveloppez votre souplesse avec notre méthode Pilates. Cours pourtous niveaux. Réservez votre séance découverte dès aujourd'hui.",
      cours: "Reformer",
    },
    {
      title: "COURS REFORMER & GYROTONIC",
      image: reformerGyrotonicImage,
      description:
        "Découvrez nos cours semi-privés,(à <strong>6 participants max</strong>), avec un accès à un équipement complet :REFORMER,CADILLAC, CHAISE, TOUR GYROTONIC et tous lesaccessoires. Unique cours à Paris offrant autant d'équipement pour un seul participant.Bénéficiez d'une expérience Pilates unique et personnalisée au Studio Biopilates",
      cours: "Gyrotonoic",
    },
    {
      title: "COURS REFORMER & GYROTONIC & EVOLIS",
      image: evolisImage,
      description:
        "Découvrez nos cours privés, ou duo avec unaccompagnement sur mesure et un accès totalsur tous les équipements Gyrotonic (Archway,les extensiounit, Gyrotoner, Poley Tower, Jumpingstretching board),PILATES (Reformer, Cadillac, Chaise, Barils,accessoires) et EVOLIS (la machine qui soulage lesmaux de dos).",
      cours: "Evolis",
    },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="flex flex-col mx-5 md:mx-12 my-4 ">
      <section className="mb-10 flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center gap-8">
        {/* carousel */}

        {/* <CircleCarousel images={images} /> */}
        <CircleSwiperCarousel images={images} />

        {/* text */}
        <div className="flex flex-col justify-center items-center md:items-baseline py-6 min-w-min md:px-5 gap-5 font-lato md:w-[90%]">
          <p className="text-marron text-xl sm:text-[34px] leading-snug font-bold font-ebGaramond">
            Cours Pilates à Paris – Biopilates
          </p>
          <p className="leading-normal text-lg sm:text-[28px] text-marron font-medium font-ebGaramond">
            Développez votre potentiel et atteignez vos objectifs grâce à nos
            cours de Pilates pour tous niveaux !
          </p>

          <p className="text-sm sm:text-lg leading-normal">
            Nos <strong>instructeurs certifiés et expérimentés</strong> vous
            accompagnent dans votre progression et vous guident vers :
            <p className="mt-2">
              <ul className="list-disc ml-5">
                <li>
                  Une meilleure <strong>condition physique</strong>
                </li>
                <li>Un corps plus fort et plus souple</li>
                <li>Un esprit plus serein</li>
              </ul>
            </p>
          </p>
        </div>
      </section>

      {/* cours biopilates */}

      <section className="mt-4">
        <div className="mb-8">
          <p className="text-marron text-3xl leading-snug font-bold font-ebGaramond">
            Cours Biopilates
          </p>
          <p className="leading-7">
            Nos cours sont dispensés par des instructeurs expérimentés et
            certifiés. <strong>Réservez</strong> votre cours dès aujourd'hui sur
            l'application{" "}
            <a
              href="https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                <u>Bsport !</u>
              </strong>
            </a>
          </p>
        </div>

        <ImageSliderCours list={cours} action={"Réserver"} />
      </section>

      {/* mobile app */}

      <section className="mb-14 flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center gap-8">
        <div className="md:mb-8 flex flex-col flex-wrap gap-6">
          <p className="text-marron text-xl sm:text-[34px] leading-snug font-ebGaramond font-bold">
            Comment S’incrire au cours?
          </p>
          <img
            src={mobileImage}
            alt="mobileImage"
            className="sm:max-w-[50%] max-w-[80%] lg:hidden self-center"
          />
          <p className="max-sm:text-sm text-lg leading-normal">
            Nous utilisons un logiciel français{" "}
            <a
              href="https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                <u>Bsport</u>
              </strong>
            </a>
            . Nous vous invitons à suivre les instructions suivantes pour vous
            inscrire sur la plateforme accessible sur votre ordinateur et y
            réserver vos prochains cours. Merci de vérifier, compléter et
            éventuellement modifier les informations qui vous concernent, en
            particulier l'ajout de vos méthodes de paiement afin de relancer vos
            abonnements. L'équipe Studio Biopilates
          </p>
          <div className="flex max-sm:justify-center gap-5 max-lg:mx-auto mx-1">
            <button
              className="h-[50px] sm:h-[70px] flex gap-2 justify-start
               items-center rounded-md border border-marron shadow-md px-3"
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.bsport&hl=en",
                  "_blank"
                );
              }}
            >
              <FaGooglePlay className="text-2xl sm:text-3xl" />
              <div className="flex flex-col items-start">
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Télécharger{" "}
                </p>
                <p className="text-xs sm:text-base font-semibold">
                  Google Play{" "}
                </p>
              </div>
            </button>
            <button
              className="h-[50px] sm:h-[70px] flex gap-2 justify-start
               items-center rounded-md border border-marron shadow-md pl-3 pr-6"
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.bsport&hl=en",
                  "_blank"
                );
              }}
            >
              <FaApple className="text-2xl sm:text-3xl" />
              <div className="flex flex-col items-start">
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Télécharger{" "}
                </p>
                <p className="text-xs sm:text-base font-semibold">App Store</p>
              </div>
            </button>
          </div>
        </div>
        <img
          src={mobileImage}
          alt="mobileImage"
          className="sm:max-w-[50%] w-[640px] max-lg:hidden"
        />
      </section>
      <section id="tarifs" className="relative mb-16">
        <div className="absolute inset-0">
          <img
            src={blogBg}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-65"
          />
        </div>
        <Offres />
      </section>
    </div>
  );
}
