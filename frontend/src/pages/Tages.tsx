import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTagesFrom from "@/components/biopilate/CreateTagesFrom";
import TagesShow from "@/components/biopilate/TagesShow";

export default function Tages() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex-1">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TagesShow />
          <div className="bg-white rounded-lg shadow-md p-4">
            <CreateTagesFrom />
          </div>
        </div>
      </div>
    </div>
  );
}
