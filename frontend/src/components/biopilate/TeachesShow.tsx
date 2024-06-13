import api from "@/lib/api";
import { Teache } from "@/types/types";
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
import TeachesEditForm from "./TeachesEditForm ";





export default function TeachesShow() {
    const [teaches, setTeaches] = useState<Teache[] | null>();
    const [selectedTeache, setSelectedTeache] = useState<Teache | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
    const getTeaches = async () => {
        try {
            const res = await api.get("teaches/");
            setTeaches(res.data);
        } catch (error) {
            console.error("Error fetching Instructeur", error);
        }
    }
    useEffect(() => {
        getTeaches();
    }, [])
    const deleteTeaches = async (id: number) => {
        try {
            await api.delete(`teaches/${id}`)
            getTeaches()
        } catch (error) {
            console.log(error)
        }
    }
    const updateTeaches = async (data: any, id?: number) => {
        try {
            if (data instanceof FormData) {
                await api.put(`teaches/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await api.put(`teaches/${data.id}`, data);
            }
            getTeaches();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating Instructeur", error);
            alert(`Failed to update Instructeur: ${error.message}`);
        }
    };

    
    
    const handleEditClick = (teache: Teache) => {
        setSelectedTeache(teache);
        setIsModalOpen(true);
    };
 
    return (

        <Card>
            <CardHeader className="px-7">
                <CardTitle>Instructeur Liste </CardTitle>
                
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Prénom et Nom</TableHead>
                            <TableHead className="hidden sm:table-cell">numéro téléphone</TableHead>
                            <TableHead className="hidden sm:table-cell">spécialité</TableHead>
                            
                            <TableHead className="hidden md:table-cell">creé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teaches && teaches.map((teache: Teache) => (
                            <TableRow key={teache.id} className="bg-accent">
                                <TableCell>
                                 {/* Assuming you have a 'name' field */}
                                 <div className="flex items-center space-x-4"> {/* Using TailwindCSS for flexbox layout */}
                                        <div  className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={teache.image} alt={teache.fullname} className="object-cover w-full h-full" /> {/* Correctly displaying the image */}
                                        </div>
                                        <div>
                                            <div className="font-medium">{teache.fullname}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {teache.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{teache.nomber_phone}</TableCell>
                                <TableCell className="hidden sm:table-cell">{teache.specialite}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(teache.create_at).toLocaleDateString()}</TableCell>
                               
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                    <Button variant="secondary" onClick={() => handleEditClick(teache)}>
                                            <FaEdit />
                                        </Button>
                                    <Button variant="danger" onClick={() => deleteTeaches(teache.id)}>
                                            <FaTrash />
                                        </Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {selectedTeache && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TeachesEditForm teache={selectedTeache} onSave={updateTeaches} onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </Card>
    )
}

