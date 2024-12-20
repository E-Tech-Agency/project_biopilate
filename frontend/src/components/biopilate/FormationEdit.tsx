import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import {
  FormationFormType,
  CreateFormationErrors,
  OptionFormType,
  FormationCategoryType,
} from "@/types/types";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormationEditForm from "./FormationEditForm";

const FormationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<FormationFormType | null>(null);
  const [errors, setErrors] = useState<CreateFormationErrors>({});
  const [allOptions, setAllOptions] = useState<OptionFormType[]>([]);
  const [formationCategories, setFormationCategories] = useState<
    FormationCategoryType[]
  >([]);

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: formationData } = await api.get(`/formations/${id}/`);
        const { data: optionsResponse } = await api.get("options/");
        const { data: selectedOptionsResponse } = await api.get(`/selected-options/?formation=${id}/`);
        
        setFormation({ ...formationData, options: selectedOptionsResponse });
        setAllOptions(optionsResponse);
        setFormationCategories(formationData.categories || []);
      } catch (error) {
        toast.error("Erreur lors de la récupération des données. Veuillez réessayer.");
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formationData: FormationFormType, categories: FormationCategoryType[]) => {
    if (!formationData || categories.length === 0) return;

    if (!formationData.title || !formationData.description || !formationData.status) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (categories.some((cat) => !cat.option || !cat.price)) {
      toast.error("Veuillez ajouter au moins une option avec un prix");
      return;
    }

    try {
      await api.put(`formations/${id}/`, {
        title: formationData.title,
        description: formationData.description,
        status: formationData.status,
      });

      const categoryPromises = categories.map((category) => {
        if (category.id) {
          // Existing category: Use PUT
          return api.put(`selected-options/${category.id}/`, category);
        } else {
          // New category: Use POST
          return api.post("selected-options/", category);
        }
      });

      await Promise.all(categoryPromises);

      toast.success("Formation mise à jour avec succès");
      navigate("/Formation-biopilates");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la formation");
      console.error(error);
    }
  };

  if (!formation) return <div>Loading...</div>;

  return (
    <div className="justify-evenly items-center m-6">
      <FormationEditForm
        initialFormation={formation}
        initialCategories={formationCategories}
        allOptions={allOptions}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormationEdit;
