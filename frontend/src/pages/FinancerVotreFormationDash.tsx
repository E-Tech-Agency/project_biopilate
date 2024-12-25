import financer1 from "@/assets/images/financer1.png";
import financer2 from "@/assets/images/financer2.png";
import { useEffect, useState } from "react";
import ReserverButton from "@/biopilates/components/ReserverButton";
import { FinancerFormation } from "@/types/types";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import financerPdf1 from "@/assets/doc/Bienvenue aux étudiants.pdf";
import financerPdf2 from "@/assets/doc/Conditions Générale de vente.pdf";
import financerPdf3 from "@/assets/doc/Règlement intérieur.pdf";

export default function FinancerVotreFormationDash() {
  const [formations, setFormations] = useState<FinancerFormation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);
  
  const getFormations = async () => {
    try {
      const res = await api.get("financer-formations/");
      const publicFormations = res.data.filter(
        (formation: FinancerFormation) => formation.status === "approved"
      );
      setFormations(publicFormations);
    } catch (error) {
      console.error("Error fetching financer-formations", error);
    }
  };

  useEffect(() => {
    getFormations();
  }, []);

  const fallbackData = [
    {
      title: "Bienvenue aux étudiants",
      image: financer1,
      pdf_financer_formation:financerPdf1,
    },
    {
      title: "Conditions Générales de vente",
      image: financer2,
      pdf_financer_formation: financerPdf2,
    },
    {
      title: "Règlement intérieur",
      image: financer1,
      pdf_financer_formation: financerPdf3,
    },
  ];

  // Use the fetched data or fallback to predefined data
  const displayedFormations = formations.length > 0 ? formations : fallbackData;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-12 md:py-16">
      {displayedFormations.map((formation, index) => (
        <div
          key={index}
          className="w-[182px] flex flex-col justify-start items-center gap-4"
        >
          <img
            className="size-[140px] object-cover rounded-full shadow-md"
            src={formation.image}
            alt={formation.title}
          />
          <p className="flex-grow text-marron sm:text-lg text-center font-ebGaramond font-bold leading-normal">
            {formation.title}
          </p>
          <ReserverButton
            text="Télécharger"
            link={formation.pdf_financer_formation}
          />
        </div>
      ))}
    </div>
  );
}
