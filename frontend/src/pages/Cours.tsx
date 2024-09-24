import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoursShow from "@/components/biopilate/CoursShow";


export default function Cours() {
  const navigate = useNavigate();
  

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="w-full">
      <div>
        <div className=" justify-evenly items-center m-6">
          <CoursShow />
        </div>
      </div>
    </div>
  );
}
