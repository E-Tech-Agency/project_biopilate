import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
                console.log(res.data);
                
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
        formData.append('category', planning.category.toString());

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
                console.log(errorsFromDb);
                toast.error(errorsFromDb.error);
                setErrors(errorsFromDb);
            }
        }
    };

    return (
        <Card className="w-min">
            <CardHeader>
                <CardTitle>Ajouter un Planning</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="title">
                                Titre <br />
                                {errors.title && <li className="text-red-500 mt-2">{errors.title}</li>}
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
                                Durée <br />
                                {errors.duree && <li className="text-red-500 mt-2">{errors.duree}</li>}
                            </Label>
                            <Input
                                id="duree"
                                value={planning.duree}
                                onChange={(e) => setPlanning({ ...planning, duree: e.target.value })}
                                placeholder="plannings durée"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-6 items-center">
                            <div className="flex flex-row justify-center gap-4 items-center">
                                <Label htmlFor="category">
                                    Niveau {JSON.stringify(planning.category)} {errors.category && <li className="text-red-500 mt-1">{errors.category}</li>}
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
                                <Label htmlFor="range">
                                    Déplacement {errors.range && <li className="text-red-500 mt-1">{errors.range}</li>}
                                </Label>
                                <Input
                                    id="range"
                                    name="range"
                                    type="number"
                                    value={planning.range}
                                    onChange={(e) => setPlanning({ ...planning, range: parseInt(e.target.value) })}
                                    className="w-25"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="status">
                                    Status <br />
                                    {errors.status && <li className="text-red-500 mt-2">{errors.status}</li>}
                                </Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={planning.status}
                                    onChange={(e) => setPlanning({ ...planning, status: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="pending">En attente de publication</option>
                                    <option value="approved">Publiée</option>
                                </select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">
                                    Description {errors.description && <li className="text-red-500 mt-1">{errors.description}</li>}
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
                            <div>
                                <Button type="submit" className="w-44" size={"lg"}>Ajouter</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
