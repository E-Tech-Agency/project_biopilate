import React from "react";
import { FaStar } from "react-icons/fa";

export default function Temoignage() {
  return (
    <div className="w-full h-full md:w-[650px] lg:w-[850px] md:h-[300px] shadow-xl rounded-lg py-6 sm:py-4 px-8">
      <div className="flex gap-4">
        <img
          loading="lazy"
          src={require("../images/biopilate-logo.png")}
          alt="User"
          className="rounded-full w-[60px] h-[60px]"
        />
        <div className="mb-8 flex flex-col gap-2">
          <p className="">Nom d'utilisateur</p>
          <div className="flex gap-1 text-yellow-300 text-lg">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-2xl mb-6 text-marron font-lato">
          Cette adresse n'en est que plus précieuse.
        </p>
        <p>
          Un très beau studio à l'ambiance unique à Paris. Caro est une grande
          pro, incollable sur l'anatomie, à même d'adapter son cours à chacun
          quelle que soit sa condition pour progresser, récupérer d'une
          blessure, se remettre en forme, s'entretenir... Les endroits où chaque
          élève est considéré autrement que comme un numéro sont rares, cette
          adresse n'en est que plus précieuse.
        </p>
      </div>
    </div>
  );
}
