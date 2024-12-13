import React, { useEffect, useState, Suspense } from "react";
import { Cours, CoursFormType, CreateCoursErrors, CategoryCours } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";
import DOMPurify from 'dompurify'; // Import DOMPurify
import CreateCategoryCours from "../supplier/create-categorycours";
const ReactQuill = React.lazy(() => import("react-quill"));

export default function CoursShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredCours, setFilteredCours] = useState<Cours[]>([]);
    const [categories, setCategories] = useState<CategoryCours[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // New state for category filter
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [cours, setCours] = useState<Cours[] | null>([]);
    const [newCours, setNewCours] = useState<CoursFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
        category: "",
    });
    const [errors, setErrors] = useState<CreateCoursErrors>({});

    const getCours = async () => {
        try {
            const res = await api.get("cours/");
            setCours(res.data);
            setFilteredCours(res.data);
        } catch (error) {
            console.error("Error fetching Cours", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("cours_category/");
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        getCours();
    }, []);

    const filterCours = () => {
        if (cours) {
            const filtered = cours.filter((cour) => {
                const formattedDate = new Date(cour.created_at).toLocaleDateString();
                const fullText = `${cour.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? cour.status === statusFilter : true;
                const matchesCategoryFilter = categoryFilter ? cour.category === Number(categoryFilter) : true;
                return matchesSearchTerm && matchesStatusFilter && matchesCategoryFilter;
            });
            setFilteredCours(filtered);
        }
    };

    useEffect(() => {
        filterCours();
    }, [searchTerm, statusFilter, categoryFilter, cours]);

    const deleteCours = async (id: number) => {
        try {
            await api.delete(`cours/${id}/`);
            getCours();
        } catch (error) {
            console.error("Error deleting Cours", error);
        }
    };

    const handleSubmitCours = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newCours.title);
            formData.append("description", newCours.description);
            formData.append("status", newCours.status);
            formData.append('category', newCours.category);
            if (newCours.image) {
                formData.append("image", newCours.image);
            }

            await api.post("cours/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Cours created");
            setNewCours({
                title: "",
                description: "",
                status: "",
                image: null,
                category: "",
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
        const file = e.target.files ? e.target.files[0] : null;
        setNewCours((prevNewCours) => ({
            ...prevNewCours,
            image: file,
        }));
    };

    const handleQuillChange = (value: string) => {
        setNewCours((prevNewCours) => ({
            ...prevNewCours,
            description: value,
        }));
    };

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page whenever rows per page change
    };

    const paginatedCours = filteredCours.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleEditClick = (id: number) => {
        navigate(`/edit-cours-biopilates/${id}`);
    };

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full max-w-6xl mx-auto p-6">
                <CardHeader className="flex justify-between">
                <CreateCategoryCours />
                <div>
               
           
    <div className="flex justify-between items-center">
        <CardTitle>Liste Cours</CardTitle>
        <div className="space-x-4">
            <Button variant="default"  onClick={() => setIsModalOpen(true)}>
                Ajouter un Cours
            </Button> 
        </div>
        
    </div>

                    
                       
                        
                        
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <form onSubmit={handleSubmitCours}>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">
                                            Titre du cours
                                            {errors.title && <span className="text-red-500 mt-2">{errors.title}</span>}
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={newCours.title}
                                            onChange={(e) => setNewCours({ ...newCours, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="image">
                                            Image
                                            {errors.image && <span className="text-red-500 mt-2">{errors.image}</span>}
                                        </Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="description">
                                            Description
                                            {errors.description && <span className="text-red-500 mt-1">{errors.description}</span>}
                                        </Label>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <ReactQuill
                                                id="description"
                                                value={newCours.description}
                                                onChange={handleQuillChange}
                                                theme="snow"
                                            />
                                        </Suspense>
                                    </div>
                                    <div className="grid gap-3 mt-9">
                                        <Label htmlFor="category">
                                            Catégorie
                                            {errors.category && <span className="text-red-500 mt-2">{errors.category}</span>}
                                        </Label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={newCours.category}
                                            onChange={(e) => setNewCours({ ...newCours, category: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        >
                                            <option value="">Sélectionner une Catégorie</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid gap-3 mt-5">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={newCours.status}
                                            onChange={(e) => setNewCours({ ...newCours, status: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Sélectionner un Status</option>
                                            <option value="pending">En attente de publication</option>
                                            <option value="approved">Publiée</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button type="submit" className="btn btn-primary">
                                        Ajouter
                                    </Button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-3">
                    <div className="grid gap-6 md:grid-cols-3">
                    <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-300"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                             className="p-2 border border-gray-300 rounded-md bg-white text-gray-700"
                        >
                            <option value="">Sélectionner un Status</option>
                            <option value="pending">En attente de publication</option>
                            <option value="approved">Publiée</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                             className="p-2 border border-gray-300 rounded-md bg-white text-gray-700"
                        >
                            <option value="">Tous les Niveaux</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedCours.map((cour) => (
                                <TableRow key={cour.id}>
                                    <TableCell>
                                        {cour.image && (
                                            <img
                                                src={cour.image}
                                                alt={cour.title}
                                                className="w-16 h-16 object-cover"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{cour.title}</TableCell>
                                    <TableCell>{cour.category_cours}</TableCell>
                                    <TableCell>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(cour.description),
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="space-x-4">
                                        <Button onClick={() => handleEditClick(cour.id)} variant="secondary">
                                            <FaEdit />
                                        </Button>
                                        <Button onClick={() => deleteCours(cour.id)} variant="destructive">
                                            <FaTrash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                            <span>Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => handleChangeRowsPerPage(parseInt(e.target.value))}
                                className="p-1 border border-gray-300 rounded-md"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                className="p-2 border border-gray-300 rounded-md"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {Math.ceil(filteredCours.length / rowsPerPage)}
                            </span>
                            <button
                                className="p-2 border border-gray-300 rounded-md"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredCours.length / rowsPerPage)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
           
        </div>
    );
}
