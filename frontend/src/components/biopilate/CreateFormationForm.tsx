import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormationFormType,
  CreateFormationErrors,
  OptionFormType,
  CreateOptionErrors,
  FormationCategoryType,
} from "@/types/types";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

const CreateFormationForm: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formation, setFormation] = useState<FormationFormType>({
    title: "",
    description: "",
    status: "pending",
  });

  const [errors, setErrors] = useState<CreateFormationErrors>({});
  const [option, setOption] = useState<OptionFormType>({ id: 0, name: "" });
  const [errorsO, setErrorsO] = useState<CreateOptionErrors>({});
  const [allOptions, setAllOptions] = useState<OptionFormType[]>([]);
  const [formationCategories, setFormationCategories] = useState<
    FormationCategoryType[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get("options/");
        setAllOptions(response.data);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmitOption = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("options/", option);
      toast.success("Option formation created");
      setAllOptions([...allOptions, response.data]);
      setOption({ id: 0, name: "" });
      setErrorsO({});
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = (error as AxiosError)?.response?.data;
        setErrorsO(errorsFromDb || {});
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormation((prevF) => ({
      ...prevF,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newCategories = [...formationCategories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setFormationCategories(newCategories);
  };

  const addCategory = () => {
    setFormationCategories([
      ...formationCategories,
      {
        formation: 0, // This will be updated when formation is created
        option: 0, // Option ID, default to 0 initially
        price: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formation.title || !formation.description || !formation.status) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Validate formation categories
    if (formationCategories.length === 0) {
      toast.error("Veuillez ajouter au moins une option avec un prix");
      return;
    }

    if (formationCategories.some(cat => !cat.option || !cat.price)) {
      toast.error("Veuillez remplir tous les champs pour les options et les prix");
      return;
    }

    try {
      // First, create the formation
      const formationResponse = await api.post("formations/", {
        title: formation.title,
        description: formation.description,
        status: formation.status,
      });

      const formationId = formationResponse.data.id;

      // Then create the formation options with prices
      const optionsPromises = formationCategories.map(category =>
        api.post("selected-options/", {
          formation: formationId,
          option: category.option,
          price: category.price,
        })
      );

      await Promise.all(optionsPromises);

      // Success handling
      toast.success("Formation créée avec succès");

      // Reset form
      setFormation({
        title: "",
        description: "",
        status: "pending",
      });
      setFormationCategories([]);
      setErrors({});

      // Optionally navigate to formations list
      navigate("/Formation-biopilates");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        console.error("API Error:", error.response?.status, errorsFromDb);
        setErrors(errorsFromDb || {});
        toast.error("Erreur lors de la création de la formation");
      }
    }
  };

  return (
    <div className="justify-evenly items-center m-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              Ajouter un niveau
            </Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <form onSubmit={handleSubmitOption}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">
                      Niveau de formation
                      {errorsO.name && (
                        <li className="text-red-500 mt-2">{errorsO.name}</li>
                      )}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full"
                      value={option.name}
                      onChange={(e) =>
                        setOption({ id: 0, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Button type="submit" className="w-44" size={"lg"}>
                      Ajouter Option
                    </Button>
                  </div>
                </div>
              </form>
            </Modal>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">
                  Titre
                  {errors.title && (
                    <li className="text-red-500 mt-2">{errors.title}</li>
                  )}
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full"
                  value={formation.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">
                  Description
                  {errors.description && (
                    <li className="text-red-500 mt-2">{errors.description}</li>
                  )}
                </Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded-md"
                  value={formation.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="categories">Options et Prix</Label>
                {formationCategories.map((category, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <Label htmlFor={`option-${index}`}>Option</Label>
                      <select
                        id={`option-${index}`}
                        name={`option-${index}`}
                        className="w-full p-2 border rounded-md"
                        value={category.option}
                        onChange={(e) =>
                          handleCategoryChange(
                            index,
                            "option",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">Select an option</option>
                        {allOptions.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor={`price-${index}`}>Price</Label>
                      <Input
                        id={`price-${index}`}
                        name={`price-${index}`}
                        type="number"
                        className="w-full"
                        value={category.price}
                        onChange={(e) =>
                          handleCategoryChange(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" className="w-full" onClick={addCategory}>
                Ajouter les niveaux et les prix  </Button>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="status">
                  Status
                  {errors.status && (
                    <span className="text-red-500 mt-2">{errors.status}</span>
                  )}
                </Label>
                <select
                  id="status"
                  name="status"
                  value={formation.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Sélectionner un Status</option>
                  <option value="pending">En attente de publication</option>
                  <option value="approved">Publiée</option>
                </select>
              </div>

              <Button type="submit" className="w-full" size={"lg"}>
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFormationForm;
