import api from "@/lib/api";
import { Tage } from "@/types/types";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { Modal } from "./Modal";
import TagesForm from "./TagesForm";





export default function TagesShow() {
    const [tages, setTages] = useState<Tage[] | null>(null);
    const [selectedTages, setSelectedTages] = useState<Tage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    
    
    
  const getTages = async () => {
    try {
      const res = await api.get("tages/");
      setTages(res.data);
    } catch (error) {
      console.error("Error fetching Tages", error);
    }
  };

  useEffect(() => {
    getTages();
  }, []);
  const deleteTages = async (id: number) => {
    try {
      await api.delete(`tages/${id}`);
      getTages();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTages = async (data: any, id?: number) => {
    try {
      if (id) {
        await api.put(`tages/${id}`, data);
      } else {
        await api.post("tages/", data);
      }
      getTages();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating Tages", error);
      alert(`Failed to update Tages: ${error.message}`);
    }
  };

  const handleEditClick = (tages: Tage) => {
    setSelectedTages(tages);
    setIsModalOpen(true);
  };

 
    return (

        <Card>
            <CardHeader className="px-7">
                <CardTitle>Tages Liste </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            
                            
                            <TableHead className="hidden md:table-cell">creé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tages && tages.map((tage: Tage) => (
                            <TableRow key={tage.id} className="bg-accent">
                                <TableCell>
                                 {/* Assuming you have a 'name' field */}
                                 <div className="flex items-center space-x-4"> {/* Using TailwindCSS for flexbox layout */}
                                        
                                        
                                            <div className="font-medium">{tage.title}</div>
                                            
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                <div className="flex space-x-2 ">
                                        {tage.status === "pending" &&
                                            <span className="text-danger">
                                                En attente
                                            </ span>
                                        }
                                        {tage.status === "approved" &&
                                        <span className="text-emerald-500">Publiée</span>
                                        }
                                        
                                    </div>
                                
                                
                                
                                </TableCell>
                               
                                <TableCell className="hidden md:table-cell">{new Date(tage.create_at).toLocaleDateString()}</TableCell>
                               
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                    <Button variant="secondary" onClick={() => handleEditClick(tage)}>
                                            <FaEdit />
                                        </Button>
                                    <Button variant="danger" onClick={() => deleteTages(tage.id)}>
                                            <FaTrash />
                                        </Button>

                                    </div>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TagesForm
            initialData={selectedTages || {}}
            onSave={(data) => updateTages(data, selectedTages?.id)}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>      )}

                    </TableBody>
                </Table>
            </CardContent>
           
           
        </Card>
    )
}

