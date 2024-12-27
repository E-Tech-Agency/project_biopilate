import React, { useEffect, useState, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { useNavigate } from "react-router-dom";
import { CreatePlanningErrors, PlanningFormType, Category } from "@/types/types";
import CreateCategory from "../supplier/create-category";
const ReactQuill = React.lazy(() => import("react-quill"));

export default function CreatePlanningForm() {
  const [errors, setErrors] = useState<CreatePlanningErrors>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [planning, setPlanning] = useState<PlanningFormType>({
    title: "",
    duree: "",
    description: "",
    range: 0,
    status: "",
    category: "",
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const planningRef = useRef<{ fetchCategories: () => void } | null>(null);

  const handlePlanningAdded = () => {
    if (planningRef.current) {
      planningRef.current.fetchCategories();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    planningRef.current = { fetchCategories };
    fetchCategories();
  }, []);

  const handleQuillChange = (value: string) => {
    setPlanning((prevPlanning) => ({
      ...prevPlanning,
      description: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", planning.title);
    formData.append("duree", planning.duree);
    formData.append("description", planning.description);
    formData.append("range", planning.range.toString());
    formData.append("status", planning.status);
    formData.append("category", planning.category);

    try {
      await apiCreateTeache.post("plannings/", formData);
      setPlanning({
        title: "",
        duree: "",
        description: "",
        range: 0,
        status: "",
        category: "",
      });
      toast.success("Planning created");
      navigate("/planning-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        toast.error(errorsFromDb.error);
        setErrors(errorsFromDb);
      }
    }
  };

  return (
    <div className="container  mx-auto max-w-4xl p-6">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Créer un Nouveau Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">
                  Titre
                  {errors.title && <span className="text-red-500 ml-2">{errors.title}</span>}
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={planning.title}
                  onChange={(e) => setPlanning({ ...planning, title: e.target.value })}
                  placeholder="Titre du planning"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="duree">
                  Durée
                  {errors.duree && <span className="text-red-500 ml-2">{errors.duree}</span>}
                </Label>
                <Input
                  id="duree"
                  type="text"
                  value={planning.duree}
                  onChange={(e) => setPlanning({ ...planning, duree: e.target.value })}
                  placeholder="Durée du planning"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="category">
                  Niveau
                  {errors.category && <span className="text-red-500 ml-2">{errors.category}</span>}
                </Label>
                <div className="flex items-center mt-2">
                  <select
                    id="category"
                    value={planning.category}
                    onChange={(e) => setPlanning({ ...planning, category: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="">Sélectionner un Niveau</option>
                    {categories.map((niveau) => (
                      <option key={niveau.id} value={niveau.id}>
                        {niveau.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(true)}
                   className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"

                  >
                    + Ajouter
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="range">
                  Déplacement
                  {errors.range && <span className="text-red-500 ml-2">{errors.range}</span>}
                </Label>
                <Input
                  id="range"
                  type="number"
                  value={planning.range}
                  onChange={(e) =>
                    setPlanning({ ...planning, range: parseInt(e.target.value) || 0 })
                  }
                  placeholder="Valeur de déplacement"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">
                Status
                {errors.status && <span className="text-red-500 ml-2">{errors.status}</span>}
              </Label>
              <select
                id="status"
                value={planning.status}
                onChange={(e) => setPlanning({ ...planning, status: e.target.value })}
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Sélectionner un Status</option>
                <option value="pending">En attente de publication</option>
                <option value="approved">Publiée</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">
                Description
                {errors.description && <span className="text-red-500 ml-2">{errors.description}</span>}
              </Label>
              <Suspense fallback={<div>Chargement de l'éditeur...</div>}>
                <ReactQuill
                  id="description"
                  value={planning.description}
                  onChange={handleQuillChange}
                  className="mt-2"
                  theme="snow"
                />
              </Suspense>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"

              >
                Ajouter
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/planning-biopilates")}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isCategoryModalOpen && (
        <CreateCategory
          onClose={() => setIsCategoryModalOpen(false)}
          onTagAdded={handlePlanningAdded}
        />
      )}
    </div>
  );
}
