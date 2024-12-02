import financer1 from "@/assets/images/financer1.png";
import financer2 from "@/assets/images/financer2.png";

import ReserverButton from "@/biopilates/components/ReserverButton";

export default function FinancerVotreFormationDash() {
  const manuelsData = [
    {
      title: "Bienvenue aux étudiants",
      image: financer1,
    },
    {
      title: "Conditions Générale de vente",
      image: financer2,
    },
    {
      title: "Règlement intérieur",
      image: financer1,
    },
  ];
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-12 md:py-16">
      {manuelsData.map((manuel, index) => (
        <div
          key={index}
          className="w-[182px] flex flex-col justify-start items-center gap-4
      "
        >
          <img
            className="size-[140px] object-cover rounded-full shadow-md"
            src={manuel.image}
            alt={manuel.title}
          />
          <p className="flex-grow text-marron sm:text-lg text-center font-ebGaramond font-bold leading-normal">
            {manuel.title}
          </p>
          <ReserverButton text="Commander" />
        </div>
      ))}
    </div>
  );
}
