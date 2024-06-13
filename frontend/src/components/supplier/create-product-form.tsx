import {
    Card,
    CardContent,
    CardDescription,
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


export default function CreateProductForm() {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [errors, setErrors] = useState<CreateProductErrors>({});
    const [product, setProduct] = useState<CreateProductFormType>({
        name: "",
        category: 0,
        description: "",
        price: 0,
        quantity: 0,
        image: null,
    });
    console.log(categories);
    

    useEffect(() => {
        async function fetchCategories() {
            const res = await api.get("categories/")
            const data: Category[] = await res.data
            setCategories(data)
        }
        fetchCategories()
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category.toString());
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            await apiCreateProduct.post("create/product/", formData);
            setProduct({
                name: "",
                category: 0,
                description: "",
                price: 0,
                quantity: 0,
                image: null,
            })
            toast.success("Product created")
        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorsFromDb = error.response?.data;
                console.log(errorsFromDb);
                toast.error(errorsFromDb.error)
                if(errorsFromDb.error){
                    console.log("gezfazefaz");
                    
                    setErrors({...errors,image:errorsFromDb.error})
                }
                setErrors(errorsFromDb);
            }
        }
    };

    return (
        <Card className="w-min">
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
                <CardDescription>
                {product.image===null && <li className="text-red-500 mt-2">Image is required</li>}
                {product.category===0 && <li className="text-red-500 mt-2">Category is required</li>}
                {product.quantity===0 && <li className="text-red-500 mt-2">Quantity is required</li>}
                </CardDescription>
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
                            />
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="name">Description <br />{errors.description && <li className="text-red-500 mt-2">{errors.description}</li>}</Label>
                            <Textarea
                                id="description"
                                placeholder="Product Description"
                                className="min-h-32"
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-7 items-center">
                            <div className="flex flex-row justify-center gap-7 items-center">
                                <Label htmlFor="price">Price {errors.price && <li className="text-red-500 mt-2">{errors.price}</li>}</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="w-16"
                                    placeholder="Price"
                                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                                    value={product.price}
                                />
                                <Label htmlFor="photo">Photo </Label>
                                
                                <Input
                                    id="photo"
                                    type="file"
                                    className="w-full"
                                    onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
                                />
                                <Label htmlFor="quantity">Quantity </Label>
                                
                                <Input
                                    id="quantity"
                                    type="number"
                                    className="w-25"
                                    onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                                />
                                <Select onValueChange={(e) => setProduct({ ...product, category: e })}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
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
    )
}
