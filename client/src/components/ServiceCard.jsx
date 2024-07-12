import React from "react";

export default function ServiceCard() {
  return (
    <div className="flex flex-col justify-center items-center mx-8 shadow-md gap-5">
      <div className="px-10 py-6 flex flex-col justify-center items-center gap-4">
        <img
          loading="lazy"
          src={require("../Images/gym.jpg")}
          alt="Gym"
          className="rounded-full w-[240px] h-[240px]"
        />
        <p className="text-marron">Cours Reformer</p>
        <p className="text-sm">Cours Reformer</p>
      </div>

      <div className="flex justify-between gap-12 border-t border-bgColor px-7 py-4">
        <div className="flex justify-center items-center gap-2">
          <img
            loading="lazy"
            src={require("../Images/biopilate-logo.png")}
            alt="User"
            className="rounded-full w-[36px] h-[36px]"
          />
          <p className="text-xs text-gray-500">Nom d'utilisateur</p>
        </div>
        <button className="flex ml-auto flex-col justify-center text-xs rounded-lg px-4 py-1 bg-bgColor text-marron">
          Réserver
        </button>
      </div>
    </div>
  );
}
