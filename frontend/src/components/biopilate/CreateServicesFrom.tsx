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
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { useNavigate } from "react-router-dom";

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
    status: "",
    full_text: "",
    instructeur: "",
    image: null,
  });

  useEffect(() => {
    const fetchTeaches = async () => {
      try {
        const res = await api.get("teaches/");
        setTeaches(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching instructeurs", error);
      }
    };

    fetchTeaches();
  }, []);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  //     setService((prevService) => ({
  //         ...prevService,
  //         [name]: value,
  //     }));
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Ensure file is either File or null
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
      setService({
        title: "",
        description: "",
        status: "",
        full_text: "",
        instructeur: "",
        image: null,
      });
      toast.success("Service created");
      navigate("/Service-biopilates");
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
    <div className="flex">
      <div className="flex-1 bg-white shadow-md mb-4 m-7 justify-evenly items-center">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="fullname">
                    Titre <br />
                    {errors.title && (
                      <li className="text-red-500 mt-2">{errors.title}</li>
                    )}
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    className="w-full"
                    placeholder="Service"
                    onChange={(e) =>
                      setService({ ...service, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">
                    Description <br />
                    {errors.description && (
                      <li className="text-red-500 mt-2">
                        {errors.description}
                      </li>
                    )}
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Service description"
                    className="w-full"
                    onChange={(e) =>
                      setService({ ...service, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">
                    Status <br />
                    {errors.status && (
                      <li className="text-red-500 mt-2">{errors.status}</li>
                    )}
                  </Label>
                  <select
                    id="status"
                    name="status"
                    value={service.status}
                    onChange={(e) =>
                      setService({ ...service, status: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="pending">En attente de publication</option>
                    <option value="approved">Publiée</option>
                  </select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="instructeur">
                    Instructeur{" "}
                    {errors.instructeur && (
                      <li className="text-red-500 mt-1">
                        {errors.instructeur}
                      </li>
                    )}
                  </Label>
                  <select
                    id="instructeur"
                    name="instructeur"
                    value={service.instructeur}
                    onChange={(e) =>
                      setService({ ...service, instructeur: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="">Sélectionner un instructeur</option>
                    {teaches.map((teache) => (
                      <option key={teache.id} value={teache.id}>
                        {teache.fullname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="image">
                    Image{" "}
                    {errors.image && (
                      <li className="text-red-500 mt-1">{errors.image}</li>
                    )}
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    className="w-full"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="full_text">
                    Texte Complet{" "}
                    {errors.full_text && (
                      <li className="text-red-500 mt-1">{errors.full_text}</li>
                    )}
                  </Label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReactQuill
                      id="full_text"
                      value={service.full_text}
                      onChange={handleQuillChange}
                      className="w-full"
                      theme="snow"
                    />
                  </Suspense>
                </div>
                <br />
                <div>
                  <Button type="submit" className="w-44" size={"lg"}>
                    Ajouter
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
