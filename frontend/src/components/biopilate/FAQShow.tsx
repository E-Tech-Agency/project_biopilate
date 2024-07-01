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
import { Button } from "../ui/button";

import EditServiceForm from "./EditServiceForm";
import { useNavigate } from "react-router-dom";
export default function FAQShow() {
    const [faq, setFaq] = useState<FAQ[]>([]);
 
    
    const navigate = useNavigate();

    const getFaq = async () => {
        try {
          const res = await api.get("faqs/");
          setFaq(res.data);
        } catch (error) {
          console.error("Error fetching FAQ", error);
        }
      };
    
      useEffect(() => {
        getFaq();
      }, []);

    const deleteFaq = async (id: number) => {
        try {
            await api.delete(`faqs/${id}`);
            getFaq();
        } catch (error) {
            console.error("Error deleting faqs", error);
        }
    };

    

    const handleEditClick = (id: number) => {
        navigate(`/edit-faqs/${id}`);
        
        
    };
    const handleAddClick = () => {
        navigate("/add-FAQ-biopilates");
    };

    return (
        <Card>
           
            <CardHeader className="px-7">
            <div className="flex justify-between">
            <CardTitle>Liste FAQ</CardTitle>
                    {/* <div>
                       
                        <div className=" justify-end mt-4">
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
                    </div> */}
                    
                    <div className="flex space-x-4">
                        {/* <Input
                            type="text"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        /> */}
                        <Button variant="default" className="btn btn-primary" onClick={handleAddClick}>
                            Ajouter un Instructeur
                        </Button>
                    </div>
                    
                </div>
                
            </CardHeader>
           
            <CardContent>
           
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>FAQ Liste</TableHead>
                            <TableHead className="hidden sm:table-cell">Titre</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faq.map((faq: FAQ) => (
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
            </CardContent>
            
        </Card>
    );
}
