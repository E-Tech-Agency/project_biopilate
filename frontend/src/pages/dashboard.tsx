import AllCours from "@/components/dashboard/cours";
import Searchbar from "@/components/dashboard/searchbar";
import SideNav from "@/components/shared/side-nav";
import api from "@/lib/api";
import { Cours } from "@/types/types";
import { useState } from "react";
export function Dashboard() {
    const [cours,setCours] = useState<Cours[]|null>(null);
    const handleCategoryChange = async(id: number) => {
        try {
            const res = await api.get(`cours/${id}/`);
            setCours(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideNav />
            <div>
                <Searchbar handleCategoryChange={handleCategoryChange} />
                <AllCours cours={cours} setCours={setCours} />
            </div>
        </div>
    );
}
