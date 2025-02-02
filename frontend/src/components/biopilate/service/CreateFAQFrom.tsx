import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateFAQErrors, FAQFormType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";

import { useNavigate } from "react-router-dom";

export default function CreateFAQForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [errors, setErrors] = useState<CreateFAQErrors>({});
  const [faq, setFaq] = useState<FAQFormType>({
    title: "",
    description: "",
    status: "",
    range: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFaq((prevFAQ) => ({
      ...prevFAQ,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", faq.title);
    formData.append("description", faq.description);
    formData.append("status", faq.status);
    formData.append("range", faq.range.toString());

    try {
      await apiCreateTeache.post("faqs/", formData);
      setFaq({
        title: "",
        description: "",
        status: "",
        range: 0,
      });
      toast.success("FAQ créé avec succès");
      navigate("/FAQ-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        console.log(errorsFromDb);
        toast.error(errorsFromDb.error);
        setErrors(errorsFromDb);
      }
    }
  };

  return (
    <div className="flex justify-center items-center m-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-lg">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-xl font-semibold">Créer une FAQ</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Champ Titre */}
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-medium">
                  Titre
                </Label>
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full border-gray-300 rounded-md"
                  value={faq.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Champ Réponse */}
              <div className="grid gap-2">
                <Label htmlFor="description" className="font-medium">
                  Réponse
                </Label>
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded-md resize-none"
                  rows={4}
                  value={faq.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Champ Mouvement */}
              <div className="grid gap-2">
                <Label htmlFor="range" className="font-medium">
                  Mouvement
                </Label>
                {errors.range && (
                  <span className="text-red-500 text-sm">{errors.range}</span>
                )}
                <Input
                  id="range"
                  name="range"
                  type="number"
                  className="w-full border-gray-300 rounded-md"
                  value={faq.range}
                  onChange={(e) =>
                    setFaq({ ...faq, range: Number(e.target.value) })
                  }
                />
              </div>

              {/* Champ Statut */}
              <div className="grid gap-2">
                <Label htmlFor="status" className="font-medium">
                  Statut
                </Label>
                {errors.status && (
                  <span className="text-red-500 text-sm">{errors.status}</span>
                )}
                <select
                  id="status"
                  name="status"
                  value={faq.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionnez un statut</option>
                  <option value="pending">En attente de publication</option>
                  <option value="approved">Publié</option>
                </select>
              </div>

              {/* Boutons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"

                >
                  Ajouter
                </button>
                <Button
                  type="button"
                  className="bg-gray-500 text-white hover:bg-gray-600 rounded-md px-6 py-2"
                  onClick={() => navigate("/FAQ-biopilates")}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
