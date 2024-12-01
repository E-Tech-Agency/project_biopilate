import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";
import reformer from "@/assets/images/reformer.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";
import formation5 from "@/assets/images/formation-5.png";
import formation6 from "@/assets/images/formation-6.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
import Img from "@/assets/images/Placeholder_view_vector.png";

import FormationSwiper from "./FormationSwiper";
import PourquoiBiopilates from "./PourquoiBiopilates";
import FinancerVotreFormation from "./FinancerVotreFormation";
import WorkshopSlider from "./WorkshopSlider";
import PlanningFormations from "./PlanningFormations";
import PlanningWorkshops from "./PlanningWorkshops";

export default function Formations() {
  const images = [formation3, reformer, formation5, formation1, formation2];

  const plansFormation = [
    {
      title: "Reformer",
      niveau: "débutant et intermédiare",
      image: reformer,
      date: "Du 21 au 25/10/2024 et du 4 au 8/11/2024",
      timeSlots: [
        "Lun.21/10/2024 :  8h - 13h",
        "Mar. 22/10/2024 :  8h - 13h",
        "Mer. 23/10/2024 :  8h - 13h",
        "Jeu. 24/10/2024 :  8h - 13h",
        "Ven. 25/10/2024 :  8h - 13h",
        "Lun. 04/11/2024 : 14h - 19.30h",
        "Mar. 05/11/2024 :  8h - 13.30h",
        "Mer. 06/11/2024 :  8h - 13.30h",
        "Jeu. 07/11/2024 :  8h - 13.30h",
        "Ven. 08/11/2024 :  8h - 13.30h",
      ],
    },
    {
      title: "Intensive Matwork",
      niveau: "débutant et intermédiare",
      image: formation6,
      date: "Du 18 au 22/11/2024 et du 03 au 06/12/2024",
      timeSlots: [
        "Mar. 19/10/2024 :  8h - 13h",
        "Mer. 20/10/2024 :  8h - 13h",
        "Jeu. 21/10/2024 :  8h - 13h",
        "Ven. 22/10/2024 :  8h - 13h",
        "Mar. 03/12/2024 :  8h - 13h",
        "Mer. 04/12/2024 :  8h - 13h",
        "Jeu. 05/12/2024 :  8h - 13h",
        "Ven. 06/12/2024 :  8h - 13h",
      ],
    },
    {
      title: "ONLINE Workshop Préntal stabilité Ball et Flex band",
      niveau: "",
      image: formation6,
      date: "21/12/2024",
      timeSlots: ["Sam. 21/12/2024 de 14h à 16h"],
    },
    {
      title: "ONLINE Workshop Postnatal Pilates",
      niveau: "",
      image: formation3,
      date: "21/12/2024",
      timeSlots: ["Sam. 21/12/2024 de 16h15 à 18h15"],
    },
    {
      title: "Intensive Matwork",
      niveau: "débutant et intermédiare",
      image: formation6,
      date: "Du 24/02 au 28/02/2025",
      timeSlots: [
        "Lun. 24/02/2025 : 1.pm -6.pm",
        "Mar. 25/02/2025 : 8am - 1.pm",
        "Mer. 26/02/2025 : 8am - 1.pm",
        "Jeu. 27/02/2025 : 8am - 1.pm",
        "Ven. 28/02/2025 : 8am - 1.pm",
        "OFF",
        "Mar. 03/03/2025 : 8am - 1.pm",
        "Mer. 04/03/2025 : 8am - 1.pm",
        "Jeu. 05/03/2025 : 8am - 1.pm",
      ],
    },

    {
      title: "Matwork Avancé",
      niveau: "",
      image: formation3,
      date: "06/03/2025",
      timeSlots: ["Ven. 06/03/2025 de 9h à 12h et 14h à 15h"],
    },
    {
      title: "Intensive Reformer",
      niveau: "Debutant et intermédiare",
      image: reformer,
      date: "31/03/2025",
      timeSlots: [
        "Lun. 31/03/2025 : 1.pm -6.pm",
        "Mar. 01/04/2025 : 8am - 1.pm",
        "Mer. 02/04/2025 : 8am - 1.pm",
        "Jeu. 03/04/2025 : 8am - 1.pm",
        "Ven. 05/04/2025 : 8am - 1.pm",
        "OFF",
        "Lun. 07/04/2025 : 1.pm -6.pm",
        "Niveau Intermédiaire",
        "Mar. 08/04/2025 : 8am - 1.pm",
        "Mer. 09/04/2025 : 8am - 1.pm",
        "Jeu. 10/04/2025 : 8am - 1.pm",
        "Ven. 11/04/2025 : 8am - 1.pm",
      ],
    },
    {
      title: "ISP",
      niveau: "",
      image: formation3,
      date: "Du 27/05 au 30/05/2025",
      timeSlots: [
        "Mar. 27/05/2025 : 9am - 12pm, 2pm - 5pm",
        "Mer. 28/05/2025 : 9am - 12pm, 2pm - 5pm",
        "Jeu. 29/05/2025 : 9am - 12pm, 2pm - 5pm",
        "Ven. 30/05/2025 : 9am - 12pm, 2pm - 5pm",
      ],
    },
    {
      title: "Intensive Reformer",
      niveau: "Debutant et intermédiare",
      image: reformer,
      date: "20/06/2025",
      timeSlots: [
        "Lun. 09/06/2025 : 1.pm -6.pm",
        "Mar. 10/06/2025 : 8am - 1.pm",
        "Mer. 11/06/2025 : 8am - 1.pm",
        "Jeu. 12/06/2025 : 8am - 1.pm",
        "Ven. 13/06/2025 : 8am - 1.pm",
        "OFF",
        "Lun. 16/06/2025 : 1.pm -6.pm",
        "Niveau Intermédiaire",
        "Mar. 17/06/2025 : 8am - 1.pm",
        "Mer. 18/06/2025 : 8am - 1.pm",
        "Jeu. 19/06/2025 : 8am - 1.pm",
        "Ven. 20/06/2025 : 8am - 1.pm",
      ],
    },
    {
      title: "Intensive Cadillac",
      niveau: "Debutant et intermédiare",
      image: reformerGyrotonicImage,
      date: "du 30/06/2025 au 04/07/2025",
      timeSlots: [
        "Lun. 30/06/2025 : 1.pm - 6.30.pm",
        "Mar. 01/07/2025 : 8am - 1.pm",
        "Mer. 02/07/2025 : 8am - 1.pm",
        "Jeu. 03/07/2025 : 8am - 1.pm",
        "Ven. 04/07/2025 : 8am - 1.pm",
      ],
    },
    {
      title: "Intensive Chaise",
      niveau: "Debutant et intermédiare",
      image: formation2,
      date: "du 07/07/2025 au 09/07/2025",
      timeSlots: [
        "Lun. 07/07/2025 : 1pm - 6:30pm",
        "Mar. 08/07/2025 : 8am - 1pm",
        "Mer. 09/07/2025 : 8am - 1pm",
      ],
    },
    {
      title: "Intensive Barils",
      niveau: "Debutant et intermédiare",
      image: formation2,
      date: "du 07/07/2025 au 09/07/2025",
      timeSlots: ["Jeu. 10/07/2025 : 8am - 1pm", "Ven. 11/07/2025 : 8am - 1pm"],
    },
    {
      title: "Intensive Reformer",
      niveau: "Debutant et intermédiare",
      image: reformer,
      date: "du 28/08/2025 au 05/09/2025",
      timeSlots: [
        "Lun. 25/08/2025 : 1pm - 6pm",
        "Mar. 26/08/2025 : 8am - 1pm",
        "Mer. 27/08/2025 : 8am - 1pm",
        "Jeu. 28/08/2025 : 8am - 1pm",
        "Ven. 29/08/2025 : 8am - 1pm",
        "OFF",
        "Lun. 01/09/2025 : 1pm - 6pm",
        "Niveau Intermédiaire",
        "Mar. 02/09/2025 : 8am - 1pm",
        "Mer. 03/09/2025 : 8am - 1pm",
        "Jeu. 04/09/2025 : 8am - 1pm",
        "Ven. 05/09/2025 : 8am - 1pm",
      ],
    },
  ];

  const plansWorkshop = [
    {
      title: "ONLINE Workshop",
      niveau: "Beyond the Biomechanical Principles",
      image: Img,
      date: "Le 16/11/2024",
      timeSlots: ["Sam 16/11/2024 de 14h à 18h"],
      price: "Prix 3h :189€",
    },
    {
      title: "ONLINE Workshop",
      niveau: "Prénatal stabilité Ball et Flex band",
      image: Img,
      date: "Le 21/12/2024",
      timeSlots: ["Sam 21/12/2024 de 14h à 16h"],
      price: "Prix 2h :126€",
    },
    {
      title: "ONLINE Workshop",
      niveau: "Postnatal Pilates",
      image: Img,
      date: "Le 21/12/2024",
      timeSlots: ["Sam 21/12/2024 de 16h15 à 18h15"],
      price: "Prix 2h :126€",
    },
  ];

  return (
    <div className="flex flex-col mx-5 md:mx-12">
      <section className="mt-2 mb-14 flex flex-col-reverse lg:flex-row justify-center lg:justify-between gap-8">
        {/* carousel */}

        {/* <CircleCarousel images={images} /> */}
        <CircleSwiperCarousel images={images} />

        {/* text */}
        <div className="flex flex-col items-start md:items-baseline py-6 min-w-min md:px-2  sm:gap-5 font-lato w-[90%]">
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
      <FormationSwiper />

      {/* Planning formation*/}
      <PlanningFormations plans={plansFormation} />

      {/* Fianncer votre formation */}
      <FinancerVotreFormation />

      {/* workshop */}
      <WorkshopSlider />

      {/* Planning workshop */}
      <PlanningWorkshops plans={plansWorkshop} />
    </div>
  );
}
