import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { FinancerFormation } from "@/types/types";

import EditFormationFinanceForm from "@/components/biopilate/formation/FormationFinancerEditForm";

const EditFormationFinancer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [FormationData, setFormationData] = useState<FinancerFormation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`financer-formations/${id}/`);
        const ManuelData = response.data;
        setFormationData(ManuelData);
      } catch (error) {
        console.error("Error fetching manuels-biopilates data", error);
      }
    };

   
    fetchData();
  }, [id]);

  const updateManuel = async (data: FormData, id: number) => {
    try {
      await api.put(`financer-formations/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/financer-formation-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating financer-formation-biopilates", error);
        alert(`Failed to update financer-formation-biopilates: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!FormationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <EditFormationFinanceForm
        formation={FormationData}
        onUpdate={updateManuel}
        
      />
    </div>
  );
};

export default EditFormationFinancer;
