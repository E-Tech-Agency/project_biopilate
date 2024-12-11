import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateServiceErrors, ServiceFormType, Teache } from "@/types/types";
import React, { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ReactQuill = React.lazy(() => import("react-quill"));

export default function CreateServicesForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [errors, setErrors] = useState<CreateServiceErrors>({});
  const [teaches, setTeaches] = useState<Teache[]>([]);
  const [service, setService] = useState<ServiceFormType>({
    title: "",
    description: "",
    status: "pending", // Set a default status
    full_text: "",
    instructeur: "",
    image: null,
  });

  useEffect(() => {
    const fetchTeaches = async () => {
      try {
        const res = await api.get("teaches/");
        setTeaches(res.data);
      } catch (error) {
        console.error("Error fetching instructeurs", error);
        toast.error("Impossible de charger les instructeurs");
      }
    };

    fetchTeaches();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setService((prevService) => ({
      ...prevService,
      image: file,
    }));
  };

  const handleQuillChange = (value: string) => {
    setService((prevService) => ({
      ...prevService,
      full_text: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submission

    const formData = new FormData();
    formData.append("title", service.title);
    formData.append("description", service.description);
    formData.append("status", service.status);
    formData.append("full_text", service.full_text);
    formData.append("instructeur", service.instructeur.toString());

    if (service.image) {
      formData.append("image", service.image);
    }

    try {
      await apiCreateTeache.post("services/", formData);
      toast.success("Service créé avec succès");
      navigate("/Service-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        console.error(errorsFromDb);
        toast.error(errorsFromDb?.error || "Erreur lors de la création du service");
        setErrors(errorsFromDb || {});
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-white shadow-md mb-4 m-7 justify-evenly items-center">
        <Card>
          <CardHeader>
            <CardTitle>Créer un Nouveau Service</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre du Service</Label>
                  <Input 
                    id="title"
                    placeholder="Ex: Cours de Développement Web"
                    value={service.title}
                    onChange={(e) => setService(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="instructeur">Instructeur</Label>
                  <Select 
                    value={service.instructeur}
                    onValueChange={(value) => setService(prev => ({ ...prev, instructeur: value }))}
                  >
                    <SelectTrigger className={`w-full ${errors.instructeur ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Sélectionner un instructeur" />
                    </SelectTrigger>
                    <SelectContent>
                      {teaches.map((teache) => (
                        <SelectItem key={teache.id} value={teache.id.toString()}>
                          {teache.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.instructeur && (
                    <p className="text-red-500 text-sm mt-1">{errors.instructeur}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description détaillée du service"
                  value={service.description}
                  onChange={(e) => setService(prev => ({ ...prev, description: e.target.value }))}
                  className={`w-full ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={service.status}
                    onValueChange={(value) => setService(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente de publication</SelectItem>
                      <SelectItem value="approved">Publiée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Image du Service</Label>
                  <div className="relative border-2 border-dashed p-3">
                    <Input
                      id="image"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleImageChange}
                    />
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500">
                        {service.image ? service.image.name : 'Choisir un fichier'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="full_text">Texte Complet</Label>
                <Suspense fallback={<div>Chargement de l'éditeur...</div>}>
                  <ReactQuill
                    value={service.full_text}
                    onChange={handleQuillChange}
                    theme="snow"
                    className="h-64"
                  />
                </Suspense>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-opacity-90 transition-colors duration-300"
                >
                  Ajouter le Service
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}