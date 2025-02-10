import { Blog, BlogArticle } from "@/types/types";
import articleImage1 from "@/assets/images/article-1.png";
import blogimg2 from "@/assets/images/blog2-img1.png";

import blog1Img1 from "@/assets/images/article-1.png";
import blog1Img2 from "@/assets/images/caroline-article-1.jpeg";
import blog1Img3 from "@/assets/images/caroline-article-2.jpg";
import blog2Img1 from "@/assets/images/blog2-img1.png";
import blog2Img2 from "@/assets/images/blog2-img2.png";
import blog2Img3 from "@/assets/images/blog2-img3.png";

export const articleCards: BlogArticle[] = [
  {
    id: 1,
    title: "La maison vieille",
    ecrivain: "Véronique Fournier",
    description:
      "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
    favorites: 49,
    image: articleImage1,
    view: 10,
  },
  {
    id: 2,
    title: "La méthode pilates favorise une grossesse saine",
    ecrivain: "Caroline Berger de Fémynie",
    description:
      "Le Pilates, méthode douce et équilibrante, aide les femmes enceintes à mieux vivre les transformations physiques et émotionnelles de la grossesse.",
    favorites: 49,
    image: blogimg2,
    view: 10,
  },
  {
    id: 3,
    title:
      "Avantages pour la santé mentale avantages du pilates pendant la grossesse",
    ecrivain: "Caroline Berger de Fémynie",
    description:
      "Les exigences mentales de la grossesse et de la maternité peuvent être intenses. Le Pilates favorise le bien-être émotionnel.",
    favorites: 49,
    image: blog2Img2,
    view: 10,
  },

  // Add other articles here similarly...
];

export const articles: Blog[] = [
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
    title: "Les bienfaits physiques de la méthode pilates pendant la grossesse",
    author: "Caroline Berger de Fémynie",
    authorBio: "Fondatrice du studio Biopilates",
    description: "",
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
  {
    id: 3,
    title: "Avantages du Pilates pendant la grossesse pour la santé mentale",
    author: "Caroline Berger de Fémynie",
    authorBio: "Fondatrice du studio Biopilates",
    description: "",
    favorites: 49,
    view: 0,
    text1:
      "Les exigences mentales de la grossesse et de la maternité peuvent être intenses. Le Pilates favorise le bien-être émotionnel en encourageant : Clarté mentale et résistance : Le Pilates associe une respiration attentive à des mouvements contrôlés, ce qui aide à réduire le stress et à se concentrer. Améliorer l'humeur : L'exercice aide le corps à libérer des endorphines, qui sont des stimulants naturels de l'humeur. Les mouvements rythmiques du Pilates contribuent à la libération d'endorphines, créant un sentiment de calme et réduisant l'anxiété, ce qui est bénéfique pour la santé mentale prénatale et postnatale. Préparation à l'accouchement : La respiration profonde, la conscience du corps et les mouvements contrôlés de la méthode Pilates renforcent non seulement la confiance en soi, mais favorisent également un état d'esprit calme et préparé pour le travail et l'accouchement. La méthode Pilates se concentre sur le renforcement des muscles profonds du tronc, en particulier le transverse de l'abdomen et le plancher pelvien qui jouent un rôle crucial pendant l'accouchement. Un tronc solide et profond favorise l'endurance tout au long de l'accouchement.",
    subtitle: "",
    text2:
      "PRÉNATAL PILATES : PRINCIPAUX CONSEILS POUR CHAQUE TRIMESTRE Premier trimestre : Concentrez vous sur la stabilité du tronc en sollicitant le transverse de l'abdomen et le plancher pelvien. Cela permet de créer une base solide. Deuxième trimestre : Modifiez les mouvements pour tenir compte de la croissance du ventre. Privilégiez le soutien postural et les étirements en douceur. Troisième trimestre : Mettez l'accent sur le confort, la stabilité et le travail de respiration pour vous préparer à l'accouchement. La respiration profonde favorise la relaxation et aide à se concentrer.",
    imageCover: blog2Img2,
    image_1: blog2Img1,
    image_2: blog2Img3,
    tags: [],
    date: new Date("2025-02-05"),
    status: "approved",
    full_text: "",
    range: 0,
    create_at: new Date("2025-02-05"),
    updated_at: new Date("2025-02-05"),
  },
];
