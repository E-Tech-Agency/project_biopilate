import api from "@/lib/api";
import { FAQ } from "@/types/types";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import EditFAQ from "./EditFAQ";
export default function FAQShow() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const getFaqs = async () => {
        try {
            const res = await api.get("faqs/");
            setFaqs(res.data);
        } catch (error) {
            console.error("Error fetching FAQs", error);
        }
    };

    useEffect(() => {
        getFaqs();
    }, []);

    const filterFaqs = () => {
        if (faqs) {
            const filtered = faqs.filter((faq) => {
                const formattedDate = new Date(faq.date).toLocaleDateString();
                const fullText = `${faq.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? faq.status === statusFilter : true;
                return matchesSearchTerm && matchesStatusFilter;
            });
            setFilteredFaqs(filtered);
        }
    };

    useEffect(() => {
        filterFaqs();
    }, [searchTerm, statusFilter, faqs]);

    const deleteFaq = async (id: number) => {
        try {
            await api.delete(`faqs/${id}/`);
            getFaqs();
        } catch (error) {
            console.error("Error deleting FAQ", error);
        }
    };

    const handleEditClick = (id: number) => {
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleEditClose = () => {
        setEditingId(null);
        setIsModalOpen(false);
        getFaqs();
    };
    const handleAddClick = () => {
        navigate("/add-FAQ-biopilates");
    };

    const paginatedFaqs = filteredFaqs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page whenever rows per page change
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between">
                    <CardTitle>Liste FAQ</CardTitle>
                    <div className="flex space-x-4">
                        <Input
                            type="text"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                       
                    </div>
                    <div className="flex items-center mt-4">
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
                    <Button variant="default" onClick={handleAddClick}>
                            Ajouter un FAQ
                        </Button>
                </div>
            </CardHeader>
            <CardContent>
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
                        {paginatedFaqs.map((faq: FAQ) => (
                            <TableRow key={faq.id} className="bg-accent">
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="font-medium">{faq.title}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex space-x-2">
                                        {faq.status === "pending" && <span className="text-danger">En attente</span>}
                                        {faq.status === "approved" && <span className="text-emerald-500">Publiée</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(faq.create_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(faq.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteFaq(faq.id)}>
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredFaqs.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredFaqs.length}
                    >
                        Next
                    </Button>
                </div>
                {editingId !== null && (
                    <EditFAQ
                        faqId={editingId}
                        isOpen={isModalOpen}
                        onClose={handleEditClose}
                        onSave={handleEditClose}
                    />
                )}
            </CardContent>
        </Card>
    );
}
