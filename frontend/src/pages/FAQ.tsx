import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FAQShow from "@/components/biopilate/FAQShow";
export default function FAQ() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className=" justify-evenly items-center m-6">
      <FAQShow />
    </div>
  );
}
