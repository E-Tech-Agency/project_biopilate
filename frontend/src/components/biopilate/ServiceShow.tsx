import api from "@/lib/api";
import { Service, Teache } from "@/types/types";
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
export default function ServiceShow() {
    const [services, setServices] = useState<Service[]>([]);
    const [teaches, setTeaches] = useState<Teache[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [serviceRes, teachRes] = await Promise.all([
                api.get("services/"),
                api.get("teaches/")
            ]);
            const servicesData = serviceRes.data;
            const teachesData = teachRes.data;
            const updatedServices = servicesData.map((service: Service) => {
                const instructor = teachesData.find(inst => inst.id === service.instructeur);
                return {
                    ...service,
                    instructeurFullName: instructor ? instructor.fullname : "Unknown"
                };
            });
            setServices(updatedServices);
            setTeaches(teachesData);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteService = async (id: number) => {
        try {
            await api.delete(`services/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting service", error);
        }
    };

    

    const handleEditClick = (id: number) => {
        navigate(`/edit-service/${id}`);
        
        
    };

    return (
        <Card>
           
            <CardHeader className="px-7">
                 <CardTitle></CardTitle>
                
            </CardHeader>
           
            <CardContent>
            <button>Ajouter </button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead className="hidden sm:table-cell">Instructeur</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service: Service) => (
                            <TableRow key={service.id} className="bg-accent">
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{service.title}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {service.description}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{service.instructeurFullName}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex space-x-2">
                                        {service.status === "pending" && <span className="text-danger">En attente</span>}
                                        {service.status === "approved" && <span className="text-emerald-500">Publiée</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(service.create_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                    <Button variant="secondary" onClick={() => handleEditClick(service.id)}>
    <FaEdit />
</Button>

                                        <Button variant="danger" onClick={() => deleteService(service.id)}>
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
