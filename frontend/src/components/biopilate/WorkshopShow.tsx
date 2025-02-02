import React, { useEffect, useState, Suspense } from "react";
import { WorkShop, WorkShopFormType, CreateWorkShopErrors, CategoryWorkShop } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaFilePdf } from "react-icons/fa";
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
import CreateCategoryWorkShop from "../supplier/create-categoryworkshop";
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
const ReactQuill = React.lazy(() => import("react-quill"));

export default function WorkshopShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredWorkShop, setFilteredWorkShop] = useState<WorkShop[]>([]);
    const [categories, setCategories] = useState<CategoryWorkShop[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [workShops, setWorkShops] = useState<WorkShop[]>([]);
    const [newWorkShop, setNewWorkShop] = useState<WorkShopFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
        category: "",
        pdf_workshop: null,
    });
    const [errors, setErrors] = useState<CreateWorkShopErrors>({});

    // Fetch workshops
    const getWorkShop = async () => {
        try {
            const res = await api.get("workshops-biopilate/");
            setWorkShops(res.data);
            setFilteredWorkShop(res.data);
        } catch (error) {
            console.error("Error fetching workshops-biopilate", error);
            toast.error("Impossible de charger les WorkShops");
        }
    };

    // Fetch categories and workshops on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes] = await Promise.all([
                    api.get("category-workshops/"),
                    getWorkShop()
                ]);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error("Error fetching initial data", error);
                toast.error("Erreur de chargement des données");
            }
        };

        fetchInitialData();
    }, []);

    // Filter workshops based on search and filters
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

    // Apply filters when search or filter conditions change
    useEffect(() => {
        filterWorkShop();
    }, [searchTerm, statusFilter, categoryFilter, workShops]);

    // Delete a workshop
    const deleteWorkShop = async (id: number) => {
        try {
            await api.delete(`workshops-biopilate/${id}/`);
            toast.success("Atelier supprimé avec succès");
            getWorkShop();
        } catch (error) {
            console.error("Error deleting workshops-biopilate", error);
            toast.error("Impossible de supprimer l'atelier");
        }
    };

    // Submit new workshop
    const handleSubmitWorkShops = async (e: React.FormEvent<HTMLFormElement>) => {
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
            
            toast.success("Atelier créé avec succès");
            resetWorkshopForm();
            getWorkShop();
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
        setNewWorkShop({
            title: "",
            description: "",
            status: "",
            image: null,
            category: "",
            pdf_workshop: null,
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
        setNewWorkShop((prevNewWorkshop) => ({
          ...prevNewWorkshop,
          [type]: file,
        }));
      };

    // Handle rich text editor change
    const handleQuillChange = (value: string) => {
        setNewWorkShop((prevNewWorkshop) => ({
            ...prevNewWorkshop,
            description: value,
        }));
    };

    // Change rows per page
    // const handleChangeRowsPerPage = (value: number) => {
    //     setRowsPerPage(value);
    //     setCurrentPage(1);
    // };

    // Paginate workshops
    const paginatedWorkShop = filteredWorkShop.slice(
        (currentPage - 1) * rowsPerPage, 
        currentPage * rowsPerPage
    );

    // Navigate to edit page
    const handleEditClick = (id: number) => {
        navigate(`/edit-workShop-biopilates/${id}`);
    };

    // Calculate total pages
    // const getTotalPages = () => Math.ceil(filteredWorkShop.length / rowsPerPage);
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "image" | "pdf_workshop"
      ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setNewWorkShop((prevState) => ({
          ...prevState,
          [field]: file,
        }));
      };
      

    return (
        <div className='flex flex-col items-center m-6'>
            <Card className="w-full shadow-lg">
                <CardHeader className="border-b bg-white">
                     <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des WorkShops
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos WorkShops avec facilité
              </p>
            </div>
            <button  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform" onClick={() => setIsModalOpen(true)}>
            <PlusCircle  />    Ajouter un WorkShop
                        </button></div>
                    <div className="flex items-center space-x-4">
                    
                    <div className='flex space-x-4 items-center'>
                      
                        <CreateCategoryWorkShop />
                    </div></div>
               
                </CardHeader>

                {/* Modal for creating new workshop */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleSubmitWorkShops} className="space-y-4">
                        <div className="grid gap-4">
                            {/* Title Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Titre de l'WorkShop
                                    {errors.title && <span className="text-red-500 ml-2">{errors.title}</span>}
                                </Label>
                                <Input
                                    id="title"
                                    value={newWorkShop.title}
                                    onChange={(e) => setNewWorkShop({ ...newWorkShop, title: e.target.value })}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="grid gap-2">
                                <Label htmlFor="image">
                                    Image
                                    {errors.image && <span className="text-red-500 ml-2">{errors.image}</span>}
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image')}
                                />
                            </div>

                            {/* PDF Upload */}
                            <div className="grid gap-2">
                            <Label htmlFor="pdf_workshop">Upload PDF</Label>
                            <Input
                                id="pdf_workshop"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileChange(e, "pdf_workshop")}
                            />
                            {errors.pdf_workshop && (
                                <p className="text-red-600 text-sm">{errors.pdf_workshop}</p>
                            )}
                            </div>


                            {/* Description Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    Description
                                    {errors.description && <span className="text-red-500 ml-2">{errors.description}</span>}
                                </Label>
                                <Suspense fallback={<div>Chargement...</div>}>
                                    <ReactQuill
                                        value={newWorkShop.description}
                                        onChange={handleQuillChange}
                                        theme="snow"
                                    />
                                </Suspense>
                            </div>

                            {/* Category Dropdown */}
                            <div className="grid gap-2">
                                <Label htmlFor="category">
                                    Catégorie
                                    {errors.category && <span className="text-red-500 ml-2">{errors.category}</span>}
                                </Label>
                                <select
                                    id="category"
                                    value={newWorkShop.category}
                                    onChange={(e) => setNewWorkShop({ ...newWorkShop, category: e.target.value })}
                                    className="w-full p-2 border rounded-md"
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
                            <div className="grid gap-2">
                                <Label htmlFor="status">Statut</Label>
                                <select
                                    id="status"
                                    value={newWorkShop.status}
                                    onChange={(e) => setNewWorkShop({ ...newWorkShop, status: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Sélectionner un Statut</option>
                                    <option value="pending">En attente de publication</option>
                                    <option value="approved">Publiée</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button type="submit"                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
                            >
                                Ajouter l'WorkShop
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Filtering and Search Section */}
                <CardContent className="grid gap-4">
                    <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher ..."
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
                    <Table>
                        <TableHeader className="bg-gray-100">
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
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
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
                                    <TableCell>{workshop.category_workshop}</TableCell>
                                    <TableCell>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(workshop.description),
                                            }}
                                            className="line-clamp-2"
                                        />
                                    </TableCell>
                                    <TableCell className="space-x-4">
                                        <Button onClick={() => handleEditClick(workshop.id)}
                                         variant="outline" 
                                         size="icon" 
                                        
                                         className="hover:bg-blue-50">
                                                                   <Edit2 className="w-4 h-4 text-blue-600" />

                                        </Button>
                                        <Button onClick={() => deleteWorkShop(workshop.id)}
                                         variant="outline" 
                                         size="icon" 
                                         className="hover:bg-red-50"

                                         >
                                                                    <Trash2 className="w-4 h-4 text-red-600" />

                                        </Button>
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
                        <div className="flex items-center space-x-2">
                            <button
                                className="p-2 border border-gray-300 rounded-md"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                               Précédent
                            </button>
                            <span>
                                Page {currentPage} de {Math.ceil(filteredWorkShop.length / rowsPerPage)}
                            </span>
                            <button
                                className="p-2 border border-gray-300 rounded-md"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredWorkShop.length / rowsPerPage)}
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