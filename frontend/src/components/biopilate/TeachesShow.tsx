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
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Teache, TeacherFormType, CreateTeacherErrors } from "@/types/types";

export default function TeachesShow() {
    const [teaches, setTeaches] = useState<Teache[] | null>([]);
    const [filteredTeaches, setFilteredTeaches] = useState<Teache[]>([]);
    const [selectedTeache, setSelectedTeache] = useState<Teache | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teache, setTeache] = useState<TeacherFormType>({
        fullname: "",
        email: "",
        nomber_phone: 0,
        specialite: "",
        image: null,
    });
    const [errors, setErrors] = useState<CreateTeacherErrors>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track whether modal is for editing or adding

    const getTeaches = async () => {
        try {
            const res = await api.get("teaches/");
            setTeaches(res.data);
            setFilteredTeaches(res.data);
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
            await api.delete(`teaches/${id}`);
            getTeaches();
        } catch (error) {
            console.log(error);
        }
    };

    const updateTeaches = async (data: TeacherFormType, id: number) => {
        try {
            const endpoint = `teaches/${id}/`;
            if (data.image) {
                const formData = new FormData();
                formData.append("fullname", data.fullname);
                formData.append("email", data.email);
                formData.append("nomber_phone", data.nomber_phone.toString());
                formData.append("specialite", data.specialite);
                formData.append("image", data.image);

                await api.put(endpoint, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await api.put(endpoint, data);
            }
            getTeaches();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating Instructeur", error);
            alert(`Failed to update Instructeur: ${error.message}`);
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

            if (teache.image) {
                formData.append("image", teache.image);
            }

            const response = await apiCreateTeache.post("teaches/", formData, {
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
            });
            setErrors({});
            setIsModalOpen(false);
            getTeaches();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorsFromDb = (error as AxiosError)?.response?.data;
                setErrors(errorsFromDb || {});
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
        if (e.target.files && e.target.files.length > 0) {
            setTeache((prevInstructeur) => ({
                ...prevInstructeur,
                image: e.target.files[0],
            }));
        }
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Liste Instructeur</CardTitle>
                    </div>
                    <div className="flex space-x-4">
                        <Input
                            type="text"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                        <Button variant="default" className="btn btn-primary" onClick={handleAddClick}>
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
                            <TableHead className="hidden sm:table-cell">numéro téléphone</TableHead>
                            <TableHead className="hidden sm:table-cell">spécialité</TableHead>
                            <TableHead className="hidden md:table-cell">créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTeaches.map((teache: Teache) => (
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
                                        <Button variant="danger" onClick={() => deleteTeaches(teache.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {isEditing ? (
                        <TeachesEditForm teache={selectedTeache as Teache} onSave={updateTeaches} onClose={() => setIsModalOpen(false)} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fullname">Prénom et Nom</Label>
                                    <Input
                                        id="fullname"
                                        type="text"
                                        className="w-full"
                                        placeholder="Prénom et Nom"
                                        onChange={(e) => setTeache({ ...teache, fullname: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Intructeur Email"
                                        className="w-full"
                                        onChange={(e) => setTeache({ ...teache, email: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-6 items-center">
                                    <div className="flex flex-row justify-center gap- items-center">
                                        <Label htmlFor="nomber_phone">Numéro téléphone</Label>
                                        <Input
                                            id="nomber_phone"
                                            type="number"
                                            className="w-25"
                                            placeholder="Numéro téléphone"
                                            onChange={(e) => setTeache({ ...teache, nomber_phone: Number(e.target.value) })}
                                            value={teache.nomber_phone}
                                        />
                                        <Label htmlFor="specialite">Spécialité</Label>
                                        <Input
                                            id="specialite"
                                            type="text"
                                            className="w-25"
                                            placeholder="Spécialité"
                                            onChange={(e) => setTeache({ ...teache, specialite: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="photo">Ajouter une image</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            className="w-full"
                                            onChange={(e) => handleImageChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <Button type="submit" className="w-44" size={"lg"}>Ajouter</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Modal>
            )}
        </Card>
    );
}
