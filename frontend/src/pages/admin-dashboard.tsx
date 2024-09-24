import AllUsers from "@/components/admin/allUsers";

import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("is_superuser") === "false") {
      nav("/");
    }
  }, [nav]);
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-9">
        <Separator orientation="vertical" className="h-1/2" />
        <AllUsers />
      </div>
    </div>
  );
}
