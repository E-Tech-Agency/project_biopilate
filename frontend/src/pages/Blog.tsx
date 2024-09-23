import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BlogShow from "@/components/biopilate/BlogShow";

export default function Blog() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login-register");
    }
  }, [navigate]);

  return (
    <div className=" justify-evenly items-center m-6">
      <BlogShow />
    </div>
  );
}
