import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";
import reformer from "@/assets/images/reformer.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";
import formation5 from "@/assets/images/formation-5.png";
import formation6 from "@/assets/images/formation-6.jpg";
// import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
// import Img from "@/assets/images/Placeholder_view_vector.png";
import FormationSwiper from "./FormationSwiper";
import PourquoiBiopilates from "./PourquoiBiopilates";
import FinancerVotreFormation from "./FinancerVotreFormation";
import WorkshopSlider from "./WorkshopSlider";
import PlanningFormations from "./PlanningFormations";
import PlanningWorkshops from "./PlanningWorkshops";
import { useEffect } from "react";

export default function Formations() {
  const images = [formation3, reformer, formation5, formation1, formation2];

  const plansWorkshop = [
    {
      title: "ONLINE Workshop",
      niveau: "Beyond the Biomechanical Principles",
      image: formation6,
      date: "Le 16/11/2024",
      timeSlots: ["Sam 16/11/2024 de 14h à 18h"],
      price: "Prix 3h :189€",
    },
    {
      title: "ONLINE Workshop",
      niveau: "Prénatal stabilité Ball et Flex band",
      image: formation3,
      date: "Le 21/12/2024",
      timeSlots: ["Sam 21/12/2024 de 14h à 16h"],
      price: "Prix 2h :126€",
    },
    {
      title: "ONLINE Workshop",
      niveau: "Postnatal Pilates",
      image: formation2,
      date: "Le 21/12/2024",
      timeSlots: ["Sam 21/12/2024 de 16h15 à 18h15"],
      price: "Prix 2h :126€",
    },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="flex flex-col mx-5 md:mx-12">
      <section className="mt-2 mb-14 flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center gap-8">
        {/* carousel */}

        {/* <CircleCarousel images={images} /> */}
        <CircleSwiperCarousel images={images} />

        {/* text */}
        <div className="flex flex-col justify-center items-start md:items-baseline py-6 min-w-min md:px-2 sm:gap-5 font-lato w-[90%]">
          <p className="text-marron text-xl sm:text-[34px] leading-snug font-ebGaramond font-bold">
            Formations Biopilates
          </p>
          <p className="leading-7 text-xl sm:text-3xl text-blueText font-ebGaramond font-normal">
            Devenez instructeur certifié avec Biopilates
          </p>
          <p className="leading-normal text-sm sm:text-lg mt-4">
            <strong>Biopilates</strong>, pionnier du{" "}
            <strong>Stott Pilates</strong> en France depuis{" "}
            <strong>2008</strong>, vous propose une expérience unique pour
            devenir un <strong>instructeur Pilates certifié</strong> et
            accompli.
          </p>
        </div>
      </section>

      {/* pourquoi biopilates */}
      <PourquoiBiopilates />

      {/* formation biopliates */}
      <section id="ftarif">
        <FormationSwiper />
      </section>

      {/* Planning formation*/}
      <PlanningFormations />

      {/* Fianncer votre formation */}
      <FinancerVotreFormation />

      {/* workshop */}
      <WorkshopSlider />

      {/* Planning workshop */}
      <PlanningWorkshops plans={plansWorkshop} />
    </div>
  );
}
