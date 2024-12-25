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
import { useNavigate } from "react-router-dom";

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
          selectedCategories.includes(0) ? "category-active" : ""
        }`}
      >
        Tous
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onToggleCategory(category.id)}
          className={`hover:border border-black block rounded-lg py-3 px-4 bg-white ${
            selectedCategories.includes(category.id) ? "category-active" : ""
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
  const [selectedCategories, setSelectedCategories] = useState<number[]>([0]);
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier == "true") {
      navigate("/login");
    }
  }, [navigate]);
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

  const onToggleCategory = (categoryId: number) => {
    if (categoryId === 0) {
      setSelectedCategories([0]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev.filter((id) => id !== 0), categoryId]
      );
    }
  };

  const defaultCategories = [
    { id: 0, name: "Tous" },
    { id: 1, name: "Anatomie" },
    { id: 2, name: "Pilates" },
  ];

  const fallbackWorkshops: WorkShop[] = [
    {
      id: 1,
      title: "Workshop en ligne",
      description: "An online workshop to improve your skills.",
      status: "approved",
      image: workshop1,
      category: defaultCategories[1].id,  // Use only the category ID here
      category_workshop: defaultCategories[1].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      title: "Workshop Matwork",
      description: "A workshop focusing on mat exercises.",
      status: "approved",
      image: workshop2,
      category: defaultCategories[2].id,  // Use only the category ID here
      category_workshop: defaultCategories[2].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      title: "Workshop Reformer",
      description: "Reformer Pilates workshop for all levels.",
      status: "approved",
      image: workshop3,
      category: defaultCategories[1].id,  // Use only the category ID here
      category_workshop: defaultCategories[1].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      title: "Workshop Cadillac, chaise et barril",
      description: "Workshop using Cadillac, chair, and barrel equipment.",
      status: "approved",
      image: workshop4,
      category: defaultCategories[2].id,  // Use only the category ID here
      category_workshop: defaultCategories[2].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      title: "Workshop golfeurs",
      description: "Pilates workshop for golfers to improve flexibility.",
      status: "approved",
      image: workshop5,
      category: defaultCategories[2].id,  // Use only the category ID here
      category_workshop: defaultCategories[2].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      title: "Workshop prénatal et postnatal",
      description: "Workshop for prenatal and postnatal care.",
      status: "approved",
      image: workshop6,
      category: defaultCategories[2].id,  // Use only the category ID here
      category_workshop: defaultCategories[2].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      title: "Workshop Anatomie et fascias",
      description: "A workshop focusing on anatomy and fascia.",
      status: "approved",
      image: workshop7,
      category: defaultCategories[1].id,  // Use only the category ID here
      category_workshop: defaultCategories[1].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      title: "Workshop de préparation aux examens",
      description: "Workshop preparing for exams with focused exercises.",
      status: "approved",
      image: workshop8,
      category: defaultCategories[1].id,  // Use only the category ID here
      category_workshop: defaultCategories[1].name,  // Use the category name here
      pdf_workshop: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  

  const showData: WorkShop[] = workShopsData.length > 0 ? workShopsData : fallbackWorkshops;

  const filteredWorkShops = selectedCategories.includes(0) || selectedCategories.length === 0
    ? showData
    : showData.filter((workshop: WorkShop) =>
        typeof workshop.category === "object"
          ? selectedCategories.includes(workshop.category)
          : selectedCategories.includes(workshop.category)
      );

  return (
    <div>
      <div className="p-3">
        <Filter
          categories={categoriesWorkShop.length > 0 ? categoriesWorkShop : defaultCategories}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
        />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-6 md:py-10">
        {filteredWorkShops.map((workshop: WorkShop) => (
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
              link={workshop.pdf_workshop || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
