import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import api from "@/lib/api"
import { Product } from "@/types/types"
import { useEffect, useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Link } from "react-router-dom";

export default function SupplierProducts() {
    const [products, setProducts] = useState<Product[] | null>(null)
    const getProducts = async () => {
        try {
            const res = await api.get("products/user/")
            setProducts(res.data)

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    const deleteProduct = async (id: number) => {
        try {
            await api.delete(`products/${id}/delete/`)
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollArea className="h-72 w-fit rounded-md border">
            <Card>
                <CardHeader>
                    <CardTitle>your products</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {products && products.map((p: Product) => (
                        <div key={p.id} className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={p.image} alt={p.name} />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className={`grid gap-1 ${p.approved === "validated" ? "text-emerald-500" : "text-rose-500"}`}>
                                <p className="text-sm font-medium leading-none">{p.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {p.category_name}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+${p.price}</div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <Link to={`/update-product/${p.id}`}>Edit</Link>
                                        <DropdownMenuItem><Button onClick={()=>deleteProduct(p.id)} variant="destructive" size={"lg"}>Delete</Button></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </ScrollArea>
    )
}