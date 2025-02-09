import Hero from "./Hero";
import { useNavigate } from "react-router-dom";
import Engagement from "./Engagement";
import CallToActionImg from "./CallToActionImg";

import FAQ from "./FAQ";

import TemoignagesSection from "./TemoignagesSection";
import FormationSection from "./FormationSection";
import ServicesSection from "./ServicesSection";
import OtherArticles from "../Blog/OtherArticles";

// Importing images
import articleImage1 from "@/assets/images/article-1.png";
// import placeholderImage from "@/assets/images/Placeholder_view_vector.png";
import gymImage from "@/assets/images/gym.jpg";
import bgImgReserver from "@/assets/images/bg-img-reserver.jpg";
import blogBg from "@/assets/images/blog-bg.jpg";
import { Blog } from "@/types/types";
import { useEffect, useState } from "react";
import api from "@/lib/api";



export default function Accueil() {
  const [blogs, setBlogs] = useState<Blog[] | null>([]);

  const getBlogs = async () => {
    try {
      const res = await api.get("blogs/");
      const blogdataPublic = res.data.filter(
        (blog: Blog) => blog.status === "approved"
      );
      setBlogs(blogdataPublic);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const articles = [
    {
      id: 1,
      title: "La maison vieille",
      ecrivain: "Véronique Fournier",
      description:
        "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
      favorites: 49,
      image: articleImage1,
      view:10,
    },
  ];
  const blogData =
    blogs && blogs.length > 0
      ? blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          ecrivain: blog.author, // Map 'author' to 'ecrivain'
          description: blog.description,
          favorites: blog.favorites, // Map 'favorites' to 'favorites'
          image: blog.image_1, // Use 'image_1' as the main image
          view: blog.view,
        }))
      : articles;
   const navigate = useNavigate();

  const navigateToContact = () => {
    navigate("/contact");
  };

  return (
    <div className="flex flex-col mx-5 md:mx-12 ">
      {/* Hero */}
      <Hero />

      {/* Intro */}
      <section className="mb-8 flex flex-col-reverse sm:flex-row flex-wrap justify-center lg:justify-between gap-10 font-lato">
        <div className="flex flex-col items-center md:items-baseline pb-6 md:py-6 md:px-5 lg:w-[65%] gap-5 font-lato">
          <div className="flex flex-col w-full gap-4">
            <p className="text-marron text-xl sm:text-[34px] md:leading-10 font-bold font-ebGaramond">
              Studio Biopilates Paris,
            </p>
            <p className="text-blueText text-xl sm:text-[28px] md:leading-10 font-bold font-ebGaramond">
              Votre havre de paix dédié au mieux être
            </p>
          </div>

          <img
            loading="lazy"
            src={gymImage}
            alt="Gym"
            className="rounded-full w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] object-cover md:hidden mb-2 shadow-lg"
          />
          <div className="text-sm sm:text-lg">
            <p className="md:leading-8">
              Premier studio <strong>STOTT Pilates</strong> en France, nous vous
              offrons une expérience unique pour une transformation physique et
              mentale profonde. Cours de Pilates pour tous niveaux{" "}
              <strong>
                Reformer , Reformer et Gyrotonic , Reformer Gyrotonic et Evolis
              </strong>{" "}
              dispensés par <strong>des instructeurs certifiés</strong>.
            </p>
            <p className="md:leading-8">
              Renforcez vos muscles, perdez du poids, développez votre souplesse
              et atteignez vos objectifs grâce à nos{" "}
              <strong>cours de Pilates personnalisés.</strong> Profitez d'une{" "}
              <strong>séance découverte</strong> et laissez-vous guider sur la
              voie du bien-être.
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
      <div className="max-sm:mx-[-20px]">
        <section className="relative flex mb-12 md:mb-16 justify-between items-center w-full h-[200px] md:h-[410px]">
          <img
            className="absolute w-full h-full object-cover sm:rounded-md"
            src={bgImgReserver}
            alt=""
          />
          <div className="flex justify-between items-center gap-4 z-[1] mx-6 sm:mx-10 w-full">
            <div className="flex flex-col justify-center gap-4 text-xs ">
              <p className="text-white font-ebGaramond text-lg sm:text-2xl md:text-3xl text-shadow-2xl">
                Découvrez le Pilates chez nous
              </p>
              <p className="text-white sm:text-base md:text-xl text-shadow-2xl">
                Profitez d’un offre découverte à un prix raisonnable pour
                découvrir les bienfaits du Pilates.
              </p>
              <div className="flex gap-2">
                <button
                  className="button-hover flex flex-col justify-center text-marron sm:text-base rounded-lg px-4 sm:px-8 sm:py-3 bg-white shadow-sm font-lato font-bold transform"
                  onClick={() => {
                    window.open(
                      "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
                      "_blank"
                    );
                  }}
                >
                  <div className="hover-circle-2 overflow-hidden" />
                  Réserver
                </button>
                <button
                  className="button-hover flex flex-col justify-center text-white sm:text-base rounded-lg font-bold px-8 py-3 border border-solid border-white shadow-sm"
                  onClick={navigateToContact}
                >
                  <div className="hover-circle-2 overflow-hidden" />
                  Contactez-nous
                </button>
              </div>
            </div>
            <CallToActionImg />
          </div>
        </section>
      </div>

      {/* Blog */}
      <section className="relative flex flex-col justify-center items-center gap-4 mb-4">
        <img src={blogBg} alt="" className="absolute blur-3xl opacity-65" />
        <div className="relative flex flex-col justify-center items-center gap-4 w-full overflow-hidden">
          <div className="mb-6 flex flex-col justify-center items-center gap-4">
            <p className="text-xl sm:text-[34px] font-ebGaramond text-marron font-bold">
              Blog
            </p>
            <p className="text-sm sm:text-xl max-sm:text-center font-lato">
              Trouvez l'harmonie entre corps et esprit : Bienvenue dans notre
              rubrique blog.
            </p>
          </div>
          <OtherArticles articles={blogData} />
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </div>
  );
}
