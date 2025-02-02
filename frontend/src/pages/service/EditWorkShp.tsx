import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { WorkShop, CategoryWorkShop } from "@/types/types";
import EditWorkShopForm from "@/components/biopilate/formation/WoekShopEditForm ";

const EditWorkShop: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workshopData, setWorkShopData] = useState<WorkShop | null>(null);
  const [categories, setCategories] = useState<CategoryWorkShop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`workshops-biopilate/${id}/`);
        const cworkshopData = response.data;
        setWorkShopData(cworkshopData);
      } catch (error) {
        console.error("Error fetching workshops-biopilate data", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("category-workshops/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchData();
    fetchCategories();
  }, [id]);

  const updateWorkShop = async (data: FormData, id: number) => {
    try {
      await api.put(`workshops-biopilate/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/WorkshopShow-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating WorkshopShow-biopilates", error);
        alert(`Failed to update WorkshopShow-biopilates: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!workshopData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <EditWorkShopForm
        workshop={workshopData}
        onUpdate={updateWorkShop}
        categories={categories}
      />
    </div>
  );
};

export default EditWorkShop;
