import { useState } from "react";
import BlogCard from "@/biopilates/components/BlogCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import articleImage1 from "@/assets/images/article-1.png";
import placeholderImage from "@/assets/images/Placeholder_view_vector.png";

function Filter() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const categories = ["Tous", "Anatomie", "Pilates"];

  const toggleCategory = (index: number) => {
    if (selectedCategories.includes(index)) {
      setSelectedCategories(selectedCategories.filter((i) => i !== index));
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  return (
    <div className="flex flex-row items-start gap-2 py-2">
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
      image: articleImage1,
    },

    // Add other articles here similarly...
  ];

  return (
    <div className="flex flex-col mt-4 mx-5 md:mx-12 mb-12">
      <div className="mb-12">
        <div className="mb-8 flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center text-base leading-6 rounded-lg px-4 py-1 bg-bgColor text-marron font-medium">
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
        <div className="relative flex justify-center overflow-hidden mx-[-48px]">
          <div className="absolute object-cover z-[0] scale-50 sm:scale-75 md:scale-90 lg:scale-110 xl:scale-125 ">
            <svg
              width="1440"
              height="417"
              viewBox="0 0 1440 417"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_b_604_4437)">
                <path
                  d="M-343 0H1835.09V108.455L-343 380.6V0Z"
                  fill="#FBFBFB"
                />
              </g>
              <path
                d="M855.326 166.609L1472.07 89.1836V153.698L855.326 231.124V166.609Z"
                fill="#EBDCCD"
              />
              <path
                d="M1016.11 82.1093L1439.42 28.8905V93.7458L1016.11 146.965V82.1093Z"
                fill="#756E66"
              />
              <path
                d="M-4.98486 271.215L418.323 218.563V282.728L-4.98486 335.381V271.215Z"
                fill="#EBDCCD"
              />
              <path
                d="M-134 351.219L289.308 298V362.855L-134 416.074V351.219Z"
                fill="#756E66"
              />
              <defs>
                <filter
                  id="filter0_b_604_4437"
                  x="-454.111"
                  y="-111.111"
                  width="2400.31"
                  height="602.823"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur
                    in="BackgroundImageFix"
                    stdDeviation="55.5556"
                  />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_604_4437"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_604_4437"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="flex flex-wrap gap-6 justify-center py-16">
            {articles.map((article, index) => (
              <div className="z-10">
                <BlogCard key={index} article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Stack spacing={2}>
          <Pagination count={2} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
}
