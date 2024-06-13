import api from "@/lib/api"
import SideNav from "@/components/shared/side-nav"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { Product } from "@/types/types";
import {  useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";

export default function OneProduct() {
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>();

    const { id } = useParams();
    const getProduct = async () => {
        try {
            const res = await api.get(`products/${id}/`);
            setProduct(res.data);

        } catch (error) {
            console.error("Error fetching product data", error);
        }
    }
    const orderProduct =async () => {
        try {
            await api.post("create/order/", { product: id, quantity: quantity });
            toast.success("Ordered successfully");
            getProduct();
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getProduct();
    }, [id])
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideNav />
            <section className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto py-12 md:py-20">
                <div>
                    <img
                        src={product?.image}
                        alt="Product Image"
                        width={600}
                        height={600}
                        className="w-full rounded-lg overflow-hidden"
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{product?.name}</h1>
                    <p className="text-gray-500 text-lg">
                        {product?.category_name}
                    </p>
                    <br />
                    <p className="text-gray-500 text-lg">
                        {product?.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">${product?.price}</span>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="default" size="lg">Order</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Order Quantity</DialogTitle>
                                    <DialogDescription>
                                        {product?.quantity > 0 ? `You have ${product?.quantity} in stock` : "Out of stock"}
                                    </DialogDescription>
                                </DialogHeader>

                                {
                                    product?.quantity > 0 &&
                                    <>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Input
                                                    type="number"
                                                    id="name"
                                                    className="col-span-3"
                                                    defaultValue={quantity}
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button disabled={quantity === 0 || quantity > product?.quantity ? true : false} size="lg" onClick={orderProduct}>Order</Button>
                                        </DialogFooter>
                                    </>
                                }
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

        </div>
    )
}