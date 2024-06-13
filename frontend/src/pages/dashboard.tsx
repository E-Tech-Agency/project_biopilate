import AllProducts from "@/components/dashboard/products";
import Searchbar from "@/components/dashboard/searchbar";
import SideNav from "@/components/shared/side-nav";
import api from "@/lib/api";
import { AllProductsType } from "@/types/types";
import { useState } from "react";
export function Dashboard() {
    const [products, setProducts] = useState<AllProductsType[]|null>(null);
    const handleCategoryChange = async(id: number) => {
        try {
            const res = await api.get(`products/category/${id}/`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideNav />
            <div>
                <Searchbar handleCategoryChange={handleCategoryChange} />
                <AllProducts products={products} setProducts={setProducts} />
            </div>
        </div>
    );
}
