import workshop1 from "@/assets/images/workshop-1.jpg";
import workshop2 from "@/assets/images/formation-6.jpg";
import workshop3 from "@/assets/images/reformer.jpg";
import workshop4 from "@/assets/images/reformer-gyrotonic.jpg";
import workshop5 from "@/assets/images/workshop-2.jpg";
import workshop6 from "@/assets/images/workshop-3.jpg";
import workshop7 from "@/assets/images/formation-5.png";
import workshop8 from "@/assets/images/workshop-4.jpg";
import { useState } from "react";

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
    <div className="flex flex-row max-md:justify-center items-start gap-2 py-2 h-20">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => toggleCategory(index)}
          className={`hover:border border-black block rounded-lg py-3 px-4 bg-white ${
            selectedCategories.includes(index) && "category-active"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Workshops() {
  const workshops = [
    {
      title: "Workshop en ligne",
      image: workshop1,
    },
    {
      title: "Workshop Matwork",
      image: workshop2,
    },
    {
      title: "Workshop Reformer",
      image: workshop3,
    },
    {
      title: "Workshop Cadillac, chaise et barril",
      image: workshop4,
    },
    {
      title: "Workshop golfeurs",
      image: workshop5,
    },
    {
      title: "Workshop prénatal et postnatal",
      image: workshop6,
    },
    {
      title: "Workshop Anatomie et fascias",
      image: workshop7,
    },
    {
      title: "Workshop de préparation aux examens",
      image: workshop8,
    },
  ];
  return (
    <div>
      <div className="p-3">
        <Filter />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-6 md:py-10">
        {workshops.map((workshop, index) => (
          <div
            key={index}
            className="w-[182px] flex flex-col justify-start items-center gap-4
            "
          >
            <img
              className="size-[140px] object-cover rounded-full shadow-md"
              src={workshop.image}
              alt={workshop.title}
            />
            <p className="flex-grow text-marron sm:text-lg text-center font-ebGaramond font-bold leading-normal">
              {workshop.title}
            </p>

            <button
              className={`flex overflow-hidden reserver-button cursor-pointer bg-bgColor flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
              // onClick={() => {
              //   window.open("", "_blank");
              // }}
            >
              <div className="hover-circle overflow-hidden" />
              Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
