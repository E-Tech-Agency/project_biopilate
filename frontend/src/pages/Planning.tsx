import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PlanningShow from "@/components/biopilate/PlanningShow";

export default function Planning() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login-register");
    }
  }, [navigate]);

  return (
    <div className="m-4">
      <PlanningShow />
    </div>
  );
}
