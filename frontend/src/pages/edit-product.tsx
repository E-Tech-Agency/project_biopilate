import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Category, CreateProductErrors, CreateProductFormType } from "@/types/types"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import apiCreateProduct from "@/lib/apiCreateProduct"
import api from "@/lib/api"
import axios from "axios"
import { toast } from "sonner"
import SideNav from "@/components/shared/side-nav"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [errors, setErrors] = useState<CreateProductErrors>({});
    const [product, setProduct] = useState<CreateProductFormType>(
        {
        name: "",
        category: 0,
        description: "",
        price: 0,
    });
    console.log(categories);

    const getProduct = async () => {
        try {
            const res = await api.get(`products/${id}/`)
            setProduct(res.data);

        } catch (error) {
            console.log(error);

        }
    }
    async function fetchCategories() {
        const res = await api.get("categories/")
        const data: Category[] = await res.data
        setCategories(data)
    }
    useEffect(() => {
        fetchCategories()
        getProduct()
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(product);
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category.toString());
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        try {
            await apiCreateProduct.patch(`products/${id}/update/`, formData);
            toast.success("Product updated")
            navigate("/create-product")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = error.response?.data;
                console.log(errorsFromDb);
                toast.error(errorsFromDb.error)
                if (errorsFromDb.error) {
                    console.log("gezfazefaz");

                    setErrors({ ...errors, image: errorsFromDb.error })
                }
                setErrors(errorsFromDb);
                console.log(error);
                
            }
        }
    };

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <Card className="w-min m-auto">
                <CardHeader>
                    <CardTitle>Upadate Product</CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name <br />{errors.name && <li className="text-red-500 mt-2">{errors.name}</li>}</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full"
                                    placeholder="Product Name"
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                    value={product.name}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Description <br />{errors.description && <li className="text-red-500 mt-2">{errors.description}</li>}</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Product Description"
                                    className="min-h-32"
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    value={product.description}
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-7 items-center">
                                <div className="flex flex-row justify-center gap-7 items-center">
                                    <Label htmlFor="price">Price {errors.price && <li className="text-red-500 mt-2">{errors.price}</li>}</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        className="w-56"
                                        placeholder="Price"
                                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                                        value={product.price}
                                    />
                                    <Label htmlFor="quantity">Quantity </Label>

                                    <Input
                                        id="quantity"
                                        type="number"
                                        className="w-full"
                                        onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                                        value={product.quantity}
                                    />
                                    <Select onValueChange={(e) => setProduct({ ...product, category: e })}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup defaultValue={product.category}>
                                                <SelectLabel>Choose a category</SelectLabel>
                                                {categories && categories.map(category => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button type="submit" className="w-44" size={"lg"}>Create</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
