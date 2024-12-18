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
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
// Extend the Service type to include instructeurFullName
export type ServiceWithInstructor = Service & {
    instructeurFullName: string;
};

export default function ServiceShow() {
    const [services, setServices] = useState<ServiceWithInstructor[]>([]);
    const [filteredServices, setFilteredServices] = useState<ServiceWithInstructor[]>([]);
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
            const servicesData: Service[] = serviceRes.data;
            const teachesData: Teache[] = teachRes.data;
            const updatedServices: ServiceWithInstructor[] = servicesData.map((service: Service) => {
                const instructor = teachesData.find((inst: Teache) => inst.id === Number(service.instructeur)); // Ensure type match
                return {
                    ...service,
                    instructeurFullName: instructor ? instructor.fullname : "Unknown"
                };
            });
            setServices(updatedServices);
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
        <Card className="w-full shadow-lg">
              <CardHeader className="border-b bg-white">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Liste des Services
              </CardTitle>
              <p className="text-muted-foreground">
                Gérez vos services avec facilité
              </p>
            </div>
                  
                    <button 
                onClick={handleAddClick} 
                className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
              >
                <PlusCircle />
                Ajouter un Service
              </button>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <div className="flex items-center space-x-2">
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
                  placeholder="Rechercher un instructeur..."
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
                    <TableHeader  className="bg-gray-100">
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead className="hidden sm:table-cell">Instructeur</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">créé le</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedServices.map((service: ServiceWithInstructor) => (
                            <TableRow key={service.id} >
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
                                    <div className="flex justify-end space-x-2">
                                        <Button  variant="outline" 
                                         size="icon" 
                                           className="hover:bg-blue-50"
                                         onClick={() => handleEditClick(service.id)}>
                                             <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button  variant="outline" 
                                         size="icon" 
                                           className="hover:bg-red-50"
                                        onClick={() => deleteService(service.id)}>
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
