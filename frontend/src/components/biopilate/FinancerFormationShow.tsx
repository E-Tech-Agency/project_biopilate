import React, { useEffect, useState} from "react";
import { FinancerFormation,FinancerFormationFormType,CreateFinancerFormationErrors} from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTrash, FaEdit, FaFilePdf,FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";

import {Link, PlusCircle } from 'lucide-react';


export default function FinancerFormationShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredManuel, setFilteredManuel] = useState<FinancerFormation[]>([]);
   
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [formations, setFormation] = useState<FinancerFormation[]>([]);
    const [newFormation, setNewFormation] = useState<FinancerFormationFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
        pdf_financer_formation: null,
       
    });
    const [errors, setErrors] = useState<CreateFinancerFormationErrors>({});

    // Fetch formation
    const getFormation = async () => {
        try {
            const res = await api.get("financer-formations/");
            setFormation(res.data);
            
            
            setFilteredManuel(res.data);
        } catch (error) {
            console.error("Error fetching financer-formations", error);
            toast.error("Impossible de charger ");
        }
    };
    useEffect(() => {
        getFormation();
    }, []); // Empty dependency array means this runs once on component mount

    

    // Filter manuel based on search and filters
    const filterFormation = () => {
        if (formations) {
            const filtered = formations.filter((formations) => {
                const formattedDate = new Date(formations.created_at).toLocaleDateString();
                const fullText = `${formations.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? formations.status === statusFilter : true;
                return matchesSearchTerm && matchesStatusFilter;
            });
            
            setFilteredManuel(filtered);
        }
    };

    // Apply filters when search or filter conditions change
    useEffect(() => {
        filterFormation();
    }, [searchTerm, statusFilter ,formations]);

    // Delete a formation-biopilates
    const deleteFormation = async (id: number) => {
        try {
            await api.delete(`financer-formations/${id}/`);
            toast.success("Atelier supprimé avec succès");
            getFormation();
        } catch (error) {
            console.error("Error deleting financer-formations-biopilates", error);
            toast.error("Impossible de supprimer l'atelier");
        }
    };

    // Submit new vlog
    const handleSubmitManuel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newFormation.title);
            formData.append("description", newFormation.description);
            formData.append("status", newFormation.status);
          
            
            if (newFormation.image) {
                formData.append("image", newFormation.image);
            }
            if (newFormation.pdf_financer_formation) {
                formData.append("pdf_financer_formation", newFormation.pdf_financer_formation);
            }
           

            await api.post("financer-formations/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            toast.success("Atelier créé avec succès");
            resetFormationForm();
            getFormation();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
                toast.error("Échec de la création de l'atelier");
            }
        }
    };

    // Reset formation form
    const resetFormationForm = () => {
        setNewFormation({
            title: "",
            description: "",
            status: "",
            image: null,
            pdf_financer_formation: null,
        });
        setErrors({});
        setIsModalOpen(false);
    };

    // Handle image/PDF file change
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
         type: "image" | "pdf"
      ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewFormation((prevNewFormation) => ({
          ...prevNewFormation,
          [type]: file,
        }));
      };
      const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "image" | "pdf_financer_formation"
      ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewFormation((prevState) => ({
          ...prevState,
          [field]: file,
        }));
      };

  

    // Change rows per page
    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    // Paginate manuel
    const paginatedFormation = filteredManuel.slice(
        (currentPage - 1) * rowsPerPage, 
        currentPage * rowsPerPage
    );

    // Navigate to edit page
    const handleEditClick = (id: number) => {
        navigate(`/edit-formation-finance-biopilates/${id}`);
    };

    // Calculate total pages
    // const getTotalPages = () => Math.ceil(filteredManuel.length / rowsPerPage);
 
      

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full max-w-6xl mx-auto p-6">
                            <CardHeader className="flex  justify-between">
               
                <div className="flex justify-between items-center">
                <CardTitle>Liste Formation</CardTitle>
                    <button                 className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
 onClick={() => setIsModalOpen(true)}>
                     <PlusCircle  />   Ajouter 
                    </button>
                </div>
               
                </CardHeader>

                {/* Modal for creating new workshop */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmitManuel} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
    <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau formation</h2>
        <p className="text-gray-500 mt-2">Remplissez les informations de votre formation</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div className="space-y-2">
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
            </Label>
            <Input
                id="title"
                value={newFormation.title}
                onChange={(e) => setNewFormation({ ...newFormation, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le titre "
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description/Link Input */}
        <div className="space-y-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Lien Formation
            </Label>
            <Input
                id="description"
                type="text"
                value={newFormation.description}
                onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le lien"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
    </div>

    <div className="grid md:grid-cols-2 gap-6">
       

        {/* Status Dropdown */}
        <div className="space-y-2">
            <Label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Statut
            </Label>
            <div className="relative">
                <select
                    id="status"
                    value={newFormation.status}
                    onChange={(e) => setNewFormation({ ...newFormation, status: e.target.value })}
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

        {/* PDF Upload */}
        <div className="space-y-2">
            <Label htmlFor="pdf_financer_formation" className="block text-sm font-medium text-gray-700">
                PDF Formation
            </Label>
            <Input
                id="pdf_financer_formation"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'pdf_financer_formation')}
                className="w-full file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-blue-100 focus:outline-none"
            />
            {errors.pdf_financer_formation && <p className="text-red-500 text-xs mt-1">{errors.pdf_financer_formation}</p>}
        </div>

        
    </div>

    {/* Submit Button */}
    <div className="mt-6">
        <Button 
            type="submit" 
            className=" flex  reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"        >
             <PlusCircle className="w-4 h-4" />  Ajouter
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
                       
                    </div>

                    {/* Workshops Table */}
                    <Table className="border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
    <TableHeader className="bg-gray-100">
        <TableRow className="hover:bg-gray-200 transition-colors">
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lien</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</TableHead>

            <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
 {paginatedFormation.map((formation) => (
    <TableRow
        key={formation.id}
        className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
    >
      <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={formation.image} alt={formation.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{formation.title}</div>
                                           
                                        </div>
                                    </div>
                                </TableCell>
       
        <TableCell className="px-4 py-3">
            <div >
                <div className="flex items-center space-x-2 p-4">
 
                    <a href= {formation.description}>  <Link className="w-8 h-8 text-gray-600" /></a>
                </div>
            </div>
        </TableCell >
        <TableCell className="font-medium">
                                       
                                        {formation.pdf_financer_formation && (
                                            <a 
                                                href={formation.pdf_financer_formation} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="ml-2 inline-block"
                                            >
                                                <FaFilePdf className="text-red-500 hover:text-red-700" />
                                            </a>
                                        )}
                                    </TableCell>
        <TableCell className="item-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(formation.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteFormation(formation.id)}>
                                            <FaTrash />
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
        <span className="text-sm text-gray-700">Rows per page:</span>
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
            Previous
        </button>
        <span className="text-sm text-gray-700">
            Page {currentPage} of {Math.ceil(filteredManuel.length / rowsPerPage)}
        </span>
        <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredManuel.length / rowsPerPage)}
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
