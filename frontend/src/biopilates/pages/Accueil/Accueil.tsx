import Hero from "./Hero";
import Engagement from "./Engagement";
import CallToActionImg from "./CallToActionImg";

import FAQ from "./FAQ";
import '@/App.css';
import TemoignagesSection from "./TemoignagesSection";
import FormationSection from "./FormationSection";
import ServicesSection from "./ServicesSection";
import OtherArticles from "../Blog/OtherArticles";

// Importing images
import articleImage1 from "@/assets/images/article-1.png";
import placeholderImage from "@/assets/images/Placeholder_view_vector.png";
import gymImage from "@/assets/images/gym.jpg";
import bgImgReserver from "@/assets/images/bg-img-reserver.jpg";
import blogBg from "@/assets/images/blog-bg.jpg";

const articles = [
  {
    id: 1,
    title: "La maison vieille",
    ecrivain: "Véronique Fournier",
    description:
      "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
    jaimes: 49,
    image: articleImage1,
  },
  {
    id: 2,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 39,
    image: placeholderImage,
  },
  {
    id: 3,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 67,
    image: placeholderImage,
  },
  {
    id: 4,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 25,
    image: placeholderImage,
  },
  {
    id: 5,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 49,
    image: placeholderImage,
  },
  {
    id: 6,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 49,
    image: placeholderImage,
  },
  {
    id: 7,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 49,
    image: placeholderImage,
  },
  {
    id: 8,
    title: "Titre",
    ecrivain: "Par Biopilates",
    description:
      "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
    jaimes: 49,
    image: placeholderImage,
  },
];

export default function Accueil() {
  return (
    <div className="flex flex-col mx-8 md:mx-12 ">
      {/* Hero */}
      <Hero />
      {/* Intro */}
      <section className="mb-14 flex flex-col-reverse sm:flex-row flex-wrap justify-center lg:justify-between gap-10 font-lato">
        <div className="flex flex-col items-center md:items-baseline py-6  md:px-5 lg:w-[60%] gap-5 font-lato">
          <p className="text-marron text-xl sm:text-3xl leading-10 font-bold opacity-75 font-ebGaramond">
            Studio Biopilates Paris, votre havre de paix dédié au mieux être
          </p>
          <img
            loading="lazy"
            src={gymImage}
            alt="Gym"
            className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] object-cover md:hidden mb-2"
          />
          <div className="text-sm sm:text-base">
            <p className="leading-7">
              Premier studio <strong>STOTT Pilates</strong> en France, nous vous
              offrons une expérience unique pour une transformation physique et
              mentale profonde.
            </p>
            <p className="leading-7">
              Cours de Pilates pour tous niveaux{" "}
              <strong>
                Reformer , Reformer et Gyrotonic , Reformer Gyrotonic
              </strong>{" "}
              et Evolis dispensés par des{" "}
              <strong>instructeurs certifiés</strong>.
            </p>
            <p className="leading-7">
              Renforcez vos muscles, perdez du poids, développez votre souplesse
              et atteignez vos objectifs grâce à nos cours de Pilates
              personnalisés. Profitez d'une <strong>séance découverte</strong>{" "}
              et laissez-vous guider sur la voie du bien-être.
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          src={gymImage}
          alt="Gym"
          className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] object-cover hidden md:block"
        />
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Formations */}
      <FormationSection />

      {/* Engagement */}
      <Engagement />

      {/* Temoignages */}
      <TemoignagesSection />

      {/* CTA v2 */}
      <section className="relative flex mb-16 justify-between items-center w-full h-[200px] md:h-[410px]">
        <img
          className="absolute w-full h-full object-cover rounded-md"
          src={bgImgReserver}
          alt=""
        />
        <div className="flex justify-between items-center gap-4 z-[1] mx-6 sm:mx-10 w-full">
          <div className="flex flex-col justify-center gap-4 text-xs ">
            <p className="text-white sm:text-lg md:text-xl">
              Profitez d’un offre découverte à un prix raisonnable pour
              découvrir les bienfaits du Pilates.
            </p>
            <div className="flex gap-2">
              <button className="button-hover flex flex-col justify-center text-marron sm:text-base rounded-lg px-4 sm:px-8 sm:py-3 bg-white shadow-sm font-lato font-bold">
                Réserver
              </button>
              <button className="button-hover flex flex-col justify-center text-white sm:text-base rounded-lg px-8 py-3 border border-solid border-white shadow-sm">
                Contactez-nous
              </button>
            </div>
          </div>

          {/* <CallToActionImg /> */}
        </div>
      </section>

      {/* Blog */}
      <section className="mb-16">
        <div className="relative flex flex-col justify-center items-center gap-4">
          <img
            src={blogBg}
            alt=""
            className="absolute blur-3xl opacity-65"
          />
          <div className="relative flex flex-col justify-center items-center gap-4 w-full overflow-hidden">
            <div className="mb-6 flex flex-col justify-center items-center gap-1">
              <p className="text-3xl font-ebGaramond text-marron font-bold">
                Blog
              </p>
              <p className=" text-xs sm:text-xl max-sm:text-center font-lato">
                Trouvez l'harmonie entre corps et esprit : Bienvenue dans notre
                rubrique blog.
              </p>
            </div>
            {/* <OtherArticles articles={articles} /> */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* <FAQ /> */}
    </div>
  );
}
