import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { LuShare } from "react-icons/lu";
// import OtherArticles from "./OtherArticles";
import blog1Img1 from "@/assets/images/article-1.png";
import blog1Img2 from "@/assets/images/caroline-article-1.jpeg";
import blog1Img3 from "@/assets/images/caroline-article-2.jpg";
import blog2Img1 from "@/assets/images/blog2-img1.png";
import blog2Img2 from "@/assets/images/blog2-img2.png";
import blog2Img3 from "@/assets/images/blog2-img3.png";
import blogTrainer from "@//assets/images/blog-trainer.jpg";
import { LuShare } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { RiTwitterXLine, RiInstagramFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";
import { Blog } from "@/types/types";
import { useEffect, useState } from "react";
import api from "@/lib/apiPublic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Article() {
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

  const articles: Blog[] = [
    {
      id: 1,
      title:
        "Ce n'est pas parce qu'on est vieux qu'on n'a pas besoin ni envie de vacances.",
      author: "Véronique Fournier",
      authorBio: "Fondatrice du projet et hôtesse des lieux",
      description:
        "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
      favorites: 49,
      view: 0,
      text1:
        "<strong>La maison vieille</strong> est une maison de vacances spécialement conçue pour les personnes vieilles ou à mobilité réduite. Elle propose des services et activités adaptés à leur âge. <br className='sm:hidden' />Elle permet aussi de venir entre amis ou en famille dans un lieu qui convient à toutes les générations. « J’ai conçu cette maison comme un lieu de fraternité pour y accueillir plus particulièrement toutes ces vieilles et ces vieux dont j’ai eu à prendre soin quand j’étais médecin, et dont j’ai découvert combien si souvent ils souffrent de se sentir seuls et en marge de la vie qui va. Puiss <strong>la maison vieille</strong> leur permettre de renouer du lien social, de rencontrer des pairs, de s’offrir quelques plaisirs simples; devenir un lieu où l’on sait que l’on peut aller facilement pour briser pendant quelques jours,voire simplement pendant quelques heures, le cours infini de la solitude à laquelle on est désormais contraint ».",
      subtitle:
        "Caroline Berger intervient bénévolement à la Maison Vieille dans les ateliers de pratique physique du Pilates adapté:",
      text2:
        "“Cela fait plus de 15 ans que je connais Véronique Fournier et j’ai toujours été très respectueuse de ses idées et très engagée à y adhérer dès que je le pouvais. Nous avons tous des parents ou des proches vieillissants. Après avoir vécu ma première maison de de retraite avec ma grand-mère, je me suis promise d’accompagner mes proches et de leur offrir la possibilité d’être autonome le plus longtemps possible et cela passe aussi par une activité physique adaptée.“",
      imageCover: blog1Img1,
      imagePosition: "object-bottom",
      image_1: blog1Img2,
      image_2: blog1Img3,
      tags: [
        "Pilates",
        "Activités physique",
        "Mobilité réduite",
        "Maison Vieille",
      ],
      date: new Date(""),
      status: "approved",
      full_text: "",
      range: 0,
      create_at: new Date("2025-01-30"),
      updated_at: new Date("2025-02-05"),
    },
    {
      id: 2,
      title:
        "Les bienfaits physiques de la méthode pilates pendant la grossesse",
      author: "Caroline Berger de Fémynie",
      authorBio: "Fondatrice du studio Biopilates",
      description:
        "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
      favorites: 49,
      view: 0,
      text1:
        "Soutenue par des recommandations fondées sur des preuves, la méthode Pilates offre une approche holistique pour nourrir le corps et l'esprit pendant la grossesse et le rétablissement après l'accouchement. Chaque grossesse est unique et la priorité doit toujours être d'écouter votre corps et de consulter votre médecin pour déterminer ce qui est le mieux pour vous. <br> </br> Au fur et à mesure que le corps s'adapte à la grossesse, divers changements physiques peuvent affecter le confort, la mobilité et la posture. <br> </br> Les exercices de Pilates offrent des moyens ciblés pour répondre à ces changements : Renforcement du tronc (sans travail du grand droit) : Le renforcement de l'abdomen transverse (muscles profonds du tronc) soutient la colonne vertébrale et le bassin, réduisant ainsi les désagréments courants de la grossesse tels que les douleurs lombaires. Soyez prudente avec les exercices qui font travailler le grand droit de l'abdomen (par exemple, les boucles abdominales ou tout travail de flexion), car ils peuvent solliciter les muscles abdominaux et aggraver le diastasis recto. <br> </br> Amélioration de la posture et de l'alignement : Le Pilates aide à maintenir l'alignement de la colonne vertébrale et renforce les muscles du dos afin d'atténuer les tensions dues aux déplacements de poids causés par la croissance du ventre et des seins.",
      subtitle: "",
      text2:
        "Augmentation de la flexibilité et de la mobilité : Pendant la grossesse, l'hormone relaxine augmente pour aider le corps à se préparer à l'accouchement en relâchant les ligaments et en augmentant la flexibilité, en particulier au niveau du bassin. Si cette souplesse accrue peut être bénéfique, elle nécessite également une certaine prudence, car des étirements excessifs pendant la grossesse peuvent rendre les articulations trop lâches ou instables, ce qui peut entraîner une gêne ou une blessure. Des étirements doux et contrôlés aident à maintenir la souplesse, tandis que des exercices en profondeur du tronc et du plancher pelvien développent la force nécessaire pour soutenir les articulations lâches en toute sécurité.",
      imageCover: blog2Img1,
      image_1: blog2Img2,
      image_2: blog2Img3,
      tags: [],
      date: new Date("2025-01-30"),
      status: "approved",
      full_text: "",
      range: 0,
      create_at: new Date("2025-01-30"),
      updated_at: new Date("2025-02-05"),
    },
  ];

  const { id } = useParams<{ id: string }>(); // Make sure id is of type string
  const articleId = id ? parseInt(id) : null; // Safely parse the id if it exists

  const navigate = useNavigate();
  const blogData: Blog[] =
    blogs && blogs.length > 0
      ? blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          author: blog.author,
          authorBio: blog.authorBio,
          description: blog.description,
          favorites: blog.favorites,
          view: blog.view,
          text1: blog.text1,
          subtitle: blog.subtitle,
          text2: blog.text2,
          imageCover: blog.imageCover,
          image_1: blog.image_1,
          image_2: blog.image_2,
          tags: blog.tags,
          date: blog.date,
          status: blog.status,
          full_text: blog.full_text,
          range: blog.range,
          create_at: blog.create_at,
          updated_at: blog.updated_at,
        }))
      : articles;

  const article = blogData.find((blog) => blog.id === articleId);
  const navigateToContact = () => {
    navigate("/contact");
  };

  // popover share button
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    console.log(url);
    window.open(url, "_blank");
  };

  const handleShareInstagram = () => {
    // Instagram does not have a direct share URL, so we can guide the user to copy the link
    alert("Copy the link and share it on Instagram.");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
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
          {article.title}
        </p>
        <img
          src={article.imageCover}
          alt={article.title}
          className={`rounded-lg w-full max-h-[645px] object-cover ${article.imagePosition} shadow-lg my-6`}
        />
      </div>
      <div className="flex flex-row max-md:flex-wrap my-4 gap-6">
        <div className="min-w-[200px] text-marron">
          <strong>Date:</strong> {article.date && article.date.toDateString()}
        </div>
        <div className="font-lato flex flex-col gap-6 text-justify md:pr-6">
          <div>
            <p dangerouslySetInnerHTML={{ __html: article.text1 }} />
          </div>

          {article.subtitle && (
            <p className="font-bold text-marron text-xl md:text-3xl">
              {article.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-8 mt-2">
            <img
              src={article.image_1}
              alt={article.title}
              className="rounded-lg max-h-[300px] w-[420px] max-md:w-full object-top object-cover "
            />
            <img
              src={article.image_2}
              alt={article.title}
              className="rounded-lg max-h-[300px] w-[420px] object-cover max-md:hidden"
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: article.text2 }} />

          {article.tags.length > 0 && (
            <ul className="flex flex-wrap gap-3 pt-2">
              {article.tags.map((tag, index) => (
                <li
                  key={index}
                  className="block rounded-md text-marron py-1 px-3 border border-bgColor"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <hr />

          {/* author */}
          <div className="flex justify-between items-start md:items-center mt-2">
            <div className="flex flex-col gap-2">
              <p>{article.author}</p>
              <p className="text-gray-500">{article.authorBio}</p>
            </div>

            {/* social media */}
            <Popover>
              <PopoverTrigger asChild>
                <button>
                  <LuShare className="text-blueText text-xl md:text-3xl mx-5 md:mx-12" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] text-gray-900 font-lato flex flex-col gap-4 text-[15px]">
                <button
                  className="flex justify-start items-center gap-1.5"
                  onClick={handleCopyLink}
                >
                  <div className="text-xl">
                    <IoIosLink />
                  </div>
                  {linkCopied ? "Lien copié!" : "Copier lien"}
                </button>
                <hr className="mx-[-14px]" />
                <button
                  className="flex justify-start items-center gap-1.5"
                  onClick={handleShareFacebook}
                >
                  <div className="text-white bg-black rounded-full text-lg p-1">
                    <TiSocialFacebook />
                  </div>
                  Partager sur Facebook
                </button>
                <button
                  className="flex justify-start items-center gap-1.5"
                  onClick={handleShareInstagram}
                >
                  <div className="text-white bg-black rounded-full text-lg p-1">
                    <RiInstagramFill />
                  </div>
                  Partager sur Instagram
                </button>
                <button
                  className="flex justify-start items-center gap-1.5"
                  onClick={handleShareTwitter}
                >
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
