import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { LuShare } from "react-icons/lu";
// import OtherArticles from "./OtherArticles";
import article1Image from "@/assets/images/article-1.png";
import placeholderImage from "@/assets/images/Placeholder_view_vector.png";
import image1 from "@/assets/images/caroline-article-1.jpeg";
import image2 from "@/assets/images/caroline-article-2.jpg";
import blogTrainer from "@//assets/images/blog-trainer.jpg";
import { LuShare } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { RiTwitterXLine, RiInstagramFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Article() {
  const articles = [
    {
      id: 1,
      title: "La maison vieille",
      ecrivain: "Véronique Fournier",
      description:
        "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
      jaimes: 49,
      image: article1Image,
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
  const { id } = useParams<{ id: string }>(); // Make sure id is of type string
  const articleId = id ? parseInt(id) : null; // Safely parse the id if it exists
  const article = articleId ? articles.find((a) => a.id === articleId) : null; // Find the article using the parsed ID

  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate("/contact");
  };

  if (!article) {
    return (
      <div className="flex flex-col mx-5 md:mx-12 my-12">
        <h1 className="font-bold text-4xl text-marron m-auto">
          Article not found
        </h1>
      </div>
    );
  }
  return (
    <div className="mt-8 mx-5 md:mx-12 mb-12 gap-3">
      <div className="flex flex-col justify-center items-center">
        <p className="text-marron text-xl md:text-6xl leading-snug font-ebGaramond font-semibold text-center max-w-[1100px] mx-8">
          Ce n'est pas parce qu'on est vieux qu'on n'a pas besoin ni envie de
          vacances.
        </p>
        <img
          src={article.image}
          alt={article.title}
          className="rounded-lg w-full max-h-[645px] object-cover object-bottom shadow-lg my-6"
        />
      </div>
      <div className="flex flex-row max-md:flex-wrap my-4 gap-6">
        <div className="min-w-[200px] text-marron font-bold">
          Date de l'article
        </div>
        <div className="font-lato flex flex-col gap-6 text-justify pr-6">
          <div>
            <p>
              <strong>La maison vieille</strong> est une maison de vacances
              spécialement conçue pour les personnes vieilles ou à mobilité
              réduite. Elle propose des services et activités adaptés à leur
              âge.
            </p>
            <p>
              Elle permet aussi de venir entre amis ou en famille dans un lieu
              qui convient à toutes les générations. « J’ai conçu cette maison
              comme un lieu de fraternité pour y accueillir plus
              particulièrement toutes ces vieilles et ces vieux dont j’ai eu à
              prendre soin quand j’étais médecin,et dont j’ai découvert combien
              si souvent ils souffrent de se sentir seuls et en marge de la vie
              qui va. Puisse <strong>la maison vieille</strong> leur permettre
              de renouer du lien social, de rencontrer des pairs, de s’offrir
              quelques plaisirs simples; devenir un lieu où l’on sait que l’on
              peut aller facilement pour briser pendant quelques jours,voire
              simplement pendant quelques heures, le cours infini de la solitude
              à laquelle on est désormais contraint ».
            </p>
          </div>
          <p className="font-bold text-marron text-xl md:text-3xl">
            Caroline Berger intervient bénévolement à la Maison Vieille dans les
            ateliers de pratique physique du Pilates adapté:
          </p>
          <div className="flex flex-wrap gap-8 mt-2">
            <img
              src={image1}
              alt={article.title}
              className="rounded-lg max-h-[300px] w-[420px] max-md:w-full object-top object-cover "
            />
            <img
              src={image2}
              alt={article.title}
              className="rounded-lg max-h-[300px] w-[420px] object-cover max-md:hidden"
            />
          </div>
          <p>
            “Cela fait plus de 15 ans que je connais Véronique Fournier et j’ai
            toujours été très respectueuse de ses idées et très engagée à y
            adhérer dès que je le pouvais. Nous avons tous des parents ou des
            proches vieillissants. Après avoir vécu ma première maison de de
            retraite avec ma grand-mère, je me suis promise d’accompagner mes
            proches et de leur offrir la possibilité d’être autonome le plus
            longtemps possible et cela passe aussi par une activité physique
            adaptée.“
          </p>

          <ul className="flex flex-wrap gap-3 pt-2">
            <li className="block rounded-md text-marron py-1 px-3 border border-bgColor">
              Pilates
            </li>
            <li className="block rounded-md text-marron py-1 px-3 border border-bgColor">
              Activités physique
            </li>
            <li className="block rounded-md text-marron py-1 px-3 border border-bgColor">
              Mobilité réduite
            </li>
            <li className="block rounded-md text-marron py-1 px-3 border border-bgColor">
              Maison Vieille
            </li>
          </ul>
          <hr />
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col gap-2">
              <p>Véronique Fournier</p>
              <p className="text-gray-500">
                Fondatrice du projet et hôtesse des lieux
              </p>
            </div>

            {/* social media */}
            <Popover>
              <PopoverTrigger asChild>
                <button>
                  <LuShare className="text-blueText text-3xl mx-6 md:mx-12" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] text-gray-900 font-lato flex flex-col gap-4 text-[15px]">
                <button className=" flex justify-start items-center gap-1.5">
                  <div className="text-xl">
                    <IoIosLink />
                  </div>
                  Copier lien
                </button>
                <hr className="mx-[-14px]" />
                <button className=" flex justify-start items-center gap-1.5">
                  <div className="text-white bg-black rounded-full text-lg p-1">
                    <TiSocialFacebook />
                  </div>
                  Partager sur Facebook
                </button>
                <button className=" flex justify-start items-center gap-1.5">
                  <div className="text-white bg-black rounded-full text-lg p-1">
                    <RiInstagramFill />
                  </div>
                  Partager sur Instagram
                </button>
                <button className=" flex justify-start items-center gap-1.5">
                  <div className="text-white bg-black rounded-full text-lg p-1">
                    <RiTwitterXLine />
                  </div>
                  Partager sur X
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* temporarly commented */}

      <div className="my-12 w-full">
        {/* 
        <p className="mb-6 font-ebGaramond font-bold text-3xl text-marron">
          D’autres articles
        </p>
        <div className="flex flex-col justify-center items-center max-md:mx-[-26px]">
          <OtherArticles articles={articles} />
        </div> */}
      </div>

      <div className="flex flex-wrap justify-center xl:justify-between items-center gap-10 border border-grayText rounded-lg min-h-[300px] py-8 xl:py-4 px-6 xl:px-10 max-md:bg-marron max-md:text-white max-md:mx-[-26px]">
        <div className="flex flex-col gap-4 w-full xl:w-[400px] xl:max-w-[465px] ">
          <p className="font-lato font-semibold text-grayText text-sm max-md:hidden">
            INSCRIVEZ-VOUS
          </p>
          <p className="font-ebGaramond font-bold text-2xl md:text-5xl text-marron max-md:text-bgColor">
            Rejoignez notre communauté de Pilates exclusive
          </p>
          <p className="font-lato max-md:text-sm">
            Plongez dans un espace où chaque mouvement est une note de musique,
            chaque respiration une mélodie de bien-être. Rejoignez notre
            communauté de Pilates et laissez la symphonie du corps et de
            l’esprit commencer.
          </p>
          <form action="post" className="flex gap-2 md:gap-4 h-8">
            <input
              type="email"
              name="email"
              placeholder="Adresse Email"
              className="border border-bgColor md:border-marron text-gray-900 text-sm rounded-md min-w-[150px] w-[300px] p-2.5 max-md:bg-marron max-md:text-white placeholder-white md:placeholder-gray-700"
            />
            <button
              className="inscrire button-hover mr-auto text-base rounded-lg px-3 md:px-7 py-4 text-marron md:text-bgColor bg-bgColor md:bg-marron font-lato transition duration-300 ease-in-out transform"
              onClick={() => navigateToContact()}
            >
              <div className="hover-circle-3 hover-circle-2 overflow-hidden" />
              S'inscrire
            </button>
          </form>
        </div>
        <img
          src={blogTrainer}
          alt="CTA"
          className="rounded-full object-cover min-w-[300px] min-h-[300px] max-w-[530px] max-h-[530px] w-full h-[530px] shadow-lg max-md:hidden"
        />
      </div>
    </div>
  );
}
