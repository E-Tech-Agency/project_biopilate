import React from "react";

// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  prices: string[];
  levels?: string[];
}

interface FormationCardProps {
  formation: Formation;
}

const FormationCard: React.FC<FormationCardProps> = ({ formation }) => {
  const isLevelNotFound = !formation.levels?.[0] || !formation.levels?.[1];
  return (
    <div className="py-4 sm:py-0 flex flex-col items-center w-[232px] h-[368px] sm:w-[300px] sm:h-[524px] rounded-lg shadow-lg">
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
        className="reserver-button flex flex-col justify-center rounded-lg mb-4 sm:mb-6 px-16 sm:px-24 py-3 transform"
        onClick={() => {
          window.open(
            "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
            "_blank"
          );
        }}
      >
        <div className="hover-circle overflow-hidden" />
        Réserver
      </button>
    </div>
  );
};
export default FormationCard;
