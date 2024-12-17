import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Modal } from "./Modal";
import TeachesEditForm from "./TeachesEditForm ";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Teache, TeacherFormType, TeacherFormEditType } from "@/types/types";
import { Camera, Upload, User, Mail, Phone, Star, FileText, Search, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";

export default function TeachesShow() {
    const [teaches, setTeaches] = useState<Teache[]>([]);
    const [filteredTeaches, setFilteredTeaches] = useState<Teache[]>([]);
    const [selectedTeache, setSelectedTeache] = useState<Teache | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teache, setTeache] = useState<TeacherFormType>({
        fullname: "",
        email: "",
        nomber_phone: 0,
        specialite: "",
        image: null,
        description: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track whether modal is for editing or adding
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1);

    const getTeaches = async () => {
        try {
            const res = await api.get("teaches/");
            setTeaches(res.data);
            setFilteredTeaches(res.data);
           console.log(res.data);
           
            
        } catch (error) {
            console.error("Error fetching Instructeur", error);
        }
    };

    useEffect(() => {
        getTeaches();
    }, []);

    useEffect(() => {
        filterTeaches();
    }, [searchTerm, teaches]);

    const filterTeaches = () => {
        const filtered = teaches.filter((teache) => {
            const formattedDate = new Date(teache.create_at).toLocaleDateString(); // Adjust this according to your date format
            const fullText = `${teache.fullname} ${teache.email} ${teache.nomber_phone} ${teache.specialite} ${formattedDate}`.toLowerCase();
            return fullText.includes(searchTerm.toLowerCase());
        });
        setFilteredTeaches(filtered);
    };

    const deleteTeaches = async (id: number) => {
        try {
            await api.delete(`teaches/${id}/`);
            setTeaches((prevTeaches) => prevTeaches.filter((teache) => teache.id !== id));
            setFilteredTeaches((prevTeaches) => prevTeaches.filter((teache) => teache.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateTeaches = async (data: TeacherFormEditType, id: number) => {
        try {
            const endpoint = `teaches/${id}/`;
            const formData = new FormData();
            formData.append("fullname", data.fullname);
            formData.append("email", data.email);
            formData.append("nomber_phone", data.nomber_phone.toString());
            formData.append("specialite", data.specialite);
            formData.append("description", data.description);
            if (data.image instanceof File) {
                formData.append("image", data.image);
            }
    
            await api.put(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            getTeaches();
            setIsModalOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error updating Instructeur", error);
                alert(`Failed to update Instructeur: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullname", teache.fullname);
            formData.append("email", teache.email);
            formData.append("specialite", teache.specialite);
            formData.append("nomber_phone", teache.nomber_phone.toString());
            formData.append("description", teache.description);
            if (teache.image) {
                formData.append("image", teache.image);
            }

            await apiCreateTeache.post("teaches/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Instructeur created");
            setTeache({
                fullname: "",
                email: "",
                nomber_phone: 0,
                specialite: "",
                image: null,
                description: "",
            });
            setIsModalOpen(false);
            getTeaches();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                console.error(errorsFromDb || {});
            }
        }
    };

    const handleEditClick = (teache: Teache) => {
        setSelectedTeache(teache);
        setIsEditing(true); // Set editing mode to true
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedTeache(null);
        setIsEditing(false); // Set editing mode to false (add mode)
        setIsModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Handle the case where files might be null
        setTeache((prevTeache) => ({
            ...prevTeache,
            image: file,
        }));
    };

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing rows per page
    };

    const paginatedTeaches = filteredTeaches.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
       
      <Card className="w-full shadow-lg">
        <CardHeader className="border-b bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des Instructeurs
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos instructeurs avec facilité
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un instructeur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
              
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
              
              <Button 
                onClick={handleAddClick} 
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[250px]">Instructeur</TableHead>
                <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                <TableHead className="hidden lg:table-cell">Spécialité</TableHead>
                <TableHead className="hidden md:table-cell">Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTeaches.map((teache) => (
                <TableRow key={teache.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={teache.image} 
                          alt={teache.fullname} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{teache.fullname}</div>
                        <div className="text-sm text-muted-foreground">{teache.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{teache.nomber_phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{teache.specialite}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(teache.create_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEditClick(teache)}
                        className="hover:bg-blue-50"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => deleteTeaches(teache.id)}
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
          
          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {Math.ceil(filteredTeaches.length / rowsPerPage)}
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
                  (prev * rowsPerPage < filteredTeaches.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredTeaches.length}
              >
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
    
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {isEditing ? (
                        <TeachesEditForm teache={selectedTeache as Teache} onSave={updateTeaches} onClose={() => setIsModalOpen(false)} />
                    ) : (
                        <form onSubmit={handleSubmit} className=" inset-0 flex items-center justify-center ">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Inscription Instructeur</h2>
            <p className="text-gray-500 text-sm">Partagez vos informations professionnelles</p>
          </div>
        
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-200 overflow-hidden">
                
                  <Camera className="text-blue-400" size={64} />
            
              </div>
              <label htmlFor="image" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 cursor-pointer shadow-lg transition-transform transform hover:scale-110">
                <Upload size={24} />
                <input 
                  id="image" 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
          </div>
        
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullname" className="flex items-center text-gray-700 mb-2">
                  <User className="mr-2 text-blue-500" size={20} />
                  Prénom et Nom
                </label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Ex: Marie Dupont"
                  value={teache.fullname}
                  onChange={(e) => setTeache({ ...teache, fullname: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="flex items-center text-gray-700 mb-2">
                  <Mail className="mr-2 text-blue-500" size={20} />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="instructeur@example.com"
                  value={teache.email}
                  onChange={(e) => setTeache({ ...teache, email: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            </div>
        
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nomber_phone" className="flex items-center text-gray-700 mb-2">
                  <Phone className="mr-2 text-blue-500" size={20} />
                  Numéro de téléphone
                </label>
                <input
                  id="nomber_phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={teache.nomber_phone}
                  onChange={(e) => setTeache({ ...teache, nomber_phone: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="specialite" className="flex items-center text-gray-700 mb-2">
                  <Star className="mr-2 text-blue-500" size={20} />
                  Spécialité
                </label>
                <input
                  id="specialite"
                  type="text"
                  placeholder="Ex: Pilates"
                  value={teache.specialite}
                  onChange={(e) => setTeache({ ...teache, specialite: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            </div>
        
            <div>
              <label htmlFor="description" className="flex items-center text-gray-700 mb-2">
                <FileText className="mr-2 text-blue-500" size={20} />
                Biographie
              </label>
              <textarea
                id="description"
                placeholder="Parlez-nous de votre parcours et de votre expertise..."
                value={teache.description}
                onChange={(e) => setTeache({ ...teache, description: e.target.value })}
                className="w-full px-4 py-3 h-40 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
              />
            </div>
        
            <div className="text-center mt-8">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Ajouter Instructeur
              </button>
            </div>
          </div>
        </form>
                      
                    )}
                </Modal>
            )}
        </Card>
    );
}
