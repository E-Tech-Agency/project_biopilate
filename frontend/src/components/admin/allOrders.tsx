import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Order } from "@/types/types"
import api from "@/lib/api"
import { useEffect, useState } from "react";

export default function AllOrders() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    console.log(orders);

    const getOrders = async () => {
        try {
            const res = await api.get("orders/admin/");
            setOrders(res.data);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getOrders();
    }, [])
    const changeOrderStatus = async (orderId: number, status: string) => {
        try {
            await api.patch(`orders/${orderId}/update-status/`, { approved: status });
            await getOrders();
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Card className="m-5">
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    All of your strore orders.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" w-[100px] sm:table-cell">
                                <span className="sr-only">img</span>
                            </TableHead>
                            <TableHead>Clientt Name</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Total Sales
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders && orders.map((order) => (
                            <TableRow>
                                <TableCell className="hidden sm:table-cell">
                                    <img
                                        alt={order.product_name}
                                        className="aspect-square rounded-md object-cover"
                                        src={order.product_image}

                                    />
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {order.product_name}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="font-medium">{order.client_name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {order.client_email}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="font-medium">{order.supplier_name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {order.supplier_email}
                                    </div>
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
                                <TableCell className="hidden md:table-cell">{Number(order.product_price) * order.quantity}</TableCell>
                                <TableCell className="hidden md:table-cell">25</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(order.created_at).toLocaleString("")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        {order.approved === "pending" &&
                                            <>
                                                <Button onClick={() => changeOrderStatus(order.id, "validated")} variant={"default"}>Validate</Button>
                                                <Button onClick={() => changeOrderStatus(order.id, "rejected")} variant={"destructive"}>Refuse</Button>
                                            </>
                                        }
                                        {order.approved === "validated" &&
                                            <h2 className="text-emerald-500">Approved</h2>
                                        }
                                        {
                                            order.approved === "rejected" &&
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
