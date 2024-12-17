import api from "@/lib/api";
import { Tage } from "@/types/types";
import React, { useEffect, useImperativeHandle, forwardRef, useState } from "react";
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
import { Edit2, Search, Tag, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
const TagesShow = forwardRef((props, ref) => {

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
    useImperativeHandle(ref, () => ({
        getTages,
      }));

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
            if (error instanceof Error) {
            console.error("Error updating Tage", error);
            alert(`Failed to update Tage: ${error.message}`);
              }  }
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
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
            <CardHeader className="border-b bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Tag className="w-6 h-6 text-primary" />
                Liste des Tags
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos tags avec facilité
              </p>
            </div>
            </div>
                
            </CardHeader>
            <CardContent>
            <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un tag..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Lignes par page:</span>
                <Select 
                  value={rowsPerPage.toString()} 
                  onValueChange={(value) => setRowsPerPage(Number(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={rowsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
                </div>
                <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Statut:</span>                        <select
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
          </div>
               
                <Table>
                    <TableHeader  className="bg-gray-100">
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
                                             variant="outline" 
                                            onClick={() => handleEditClick(tage)}
                                         className="hover:bg-blue-50"
                                       >
                                          <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button
                                           variant="outline" 
                                            onClick={() => deleteTage(tage.id)}
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
});

export default TagesShow;