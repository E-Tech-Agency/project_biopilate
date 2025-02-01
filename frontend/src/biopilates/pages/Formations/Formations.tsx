import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";
import reformer from "@/assets/images/reformer.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";
import formation5 from "@/assets/images/formation-5.png";
import formation6 from "@/assets/images/formation-6.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";
// import Img from "@/assets/images/Placeholder_view_vector.png";
import FormationSwiper from "./FormationSwiper";
import PourquoiBiopilates from "./PourquoiBiopilates";
import FinancerVotreFormation from "./FinancerVotreFormation";
import WorkshopSlider from "./WorkshopSlider";
import PlanningFormations from "./PlanningFormations";
import PlanningWorkshops from "./PlanningWorkshops";
import { useEffect ,useState} from "react";
import api from "@/lib/api";
import { CoursePlanningSessions } from "@/types/types"; 
interface Plan {
  
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  decription_link: string;
  sessions?: {  course:number; start_date: string; end_date: string; schedule: string[] }[];
}

export default function Formations() {
  const images = [formation3, reformer, formation5, formation1, formation2];
  const [planning, setPlanning] = useState<CoursePlanningSessions[]>([]);




  const plansFormation = [
    {
     
      title: "Intensive Matwork",
      description: "Débutant et intermédiaire",
      image: formation6,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-01-30T10:10:39.231396Z",
      updated_at: "2025-01-30T12:38:07.965067Z",
      sessions: [
        {
       
          course: 1,
          start_date: "2025-02-24",
          end_date: "2025-03-05",
          schedule: `
            - Lun. 24/02/2025 : 1 PM - 6 PM
            - Mar. 25/02/2025 : 8 AM - 1 PM
            - Mer. 26/02/2025 : 8 AM - 1 PM
            - Jeu. 27/02/2025 : 8 AM - 1 PM
            - Ven. 28/02/2025 : 8 AM - 1 PM
            - OFF
            - Mar. 03/03/2025 : 8 AM - 1 PM
            - Mer. 04/03/2025 : 8 AM - 1 PM
            - Jeu. 05/03/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
    {
     
      title: "Matwork Avancé",
      description: "",
      image: formation6,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-01-30T10:10:39.231396Z",
      updated_at: "2025-01-30T12:38:07.965067Z",
      sessions: [
        {
          id: 102,
          course: 2,
          start_date: "2025-03-06",
          end_date: "2025-03-06",
          schedule: `- Ven. 06/03/2025 : 9 AM - 12 PM, 2 PM - 3 PM`,
        },
      ],
    },
    {
   
      title: "Intensive Reformer",
      description: "Débutant et intermédiaire",
      image: reformer,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      sessions: [
        {
        
          course: 3,
          start_date: "2025-03-31",
          end_date: "2025-04-11",
          schedule: `
            - Lun. 31/03/2025 : 1 PM - 6 PM
            - Mar. 01/04/2025 : 8 AM - 1 PM
            - Mer. 02/04/2025 : 8 AM - 1 PM
            - Jeu. 03/04/2025 : 8 AM - 1 PM
            - Ven. 05/04/2025 : 8 AM - 1 PM
            - OFF
            - Lun. 07/04/2025 : 1 PM - 6 PM
            - Niveau Intermédiaire
            - Mar. 08/04/2025 : 8 AM - 1 PM
            - Mer. 09/04/2025 : 8 AM - 1 PM
            - Jeu. 10/04/2025 : 8 AM - 1 PM
            - Ven. 11/04/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
    {
      
      title: "ISP",
      description: "",
      image: formation3,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      sessions: [
        {
         
          course: 4,
          start_date: "2025-05-27",
          end_date: "2025-05-30",
          schedule: `
            - Mar. 27/05/2025 : 9 AM - 12 PM, 2 PM - 5 PM
            - Mer. 28/05/2025 : 9 AM - 12 PM, 2 PM - 5 PM
            - Jeu. 29/05/2025 : 9 AM - 12 PM, 2 PM - 5 PM
            - Ven. 30/05/2025 : 9 AM - 12 PM, 2 PM - 5 PM
          `,
        },
      ],
    },
    {
     
      title: "Intensive Cadillac",
      description: "Débutant et intermédiaire",
      image: reformerGyrotonicImage,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      sessions: [
        {
         
          course: 5,
          start_date: "2025-06-30",
          end_date: "2025-07-04",
          schedule: `
            - Lun. 30/06/2025 : 1 PM - 6:30 PM
            - Mar. 01/07/2025 : 8 AM - 1 PM
            - Mer. 02/07/2025 : 8 AM - 1 PM
            - Jeu. 03/07/2025 : 8 AM - 1 PM
            - Ven. 04/07/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
    {
     
      title: "Intensive Chaise",
      description: "Débutant et intermédiaire",
      image: formation2,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      sessions: [
        {
         
          course: 6,
          start_date: "2025-07-07",
          end_date: "2025-07-09",
          schedule: `
            - Lun. 07/07/2025 : 1 PM - 6:30 PM
            - Mar. 08/07/2025 : 8 AM - 1 PM
            - Mer. 09/07/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
  ];
  
  
  const getFormations = async () => {
    try {
      const res = await api.get("couxrse-list-planning-sessions/");
      const publishedFormations = res.data.filter(
        (formation: CoursePlanningSessions) => formation.status === "confirmed"
      );
      setPlanning(publishedFormations);
    } catch (error) {
      console.error("Error fetching plannig", error);
    }
  };

  useEffect(() => {
    getFormations();
  }, []);

  const dataPlanFormation = planning.length > 0 ? planning : plansFormation;

  //console.log(dataPlanFormation)

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
  const formattedPlans = planning.map(plan => ({
    ...plan,
    sessions: plan.sessions?.map(session => ({
      ...session,
      schedule: Array.isArray(session.schedule) ? session.schedule : [session.schedule], // Transformation en tableau
    })),
  }));

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
      <PlanningFormations plans={dataPlanFormation} /> 

      {/* Fianncer votre formation */}
      <FinancerVotreFormation />

      {/* workshop */}
      <WorkshopSlider />

      {/* Planning workshop */}
      <PlanningWorkshops plans={plansWorkshop} />
    </div>
  );
}



/*

*/