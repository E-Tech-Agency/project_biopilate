import { EditForm } from "@/components/user/edit-form";
import { useNavigate } from "react-router-dom";
import  { useEffect} from "react";

export default function UserProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier == "true") {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="">
      <EditForm />
    </div>
  );
}
