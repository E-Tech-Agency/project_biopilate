import React, { useEffect, useState, Suspense } from "react";
import { Cours, CoursFormType, CreateCoursErrors } from "@/types/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";
import DOMPurify from "dompurify"; // Import DOMPurify

const ReactQuill = React.lazy(() => import("react-quill"));

export default function CoursShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [cours, setCours] = useState<Cours[] | null>([]);
    const [newCours, setNewCours] = useState<CoursFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
    });
    const [errors, setErrors] = useState<CreateCoursErrors>({});

    const getCours = async () => {
        try {
            const res = await api.get("cours/");
            setCours(res.data);
        } catch (error) {
            console.error("Error fetching Cours", error);
        }
    };

    useEffect(() => {
        getCours();
    }, []);

    const deleteBlog = async (id: number) => {
        try {
            await api.delete(`cours/${id}`);
            getCours();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitOption = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newCours.title);
            formData.append("description", newCours.description);
            formData.append("status", newCours.status);
            if (newCours.image) {
                formData.append("image", newCours.image);
            }

            const response = await api.post("cours/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Option coures created");
            setNewCours({
                title: "",
                description: "",
                status: "",
                image: null,
            });
            setErrors({});
            setIsModalOpen(false);
            getCours();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewCours((prevNewCours) => ({
                ...prevNewCours,
                image: e.target.files[0],
            }));
        }
    };

    const handleQuillChange = (value: string) => {
        setNewCours((prevNewCours) => ({
            ...prevNewCours,
            description: value,
        }));
    };

    return (
        <Card className="w-full max-w-6xl mx-auto p-6">
            <CardHeader className="justify-between">
                <div className="flex justify-between">
                    <div className="justify-between">
                        <CardTitle>Liste Cours</CardTitle>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="default" className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                            Ajouter un Cours
                        </Button>
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <form onSubmit={handleSubmitOption}>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">
                                            Titre du cours
                                            {errors.title && <li className="text-red-500 mt-2">{errors.title}</li>}
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="w-full"
                                            value={newCours.title}
                                            onChange={(e) => setNewCours({ ...newCours, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="image">
                                            Image
                                            {errors.image && <li className="text-red-500 mt-2">{errors.image}</li>}
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
                                        <Label htmlFor="description">
                                            Description
                                            {errors.description && <li className="text-red-500 mt-1">{errors.description}</li>}
                                        </Label>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <ReactQuill
                                                id="description"
                                                value={newCours.description}
                                                onChange={handleQuillChange}
                                                className="w-full"
                                                theme="snow"
                                            />
                                        </Suspense>
                                    </div>
                                    <div className="grid gap-3 mt-5">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={newCours.status}
                                            onChange={(e) => setNewCours({ ...newCours, status: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        >
                                            <option value="pending">En attente de publication</option>
                                            <option value="approved">Publiée</option>
                                        </select>
                                        {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                                    </div>
                                    <Button type="submit" className="w-44" size={"lg"}>
                                        Ajouer
                                    </Button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Description</TableHead>
                            <TableHead className="hidden md:table-cell">Crée le</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cours &&
                            cours.map((cour: Cours) => (
                                <TableRow key={cour.id} className="bg-accent">
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 overflow-hidden rounded-full">
                                                <img src={cour.image} alt={cour.title} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{cour.title}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(cour.description),
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(cour.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">
                                        <div className="flex space-x-2">
                                            {cour.status === "pending" && <h2 >En attente</h2>}
                                            {cour.status === "approved" && <h2 className="text-emerald-500">Publiée</h2>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex space-x-2">
                                            <Button variant="danger" onClick={() => deleteBlog(cour.id)}>
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
