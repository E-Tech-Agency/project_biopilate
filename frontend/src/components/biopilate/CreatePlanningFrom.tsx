import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreatePlanningErrors, PlanningFormType, Category } from "@/types/types";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import React from "react";

export default function CreatePlanningForm() {
    const ReactQuill = React.lazy(() => import("react-quill"));
    const [errors, setErrors] = useState<CreatePlanningErrors>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [planning, setPlanning] = useState<PlanningFormType>({
        title: "",
        duree: "",
        description: "",
        range: 0,
        status: "",
        category: ""
    });

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

    const handleQuillChange = (value: string) => {
        setPlanning((prevPlanning) => ({
            ...prevPlanning,
            description: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', planning.title);
        formData.append('duree', planning.duree);
        formData.append('description', planning.description);
        formData.append('range', planning.range.toString());
        formData.append('status', planning.status);
        formData.append('category', planning.category);

        try {
            await apiCreateTeache.post("plannings/", formData);
            setPlanning({
                title: "",
                duree: "",
                description: "",
                range: 0,
                status: "",
                category: ""
            });
            toast.success("Planning created");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = error.response?.data;
                toast.error(errorsFromDb.error);
                setErrors(errorsFromDb);
            }
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto p-6 my-8">
            <CardHeader>
                <CardTitle>Ajouter un Planning</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="title">
                                Titre
                                {errors.title && <span className="text-red-500 mt-2">{errors.title}</span>}
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                value={planning.title}
                                onChange={(e) => setPlanning({ ...planning, title: e.target.value })}
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="duree">
                                Durée
                                {errors.duree && <span className="text-red-500 mt-2">{errors.duree}</span>}
                            </Label>
                            <Input
                                id="duree"
                                value={planning.duree}
                                onChange={(e) => setPlanning({ ...planning, duree: e.target.value })}
                                placeholder="Durée du planning"
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="category">
                                    Niveau
                                    {errors.category && <span className="text-red-500 mt-2">{errors.category}</span>}
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={planning.category}
                                    onChange={(e) => setPlanning({ ...planning, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Sélectionner un Niveau</option>
                                    {categories.map((niveau) => (
                                        <option key={niveau.id} value={niveau.id}>
                                            {niveau.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="range">
                                    Déplacement
                                    {errors.range && <span className="text-red-500 mt-2">{errors.range}</span>}
                                </Label>
                                <Input
                                    id="range"
                                    name="range"
                                    type="number"
                                    value={planning.range}
                                    onChange={(e) => setPlanning({ ...planning, range: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">
                                Status
                                {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={planning.status}
                                onChange={(e) => setPlanning({ ...planning, status: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">
                                Description
                                {errors.description && <span className="text-red-500 mt-2">{errors.description}</span>}
                            </Label>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ReactQuill
                                    id="description"
                                    value={planning.description}
                                    onChange={handleQuillChange}
                                    className="w-full"
                                    theme="snow"
                                />
                            </Suspense>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button type="submit" className="w-44" size="lg">Ajouter</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
