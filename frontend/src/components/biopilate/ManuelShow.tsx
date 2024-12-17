import React, { useEffect, useState, Suspense } from "react";
import { Manuel,ManuelFormType,CreateManuelErrors } from "@/types/types";
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
import DOMPurify from 'dompurify';
import { BookOpen, Edit2, FileText, PlusCircle, Trash2 } from 'lucide-react';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
const ReactQuill = React.lazy(() => import("react-quill"));

export default function Manuelhow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredManuel, setFilteredManuel] = useState<Manuel[]>([]);
   
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [manuels, setManuel] = useState<Manuel[]>([]);
    const [newmanuel, setNewManuel] = useState<ManuelFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
       
    });
    const [errors, setErrors] = useState<CreateManuelErrors>({});

    // Fetch manuel
    const getManuel = async () => {
        try {
            const res = await api.get("manuels-biopilates/");
            setManuel(res.data);
            
            
            setFilteredManuel(res.data);
        } catch (error) {
            console.error("Error fetching manuel-biopilate", error);
            toast.error("Impossible de charger ");
        }
    };
    useEffect(() => {
        getManuel();
    }, []); // Empty dependency array means this runs once on component mount

    

    // Filter manuel based on search and filters
    const filterManuel = () => {
        if (manuels) {
            const filtered = manuels.filter((manuel) => {
                const formattedDate = new Date(manuel.created_at).toLocaleDateString();
                const fullText = `${manuel.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? manuel.status === statusFilter : true;
                return matchesSearchTerm && matchesStatusFilter;
            });
            
            setFilteredManuel(filtered);
        }
    };

    // Apply filters when search or filter conditions change
    useEffect(() => {
        filterManuel();
    }, [searchTerm, statusFilter ,manuels]);

    // Delete a manuels-biopilates
    const deleteManuel = async (id: number) => {
        try {
            await api.delete(`manuels-biopilates/${id}/`);
            toast.success("Atelier supprimé avec succès");
            getManuel();
        } catch (error) {
            console.error("Error deleting manuels-biopilates", error);
            toast.error("Impossible de supprimer l'atelier");
        }
    };

    // Submit new vlog
    const handleSubmitManuel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newmanuel.title);
            formData.append("description", newmanuel.description);
            formData.append("status", newmanuel.status);
          
            
            if (newmanuel.image) {
                formData.append("image", newmanuel.image);
            }
           

            await api.post("manuels-biopilates/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            toast.success("Atelier créé avec succès");
            resetManuelForm();
            getManuel();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
                toast.error("Échec de la création de l'atelier");
            }
        }
    };

    // Reset workshop form
    const resetManuelForm = () => {
        setNewManuel({
            title: "",
            description: "",
            status: "",
            image: null,
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
        setNewManuel((prevNewVlog) => ({
          ...prevNewVlog,
          [type]: file,
        }));
      };

  

    // Change rows per page
    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    // Paginate manuel
    const paginatedManuel = filteredManuel.slice(
        (currentPage - 1) * rowsPerPage, 
        currentPage * rowsPerPage
    );

    // Navigate to edit page
    const handleEditClick = (id: number) => {
        navigate(`/edit-manuel-biopilates/${id}`);
    };

    // Calculate total pages
    const getTotalPages = () => Math.ceil(filteredManuel.length / rowsPerPage);
 
      

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full shadow-lg">
                            <CardHeader className="border-b bg-white">
               
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
                   
               
                <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des Manuels
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos instructeurs avec facilité
              </p>
            </div>
            <Button variant="default" onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="w-4 h-4" />  Ajouter un Manuel
                    </Button> </div>
                </CardHeader>

                {/* Modal for creating new workshop */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmitManuel} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
    <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau Manuel</h2>
        <p className="text-gray-500 mt-2">Remplissez les informations de votre Manuel</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div className="space-y-2">
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
            </Label>
            <Input
                id="title"
                value={newmanuel.title}
                onChange={(e) => setNewManuel({ ...newmanuel, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le titre du vlog"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description/Link Input */}
        <div className="space-y-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Lien Manuel
            </Label>
            <Input
                id="description"
                type="text"
                value={newmanuel.description}
                onChange={(e) => setNewManuel({ ...newmanuel, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Entrez le lien du vlog"
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
                    value={newmanuel.status}
                    onChange={(e) => setNewManuel({ ...newmanuel, status: e.target.value })}
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

        
    </div>

    {/* Submit Button */}
    <div className="mt-6">
        <Button 
            type="submit" 
            className="w-full  hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Ajouter Manuel
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

                    {/* Workshops Table */}
                    <Table className="border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
    <TableHeader className="bg-gray-100">
        <TableRow className="hover:bg-gray-200 transition-colors">
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lien</TableHead>

            <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
 {paginatedManuel.map((manuel) => (
    <TableRow
        key={manuel.id}
        className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
    >
      <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={manuel.image} alt={manuel.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{manuel.title}</div>
                                           
                                        </div>
                                    </div>
                                </TableCell>
       
        <TableCell className="px-4 py-3">
            <div >
                <div className="flex items-center space-x-2 p-4">
 
                    <a href= {manuel.description}> <BookOpen className="w-8 h-8 text-gray-600" /></a>
                </div>
            </div>
        </TableCell >
        <TableCell className="item-right">
                                    <div className="flex space-x-2">
                                        <Button 
                                        variant="secondary" 
                                        className="hover:bg-blue-50"

                                        onClick={() => handleEditClick(manuel.id)}>
                                        <Edit2 className="w-4 h-4 text-blue-600" />

                                        </Button>
                                        <Button  variant="outline" 
                                            size="icon" 
                                            className="hover:bg-red-50"

                                            onClick={() => deleteManuel(manuel.id)}>
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
    
    <div className="flex items-center space-x-4">
        <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Précédent
        </button>
        <span className="text-sm text-gray-700">
            Page {currentPage} de {Math.ceil(filteredManuel.length / rowsPerPage)}
        </span>
        <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredManuel.length / rowsPerPage)}
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
