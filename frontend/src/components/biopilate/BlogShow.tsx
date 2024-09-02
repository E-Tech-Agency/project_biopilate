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
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

    const handleChangeRowsPerPage = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page whenever rows per page change
    };

    const handleEditClick = (id: number) => {
        navigate(`/edit-article-biopilates/${id}`);
    };
    

    const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <Card className="w-full max-w-6xl mx-auto p-6">
            <CardHeader className=" justify-between">
            <div className="flex justify-between"><div className="justify-between"> <CardTitle>Liste Blog</CardTitle></div>
            <div className="flex justify-between"> <Button   variant="default" className=" btn btn-primary"  onClick={handleAddArticle}>Ajouter un Article</Button>
             </div> 
              </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="rowsPerPage">Afficher:</label>
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
                    <input
                        type="text"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-gray-300 rounded-md"
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
                <Table>
                    <TableHeader>
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
                            <TableRow key={blog.id} className="bg-accent">
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
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(blog.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteBlog(blog.id)}>
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
                        onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < filteredBlogs.length ? prev + 1 : prev))}
                        disabled={currentPage * rowsPerPage >= filteredBlogs.length}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
