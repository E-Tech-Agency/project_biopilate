import api from "@/lib/api";
import { Tage } from "@/types/types";
import { useEffect, useState, useRef } from "react";
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
import { Modal } from "./Modal";
import TagesForm from "./TagesForm";
import { Label } from "@/components/ui/label";

export default function TagesShow() {
    const [tages, setTages] = useState<Tage[] | null>(null);
    const [filteredTages, setFilteredTages] = useState<Tage[]>([]);
    const [selectedTages, setSelectedTages] = useState<Tage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [selectedStatus, setSelectedStatus] = useState<string>(""); // State for status filter

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

    const deleteTages = async (id: number) => {
        try {
            await api.delete(`tages/${id}/`);
            getTages();
        } catch (error) {
            console.error("Error deleting Tages", error);
        }
    };

    const updateTages = async (data: any, id?: number) => {
        try {
            if (id) {
                await api.put(`tages/${id}/`, data);
            } else {
                await api.post("tages/", data);
            }
            getTages();
            setIsModalOpen(false);
            setSelectedTages(null); // Reset selected Tages after update
        } catch (error) {
            console.error("Error updating Tages", error);
            alert(`Failed to update Tages: ${error.message}`);
        }
    };

    const handleEditClick = (tage: Tage) => {
        setSelectedTages(tage);
        setIsModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterTages(e.target.value, selectedStatus);
    };

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset current page to 1 when rows per page changes
    };

    const handleStatusFilterChange = (status: string) => {
        setSelectedStatus(status);
        filterTages(searchTerm, status);
    };

    const filterTages = (term: string, status: string) => {
        let filtered = tages || [];

        // Filter by search term
        if (term.trim()) {
            const formattedTerm = term.toLowerCase().trim();
            filtered = filtered.filter((tage) => {
                const formattedDate = new Date(tage.create_at).toLocaleDateString(); // Adjust according to your date format
                const fullText = `${tage.title.toLowerCase()} ${tage.status.toLowerCase()} ${formattedDate}`.toLowerCase();
                return fullText.includes(formattedTerm);
            });
        }

        // Filter by status
        if (status) {
            filtered = filtered.filter((tage) => tage.status === status);
        }

        setFilteredTages(filtered);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Liste des Tages</CardTitle>
                <div className="flex justify-between">
                    <div className=" mt-4">
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
                    placeholder="Rechercher...."
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
                        {filteredTages &&
                            filteredTages.map((tage: Tage) => (
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
                                                onClick={() => deleteTages(tage.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
            {isModalOpen && selectedTages && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TagesForm
                        key={selectedTages.id} // Ensure component remounts when selectedTages changes
                        initialData={selectedTages}
                        onSave={(data) => updateTages(data, selectedTages.id)}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </Card>
    );
}
