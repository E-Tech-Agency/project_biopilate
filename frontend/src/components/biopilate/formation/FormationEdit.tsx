import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { CreateFormation } from "@/types/formation";
import { toast } from "sonner";
import FormationEditForm from "./FormationEditForm";

const FormationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<CreateFormation | null>(null);

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`formation-bio-plates/${id}/`);
        // Convert the API response to match CreateFormation type
        const formationData: CreateFormation = {
          title: data.title,
          description: data.description,
          status: data.status,
          levels: data.levels,
          image: null, // Initialize as null since we don't need the current image file
          pdf_document: null ,
          formation_line: data.formation_line,
        };
        setFormation(formationData);
      } catch (error) {
        toast.error("Erreur lors de la récupération des données. Veuillez réessayer.");
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (formationData: CreateFormation) => {
    if (!formationData.title || !formationData.description || !formationData.status) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const formData = new FormData();
      
      // Create a data object for JSON fields
      const jsonData = {
        title: formationData.title,
        description: formationData.description,
        status: formationData.status,
        formation_line: formationData.formation_line,
        levels: formationData.levels,
      };

      // Add the JSON data as a blob
      formData.append('data', new Blob([JSON.stringify(jsonData)], {
        type: 'application/json'
      }));

      // Add files only if they exist
      if (formationData.image instanceof File) {
        formData.append("image", formationData.image);
      }
      
      if (formationData.pdf_document instanceof File) {
        formData.append("pdf_document", formationData.pdf_document);
      }

      // Make the API request
      await api.put(`formation-bio-plates/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Formation mise à jour avec succès");
      navigate("/Formation-biopilates");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Erreur lors de la mise à jour de la formation";
      toast.error(errorMessage);
      console.error("Update error:", error);
    }
  };

  if (!formation) return <div>Loading...</div>;

  return (
    <div className="justify-evenly items-center m-6">
      <FormationEditForm initialFormation={formation} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormationEdit;