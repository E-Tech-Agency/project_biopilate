import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Manuel } from "@/types/types";
import EditManuelForm from "@/components/biopilate/service/ManuelEditForm";

const EditManuel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ManuelData, setManuelData] = useState<Manuel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`manuels-biopilates/${id}/`);
        const ManuelData = response.data;
        setManuelData(ManuelData);
      } catch (error) {
        console.error("Error fetching manuels-biopilates data", error);
      }
    };

   
    fetchData();
  }, [id]);

  const updateManuel = async (data: FormData, id: number) => {
    try {
      await api.put(`manuels-biopilates/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/manuel-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating manuel-biopilates", error);
        alert(`Failed to update manuel-biopilates: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!ManuelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <EditManuelForm
        manuel={ManuelData}
        onUpdate={updateManuel}
        
      />
    </div>
  );
};

export default EditManuel;
