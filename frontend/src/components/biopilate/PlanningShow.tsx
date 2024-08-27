import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import PlanningEditModal from "./PlanningEditModal";
import api from "@/lib/api";
import { Planning } from "@/types/types";
import { useNavigate } from "react-router-dom";

export default function PlanningShow() {
    const [planning, setPlanning] = useState<Planning[]>([]);
    const [filteredPlanning, setFilteredPlanning] = useState<Planning[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const getPlannings = async () => {
        try {
            const res = await api.get("plannings/");
            setPlanning(res.data);
            setFilteredPlanning(res.data);
        } catch (error) {
            console.error("Error fetching planning", error);
        }
    };

    useEffect(() => {
        getPlannings();
    }, []);

    useEffect(() => {
        filterPlanning();
    }, [searchTerm, statusFilter, planning]);

    const filterPlanning = () => {
        const filtered = planning.filter((plan) => {
            const formattedDate = new Date(plan.create_at).toLocaleDateString();
            const fullText = `${plan.title} ${plan.duree} ${plan.category_name} ${formattedDate}`.toLowerCase();
            const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
            const matchesStatusFilter = statusFilter ? plan.status === statusFilter : true;
            return matchesSearchTerm && matchesStatusFilter;
        });
        setFilteredPlanning(filtered);
    };

    const deletePlanning = async (id: number) => {
        try {
            await api.delete(`plannings/${id}/`);
            getPlannings();
        } catch (error) {
            console.error("Error deleting planning", error);
        }
    };

    const handleEditClick = (id: number) => {
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleEditClose = () => {
        setEditingId(null);
        setIsModalOpen(false);
        getPlannings();
    };

    const handleAddClick = () => {
        navigate(`/ajouter-planning-biopilates`);
    };

    const paginatedPlanning = filteredPlanning.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between">
                    <CardTitle>Planning</CardTitle>
                    <Button variant="default" className="btn btn-primary" onClick={handleAddClick}>
                        Ajouter un planning
                    </Button>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
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
                        className="w-full border-gray-300 rounded-md"
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
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Niveau</TableHead>
                            <TableHead className="hidden sm:table-cell">Durée</TableHead>
                            <TableHead className="hidden md:table-cell">Déplacement</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Crée le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedPlanning.map((plan: Planning) => (
                            <TableRow key={plan.id} className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">{plan.title}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.category_name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.duree}</TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.range}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {plan.status === "pending" ? <h2>En attente</h2> : <h2 className="text-emerald-500">Publiée</h2>}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{new Date(plan.create_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(plan.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => deletePlanning(plan.id)}>
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredPlanning.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredPlanning.length}
                    >
                        Next
                    </Button>
                </div>
                {editingId !== null && (
                    <PlanningEditModal
                        planningId={editingId}
                        isOpen={isModalOpen}
                        onClose={handleEditClose}
                        onSave={handleEditClose}
                    />
                )}
            </CardContent>
        </Card>
    );
}
