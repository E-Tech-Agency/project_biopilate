import { useEffect, useState } from "react";
import api from "@/lib/api";
import { CoursePlanningSessions } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination } from "swiper/modules";
import PlanningFormationCard from "./PlanningFormationCard";
import formation6 from "@/assets/images/formation-6.jpg";

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
    // ...other plans...
    {
      title: "Advanced Reformer",
      description: "Avancé",
      image: formation6,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-02-15T10:10:39.231396Z",
      updated_at: "2025-02-15T12:38:07.965067Z",
      sessions: [
        {
          course: 2,
          start_date: "2025-03-10",
          end_date: "2025-03-20",
          schedule: `
      - Lun. 10/03/2025 : 1 PM - 6 PM
      - Mar. 11/03/2025 : 8 AM - 1 PM
      - Mer. 12/03/2025 : 8 AM - 1 PM
      - Jeu. 13/03/2025 : 8 AM - 1 PM
      - Ven. 14/03/2025 : 8 AM - 1 PM
      - OFF
      - Mar. 17/03/2025 : 8 AM - 1 PM
      - Mer. 18/03/2025 : 8 AM - 1 PM
      - Jeu. 19/03/2025 : 8 AM - 1 PM
      - Ven. 20/03/2025 : 8 AM - 1 PM
      `,
        },
      ],
    },
    {
      title: "Comprehensive Pilates",
      description: "Tous niveaux",
      image: formation6,
      status: "confirmed",
      decription_link:
        "https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ",
      created_at: "2025-03-01T10:10:39.231396Z",
      updated_at: "2025-03-01T12:38:07.965067Z",
      sessions: [
        {
          course: 3,
          start_date: "2025-04-01",
          end_date: "2025-04-10",
          schedule: `
      - Lun. 01/04/2025 : 1 PM - 6 PM
      - Mar. 02/04/2025 : 8 AM - 1 PM
      - Mer. 03/04/2025 : 8 AM - 1 PM
      - Jeu. 04/04/2025 : 8 AM - 1 PM
      - Ven. 05/04/2025 : 8 AM - 1 PM
      - OFF
      - Mar. 08/04/2025 : 8 AM - 1 PM
      - Mer. 09/04/2025 : 8 AM - 1 PM
      - Jeu. 10/04/2025 : 8 AM - 1 PM
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

  useEffect(() => {
    setShowMoreStates(dataPlanFormation.map(() => false));
  }, [planning]);

  const formattedPlans = planning.map((plan) => ({
    ...plan,
    sessions: plan.sessions?.map((session) => ({
      ...session,
      schedule: session.schedule, // Ensure schedule is a string
    })),
  }));

  const dataPlanFormation =
    formattedPlans.length > 0 ? formattedPlans : plansFormation;

  const toggleShowMore = (index: number) => {
    setShowMoreStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

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
