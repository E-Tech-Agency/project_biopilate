import { useEffect, useState } from "react";
import api from "@/lib/apiPublic";
import { CoursePlanningSessions } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";
import PlanningFormationCard from "./PlanningFormationCard";
import reformer from "@/assets/images/reformer.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";

import formation6 from "@/assets/images/formation-6.jpg";
import reformerGyrotonicImage from "@/assets/images/reformer-gyrotonic.jpg";

interface Plan {
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  decription_link: string;
  sessions?: {
    course: number;
    start_date: string;
    end_date: string;
    schedule: string;
  }[];
}

export default function PlanningFormations() {
  const [planning, setPlanning] = useState<Plan[]>([]);
  const [showMoreStates, setShowMoreStates] = useState<boolean[]>([]);

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
      created_at: "2025-02-15T10:10:39.231396Z",
      updated_at: "2025-02-15T12:38:07.965067Z",
      sessions: [
        {
          course: 2,
          start_date: "2025-03-06",
          end_date: "2025-03-06",
          schedule: `
            - Ven. 06/03/2025 : 9 AM - 12 PM, 2 PM - 3 PM
          `,
        },
      ],
    },
    {
      title: "Intensive Reformer",
      description: "Debutant et intermédiare",
      image: reformer,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-03-01T10:10:39.231396Z",
      updated_at: "2025-03-01T12:38:07.965067Z",
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
      created_at: "2025-05-01T10:10:39.231396Z",
      updated_at: "2025-05-01T12:38:07.965067Z",
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
      title: "Intensive Reformer",
      description: "Debutant et intermédiare",
      image: reformer,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-06-01T10:10:39.231396Z",
      updated_at: "2025-06-01T12:38:07.965067Z",
      sessions: [
        {
          course: 5,
          start_date: "2025-06-09",
          end_date: "2025-06-20",
          schedule: `
            - Lun. 09/06/2025 : 1 PM - 6 PM
            - Mar. 10/06/2025 : 8 AM - 1 PM
            - Mer. 11/06/2025 : 8 AM - 1 PM
            - Jeu. 12/06/2025 : 8 AM - 1 PM
            - Ven. 13/06/2025 : 8 AM - 1 PM
            - OFF
            - Lun. 16/06/2025 : 1 PM - 6 PM
            - Niveau Intermédiaire
            - Mar. 17/06/2025 : 8 AM - 1 PM
            - Mer. 18/06/2025 : 8 AM - 1 PM
            - Jeu. 19/06/2025 : 8 AM - 1 PM
            - Ven. 20/06/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
    {
      title: "Intensive Cadillac",
      description: "Debutant et intermédiare",
      image: reformerGyrotonicImage,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-06-15T10:10:39.231396Z",
      updated_at: "2025-06-15T12:38:07.965067Z",
      sessions: [
        {
          course: 6,
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
      description: "Debutant et intermédiare",
      image: formation2,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-07-01T10:10:39.231396Z",
      updated_at: "2025-07-01T12:38:07.965067Z",
      sessions: [
        {
          course: 7,
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
    {
      title: "Intensive Barrils",
      description: "Debutant et intermédiare",
      image: formation1,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-07-01T10:10:39.231396Z",
      updated_at: "2025-07-01T12:38:07.965067Z",
      sessions: [
        {
          course: 8,
          start_date: "2025-07-10",
          end_date: "2025-07-11",
          schedule: `
            - Jeu. 10/07/2025 : 8 AM - 1 PM
            - Ven. 11/07/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
    {
      title: "Intensive Reformer",
      description: "Debutant et intermédiare",
      image: reformer,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-08-01T10:10:39.231396Z",
      updated_at: "2025-08-01T12:38:07.965067Z",
      sessions: [
        {
          course: 9,
          start_date: "2025-08-25",
          end_date: "2025-09-05",
          schedule: `
            - Lun. 25/08/2025 : 1 PM - 6 PM
            - Mar. 26/08/2025 : 8 AM - 1 PM
            - Mer. 27/08/2025 : 8 AM - 1 PM
            - Jeu. 28/08/2025 : 8 AM - 1 PM
            - Ven. 29/08/2025 : 8 AM - 1 PM
            - OFF
            - Lun. 01/09/2025 : 1 PM - 6 PM
            - Niveau Intermédiaire
            - Mar. 02/09/2025 : 8 AM - 1 PM
            - Mer. 03/09/2025 : 8 AM - 1 PM
            - Jeu. 04/09/2025 : 8 AM - 1 PM
            - Ven. 05/09/2025 : 8 AM - 1 PM
          `,
        },
      ],
    },
  ];

  const parseBackendSchedule = (scheduleString: string) => {
    if (!scheduleString) return '';
    
    // Split the schedule string into lines and filter out the headers
    const lines = scheduleString.split('\n')
      .filter(line => line.includes(':') && !line.includes('Start Date') && !line.includes('End Date') && !line.includes('Schedule'))
      .map(line => line.trim().replace('  - ', '- ')) // Clean up extra spaces
      .join('\n');
    
    return lines;
  };

  const getFormations = async () => {
    try {
      const res = await api.get("course-list-planning-sessions/");
      const publishedFormations = res.data
        .filter((formation: CoursePlanningSessions) => formation.status === "confirmed")
        .map((formation: CoursePlanningSessions) => {
          // If there are sessions, process them
          if (formation.sessions && formation.sessions.length > 0) {
            const firstSession = formation.sessions[0];
            return {
              ...formation,
              sessions: [{
                ...firstSession,
                schedule: parseBackendSchedule(firstSession.schedule)
              }]
            };
          }
          return formation;
        });
      console.log("Processed formations:", publishedFormations);
      setPlanning(publishedFormations);
    } catch (error) {
      console.error("Error fetching planning", error);
    }
  };

  useEffect(() => {
    getFormations();
  }, []);

  useEffect(() => {
    setShowMoreStates(dataPlanFormation.map(() => false));
  }, [planning]);
  
  const formattedPlans = planning.map((plan) => {
    const firstSession = plan.sessions?.[0];
    const startDate = firstSession?.start_date;
    const endDate = firstSession?.end_date;
    const imageUrl = `https://www.biopilates.fr${plan.image}`;
  
    const formattedDate =
      startDate && endDate
        ? `${new Date(startDate).toLocaleDateString("fr-FR")} au ${new Date(
            endDate
          ).toLocaleDateString("fr-FR")}`
        : "";
  
    return {
      ...plan,
      date: formattedDate,
      image: imageUrl,
    };
  });
  const dataPlanFormation =
    formattedPlans.length > 0 ? formattedPlans : plansFormation;

  const toggleShowMore = (index: number) => {
    setShowMoreStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };
  console.log("Formatted Plans:", formattedPlans);

  return (
    <section className="mb-14">
      <p className="text-marron text-xl sm:text-[34px] leading-snug mb-10 font-ebGaramond font-bold">
        Planning des formations
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container relative"
        grabCursor={true}
        spaceBetween={10}
        slideToClickedSlide={false}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          1920: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1650: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 3.1,
            spaceBetween: 10,
          },
          1060: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },

          930: {
            slidesPerView: 2.1,
            spaceBetween: 6,
          },
          768: {
            slidesPerView: 1.7,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 1.6,
            spaceBetween: 5,
          },
          500: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
        }}
      >
        <div className="flex flex-nowrap gap-8 overflow-hidden">
          {dataPlanFormation.map((plan, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <PlanningFormationCard
                plan={plan}
                showMore={showMoreStates[index]}
                toggleShowMore={() => toggleShowMore(index)}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination m-auto z-[1]"></div>
      </Swiper>
    </section>
  );
}
