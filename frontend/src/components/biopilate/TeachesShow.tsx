import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
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
import { Camera, Upload } from 'lucide-react';
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
        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Liste Instructeur</CardTitle>
                        <div className="mt-4">
                            <Label htmlFor="rowsPerPage">Afficher:</Label>
                            <select
                                id="rowsPerPage"
                                value={rowsPerPage}
                                onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                                className="ml-2 border-gray-300 rounded-md"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Input
                            type="text"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                        <Button variant="default" onClick={handleAddClick}>
                            Ajouter un Instructeur
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Prénom et Nom</TableHead>
                            <TableHead className="hidden sm:table-cell">Numéro téléphone</TableHead>
                            <TableHead className="hidden sm:table-cell">Spécialité</TableHead>
                            <TableHead className="hidden md:table-cell">Créé le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedTeaches.map((teache: Teache) => (
                            <TableRow key={teache.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={teache.image} alt={teache.fullname} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{teache.fullname}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {teache.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{teache.nomber_phone}</TableCell>
                                <TableCell className="hidden sm:table-cell">{teache.specialite}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(teache.create_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(teache)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteTeaches(teache.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredTeaches.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredTeaches.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {isEditing ? (
                        <TeachesEditForm teache={selectedTeache as Teache} onSave={updateTeaches} onClose={() => setIsModalOpen(false)} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-800">Inscription Instructeur</h2>
                          <p className="text-gray-500">Remplissez les détails de l'instructeur</p>
                        </div>
                      
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                              <Camera className="text-gray-500" size={48} />
                            </div>
                            <label htmlFor="image" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                              <Upload size={20} />
                              <input 
                                id="image" 
                                type="file" 
                                className="hidden" 
                                onChange={handleImageChange} 
                              />
                            </label>
                          </div>
                        </div>
                      
                        <div className="grid gap-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="fullname" className="block mb-2 text-gray-700">Prénom et Nom</Label>
                              <Input
                                id="fullname"
                                type="text"
                                placeholder="Ex: Marie Dupont"
                                value={teache.fullname}
                                onChange={(e) => setTeache({ ...teache, fullname: e.target.value })}
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="block mb-2 text-gray-700">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="instructeur@example.com"
                                value={teache.email}
                                onChange={(e) => setTeache({ ...teache, email: e.target.value })}
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              />
                            </div>
                          </div>
                      
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nomber_phone" className="block mb-2 text-gray-700">Numéro de téléphone</Label>
                              <Input
                                id="nomber_phone"
                                type="tel"
                                placeholder="+33 6 12 34 56 78"
                                value={teache.nomber_phone}
                                onChange={(e) => setTeache({ ...teache, nomber_phone: Number(e.target.value) })}
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              />
                            </div>
                            <div>
                              <Label htmlFor="specialite" className="block mb-2 text-gray-700">Spécialité</Label>
                              <Input
                                id="specialite"
                                type="text"
                                placeholder="Ex: Pilates"
                                value={teache.specialite}
                                onChange={(e) => setTeache({ ...teache, specialite: e.target.value })}
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              />
                            </div>
                          </div>
                      
                          <div>
                            <Label htmlFor="description" className="block mb-2 text-gray-700">Biographie</Label>
                            <textarea
                              id="description"
                              placeholder="Parlez-nous de votre parcours et de votre expertise..."
                              value={teache.description}
                              onChange={(e) => setTeache({ ...teache, description: e.target.value })}
                              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                          </div>
                      
                          <div className="text-center">
                            <Button 
                              type="submit" 
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                            >
                              Ajouter Instructeur
                            </Button>
                          </div>
                        </div>
                      </form>
                      
                    )}
                </Modal>
            )}
        </Card>
    );
}
