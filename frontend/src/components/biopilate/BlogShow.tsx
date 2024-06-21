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
            await api.delete(`blogs/${id}`);
            getBlogs();
        } catch (error) {
            console.log(error);
        }
    }

   
 
    const handleAddArticle = () => {
        navigate("/add-article-biopilates");
    };

    return (
        <Card className="w-full max-w-6xl mx-auto p-6 ">
            <CardHeader className="  justify-between  ">
             <div className="flex justify-between"><div className="justify-between"> <CardTitle>Liste Blog</CardTitle></div>
             <div className="flex justify-between"> <Button   variant="default" className=" btn btn-primary"  onClick={handleAddArticle}>Ajouter un Article</Button>
             </div>  </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titre</TableHead>
                            <TableHead className="hidden sm:table-cell">Nombre de réactions</TableHead>
                            <TableHead className="hidden sm:table-cell">Nombre de vues</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs && blogs.map((blog: Blog) => (
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
                                    <div className="flex space-x-2">
                                        {blog.status === "pending" && <h2 className="text-emerald-500">En attente</h2>}
                                        {blog.status === "validated" && <h2 className="text-emerald-500">Publiée</h2>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" onClick={() => handleEditClick(blog.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteBlog(blog.id)}>
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
