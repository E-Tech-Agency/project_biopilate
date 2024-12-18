import workshop1 from "@/assets/images/workshop-1.jpg";
import workshop2 from "@/assets/images/formation-6.jpg";
import workshop3 from "@/assets/images/reformer.jpg";
import workshop4 from "@/assets/images/reformer-gyrotonic.jpg";
import workshop5 from "@/assets/images/workshop-2.jpg";
import workshop6 from "@/assets/images/workshop-3.jpg";
import workshop7 from "@/assets/images/formation-5.png";
import workshop8 from "@/assets/images/workshop-4.jpg";
import ReserverButton from "@/biopilates/components/ReserverButton";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { WorkShop, CategoryWorkShop } from "@/types/types";

function Filter({
  categories,
  selectedCategories,
  onToggleCategory,
}: {
  categories: CategoryWorkShop[];
  selectedCategories: number[];
  onToggleCategory: (categoryId: number) => void;
}) {
  return (
    <div className="flex flex-row max-md:justify-center items-start gap-2 py-2 h-20">
      <button
        onClick={() => onToggleCategory(0)} // "0" represents "Tous" (all workshops)
        className={`hover:border border-black block rounded-lg py-3 px-4 bg-white ${
          selectedCategories.includes(0) && "category-active"
        }`}
      >
        Tous
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onToggleCategory(category.id)}
          className={`hover:border border-black block rounded-lg py-3 px-4 bg-white ${
            selectedCategories.includes(category.id) && "category-active"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default function Workshops() {
  const [workShopsData, setWorkShopsData] = useState<WorkShop[]>([]);
  const [categoriesWorkShop, setCategoriesWorkShop] = useState<CategoryWorkShop[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([0]); // "0" for "Tous" (all workshops)

  const getWorkShops = async () => {
    try {
      const res = await api.get("workshops-biopilate/");
      const publicWorkShops = res.data.filter((workshop: WorkShop) => workshop.status === "approved");
      setWorkShopsData(publicWorkShops);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("category-workshops/");
      setCategoriesWorkShop(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getWorkShops();
    getCategories();
  }, []);

  // Handle category selection toggle
  const onToggleCategory = (categoryId: number) => {
    if (categoryId === 0) {
      // If "Tous" is selected, reset to show all workshops
      setSelectedCategories([0]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev.filter((id) => id !== 0), categoryId] // Remove "Tous" when a specific category is selected
      );
    }
  };

  // Filter workshops based on selected categories
  const filteredWorkShops =
    selectedCategories.includes(0) || selectedCategories.length === 0
      ? workShopsData
      : workShopsData.filter((workshop) => selectedCategories.includes(workshop.category));

  return (
    <div>
      <div className="p-3">
        <Filter
          categories={categoriesWorkShop}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
        />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-6 md:py-10">
        {filteredWorkShops.map((workshop) => (
          <div
            key={workshop.id}
            className="w-[182px] flex flex-col justify-start items-center gap-4"
          >
            <img
              className="size-[140px] object-cover rounded-full shadow-md"
              src={workshop.image}
              alt={workshop.title}
            />
            <p className="flex-grow text-marron sm:text-lg text-center font-ebGaramond font-bold leading-normal">
              {workshop.title}
            </p>
            <ReserverButton
              text="Télécharger"
              link={workshop.pdf_workshop || "https://fallback-link.example.com"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
