import api from "@/lib/api";
import { Service, Teache } from "@/types/types";
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ServiceShow() {
    const [services, setServices] = useState<Service[]>([]);
    const [teaches, setTeaches] = useState<Teache[]>([]);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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
            setFilteredServices(updatedServices); // Initialize filtered services
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteService = async (id: number) => {
        try {
            await api.delete(`services/${id}/`);
            fetchData();
        } catch (error) {
            console.error("Error deleting service", error);
        }
    };

    const handleEditClick = (id: number) => {
        navigate(`/edit-service/${id}`);
    };

    const handleAddClick = () => {
        navigate(`/ajouter-service-biopilates`);
    };

    const filterServices = () => {
        const filtered = services.filter((service) => {
            const formattedDate = new Date(service.create_at).toLocaleDateString();
            const fullText = `${service.title} ${service.instructeurFullName} ${formattedDate}`.toLowerCase();
            const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
            const matchesStatusFilter = statusFilter ? service.status === statusFilter : true;
            return matchesSearchTerm && matchesStatusFilter;
        });
        setFilteredServices(filtered);
    };

    useEffect(() => {
        filterServices();
    }, [searchTerm, statusFilter, services]);

    const paginatedServices = filteredServices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex justify-between">
                    <CardTitle>Liste Service</CardTitle>
                    <Button variant="default" className="btn btn-primary" onClick={handleAddClick}>
                        Ajouter un Service
                    </Button>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="rowsPerPage">Afficher:</Label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                            className="border-gray-300 rounded-md"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <Input
                        type="text"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
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
                        {paginatedServices.map((service: Service) => (
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredServices.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredServices.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
