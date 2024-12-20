import React, { useEffect, useState } from "react";
import { Vlog, VlogFormType, CreateVlogErrors, CategoryVlog } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";

import CreateCategoryVlog from '../supplier/create-categoryVlog';
import {  Edit2, Link, PlusCircle, Trash2 } from 'lucide-react';
// const ReactQuill = React.lazy(() => import("react-quill"));

export default function VlogShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredVlog, setFilteredVlog] = useState<Vlog[]>([]);
    const [categories, setCategories] = useState<CategoryVlog[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

    const [vlogs, setVlog] = useState<Vlog[]>([]);
    const [newVlog, setNewVlog] = useState<VlogFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
        category: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState<CreateVlogErrors>({});

    // Fetch Vlog
    const getVlog = async () => {
        try {
            const res = await api.get("vlogs/");
            setVlog(res.data);
            setFilteredVlog(res.data);
        } catch (error) {
            console.error("Error fetching vlogs-biopilate", error);
            toast.error("Impossible de charger les ateliers");
        }
    };

    // Fetch categories and vlogs on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes] = await Promise.all([
                    api.get("category-vlogs/"),
                    getVlog()
                ]);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error("Error fetching initial data", error);
                toast.error("Erreur de chargement des données");
            }
        };

        fetchInitialData();
    }, []);

    // Filter vlog based on search and filters
    const filterVlog = () => {
        if (vlogs) {
            const filtered = vlogs.filter((vlog) => {
                const formattedDate = new Date(vlog.created_at).toLocaleDateString();
                const fullText = `${vlog.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? vlog.status === statusFilter : true;
                const matchesCategoryFilter = categoryFilter ? vlog.category === Number(categoryFilter) : true;
                return matchesSearchTerm && matchesStatusFilter && matchesCategoryFilter;
            });
            setFilteredVlog(filtered);
        }
    };

    // Apply filters when search or filter conditions change
    useEffect(() => {
        filterVlog();
    }, [searchTerm, statusFilter, categoryFilter, vlogs]);

    // Delete a vlog
    const deleteVlog = async (id: number) => {
        try {
            await api.delete(`vlogs/${id}/`);
            toast.success("Atelier supprimé avec succès");
            getVlog();
        } catch (error) {
            console.error("Error deleting vlog-biopilate", error);
            toast.error("Impossible de supprimer l'atelier");
        }
    };

    // Submit new vlog
    const handleSubmitVlogs = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newVlog.title);
            formData.append("description", newVlog.description);
            formData.append("status", newVlog.status);
            formData.append('category', newVlog.category);
            formData.append("date", newVlog.date.toLocaleString());
            
            if (newVlog.image) {
                formData.append("image", newVlog.image);
            }
           

            await api.post("vlogs/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            toast.success("Atelier créé avec succès");
            resetWorkshopForm();
            getVlog();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
                toast.error("Échec de la création de l'atelier");
            }
        }
    };

    // Reset workshop form
    const resetWorkshopForm = () => {
        setNewVlog({
            title: "",
            description: "",
            status: "",
            image: null,
            category: "",
          date: new Date().toISOString().split("T")[0],
        });
        setErrors({});
        setIsModalOpen(false);
    };

    // Handle image/PDF file change
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "image" 
      ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewVlog((prevNewVlog) => ({
          ...prevNewVlog,
          [type]: file,
        }));
      };

  

    // Change rows per page
    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    // Paginate vlog
    const paginatedVlog = filteredVlog.slice(
        (currentPage - 1) * rowsPerPage, 
        currentPage * rowsPerPage
    );

    // Navigate to edit page
    const handleEditClick = (id: number) => {
        navigate(`/edit-Vlog-biopilates/${id}`);
    };

    // Calculate total pages
    // const getTotalPages = () => Math.ceil(filteredVlog.length / rowsPerPage);
    // const handleFileChange = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     field: "image" 
    //   ) => {
    //     const file = e.target.files ? e.target.files[0] : null;
    //     setNewVlog((prevState) => ({
    //       ...prevState,
    //       [field]: file,
    //     }));
    //   };
      

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full shadow-lg">
                <CardHeader className="border-b bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                   
                    <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des Vlogs
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos Vlogs avec facilité
              </p>
            </div>
                    <button 
                  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"

                    onClick={() => setIsModalOpen(true)}>
                           <PlusCircle className="w-4 h-4" />  Ajouter un Vlog
                        </button>
                        
                    </div>
                    <CreateCategoryVlog />
                </CardHeader>

                {/* Modal for creating new workshop */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmitVlogs} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
    <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau Vlog</h2>
        <p className="text-gray-500 mt-2">Remplissez les informations de votre vlog</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div className="space-y-2">
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre Vlog
            </Label>
            <Input
                id="title"
                value={newVlog.title}
                onChange={(e) => setNewVlog({ ...newVlog, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le titre du vlog"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
            </Label>
            <div className="relative">
                <select
                    id="category"
                    value={newVlog.category}
                    onChange={(e) => setNewVlog({ ...newVlog, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    <option value="">Sélectionner une Catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Date Input */}
        <div className="space-y-2">
            <Label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
            </Label>
            <Input
                id="date"
                type="date"
                value={newVlog.date}
                onChange={(e) => setNewVlog({ ...newVlog, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        {/* Status Dropdown */}
        <div className="space-y-2">
            <Label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Statut
            </Label>
            <div className="relative">
                <select
                    id="status"
                    value={newVlog.status}
                    onChange={(e) => setNewVlog({ ...newVlog, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    <option value="">Sélectionner un Statut</option>
                    <option value="pending">En attente de publication</option>
                    <option value="approved">Publiée</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="space-y-2">
            <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
            </Label>
            <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'image')}
                className="w-full file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-blue-100 focus:outline-none"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Description/Link Input */}
        <div className="space-y-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Lien Vlog
            </Label>
            <Input
                id="description"
                type="text"
                value={newVlog.description}
                onChange={(e) => setNewVlog({ ...newVlog, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le lien du vlog"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
    </div>

    {/* Submit Button */}
    <div className="mt-6">
        <Button 
            type="submit" 
            className="w-full  hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Ajouter Vlog
        </Button>
    </div>
</form>
                </Modal>

                {/* Filtering and Search Section */}
                <CardContent className="grid gap-4">
                    <div className="grid md:grid-cols-3 gap-4">
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
                            className="p-2 border rounded-md"
                        >
                            <option value="">Tous les Statuts</option>
                            <option value="pending">En attente de publication</option>
                            <option value="approved">Publiée</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Toutes les Catégories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Workshops Table */}
                    <Table className="border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
    <TableHeader className="bg-gray-100">
        <TableRow className="hover:bg-gray-200 transition-colors">
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vidéo</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
            <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {paginatedVlog.map((vlogs) => (
            <TableRow 
                key={vlogs.id} 
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
                <TableCell className="px-4 py-3">
                    {vlogs.image && (
                        <img
                            src={vlogs.image}
                            alt={vlogs.title}
                            className="w-16 h-16 object-cover rounded-md shadow-sm"
                        />
                    )}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-900">{vlogs.title}</TableCell>
                <TableCell className="px-4 py-3 text-gray-600">{vlogs.category_vlog}</TableCell>
               
                    <TableCell className="px-4 py-3">
            <div >
                <div className="flex items-center space-x-2 p-4">
 
                    <a href= {vlogs.description}>  <Link className="w-8 h-8 text-gray-600" /></a>
                </div>
            </div>
        </TableCell >
                <TableCell className="px-4 py-3 text-gray-600">
                    {new Date(vlogs.date).toLocaleDateString('fr-FR')} {/* Specify French locale if needed */}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                    <div className="flex justify-center space-x-2">
                        <Button 
                            onClick={() => handleEditClick(vlogs.id)} 
                            variant="secondary" 
                            className="hover:bg-blue-100 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />

                        </Button>
                        <Button 
                            onClick={() => deleteVlog(vlogs.id)} 
                             variant="outline" 
                            size="icon"
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

{/* Pagination Section */}
<div className="flex justify-between items-center mt-6 px-4 py-3 bg-white border-t rounded-b-lg shadow-md">
    <div className="flex items-center space-x-3">

        <select
            value={rowsPerPage}
            onChange={(e) => handleChangeRowsPerPage(parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
        </select>
    </div>
    <div className="flex items-center space-x-4">
        <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Précédent
        </button>
        <span className="text-sm text-gray-700">
            Page {currentPage} de {Math.ceil(filteredVlog.length / rowsPerPage)}
        </span>
        <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredVlog.length / rowsPerPage)}
        >
            Suivant
        </button>
    </div>
</div>
                </CardContent>
            </Card>
          
        </div>
    );
}
