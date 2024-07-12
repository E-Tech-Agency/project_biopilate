import api from "@/lib/api";
import { Tage } from "@/types/types";
import { useEffect, useState } from "react";
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
import { Modal } from "./Modal";
import TagesForm from "./TagesForm";
import { Label } from "@/components/ui/label";

export default function TagesShow() {
    const [tages, setTages] = useState<Tage[]>([]);
    const [filteredTages, setFilteredTages] = useState<Tage[]>([]);
    const [selectedTage, setSelectedTage] = useState<Tage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    useEffect(() => {
        getTages();
    }, []);

    const getTages = async () => {
        try {
            const res = await api.get("tages/");
            setTages(res.data);
            setFilteredTages(res.data);
        } catch (error) {
            console.error("Error fetching Tages", error);
        }
    };

    const deleteTage = async (id: number) => {
        try {
            await api.delete(`tages/${id}/`);
            getTages();
        } catch (error) {
            console.error("Error deleting Tage", error);
        }
    };

    const updateTage = async (data: any, id?: number) => {
        try {
            if (id) {
                await api.put(`tages/${id}/`, data);
            } else {
                await api.post("tages/", data);
            }
            getTages();
            setIsModalOpen(false);
            setSelectedTage(null);
        } catch (error) {
            console.error("Error updating Tage", error);
            alert(`Failed to update Tage: ${error.message}`);
        }
    };

    const handleEditClick = (tage: Tage) => {
        setSelectedTage(tage);
        setIsModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterTages(e.target.value, selectedStatus);
    };

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (status: string) => {
        setSelectedStatus(status);
        filterTages(searchTerm, status);
    };

    const filterTages = (term: string, status: string) => {
        let filtered = tages || [];

        if (term.trim()) {
            const formattedTerm = term.toLowerCase().trim();
            filtered = filtered.filter((tage) => {
                const formattedDate = new Date(tage.create_at).toLocaleDateString();
                const fullText = `${tage.title.toLowerCase()} ${tage.status.toLowerCase()} ${formattedDate}`.toLowerCase();
                return fullText.includes(formattedTerm);
            });
        }

        if (status) {
            filtered = filtered.filter((tage) => tage.status === status);
        }

        setFilteredTages(filtered);
    };

    const paginatedTages = filteredTages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Liste des Tages</CardTitle>
                <div className="flex justify-between">
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
                    <div className="mt-4">
                        <Label htmlFor="statusFilter">Filtrer par statut:</Label>
                        <select
                            id="statusFilter"
                            value={selectedStatus}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="ml-2 border-gray-300 rounded-md"
                        >
                            <option value="">Tous</option>
                            <option value="pending">En attente</option>
                            <option value="approved">Publiée</option>
                        </select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedTages.map((tage: Tage) => (
                            <TableRow key={tage.id}>
                                <TableCell>
                                    <div className="font-medium">{tage.title}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex space-x-2">
                                        {tage.status === "pending" && (
                                            <span className="text-danger">En attente</span>
                                        )}
                                        {tage.status === "approved" && (
                                            <span className="text-emerald-500">Publiée</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(tage.create_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleEditClick(tage)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteTage(tage.id)}
                                        >
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredTages.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredTages.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
            {isModalOpen && selectedTage && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TagesForm
                        key={selectedTage.id}
                        initialData={selectedTage}
                        onSave={(data) => updateTage(data, selectedTage.id)}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </Card>
    );
}
