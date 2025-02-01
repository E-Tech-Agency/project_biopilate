import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Service } from "@/types/types";
import EditServiceForm from "@/components/biopilate/service/EditServiceForm";

const EditService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState<Service | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`services/${id}/`);
        const serviceData = response.data;
        setServiceData(serviceData);
      } catch (error) {
        console.error("Error fetching service data", error);
      }
    };

    fetchData();
  }, [id]);

  const updateService = async (data: any, id?: number) => {
    try {
      if (data instanceof FormData) {
        await api.put(`services/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.put(`services/${data.id}`, data);
      }
      // Handle success or navigate back to previous page
      navigate("/Service-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating service", error);
        alert(`Failed to update service: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!serviceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center m-6">
      <EditServiceForm service={serviceData} onUpdate={updateService} />
    </div>
  );
};

export default EditService;
