import { React, useState } from "react";
import BlogCard from "../../components/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Filter() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Tous", "Anatomie", "Pilates"];

  const toggleCategory = (index) => {
    if (selectedCategories.includes(index)) {
      // If the category is already selected, remove it from the array
      setSelectedCategories(selectedCategories.filter((i) => i !== index));
    } else {
      // If the category is not selected, add it to the array
      setSelectedCategories([...selectedCategories, index]);
    }
  };
  return (
    <div className="flex flex-row  items-start gap-2 py-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => toggleCategory(index)}
          className={`category-hover block rounded-lg py-3 px-4 ${
            selectedCategories.includes(index) && "category-active"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "La maison vieille",
      ecrivain: "Véronique Fournier",
      description:
        "La Maison Vieille est un lieu de soutien et de bien-être pour les personnes âgées, visant à briser leur isolement et à offrir des moments enrichissants.",
      jaimes: 49,
      image: require("../../assets/images/article-1.png"),
    },
    {
      id: 2,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 39,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 3,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 67,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 4,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 25,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 5,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 49,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 6,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 49,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 7,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 49,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
    {
      id: 8,
      title: "Titre",
      ecrivain: "Par Biopilates",
      description:
        "Vous êtes débutant en Pilates et vous vous demandez comment bien commencer ? Découvrez nos 5 conseils pour débuter le Pilates.",
      jaimes: 49,
      image: require("../../assets/images/Placeholder_view_vector.png"),
    },
  ];
  return (
    <div className="flex flex-col mt-4 mx-8 md:mx-12 mb-12">
      <div className="mb-12">
        <div className="mb-8 flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center text-base leading-6 rounded-lg px-4 py-1 bg-bgColor text-marron font-medium ">
            Biopilates blog
          </div>
          <p className="text-marron text-3xl leading-snug font-ebGaramond font-bold">
            Découvrez le Pouvoir Transformateur du Pilates à Paris
          </p>
          <p className="leading-6 max-w-[1000px] text-blueText font-lato">
            Bienvenue sur notre <strong>blog dédié au Pilates à Paris !</strong>{" "}
            Que vous soyez débutant ou passionné, explorez avec nous les
            nombreux <strong>bienfaits du Pilates.</strong> Retrouvez{" "}
            <strong>
              des conseils d'experts, des routines inspirantes et des
              témoignages de transformation.
            </strong>{" "}
            Découvrez comment le Pilates peut améliorer votre bien-être
            physique, mental et enrichir votre vie quotidienne.{" "}
            <strong>Rejoignez-nous</strong> pour un voyage vers une meilleure
            version de vous-même, un mouvement à la fois.
          </p>
        </div>
        <Filter />
        <div className="flex flex-wrap gap-6 justify-center">
          {articles.map((article, index) => (
            <BlogCard key={index} article={article} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Stack spacing={2}>
          <Pagination
            count={6}
            rowsPerPage={6}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
}
