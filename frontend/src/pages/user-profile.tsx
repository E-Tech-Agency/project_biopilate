import SideNav from "@/components/shared/side-nav";
import { EditForm } from "@/components/user/edit-form";

export default function UserProfile() {
    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <div className="h-screen">
                <EditForm />
             
            </div>
        </div>
    )
}