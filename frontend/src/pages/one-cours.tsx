import api from "@/lib/api"
import SideNav from "@/components/shared/side-nav"
import { useParams } from "react-router-dom"
import { Cours } from "@/types/types";
import {  useEffect, useState } from "react";

export default function OneCours() {
    const [cours, setCours] = useState<Cours | null>(null);
   

    const { id } = useParams();
    const getCours = async () => {
        try {
            const res = await api.get(`cours/${id}/`);
            setCours(res.data);

        } catch (error) {
            console.error("Error fetching cours data", error);
        }
    
    }
    useEffect(() => {
        getCours();
    }, [id])
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideNav />
            <section className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto py-12 md:py-20">
                <div>
                    <img
                        src={cours?.image}
                        alt={cours?.title}
                        width={600}
                        height={600}
                        className="w-full rounded-lg overflow-hidden"
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{cours?.title}</h1>
                    
                    <br />
                    <p className="text-gray-500 text-lg">
                        {cours?.description}
                    </p>

                   
                </div>
            </section>

        </div>
    )
}