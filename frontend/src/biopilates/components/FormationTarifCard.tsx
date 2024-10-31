import React from "react";
import { FaArrowDown } from "react-icons/fa6";

// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  prices: string[];
  pdf: string;
  levels?: string[];
}

interface FormationCardProps {
  formation: Formation;
}

const FormationCard: React.FC<FormationCardProps> = ({ formation }) => {
  const isLevelNotFound = !formation.levels?.[0] || !formation.levels?.[1];
  return (
    <div className="py-4 sm:py-0 flex flex-col items-center w-[232px] h-[456px] sm:w-[300px] sm:h-[580px] rounded-lg shadow-lg">
      <div className="px-6 py-2 sm:py-6 flex flex-col justify-center items-center gap-3 sm:gap-6">
        <img
          loading="lazy"
          src={formation.image}
          alt="Formation"
          className="rounded-full w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] object-cover shadow-lg"
        />

        <p
          className={`text-marron sm:text-xl leading-5 text-center font-bold ${
            isLevelNotFound ? "sm:h-20" : "sm:h-16 mb-4 sm:mb-0"
          }`}
        >
          {formation.title}
        </p>

        <div
          className={`flex gap-2 justify-between sm:gap-6 font-lato${
            isLevelNotFound ? "" : "h-12"
          }`}
        >
          <div
            className={`flex flex-col justify-between items-start font-semibold gap-2 ${
              isLevelNotFound ? "justify-center items-center" : ""
            }`}
          >
            <p className="text-xs sm:text-sm">{formation.prices[0]}</p>
            <p className="text-xs sm:text-sm">{formation.prices[1]}</p>
          </div>
          <div className="flex flex-col justify-between gap-1">
            <p className="text-xs sm:text-sm">{formation.levels?.[0] || ""}</p>
            <p className="text-xs sm:text-sm">{formation.levels?.[1] || ""}</p>
          </div>
        </div>
      </div>

      <button
        className="reserver-button bg-bgColor flex flex-col justify-center rounded-lg mb-3 sm:mb-4 max-sm:px-14 sm:px-24 py-3 transform"
        onClick={() => {
          window.open(
            "https://forms.zohopublic.com/virtualoffice707/form/AnalysedesbesoinsbnficiairesFormationscourtesouper/formperma/0Yyw-9wbvHRQB_Xb63QniT0EDrnKuekcjjfWvZC8PMg",
            "_blank"
          );
        }}
      >
        <div className="hover-circle overflow-hidden" />
        Réserver
      </button>
      <a
        className="border button-offre-hover border-marron text-marron text-base font-bold flex justify-center items-center gap-4 rounded-lg sm:mb-4 px-6 sm:px-16 py-3 transform shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
        }}
        href={formation.pdf}
        target="_blank"
        download
      >
        <div className="hover-circle overflow-hidden" />
        <FaArrowDown />
        Télécharger
      </a>
    </div>
  );
};
export default FormationCard;
