import React from "react";

// Define TypeScript interface for formation data
interface Formation {
  title: string;
  image: string;
  description: string;
}

interface FormationCardProps {
  formation: Formation;
}

const FormationCard: React.FC<FormationCardProps> = ({ formation }) => {
  return (
    <div className="px-6 py-2 sm:py-6 flex flex-col justify-center items-center gap-4 w-[232px] h-[368px] sm:w-[302px] sm:h-[430px] rounded-lg shadow-lg bg-white">
      <img
        loading="lazy"
        src={formation.image}
        alt="Formation"
        className="rounded-full w-[158px] h-[158px] sm:w-[230px] sm:h-[230px] object-cover shadow-lg"
      />

      <div className="flex flex-col justify-between gap-3 h-32">
        <p className="text-marron sm:text-lg leading-5 sm:leading-[22px] text-center font-bold font-ebGaramond">
          {formation.title}
        </p>
        <p
          className="text-sm leading-[18px] text-center"
          dangerouslySetInnerHTML={{
            __html: formation.description,
          }}
        ></p>
      </div>
    </div>
  );
};
export default FormationCard;
