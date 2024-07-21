import { React, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function BlogCard() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mx-8 shadow-2xl gap-5 rounded-3xl w-[300px] sm:w-[410px]">
      <div className="flex flex-col items-end bg-white">
        <div className="text-3xl z-[1] mb-[-55px] ml-[-55px] pt-6 pr-6">
          {liked ? (
            <FaHeart
              className=" text-red-500 bg-white rounded-xl"
              onClick={() => setLiked(!liked)}
            />
          ) : (
            <FaRegHeart
              className=" text-marron bg-white rounded-xl"
              onClick={() => setLiked(!liked)}
            />
          )}
        </div>
        <img
          loading="lazy"
          src={require("../images/gym.jpg")}
          alt="Gym"
          className="rounded-3xl w-[280px] h-[231px] sm:w-[384px] sm:h-[318px] object-cover mt-4"
        />
      </div>

      <div className="px-4 flex flex-col gap-3">
        <p className="text-marron text-xl">Cours Reformer</p>
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src={require("../images/biopilate-logo.png")}
            alt="User"
            className="rounded-full w-[22px] h-[22px]"
          />
          <p className="text-sm text-gray-500">Nom d'utilisateur</p>
        </div>
        <p className="text-base">
          La Maison Vieille est un lieu de soutien et de bien-être pour les
          personnes âgées, visant à briser leur isolement et à offrir des
          moments enrichissants.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <FaHeart className="text-blueText" />
          <p>50 j'aimes</p>
        </div>
      </div>

      <button className="flex mb-3  flex-col justify-center items-center text-base rounded-lg w-[90%] py-2 bg-bgColor text-marron ">
        Lire la suite
      </button>
    </div>
  );
}
