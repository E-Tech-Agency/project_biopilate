import AllOrders from "@/components/admin/allOrders";
import AllProducts from "@/components/admin/allProducts";
import AllUsers from "@/components/admin/allUsers";
import SideNav from "@/components/shared/side-nav";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
    const nav = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("is_superuser") === "false") {
            nav("/");
        }
    }, [nav])
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideNav />
            <div>
                <div className="flex flex-row items-center justify-center h-screen gap-9">
                    <AllProducts />
                    <Separator orientation="vertical" className="h-1/2" />
                    <AllUsers />
                    </div>
                <AllOrders />
            </div>
        </div>
    )
}