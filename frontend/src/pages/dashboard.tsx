import AllCours from "@/components/dashboard/cours";
import Searchbar from "@/components/dashboard/searchbar";
import api from "@/lib/api";
import { Cours } from "@/types/types";
import { useState } from "react";
export function Dashboard() {
  const [cours, setCours] = useState<Cours[] | null>(null);
  const handleCategoryChange = async (id: number) => {
    try {
      const res = await api.get(`cours/${id}/`);
      setCours(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Searchbar handleCategoryChange={handleCategoryChange} />
        <AllCours cours={cours} setCours={setCours} />
      </div>
    </div>
  );
}
