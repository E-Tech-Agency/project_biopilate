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
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
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
        <Card className="w-full shadow-lg">
            <CardHeader className="border-b bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des planning
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos planning avec facilité
              </p>
                    </div>
                    
                    <Button 
                onClick={handleAddClick} 
                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
              >
                <PlusCircle className="w-4 h-4" />
                Ajouter un planning
              </Button>
                    
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="rowsPerPage">Afficher:</label>
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
                    </div>
                    <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un planning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
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
                    <TableHeader className="bg-gray-100">
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
                            <TableRow key={plan.id} >
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
                                    <div  className="flex justify-end space-x-2">
                                        <Button
                                          variant="outline" 
                                          size="icon" 
                                          className="hover:bg-blue-50"
                                        onClick={() => handleEditClick(plan.id)}>
                                                                   <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button 
                                        variant="outline" 
                                         className="hover:bg-red-50"
                                        onClick={() => deletePlanning(plan.id)}>
                                           <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {Math.ceil(filteredPlanning.length / rowsPerPage)}
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
                  (prev * rowsPerPage < filteredPlanning.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredPlanning.length}
              >
                Suivant
              </Button>
            </div>
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
