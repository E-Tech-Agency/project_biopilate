import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "@/lib/api";
import { Cours } from "@/types/types";

export default function AllCours({ cours, setCours }: {cours: Cours[]|null, setCours: React.Dispatch<React.SetStateAction<Cours[]|null>>}) {

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
            <main className="flex-1 grid gap-6 p-4 md:gap-8 md:p-6">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {
                        cours && cours.map(bioplate => (
                            <div key={bioplate.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                <Link to={`/cour/${bioplate.id}`} className="absolute inset-0 z-10">
                                    <span className="sr-only">voir plus</span>
                                </Link>
                                <img
                                    src={bioplate.image}
                                    alt={bioplate.title}
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-60"
                                />
                                <div className="bg-white p-4 dark:bg-gray-950">
                                    <h3 className="font-bold text-lg">{bioplate.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(bioplate.created_at).toLocaleDateString()}
                                    </p>
                                    <h4 className="font-semibold text-base">category: {bioplate.category_cours}</h4>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </main>
        </div>
    );
}
