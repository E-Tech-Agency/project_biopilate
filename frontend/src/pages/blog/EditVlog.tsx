import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Vlog,  CategoryVlog } from "@/types/types";
import EditVlogForm from "@/components/biopilate/blog/VlogEditForm";

const EditVlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vlogData, setVlogpData] = useState<Vlog | null>(null);
  const [categories, setCategories] = useState<CategoryVlog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`vlogs/${id}/`);
        const vlogData = response.data;
        setVlogpData(vlogData);
      } catch (error) {
        console.error("Error fetching vlogs-biopilate data", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("category-vlogs/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchData();
    fetchCategories();
  }, [id]);

  const updateVlog = async (data: FormData, id: number) => {
    try {
      await api.put(`vlogs/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/vlog-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating vlog-biopilates", error);
        alert(`Failed to update vlog-biopilates: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!vlogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <EditVlogForm
        vlog={vlogData}
        onUpdate={updateVlog}
        categories={categories}
      />
    </div>
  );
};

export default EditVlog;
