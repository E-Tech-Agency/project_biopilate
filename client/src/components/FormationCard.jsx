import React from "react";

export default function FormationCard() {
  return (
    <div className="flex flex-col justify-center items-center shadow-md">
      <div className="px-6 py-6 flex flex-col justify-center items-center gap-5">
        <img
          loading="lazy"
          src={require("../images/gym.jpg")}
          alt="Gym"
          className="rounded-full w-[240px] h-[240px]"
        />
        <p className="text-marron text-xl">Reformer</p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">2299 €</p>
            <p className="text-sm">999 €</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Débutant et intermédiaire</p>
            <p className="text-sm">Avancé</p>
          </div>
        </div>
      </div>

      <button className="flex flex-col justify-center rounded-lg mb-4 px-24 py-3 bg-bgColor text-marron">
        Réserver
      </button>
    </div>
  );
}
