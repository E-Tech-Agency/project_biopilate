import api from "@/lib/api";
import { Blog } from "@/types/types";
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
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
export default function BlogShow() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[] | null>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
   
    const getBlogs = async () => {
        try {
            const res = await api.get("blogs/");
            setBlogs(res.data);
        } catch (error) {
            console.error("Error fetching blogs", error);
        }
    }

    useEffect(() => {
        getBlogs();
    }, []);

    const deleteBlog = async (id: number) => {
        try {
            await api.delete(`blogs/${id}/`);
            getBlogs();
        } catch (error) {
            console.log(error);
        }
    }

    const filterBlogs = () => {
        if (blogs) {
            const filtered = blogs.filter((blog) => {
                const formattedDate = new Date(blog.date).toLocaleDateString();
                const fullText = `${blog.title} ${blog.author} ${formattedDate}`.toLowerCase();
                const matchesSearchTerm = fullText.includes(searchTerm.toLowerCase());
                const matchesStatusFilter = statusFilter ? blog.status === statusFilter : true;
                return matchesSearchTerm && matchesStatusFilter;
            });
            setFilteredBlogs(filtered);
        }
    };

    useEffect(() => {
        filterBlogs();
    }, [searchTerm, statusFilter, blogs]);

    const handleAddArticle = () => {
        navigate("/add-article-biopilates");
    };

    // const handleChangeRowsPerPage = (value: number) => {
    //     setRowsPerPage(value);
    //     setCurrentPage(1); // Reset to first page whenever rows per page change
    // };

    const handleEditClick = (id: number) => {
        navigate(`/edit-article-biopilates/${id}`);
    };
    

    const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <Card  className="w-full shadow-lg">
             <CardHeader className="border-b bg-white">
             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

             <div> <CardTitle>Liste des  Blog</CardTitle>
             <p className="text-muted-foreground">
                Gérez vos blog avec facilité
              </p>
             </div>
      
                 <button     className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
                  onClick={handleAddArticle}> <PlusCircle  />Ajouter un Article du blog</button>
        
              </div>
            </CardHeader>
            <CardContent className="p-0">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">

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
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher ..."
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
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Nombre de réactions</TableHead>
                            <TableHead className="hidden sm:table-cell">Nombre de vues</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBlogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img src={blog.image_1} alt={blog.title} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{blog.title}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {blog.author}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{blog.favorites} j'aime(s)</TableCell>
                                <TableCell className="hidden sm:table-cell">{blog.view} vue(s)</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(blog.date).toLocaleDateString()}</TableCell>
                                <TableCell className="hidden md:table-cell text-right">
                                    {blog.status === "pending" && <h2 >En attente</h2>}
                                    {blog.status === "approved" && <h2 className="text-emerald-500">Publiée</h2>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button 
                                       variant="outline" 
                                        size="icon"
                                         className="hover:bg-blue-50"
                                        onClick={() => handleEditClick(blog.id)}>
                                             <Edit2 className="w-4 h-4 text-blue-600" />
                                            
                                        </Button>
                                        <Button 
                                         variant="outline" 
                                         size="icon" 
                                         className="hover:bg-red-50"
                                          onClick={() => deleteBlog(blog.id)}>
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
              Page {currentPage} sur {Math.ceil(filteredBlogs.length / rowsPerPage)}
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
                  (prev * rowsPerPage < filteredBlogs.length ? prev + 1 : prev)
                )}
                disabled={currentPage * rowsPerPage >= filteredBlogs.length}
              >
                Suivant
              </Button>
            </div>
          </div>
            </CardContent>
        </Card>
    );
}
