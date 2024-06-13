import SideNav from "@/components/shared/side-nav";
import { EditForm } from "@/components/user/edit-form";
import Orders from "@/components/user/orders";

export default function UserProfile() {
    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <div className="flex flex-row items-center justify-center h-screen">
                <EditForm />
                <Orders />
            </div>
        </div>
    )
}