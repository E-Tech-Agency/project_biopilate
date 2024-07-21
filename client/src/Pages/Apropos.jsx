import React from "react";

export default function Apropos() {
  return (
    <div className="flex flex-col mx-8 md:mx-12">
      {/* Bio */}
      <section className="my-14 flex flex-col-reverse sm:flex-row flex-wrap justify-center lg:justify-between gap-10">
        <div>
          <img
            loading="lazy"
            src={require("../images/gym.jpg")}
            alt="Gym"
            className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] md:block hidden"
          />
        </div>
        <div className="flex flex-col items-center md:items-baseline py-6  md:px-5 lg:w-[60%] gap-5 font-lato">
          <p className="text-marron text-xl sm:text-3xl leading-snug ">
            Studio Biopilates Paris, votre havre de paix dédié au mieux être
          </p>

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
      </section>
    </div>
  );
}
