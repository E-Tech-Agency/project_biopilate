import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoursShow from "@/components/biopilate/CoursShow";
import { Navbar } from "@/components/shared/navbar";

export default function Cours() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login-register");
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
