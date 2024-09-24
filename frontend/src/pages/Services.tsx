import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ServiceShow from "@/components/biopilate/ServiceShow";

export default function Services() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex-1 bg-gray-100">
      <div className="p-8">
        {/* Service  */}

        <ServiceShow />
      </div>
    </div>
  );
}
