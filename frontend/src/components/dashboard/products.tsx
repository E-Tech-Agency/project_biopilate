import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "@/lib/api";
import { AllProductsType } from "@/types/types";

export default function AllProducts({ products,setProducts }: {products: AllProductsType[]|null, setProducts: React.Dispatch<React.SetStateAction<AllProductsType[]|null>>}) {

    useEffect(()=>{
        const getProducts = async () => {
            try {
                const res = await api.get("products/");
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }
        getProducts();
    },[])

    return (
            
            <div className="flex flex-col">
                <main className="flex-1 grid gap-6 p-4 md:gap-8 md:p-6">
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {
                        products && products.map(product=>(
                            <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                            <Link to={`/product/${product.id}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View</span>
                            </Link>
                            <img
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={400}
                                className="object-cover w-full h-60"
                            />
                            <div className="bg-white p-4 dark:bg-gray-950">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                                <h4 className="font-semibold text-base">category: {product.category_name}</h4>
                                <div>
                                <h4 className="font-semibold text-base">${product.price}</h4>
                                {product.quantity > 0 ? <h4 className="font-semibold text-base">{product.quantity} in stock</h4> : <h4 className="font-semibold text-base text-red-700">out of stock</h4>}
                                </div>
                            </div>
                        </div>
                        ))
                    }
                    </section>
                </main>
            </div>
    )
}
