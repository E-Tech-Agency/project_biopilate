import { EditForm } from "@/components/user/edit-form";
import { useNavigate } from "react-router-dom";
import  { useEffect} from "react";

export default function UserProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="">
      <EditForm />
    </div>
  );
}
