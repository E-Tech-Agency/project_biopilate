import React from "react";
import ServiceCard from "../components/ServiceCard";
import FormationCard from "../components/FormationCard";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Temoignage from "../components/Temoignage";
import Hero from "../components/Hero";
import Engagement from "../components/Engagement";
import CallToActionImg from "../components/CallToActionImg";

const services = [
  {
    title: "Cours Reformer",
    description: "Force et souplesse unies",
  },
  {
    title: "Cours Reformer & Gyrotonic",
    description: "Synergie et équilibre",
  },
  {
    title: "Cours Reformer ,Gyrotonic et Evolis",
    description: "Trio dynamique pour vitalité",
  },
];

export default function Accueil() {
  return (
    <div className="flex flex-col mx-8 md:mx-12 ">
      {/* Hero */}
      <Hero />
      {/* Intro */}
      <section className="mb-14 flex flex-col-reverse sm:flex-row flex-wrap justify-center lg:justify-between gap-10">
        <div className="flex flex-col items-center md:items-baseline py-6  md:px-5 lg:w-[60%] gap-5 font-lato">
          <p className="text-marron text-xl sm:text-3xl leading-snug ">
            Studio Biopilates Paris, votre havre de paix dédié au mieux être
          </p>
          <img
            loading="lazy"
            src={require("../images/gym.jpg")}
            alt="Gym"
            className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] md:hidden mb-2"
          />
          <div className="text-sm sm:text-base">
            <p className="leading-7">
              Premier studio STOTT Pilates en France, nous vous offrons une
              expérience unique pour une transformation physique et mentale
              profonde.
            </p>
            <p className="leading-7">
              Cours de Pilates pour tous niveaux Reformer , Reformer et
              Gyrotonic , Reformer Gyrotonic et Evolis dispensés par des
              instructeurs certifiés.
            </p>
            <p className="leading-7">
              Renforcez vos muscles, perdez du poids, développez votre souplesse
              et atteignez vos objectifs grâce à nos cours de Pilates
              personnalisés. Profitez d'une séance découverte et laissez-vous
              guider sur la voie du bien-être.
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          src={require("../images/gym.jpg")}
          alt="Gym"
          className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] hidden md:block"
        />
      </section>

      {/* Services */}
      <section className="mb-20 flex flex-col justify-center items-center gap-4 ">
        <p className="text-marron text-3xl">Nos services</p>
        <p className="text-blueText text-xl">
          Cours de Pilates pour tous niveaux
        </p>
        <p className=" md:mx-20 text-center">
          Découvrez une transformation de votre bien-être physique et mental
          grâce à nos cours de Pilates. Chaque mouvement vous guide vers une
          vitalité et une harmonie intérieure.
        </p>
        <div className="flex flex-wrap justify-center mt-4 2xl:gap-7">
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
        </div>
      </section>

      {/* Formations */}

      <section className="mb-16 flex flex-col justify-center items-center gap-4 md:gap-2">
        <p className="text-blueText text-2xl">
          Formations professionnelles pour devenir instructeur Pilates
        </p>
        <p className=" md:mx-40 text-center ">
          Explorez les bénéfices de sélectionner notre centre pour votre
          formation en Pilates : Nos programmes de premier ordre sont dirigés
          par des instructeurs chevronnés qui vous guideront tout au long de
          votre parcours.
        </p>
        <div className="flex flex-wrap justify-center mt-6 gap-2 2xl:gap-8">
          <FormationCard></FormationCard>
          <FormationCard></FormationCard>
          <FormationCard></FormationCard>
          <FormationCard></FormationCard>
        </div>
        <div className="flex gap-3 m-3">
          <button className="flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
            <FaArrowLeftLong className="text-marron" />
          </button>
          <button className="flex justify-center items-center bg-bgColor rounded-full w-10 h-10">
            <FaArrowRightLong className="text-marron" />
          </button>
        </div>
      </section>
      {/* Engagement */}
      <Engagement />
      {/* Temoignages */}
      <section className="mb-16 flex flex-col justify-center items-center gap-8">
        <div className="flex justify-center items-center gap-8">
          <svg
            width="111"
            height="89"
            viewBox="0 0 111 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M9.45464 12.8681C-1.00249 24.2174 0.0504303 38.792 0.0836792 38.9583V83.2916C0.0836792 84.7613 0.667534 86.1709 1.70679 87.2101C2.74606 88.2494 4.1556 88.8333 5.62534 88.8333H38.8754C44.9878 88.8333 49.9587 83.8624 49.9587 77.7499V38.9583C49.9587 37.4885 49.3748 36.079 48.3356 35.0397C47.2963 34.0004 45.8868 33.4166 44.417 33.4166H27.3598C27.4769 30.6769 28.2954 28.0131 29.7371 25.6804C32.5523 21.2416 37.8557 18.2103 45.5087 16.6808L49.9587 15.7941V0.166595H44.417C28.9946 0.166595 17.2296 4.43922 9.45464 12.8681ZM70.4518 12.8681C59.9891 24.2174 61.0476 38.792 61.0808 38.9583V83.2916C61.0808 84.7613 61.6647 86.1709 62.7039 87.2101C63.7432 88.2494 65.1527 88.8333 66.6225 88.8333H99.8725C105.985 88.8333 110.956 83.8624 110.956 77.7499V38.9583C110.956 37.4885 110.372 36.079 109.333 35.0397C108.293 34.0004 106.884 33.4166 105.414 33.4166H88.3569C88.474 30.6769 89.2926 28.0131 90.7343 25.6804C93.5494 21.2416 98.8528 18.2103 106.506 16.6808L110.956 15.7941V0.166595H105.414C89.9917 0.166595 78.2267 4.43922 70.4518 12.8681Z"
              fill="#C4C4C4"
            />
          </svg>
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-marron text-2xl">Témoignages clients </p>
            <p className="text-blueText text-4xl">Nos clients formidables</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Temoignage />
          <Temoignage />
        </div>
        <div className="flex gap-4">
          <button className="w-4 h-4 rounded-full bg-stone-300"></button>
          <button className="w-4 h-4 rounded-full bg-marron"></button>
          <button className="w-4 h-4 rounded-full bg-stone-300"></button>
        </div>
      </section>
      {/* CTA */}
      <section
        className="mb-16 justify-center items-center w-full h-[200px] md:h-[410px]"
        // style={{
        //   backgroundImage: `url(${require("../images/bg-img-reserver.jpg")})`,
        // }}
      >
        <img
          className="w-full h-full object-cover rounded-md"
          src={require("../images/bg-img-reserver.jpg")}
          alt=""
        />
        <div className="flex justify-between gap-4 mt-[-165px] md:mt-[-380px] z-[1] mx-6 sm:mx-10">
          <div className="flex flex-col justify-center gap-4 text-xs ">
            <p className="text-white sm:text-lg md:text-xl">
              Profitez d’un offre découverte à un prix raisonnable pour
              découvrir les bienfaits du Pilates.
            </p>
            <div className="flex gap-2">
              <button className="flex flex-col justify-center sm:text-base rounded-lg px-4 sm:px-8 sm:py-3 bg-white shadow-sm">
                Réserver
              </button>
              <button className="flex flex-col justify-center text-white sm:text-base rounded-lg px-8 py-3 border border-solid border-white shadow-sm">
                Contactez-nous
              </button>
            </div>
          </div>

          <CallToActionImg />
        </div>
      </section>
    </div>
  );
}
