import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormationFormType, CreateFormationErrors, OptionFormType, CreateOptionErrors } from "@/types/types";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Modal } from "./Modal";
import SideNav from '@/components/shared/side-nav';
const ReactQuill = React.lazy(() => import("react-quill"));
import { useNavigate } from 'react-router-dom';

interface FormationCategoryType {
    option: string;
    price: string;
}

const CreateFormationForm: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formation, setFormation] = useState<FormationFormType>({
        title: "",
        description: "",
        options: [],
        status: ""
    });

    const [errors, setErrors] = useState<CreateFormationErrors>({});
    const [option, setOption] = useState<OptionFormType>({ name: "" });
    const [errorsO, setErrorsO] = useState<CreateOptionErrors>({});
    const [allOptions, setAllOptions] = useState<OptionFormType[]>([]);
    const [formationCategories, setFormationCategories] = useState<FormationCategoryType[]>([]);

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
            setOption({ name: "" });
            setErrorsO({});
            setIsModalOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrorsO(errorsFromDb || {});
                if (errorsFromDb?.name) {
                    toast.error(errorsFromDb.name[0]);
                }
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormation((prevF) => ({
            ...prevF,
            [name]: value,
        }));
    };

    const handleCategoryChange = (index: number, field: string, value: string) => {
        const newCategories = [...formationCategories];
        newCategories[index] = { ...newCategories[index], [field]: value };
        setFormationCategories(newCategories);
    };

    const addCategory = () => {
        setFormationCategories([...formationCategories, { option: "", price: "" }]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formationCategories.some(cat => !cat.option || !cat.price)) {
            toast.error("Veuillez remplir tous les champs des options et prix.");
            return;
        }

        const formData = new FormData();
        formData.append('title', formation.title);
        formData.append('description', formation.description);
        formData.append('status', formation.status);
    
        formationCategories.forEach((category, index) => {
            formData.append(`options[${index}][option]`, category.option);
            formData.append(`options[${index}][price]`, category.price);
        });

        try {
            const formationResponse = await api.post("formations/", formData);
            const formationId = formationResponse.data.id;

            const selectedOptionsPromises = formationCategories.map(async (category) => {
                try {
                    await api.post("selected-options/", {
                        formation: formationId,
                        option: category.option,
                        price: category.price,
                    });
                    toast.success("Option selected created successfully");
                } catch (error) {
                    console.error("Error creating selected option", error);
                    throw error;
                }
            });

            await Promise.all(selectedOptionsPromises);

            setFormation({
                title: "",
                description: "",
                options: [],
                status: ""
            });
            setFormationCategories([]);
            toast.success("Formation created");
            setErrors({});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                console.error("API Error:", error.response?.status, errorsFromDb);
                setErrors(errorsFromDb || {});
                toast.error("Failed to create formation");
            }
        }
    };

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <div className='justify-evenly items-center m-6'>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <Button onClick={() => setIsModalOpen(true)}>Ajouter un niveau</Button>
                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <form onSubmit={handleSubmitOption}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Niveau de formation
                                                {errorsO.name && <li className="text-red-500 mt-2">{errorsO.name}</li>}
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="w-full"
                                                value={option.name}
                                                onChange={(e) => setOption({ ...option, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Button type="submit" className="w-44" size={"lg"}>Add Option</Button>
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
                                        {errors.title && <li className="text-red-500 mt-2">{errors.title}</li>}
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
                                        {errors.description && <li className="text-red-500 mt-2">{errors.description}</li>}
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
                                    <Label htmlFor="categories">
                                        Options et Prix
                                    </Label>
                                    {formationCategories.map((category, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-3 mb-4">
                                            <div>
                                                <label htmlFor={`option-${index}`}>Option</label>
                                                <select
                                                    id={`option-${index}`}
                                                    name={`option-${index}`}
                                                    className="w-full p-2 border rounded-md"
                                                    value={category.option}
                                                    onChange={(e) =>
                                                        handleCategoryChange(index, "option", e.target.value)
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
                                                <label htmlFor={`price-${index}`}>Price</label>
                                                <Input
                                                    id={`price-${index}`}
                                                    name={`price-${index}`}
                                                    type="text"
                                                    className="w-full"
                                                    value={category.price}
                                                    onChange={(e) =>
                                                        handleCategoryChange(index, "price", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button type="button" className="w-full" onClick={addCategory}>
                                        Add Option and Price
                                    </Button>
                                </div>
                              
                                <div className="grid gap-3">
                            <Label htmlFor="status">
                                Status
                                {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                            </Label>
                            <select
                                id="status"
                                name="status"
                               
                                onChange={handleInputChange}                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                                <div>
                                    <Button type="submit" className="w-44" size={"lg"}>Submit</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default CreateFormationForm;
