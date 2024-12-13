import React, { useEffect, useState, Suspense } from "react";
import { WorkShop, WorkShopFormType, CreateWorkShopErrors, CategoryWorkShop } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTrash, FaEdit, FaFilePdf } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";
import DOMPurify from 'dompurify'; // Import DOMPurify
import CreateCategoryWOrkShop from "../supplier/create-categoryworkshop";
const ReactQuill = React.lazy(() => import("react-quill"));

export default function WorkshopShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredWorkShop, setFilteredWorkShop] = useState<WorkShop[]>([]);
    const [categories, setCategories] = useState<CategoryWorkShop[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // New state for category filter
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [workShops, setWorkShops] = useState<WorkShop[] | null>([]);
    const [newWorkShop, setNewCWorkShop] = useState<WorkShopFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
        category: "",
        pdf_workshop: null,
    });
    const [errors, setErrors] = useState<CreateWorkShopErrors>({});

    const getWorkShop = async () => {
        try {
            const res = await api.get("workshops-biopilate/");
            setWorkShops(res.data);
            setFilteredWorkShop(res.data);
        } catch (error) {
            console.error("Error fetching workshops-biopilate", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("category-workshops/");
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        getWorkShop();
    }, []);

    const filterWorkShop = () => {
        if (workShops) {
            const filtered = workShops.filter((workShop) => {
                const formattedDate = new Date(workShop.created_at).toLocaleDateString();
                const fullText = `${workShop.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? workShop.status === statusFilter : true;
                const matchesCategoryFilter = categoryFilter ? workShop.category === Number(categoryFilter) : true;
                return matchesSearchTerm && matchesStatusFilter && matchesCategoryFilter;
            });
            setFilteredWorkShop(filtered);
        }
    };

    useEffect(() => {
        filterWorkShop();
    }, [searchTerm, statusFilter, categoryFilter, workShops]);

    const deleteWorkShop = async (id: number) => {
        try {
            await api.delete(`workshops-biopilate/${id}/`);
            getWorkShop();
        } catch (error) {
            console.error("Error deleting workshops-biopilate", error);
        }
    };

    const handleSubmitWorkShops= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newWorkShop.title);
            formData.append("description", newWorkShop.description);
            formData.append("status", newWorkShop.status);
            formData.append('category', newWorkShop.category);
            if (newWorkShop.image) {
                formData.append("image", newWorkShop.image);
            }
            if (newWorkShop.pdf_workshop) {
                formData.append("pdf_workshop", newWorkShop.pdf_workshop);
            }

            await api.post("workshops-biopilate/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("workshops-biopilate created");
            setNewCWorkShop({
                title: "",
                description: "",
                status: "",
                image: null,
                category: "",
                pdf_workshop: null,
            });
            setErrors({});
            setIsModalOpen(false);
            getWorkShop();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewCWorkShop((prevNewWorkshop) => ({
            ...prevNewWorkshop,
            image: file,
            pdf_workshop: file,
        }));
    };
    const handleQuillChange = (value: string) => {
        setNewCWorkShop((prevNewWorkshop) => ({
            ...prevNewWorkshop,
            description: value,
        }));
    };
   

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page whenever rows per page change
    };

    const paginatedWorkShop = filteredWorkShop.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleEditClick = (id: number) => {
        navigate(`/edit-workShop-biopilates/${id}`);
    };

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full max-w-6xl mx-auto p-6">
                <CardHeader className="flex justify-between">
                    <div >
                        <CardTitle>Liste WorkShops</CardTitle>
                    </div>
                    
                    <div className='flex justify-between '>
                    
            <div><Button variant="default" onClick={() => setIsModalOpen(true)}>
                            Ajouter un workShop
                        </Button></div>
                        <div className="mt-2">
                <CreateCategoryWOrkShop />
            </div>
                        
                        
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <form onSubmit={handleSubmitWorkShops}>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">
                                            Titre du workShop
                                            {errors.title && <span className="text-red-500 mt-2">{errors.title}</span>}
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={newWorkShop.title}
                                            onChange={(e) => setNewCWorkShop({ ...newWorkShop, title: e.target.value })}
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
                                        <Label htmlFor="pdf_workshop">
                                            Ajouter PDf
                                            {errors.pdf_workshop && <span className="text-red-500 mt-2">{errors.pdf_workshop}</span>}
                                        </Label>
                                        <Input
                                            id="pdf_workshop"
                                            name="pdf_workshop"
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
                                                value={newWorkShop.description}
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
                                            value={newWorkShop.category}
                                            onChange={(e) => setNewCWorkShop({ ...newWorkShop, category: e.target.value })}
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
                                            value={newWorkShop.status}
                                            onChange={(e) => setNewCWorkShop({ ...newWorkShop, status: e.target.value })}
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
                        <Input
                            type="text"
                            placeholder="Recherche..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Sélectionner un Status</option>
                            <option value="pending">En attente de publication</option>
                            <option value="approved">Publiée</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
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
                            {paginatedWorkShop.map((workshop) => (
                                <TableRow key={workshop.id}>
                                    <TableCell>
                                        {workshop.image && (
                                            <img
                                                src={workshop.image}
                                                alt={workshop.title}
                                                className="w-16 h-16 object-cover"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                {workshop.title}
                                {workshop.pdf_workshop && (
                                    <a 
                                        href={workshop.pdf_workshop} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="ml-2 inline-block"
                                    >
                                        <FaFilePdf className="text-red-500 hover:text-red-700" />
                                    </a>
                                )}
                            </TableCell>
                                    <TableCell>{workshop.title}</TableCell>
                                    <TableCell>{workshop.category_workshop}</TableCell>
                                    <TableCell>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(workshop.description),
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="space-x-4">
                                        <Button onClick={() => handleEditClick(workshop.id)} variant="secondary">
                                            <FaEdit />
                                        </Button>
                                        <Button onClick={() => deleteWorkShop(workshop.id)} variant="destructive">
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
                                Page {currentPage} of {Math.ceil(filteredWorkShop.length / rowsPerPage)}
                            </span>
                            <button
                                className="p-2 border border-gray-300 rounded-md"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredWorkShop.length / rowsPerPage)}
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
