import _ from "loadsh";
import { Input } from "@/components/ui/input"
import { SVGProps } from "react"
import { useState, useEffect, useCallback } from 'react';
import api from "@/lib/api";
import { Category, Product } from "@/types/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function Searchbar({ handleCategoryChange }: { handleCategoryChange: Function }) {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[] | null>(null);
    console.log(categories);
    
    useEffect(()=>{
        const getCategories = async () => {
            try {
                const res = await api.get("categories/");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    },[])

    const fetchProducts = async (searchQuery: string) => {
        try {
            const response = await api.get(`products/filtred/?search=${searchQuery}`);
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchProducts = useCallback(
        _.debounce((searchQuery: string) => fetchProducts(searchQuery), 300),
        []
    );

    useEffect(() => {
        if (query) {
            debouncedFetchProducts(query);
        } else {
            setProducts([]);
        }
    }, [query, debouncedFetchProducts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <div className="relative w-full flex items-center justify-between">
            <div className="relative w-full max-w-md">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
                        onChange={handleInputChange}
                    />
                </div>
                {
                    products && products.length > 0 &&
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-auto">
                        <ul className="py-1 text-sm text-gray-700">
                            {products && products.map((product: Product) => (
                                <li key={product.id}>
                                    <div className="flex items-center gap-2 justify-around-between">
                                        <img src={product.image} alt={product.name} className="w-8 h-8 rounded-full" />
                                        <span className="text-black font-bold">{product.name}</span>
                                        <span className="text-gray-500 font-bold">{product.price}</span>
                                        <span>{product.category_name}</span>
                                    </div>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                }
               
            </div>
            <Select onValueChange={e=>handleCategoryChange(Number(e))}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories && categories.map((category: Category) => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </header>
    )
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}