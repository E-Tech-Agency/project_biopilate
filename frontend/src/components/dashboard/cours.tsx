import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "@/lib/api";
import { Cours } from "@/types/types";

export default function AllCours({
  cours,
  setCours,
}: {
  cours: Cours[] | null;
  setCours: React.Dispatch<React.SetStateAction<Cours[] | null>>;
}) {
  useEffect(() => {
    const getCours = async () => {
      try {
        const res = await api.get("cours/");
        setCours(res.data);
      } catch (error) {
        console.error("Error fetching Cours", error);
      }
    };
    getCours();
  }, []);

  return (
    <div className="flex flex-col">
      <main className="p-4 md:p-6">
        <section className="columns-xs">
          {cours &&
            cours.map((bioplate) => (
              <div
                key={bioplate.id}
                className="flex flex-col justify-between relative h-96 group overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 mb-4 mx-4"
              >
                <Link
                  to={`/cour/${bioplate.id}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">voir plus</span>
                </Link>
                <img
                  src={bioplate.image}
                  alt={bioplate.title}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <div className="flex flex-col justify-between bg-white py-4 h-32 dark:bg-gray-950">
                  <h3 className="font-bold text-lg p-3">{bioplate.title}</h3>

                  <h4 className="font-semibold text-base border-t p-3 border-bgColor">
                    category: {bioplate.category_cours}
                  </h4>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}
