import React from "react";

export default function Hero() {
  return (
    <div className="p-14 py-7 flex flex-wrap justify-between gap-10 h-[487px]">
      <div className="flex flex-col py-20 px-5 w-[600px] gap-5 font-lato">
        <p className="text-marron text-3xl leading-snug">
          <div>Équilibre et Élégance : </div>
          BioPilates votre Studio de Pilates à Paris
        </p>
        <p className="leading-7">
          Découvrez la force dans la fluidité et la grâce dans le mouvement, au
          cœur de Paris, avec notre approche personnalisée du Pilates.
        </p>
        <button className="flex  mr-auto flex-col justify-center text-base leading-6 rounded-lg px-10 py-4 bg-bgColor text-marron max-md:hidden">
          Réserver
        </button>
      </div>
      <div className="border border-solid border-marron rounded-full w-[428px] h-[428px]"></div>
    </div>
  );
}
