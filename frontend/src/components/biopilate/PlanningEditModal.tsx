import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Planning, Category } from "@/types/types";
import api from "@/lib/api";
import ReactQuill from "react-quill";

interface PlanningEditModalProps {
  planningId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function PlanningEditModal({
  planningId,
  isOpen,
  onClose,
  onSave,
}: PlanningEditModalProps) {
  const [formData, setFormData] = useState<Planning | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (planningId) {
      const fetchPlanning = async () => {
        try {
          const res = await api.get(`plannings/${planningId}/`);
          setFormData(res.data);
        } catch (error) {
          console.error("Error fetching planning", error);
          setError("Error fetching planning data.");
        }
      };
      fetchPlanning();
    } else {
      setFormData(null);
    }
  }, [planningId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) =>
      prevData
        ? {
            ...prevData,
            [name]: name === "category" ? parseInt(value) : value,
          }
        : null
    );
  };

  const handleQuillChange = (value: string) => {
    setFormData((prevData) =>
      prevData ? { ...prevData, description: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (planningId && formData) {
        await api.put(`plannings/${planningId}/`, formData);
        onSave();
      }
    } catch (error) {
      console.error("Error updating planning", error);
      setError("Error updating planning. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Modifier le Planning
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 p-4 rounded-md mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="grid gap-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData?.title || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Entrez le titre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duree">Durée</Label>
                  <Input
                    id="duree"
                    name="duree"
                    value={formData?.duree || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Ex: 2 heures"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="range">Déplacement (km)</Label>
                  <Input
                    id="range"
                    name="range"
                    type="number"
                    value={formData?.range || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Distance en km"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Niveau</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
                    value={formData?.category || ""}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner un Niveau</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <ReactQuill
                  id="description"
                  value={formData?.description || ""}
                  onChange={handleQuillChange}
                  className="w-full mt-2"
                  theme="snow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
                  value={formData?.status || ""}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner un Status</option>
                  <option value="pending">En attente de publication</option>
                  <option value="approved">Publiée</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-28"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="w-28 bg-bgColor text-marron hover:bg-bgColor/90"
                >
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
