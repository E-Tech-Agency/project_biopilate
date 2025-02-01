import api from "@/lib/api";
import { FormationFormState } from "@/types/formation";

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
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
export default function FormationShow() {
    const [formations, setFormations] = useState<FormationFormState[]>([]);
    const [filteredFormations, setFilteredFormations] = useState<FormationFormState[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const getFormations = async () => {
        try {
            const res = await api.get("formation-bio-plates/");
            setFormations(res.data);
        } catch (error) {
            console.error("Error fetching formations", error);
        }
    };

    useEffect(() => {
        getFormations();
    }, []);

    const filterFormations = () => {
        if (formations) {
            const filtered = formations.filter((formation) => {
                const formattedDate = new Date(formation.created_at).toLocaleDateString();
                const fullText = `${formation.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? formation.status === statusFilter : true;
                return matchesSearchTerm && matchesStatusFilter;
            });
            setFilteredFormations(filtered);
        }
    };

    useEffect(() => {
        filterFormations();
    }, [searchTerm, statusFilter, formations]);

    const deleteFormation = async (id: number) => {
        try {
            await api.delete(`formation-bio-plates/${id}/`);
            getFormations();
        } catch (error) {
            console.error("Error deleting formation", error);
        }
    };

    const handleEditClick = (id: number) => {
        navigate(`/edit-formation/${id}`);
    };

    const handleAddClick = () => {
        navigate("/add-Formation-biopilates");
    };

    const paginatedFormations = filteredFormations.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // const handleChangeRowsPerPage = (value: number) => {
    //     setRowsPerPage(value);
    //     setCurrentPage(1); // Reset to first page whenever rows per page change
    // };

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="border-b bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des Formations
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos formations avec facilité
              </p>
            </div>
           
                    
                    <button  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform" onClick={handleAddClick}>
                    <PlusCircle />Ajouter une formation
                    </button>
                </div>
            </CardHeader>
            <CardContent >
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-grow">
                <Search className="absolute left-1 top-1/3 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
            
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
              <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border-gray-300 rounded-md ml-2 "
                        >
                            <option value="">Tous les statuts</option>
                            <option value="pending">En attente</option>
                            <option value="published">Publiée</option>
                        </select>
                        </div>
                   
           
                <Table className="mt-1">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">formulaire</TableHead>
                            <TableHead>fomation pfd</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedFormations.map((formation: FormationFormState) => (
                            <TableRow key={formation.id} >
                                <TableCell>
                                <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={formation.image} alt={formation.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{formation.title}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {formation.description}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <a href={formation.formation_line} target="_blank" rel="noopener noreferrer">
                                        Voir le formulaire
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={formation.pdf_document} target="_blank" rel="noopener noreferrer">
                                        Voir le PFD
                                    </a>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex space-x-2">
                                        {formation.status === "pending" && <span className="text-danger">En attente</span>}
                                        {formation.status === "published" && <span className="text-emerald-500">Publiée</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(formation.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(formation.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteFormation(formation.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {Math.ceil(filteredFormations.length / rowsPerPage)}
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
                  (prev * rowsPerPage < filteredFormations.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredFormations.length}
              >
                Suivant
              </Button>
            </div>
          </div>
            </CardContent>
        </Card>
    );
}
