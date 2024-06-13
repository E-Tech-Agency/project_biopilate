import { Badge } from "@/components/ui/badge"
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
import api from "@/lib/api"
import { useEffect, useState } from "react"
import { Order } from "@/types/types"

export default function Orders() {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [orders, setOrders] = useState<Order[] | null>(null);
    function calculateTotalAmount(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + (order.product_price * order.quantity), 0);
    }
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await api.get("orders/user/");
                setOrders(res.data);
                if (res.data.length > 0) {
                    const totalAmount = calculateTotalAmount(res.data);
                    setTotalAmount(totalAmount);
                }

            } catch (error) {
                console.log(error);

            }
        }
        getOrders();
    }, [])
    return (
        <Card className="mr-8">
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    <p>Your recent orders.</p>
                    <span className="text-xs text-gray-500">
                        Total amount: ${totalAmount}
                    </span>
                </CardDescription>

            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Category</TableHead>
                            <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                            <TableHead className="hidden md:table-cell">Date of purchase</TableHead>
                            <TableHead className="text-right">Price</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders && orders.map(order => (
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">{order.product_name}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {
                                        order.approved === "pending" && <Badge className="text-xs" variant="secondary">Pending</Badge>
                                    }
                                    {
                                        order.approved === "validated" && <Badge className="text-xs" variant="default">Validated</Badge>
                                    }
                                    {
                                        order.approved === "rejected" && <Badge className="text-xs" variant="destructive">Rejected</Badge>
                                    }
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{order.product_category_name}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge className="text-xs" variant="secondary">
                                        {order.quantity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">${order.product_price * order.quantity}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
