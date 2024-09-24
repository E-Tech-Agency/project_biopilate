import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormationShow from "@/components/biopilate/FormationShow";
export default function Formation() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="justify-evenly items-center m-6">
      <FormationShow />
    </div>
  );
}
