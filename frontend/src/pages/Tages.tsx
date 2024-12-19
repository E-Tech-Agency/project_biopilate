import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TagesShow from "@/components/biopilate/TagesShow";
import CreateTagesForm from "@/components/biopilate/CreateTagesFrom";

export default function Tages() {
  const navigate = useNavigate();
  const tagesRef = useRef<{ getTages: () => void } | null>(null); // Typed ref for TagesShow

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleTageAdded = () => {
    if (tagesRef.current) {
      tagesRef.current.getTages(); // Call `getTages` method on TagesShow
    }
  };

  return (
    <div className="flex-1">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TagesShow instance */}
          <TagesShow ref={tagesRef} />
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* Pass `handleTageAdded` to CreateTagesForm */}
            <CreateTagesForm onTageAdded={handleTageAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}
