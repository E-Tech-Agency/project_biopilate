import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";
import instructeur1 from "@/assets/images/instructeur-1.png";
import instructeur2 from "@/assets/images/instructeur-2.png";
import instructeur3 from "@/assets/images/instructeur-3.png";
import instructeur4 from "@/assets/images/instructeur-4.png";
import instructeur5 from "@/assets/images/instructeur-5.png";
import instructeur6 from "@/assets/images/instructeur-6.png";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface InstructeurInfo {
  name: string;
  image: string;
  description: string;
}

const InstructeurCard = ({ instructeur }: { instructeur: InstructeurInfo }) => {
  return (
    <div className="flex items-center justify-between max-w-[630px] xl:max-w-[680px] min-w-[230px] h-[280px] sm:h-[300px] bg-white rounded-lg shadow-xl p-4 sm:p-8 mx-2">
      <div className="flex-shrink-0 flex justify-center items-center bg-bgColor rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] shadow-lg max-sm:mt-[-50px]">
        <img
          loading="lazy"
          src={instructeur.image}
          alt={`Photo de ${instructeur.name}`}
          className="rounded-full w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] md:w-[170px] md:h-[170px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 flex-grow ml-4 sm:ml-6 max-w-[60%]">
        <h3 className="text-lg sm:text-xl md:text-2xl font-ebGaramond text-marron font-bold">
          {instructeur.name}
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: instructeur.description }}
          className="text-justify text-[#5a5a5a] text-xs sm:text-sm md:text-base font-lato leading-relaxed overflow-y-auto max-h-[216px]"
        />
      </div>
    </div>
  );
};

export default function NosInstructeurs() {
  const instructeurs = [
    {
      name: "Sarah Bellagamba",
      image: instructeur1,
      description:
        "Professeure invitée au Studio Le Pilates, Sarah insuffle à ses cours une énergie inspirante, nourrie par ses voyages et ses découvertes culturelles. Son enseignement unique mêle le Pilates à des influences variées, offrant une expérience riche et immersive.",
    },
    {
      name: "Imrann Bana",
      image: instructeur2,
      description:
        "Coach <strong>certifié Stott Pilates</strong> chez Biopilates Paris, allie passion des arts martiaux et expertise Pilates. Son savoir-faire unique en Matwork et équipements en fait un instructeur très recherché.",
    },
    {
      name: "Violaine Danais",
      image: instructeur4,
      description:
        "<strong>Instructrice invitée</strong> chez Biopilates Paris, est passionnée de mouvement et rayonne par sa bienveillance. Certifiée <strong>Stott Pilates</strong>, elle transmet une énergie positive dans chaque cours.",
    },
    {
      name: "Jessica Cruz",
      image: instructeur3,
      description:
        "Instructrice Pilates et Lagree chez Biopilates Paris, allie ses racines brésiliennes et orientales à un enseignement lumineux et unique. Son approche artistique et dynamique rend chaque cours captivant.",
    },
    {
      name: "Joëlle Berckmans",
      image: instructeur5,
      description:
        "Instructrice de Pilates, incarne la douceur, l’élégance et la subtilité. Grâce à son approche intuitive et bienveillante, elle propose des cours qui allient fluidité et écoute du corps, offrant un enseignement raffiné et accessible à tous.",
    },
    {
      name: "Natasha Lodhi",
      image: instructeur6,
      description:
        "Instructrice de Pilates, Natasha allie créativité et liberté dans son enseignement. Toujours en quête d’innovation, elle propose des cours dynamiques et authentiques, offrant une expérience unique où expression personnelle et bien-être se rencontrent.",
    },
  ];

  return (
    <section className="relative flex flex-col justify-center items-center w-full h-[440px] sm:h-[470px]">
      <h2 className="text-marron text-start w-full text-xl sm:text-[34px] leading-snug font-ebGaramond font-bold mb-8">
        Nos instructeurs
      </h2>

      <Swiper
        className="centered-slide-carousel swiper-container w-full overflow-hidden mx-[-20px] md:mx-[-48px]"
        grabCursor={true}
        spaceBetween={40}
        slideToClickedSlide={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-but-next",
          prevEl: ".swiper-but-prev",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          1920: { slidesPerView: 3, spaceBetween: 25 },
          1750: { slidesPerView: 3, spaceBetween: 20 },
          1540: { slidesPerView: 2.6, spaceBetween: 18 },
          1380: { slidesPerView: 2.4, spaceBetween: 16 },
          1280: { slidesPerView: 2.2, spaceBetween: 16 },
          990: { slidesPerView: 1.9, spaceBetween: 10 },
          768: { slidesPerView: 1.3, spaceBetween: 5 },
          640: { slidesPerView: 1.1, spaceBetween: 2 },
        }}
      >
        {instructeurs.map((instructeur, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center xl:items-start"
          >
            <InstructeurCard instructeur={instructeur} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="arrow-hover cursor-pointer swiper-but-prev slider-arrow hidden sm:flex justify-center items-center bg-marron text-bgColor hover:text-marron rounded-full w-10 h-10 absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-20">
        <FaArrowLeftLong />
      </button>
      <button className="arrow-hover cursor-pointer swiper-but-next slider-arrow hidden sm:flex justify-center items-center bg-marron text-bgColor hover:text-marron rounded-full w-10 h-10 absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-20">
        <FaArrowRightLong />
      </button>

      <div className="swiper-pagination m-auto z-[1] block" />
    </section>
  );
}
