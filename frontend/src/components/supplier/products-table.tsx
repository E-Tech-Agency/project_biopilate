import api from "@/lib/api";
import { OrderTableType } from "@/types/types";
import { useEffect, useState } from "react";
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
import { Button } from "../ui/button";

export default function ProductsTable() {
    const [order, setOrder] = useState<OrderTableType[] | null>();
    console.log(order)
    
    const getProducts = async () => {
        try {
            const res = await api.get("orders/supplier/");
            setOrder(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    const changeOrderStatus = async (orderId: number, status: string) => {
        try {
            await api.patch(`orders/${orderId}/update-status/`,{approved: status});
            await getProducts();
        } catch (error) {
            console.log(error);
            
        }
    }
    return (

        <Card>
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Product</TableHead>
                            <TableHead className="hidden sm:table-cell">Amount</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order && order.map((o: OrderTableType) => (
                            <TableRow key={o.id} className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">{o.client_name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {o.client_email}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{o.product_name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{o.quantity}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="hidden md:table-cell">${(o.product_price * o.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        {o.approved === "pending" &&
                                            <>
                                                <Button onClick={()=>changeOrderStatus(o.id,"validated")} variant={"default"}>Validate</Button>
                                                <Button onClick={()=>changeOrderStatus(o.id,"rejected")} variant={"destructive"}>Refuse</Button>
                                            </>
                                        }
                                        {o.approved === "validated" &&
                                        <h2 className="text-emerald-500">Approved</h2>
                                        }
                                        {
                                            o.approved === "rejected" &&
                                            <h2 className="text-rose-500">Rejected</h2>
                                        }

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

