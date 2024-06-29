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
import { Button } from "../ui/button";
import PlanningEditModal from "./PlanningEditModal";
import api from "@/lib/api";
import { Planning } from "@/types/types";
import { useNavigate } from "react-router-dom";

export default function PlanningShow() {
    const [planning, setPlanning] = useState<Planning[] | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const getPlannings = async () => {
        try {
            const res = await api.get("plannings/");
            setPlanning(res.data);
        } catch (error) {
            console.error("Error fetching planning", error);
        }
    };

    useEffect(() => {
        getPlannings();
    }, []);

    const deletePlanning = async (id: number) => {
        try {
            await api.delete(`plannings/${id}`);
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
    return (
        <Card>
            <CardHeader className="px-7">
            <div className="flex justify-between">
                    <CardTitle>Planning</CardTitle>
                    <Button variant="default" className="btn btn-primary" onClick={handleAddClick}>
                        Ajouter un planning
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Niveau</TableHead>
                            <TableHead className="hidden sm:table-cell">Durée</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Déplacement</TableHead>
                            <TableHead className="hidden md:table-cell">Crée le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {planning && planning.map((plan: Planning) => (
                            <TableRow key={plan.id} className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">{plan.title}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.category?.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.duree}</TableCell>
                                <TableCell className="hidden sm:table-cell">{plan.range}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        {plan.status === "pending" && <h2 className="text-emerald-500">En attente</h2>}
                                        {plan.status === "approved" && <h2 className="text-emerald-500">Publiée</h2>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{new Date(plan.create_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(plan.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => deletePlanning(plan.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
