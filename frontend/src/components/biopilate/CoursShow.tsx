import React, { useEffect, useState, Suspense } from "react";
import { Cours, CoursFormType, CreateCoursErrors, CategoryCours } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
import { UploadCloud, List, Tag, PlusCircle, Search, Edit2, Trash2 } from 'lucide-react';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
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

    // const handleChangeRowsPerPage = (value: number) => {
    //     setRowsPerPage(value);
    //     setCurrentPage(1); // Reset to first page whenever rows per page change
    // };

    const paginatedCours = filteredCours.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleEditClick = (id: number) => {
        navigate(`/edit-cours-biopilates/${id}`);
    };

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full max-w-6xl mx-auto shadow-lg">
            <CardHeader className="border-b bg-white">
                <CreateCategoryCours />
                <div>
               
           
    <div className="flex justify-between items-center">
        <CardTitle>Liste Cours</CardTitle>
        <div className="space-x-4">
        <button 
              onClick={() => setIsModalOpen(true)} 
               className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
            >
              <PlusCircle  />
              Ajouter un Cours
            </button>
        </div>
        
    </div>

                    </div>
                </CardHeader>
                <CardContent >
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un cours..."
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
                        <TableHeader  className="bg-gray-100">
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
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
                                    <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button onClick={() => handleEditClick(cour.id)} 
                                         variant="outline" 
                                          className="hover:bg-blue-50"
                                        >
                                             <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button onClick={() => deleteCours(cour.id)} 
                                        variant="outline" 
                                        className="hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                        <Select 
                value={rowsPerPage.toString()} 
                onValueChange={(value) => setRowsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Lignes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 lignes</SelectItem>
                  <SelectItem value="10">10 lignes</SelectItem>
                  <SelectItem value="20">20 lignes</SelectItem>
                </SelectContent>
              </Select>
                        </div>
                        <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {Math.ceil(filteredCours.length / rowsPerPage)}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => 
                  (prev * rowsPerPage < filteredCours.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredCours.length}
              >
                Suivant
              </Button>
            </div>
          </div>
                    </div>
                </CardContent>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <form onSubmit={handleSubmitCours} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title" className="text-gray-700 font-semibold flex items-center">
                  <Tag className="mr-2 text-blue-600" size={20} />
                  Titre du Cours
                </Label>
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
              <Input
                id="title"
                name="title"
                type="text"
                value={newCours.title}
                onChange={(e) => setNewCours({ ...newCours, title: e.target.value })}
                placeholder="Entrez le titre du cours"
                className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="image" className="text-gray-700 font-semibold flex items-center">
                  <UploadCloud className="mr-2 text-blue-600" size={20} />
                  Image du Cours
                </Label>
                {errors.image && (
                  <span className="text-red-500 text-sm">{errors.image}</span>
                )}
              </div>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                className="mt-1 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 file:px-4 file:py-2 hover:file:bg-blue-100"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-gray-700 font-semibold">
                  Description
                </Label>
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
              </div>
              <Suspense fallback={<div className="h-32 bg-gray-100 rounded-md animate-pulse"></div>}>
                <ReactQuill
                  id="description"
                  value={newCours.description}
                  onChange={handleQuillChange}
                  theme="snow"
                  className="mt-1 border-2 border-blue-100 rounded-md"
                />
              </Suspense>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category" className="text-gray-700 font-semibold flex items-center">
                  <List className="mr-2 text-blue-600" size={20} />
                  Catégorie
                </Label>
                {errors.category && (
                  <span className="text-red-500 text-sm">{errors.category}</span>
                )}
              </div>
              <select
                id="category"
                name="category"
                value={newCours.category}
                onChange={(e) => setNewCours({ ...newCours, category: e.target.value })}
                className="w-full p-2 border-2 border-blue-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner une Catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700 font-semibold">
                Statut de Publication
              </Label>
              <select
                id="status"
                value={newCours.status}
                onChange={(e) => setNewCours({ ...newCours, status: e.target.value })}
                className="w-full p-2 border-2 border-blue-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner un Statut</option>
                <option value="pending">En attente de publication</option>
                <option value="approved">Publiée</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button 
                type="submit" 
                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
              >
                Ajouter le Cours
              </button>
            </div>
          </form>
                        </Modal>
        </div>
    );
}
