import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "../ui/input";
  import { useState } from "react";
  import api from "@/lib/api";
  import { Button } from "../ui/button";
  import { toast } from "sonner";
  import axios from "axios";
  import { useNavigate } from 'react-router-dom';
  
  interface CreateCategoryProps {
    onClose: () => void; // Properly typed prop
    onTagAdded: () => void; // Corrected to match the function name in CreatePlanningForm
  }
  
  export default function CreateCategory({ onClose, onTagAdded }: CreateCategoryProps) {
    const [errors, setErrors] = useState<string | null>(null);
    const [category, setCategory] = useState({
      name: "",
    });
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (category.name.trim() === "") {
        setErrors("Le nom de la catégorie est requis.");
        return;
      }
  
      try {
        await api.post("categories/", category);
        setCategory({ name: "" });
        toast.success("Niveau ajouté avec succès !");
        onTagAdded(); // Ensure the category update in CreatePlanningForm
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorsFromDb = error.response?.data;
          setErrors(errorsFromDb?.name || "Erreur lors de l'ajout de la catégorie.");
        }
      }
    };
  
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un Niveau</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={category.name}
                      onChange={(e) => setCategory({ name: e.target.value })}
                      className="mt-1 block w-full"
                    />
                  </div>
                  {errors && (
                    <div className="text-red-500 text-sm mb-4">{errors}</div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <Button type="submit">Ajouter</Button>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  