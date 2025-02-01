import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FormationShow } from "@/types/formation"; // Ensure this is imported

// Modify the component to accept props directly, not as an object with "formation"
const FormationTarifCard: React.FC<FormationShow> = ({
  title,
  image,
  pdf_document,
  levels,
  formation_line,
}) => {
  // Check for missing levels (e.g., no "Avancé" or "Débutant" levels)
  const isLevelNotFound = !levels?.[0] || !levels?.[1];

  return (
    <div className="py-4 sm:py-0 flex flex-col justify-between items-center bg-white w-[232px] h-[450px] sm:w-[300px] sm:h-[580px] rounded-lg shadow-lg">
      <div className="px-6 py-2 sm:py-6 flex flex-col justify-center items-center gap-3 sm:gap-6">
        <img
          loading="lazy"
          src={image}
          alt="Formation"
          className="rounded-full w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] object-cover shadow-lg"
        />

        <p
          className={`text-marron sm:text-xl leading-5 text-center font-bold ${
            isLevelNotFound ? "sm:h-20" : "sm:h-16 mb-4 sm:mb-0"
          }`}
        >
          {title}
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
            <p className="text-xs sm:text-sm">{levels?.[0]?.price}€</p>
            <p className="text-xs sm:text-sm">{levels?.[1]?.price}€</p>
          </div>
          <div className="flex flex-col justify-between gap-1">
            <p className="text-xs sm:text-sm">{levels?.[0]?.name || ""}</p>
            <p className="text-xs sm:text-sm">{levels?.[1]?.name || ""}</p>
          </div>
        </div>
      </div>

      <div>
        <button
          className="reserver-button bg-bgColor flex flex-col justify-center rounded-lg mb-3 sm:mb-4 max-sm:px-10 sm:px-[70px] py-3 transform"
          onClick={() => {
            window.open(formation_line, "_blank");
          }}
        >
          <div className="hover-circle overflow-hidden" />
          Rejoignez -nous
        </button>
        <a
          className="border button-offre-hover border-marron text-marron text-base font-bold flex justify-center items-center gap-4 rounded-lg sm:mb-4 px-6 sm:px-16 py-3 transform shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={pdf_document}
          target="_blank"
          download
        >
          <div className="hover-circle overflow-hidden" />
          <FaArrowDown className="download-hover" />
          <p>En savoir plus</p>
        </a>
      </div>
    </div>
  );
};

export default FormationTarifCard;
