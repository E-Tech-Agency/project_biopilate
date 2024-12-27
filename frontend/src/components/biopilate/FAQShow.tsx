import api from "@/lib/api";
import { FAQ } from "@/types/types";
import { useEffect, useState } from "react";

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
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
export default function FAQShow() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
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
                const formattedDate = new Date(faq.create_at).toLocaleDateString();
                const fullText = `${faq.title} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                return matchesSearchTerm;
            });
            setFilteredFaqs(filtered);
        }
    };

    useEffect(() => {
        filterFaqs();
    }, [searchTerm, faqs]);

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
                Liste des FAQ
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos FAQ avec facilité
              </p>
            </div>
                   
            <div className="relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
                    <div className="flex items-center m-4">
                        <Label htmlFor="rowsPerPage">Afficher:</Label>
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
                    <button  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron   ease-in-out transform" onClick={handleAddClick}>
                    <PlusCircle />
                        Ajouter 
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedFaqs.map((faq: FAQ) => (
                            <TableRow key={faq.id} >
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
                                <div className="flex justify-end space-x-2">
                                        <Button variant="outline" 
                                          className="hover:bg-blue-50" onClick={() => handleEditClick(faq.id)}>
                                             <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button 
                                        variant="outline" 
                                        className="hover:bg-red-50"
                                        onClick={() => deleteFaq(faq.id)}>
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
              Page {currentPage} sur {Math.ceil(filteredFaqs.length / rowsPerPage)}
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
                  (prev * rowsPerPage < filteredFaqs.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredFaqs.length}
              >
                Suivant
              </Button>
            </div>
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
