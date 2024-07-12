import React from "react";
import ServiceCard from "../components/ServiceCard";

export default function Accueil() {
  return (
    <div>
      {/* Hero */}
      <section className="m-14 mb-20 flex flex-wrap justify-between gap-10">
        <div className="flex flex-col my-20 px-3 xl:px-2 md:px-5  w-[600px] gap-5 font-lato">
          <p className="text-marron text-3xl leading-snug">
            <div>Équilibre et Élégance : </div>
            BioPilates votre Studio de Pilates à Paris
          </p>
          <p className="leading-7">
            Découvrez la force dans la fluidité et la grâce dans le mouvement,
            au cœur de Paris, avec notre approche personnalisée du Pilates.
          </p>
          <button className="flex mr-auto flex-col justify-center text-base rounded-lg px-10 py-4 bg-bgColor text-marron">
            Réserver
          </button>
        </div>
        <div className="mr-4 border border-solid border-marron rounded-full w-[428px] h-[428px]"></div>
      </section>

      {/* Intro */}
      <section className="m-14 mb-20 flex flex-wrap justify-between gap-10">
        <div className="flex flex-col py-6 px-5 w-[750px] 2xl:w-[1200px] gap-5 font-lato">
          <p className="text-marron text-3xl leading-snug ">
            Studio Biopilates Paris, votre havre de paix dédié au mieux être
          </p>
          <div>
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
          src={require("../Images/gym.jpg")}
          alt="Gym"
          className="rounded-full w-[312px] h-[312px]"
        />
      </section>

      {/* Services */}
      <section className="my-16 mx-12 flex flex-col justify-center items-center gap-4 ">
        <p className="text-marron text-3xl">Nos services</p>
        <p className="text-blueText text-xl">
          Cours de Pilates pour tous niveaux
        </p>
        <p className=" mx-20 text-center">
          Découvrez une transformation de votre bien-être physique et mental
          grâce à nos cours de Pilates. Chaque mouvement vous guide vers une
          vitalité et une harmonie intérieure.
        </p>
        <div className="flex flex-wrap mt-10 2xl:gap-7">
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
        </div>
      </section>
    </div>
  );
}
