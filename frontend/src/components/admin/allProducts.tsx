
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { ProductWithCategory } from "@/types/types"
import { Button } from "../ui/button"

export default function AllProducts() {
    const [products, setProducts] = useState<ProductWithCategory[] | null>(null);
    async function getAllUnapprovedProducts() {
        const res = await api.get("products/unapproved/")
        setProducts(res.data);
        console.log(res.data);
    }
    useEffect(() => {

        getAllUnapprovedProducts();
    }, [])
    const validateProduct = async (id: number) => {
        try {
            await api.put(`validate/product/${id}/`)
            await getAllUnapprovedProducts();
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Unapproved Products</CardTitle>
                    <CardDescription>
                        Recent unapproved products from your store.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead >Category</TableHead>
                            <TableHead >Date</TableHead>
                            <TableHead >Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="font-medium">{product.name}</div>
                                </TableCell>
                                <TableCell className="">{product.category_name}</TableCell>
                                <TableCell>
                                    {new Date(product.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    {
                                        product.is_approved ?
                                            <div className="text-emerald-700">Product already approved</div> :
                                            <Button onClick={() => validateProduct(product.id)} type="button" size={"lg"}>Approve</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
