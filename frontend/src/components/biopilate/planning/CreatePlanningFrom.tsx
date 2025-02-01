import React, { useState, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { useNavigate } from "react-router-dom";
import { CoursePlanningForm, CreateCoursePlanningErrors } from "@/types/types";
import CreateCategory from "../../supplier/create-category";


export default function CreatePlanningForm() {
  const [errors, setErrors] = useState<CreateCoursePlanningErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [planning, setPlanning] = useState<CoursePlanningForm>({
    title: "",
    description: "",
    image: null,
    status : "",
    decription_link : "",
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const planningRef = useRef<{ fetchCategories: () => void } | null>(null);

  const handlePlanningAdded = () => {
    if (planningRef.current) {
      planningRef.current.fetchCategories();
    }
  };

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPlanning(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", planning.title);
    formData.append("description", planning.description);
    formData.append("status", planning.status);
    formData.append("decription_link", planning.decription_link);
    if (planning.image) {
      formData.append("image", planning.image);
    }

    try {
      await api.post("course-list-planning/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Course planning created successfully");
      navigate("/planning-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        setErrors(errorsFromDb);
        toast.error("Error creating course planning");
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
                <Label htmlFor="decription_link">
                  Line de planning
                  {errors.decription_link && <span className="text-red-500 ml-2">{errors.decription_link}</span>}
                </Label>
                <Input
                  id="decription_link"
                  type="text"
                  value={planning.decription_link}
                  onChange={(e) => setPlanning({ ...planning, decription_link: e.target.value })}
                  placeholder="Titre du planning"
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
                <option value="pending" selected>En attente de publication</option>
                <option value="confirmed">Publiée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">
              Description du planning 
                {errors.description && <span className="text-red-500 ml-2">{errors.description}</span>}
              </Label>
              <Suspense fallback={<div>Chargement de l'éditeur...</div>}>
                <Input
                  id="description"
                  value={planning.description}
                  onChange={(e) => setPlanning({ ...planning, description: e.target.value })}
                  className="mt-2"
                  placeholder="Description du planning"
                />
              </Suspense>
            </div>
            <div>
              <Label htmlFor="image">
                Image
                {errors.image && <span className="text-red-500 ml-2">{errors.image}</span>}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
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
