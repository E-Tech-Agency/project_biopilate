import React, { useEffect, useState, Suspense } from "react";
import { Cours, CoursFormType, CreateCoursErrors } from "@/types/types";
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
import { FaTrash ,FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Modal } from "./Modal";
import DOMPurify from "dompurify"; // Import DOMPurify

const ReactQuill = React.lazy(() => import("react-quill"));

export default function CoursShow() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredCours, setFilteredCours] = useState<Cours[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [cours, setCours] = useState<Cours[] | null>([]);
    const [newCours, setNewCours] = useState<CoursFormType>({
        title: "",
        description: "",
        status: "",
        image: null,
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
        getCours();
    }, []);

    const filterCours = () => {
        if (cours) {
        const filtered = cours.filter((cour) => {
            const formattedDate = new Date(cour.created_at).toLocaleDateString();
            const fullText = `${cour.title} ${formattedDate}`.toLowerCase();
            const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
            const matchesStatusFilter = statusFilter ? cour.status === statusFilter : true;
            return matchesSearchTerm && matchesStatusFilter;
        });
        setFilteredCours(filtered);
    };
};

    useEffect(() => {
        filterCours();
    }, [searchTerm, statusFilter, cours]);

    const deleteCours = async (id: number) => {
        try {
            await api.delete(`cours/${id}/`);
            getCours();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitCours = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", newCours.title);
            formData.append("description", newCours.description);
            formData.append("status", newCours.status);
            if (newCours.image) {
                formData.append("image", newCours.image);
            }

            const response = await api.post("cours/", formData, {
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
        if (e.target.files && e.target.files.length > 0) {
            setNewCours((prevNewCours) => ({
                ...prevNewCours,
                image: e.target.files[0],
            }));
        }
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
        <Card className="w-full max-w-6xl mx-auto p-6">
            <CardHeader className="justify-between">
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Liste Cours</CardTitle>
                    </div>
                    <div>
                        <Button variant="default" className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                            Ajouter un Cours
                        </Button>
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
                                            className="w-full"
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
                                            className="w-full"
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
                                                className="w-full"
                                                theme="snow"
                                            />
                                        </Suspense>
                                    </div>
                                    <div className="grid gap-3 mt-5">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={newCours.status}
                                            onChange={(e) => setNewCours({ ...newCours, status: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        >
                                            <option value="pending">En attente de publication</option>
                                            <option value="approved">Publiée</option>
                                        </select>
                                        {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                                    </div>
                                    <Button type="submit" className="w-44" size={"lg"}>
                                        Ajouter
                                    </Button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="rowsPerPage">Afficher:</label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                            className="border-gray-300 rounded-md"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-gray-300 rounded-md"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="approved">Publiée</option>
                    </select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Description</TableHead>
                            <TableHead className="hidden md:table-cell">Crée le</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCours.map((cour) => (
                            <TableRow key={cour.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={cour.image} alt={cour.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{cour.title}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(cour.description),
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(cour.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex space-x-2">
                                        {cour.status === "pending" && <span>En attente</span>}
                                        {cour.status === "approved" && <span className="text-emerald-500">Publiée</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                    <Button variant="secondary" onClick={() => handleEditClick(cour.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteCours(cour.id)}>
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredCours.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredCours.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
