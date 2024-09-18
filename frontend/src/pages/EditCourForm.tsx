import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Cours, CategoryCours } from "@/types/types";
import EditCour from "@/components/biopilate/EditCour";

const EditCourForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [courData, setCoursData] = useState<Cours | null>(null);
  const [categories, setCategories] = useState<CategoryCours[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`cours/${id}/`);
        const courData = response.data;
        setCoursData(courData);
      } catch (error) {
        console.error("Error fetching cours data", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("cours_category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchData();
    fetchCategories();
  }, [id]);

  const updateCours = async (data: FormData, id: number) => {
    try {
      await api.put(`cours/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/Cours-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating cours", error);
        alert(`Failed to update cour: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login-register");
    }
  }, [navigate]);

  if (!courData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <EditCour
        cours={courData}
        onUpdate={updateCours}
        categories={categories}
      />
    </div>
  );
};

export default EditCourForm;
