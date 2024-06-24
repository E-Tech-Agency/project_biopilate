import React, { Suspense } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { BlogFormType, CreateBlogErrors } from "@/types/types";

type BlogFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: CreateBlogErrors;
    blog: BlogFormType;
    setBlog: React.Dispatch<React.SetStateAction<BlogFormType>>;
};

const BlogForm: React.FC<BlogFormProps> = ({ handleSubmit, errors, blog, setBlog }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }));
    };

    const ReactQuill = React.lazy(() => import("react-quill"));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setBlog((prevBlog) => ({
                ...prevBlog,
                [name]: files[0],
            }));
        }
    };

    const handleQuillChange = (value: string) => {
        setBlog((prevBlog) => ({
            ...prevBlog,
            full_text: value,
        }));
    };
    const formatDateToYYYYMMDD = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Card className="w-full max-w-2xl mx-auto p-6 my-8">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">Ajouter un Planning</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="title">
                                Titre
                                {errors.title && <span className="text-red-500 mt-2">{errors.title}</span>}
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={blog.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="author">
                                Nom de l’écrivain
                                {errors.author && <span className="text-red-500 mt-2">{errors.author}</span>}
                            </Label>
                            <Input
                                id="author"
                                name="author"
                                type="text"
                                value={blog.author}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date">
                                Date de création
                                {errors.date && <span className="text-red-500 mt-2">{errors.date}</span>}
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={typeof blog.date === 'string' ? blog.date : formatDateToYYYYMMDD(blog.date)}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="grid gap-3">
                                <Label htmlFor="image_1">
                                    Image de couverture
                                    {errors.image_1 && <span className="text-red-500 mt-2">{errors.image_1}</span>}
                                </Label>
                                <Input
                                    id="image_1"
                                    name="image_1"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="image_2">
                                    Image du blog
                                    {errors.image_2 && <span className="text-red-500 mt-2">{errors.image_2}</span>}
                                </Label>
                                <Input
                                    id="image_2"
                                    name="image_2"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">
                                Description de couverture
                                {errors.description && <span className="text-red-500 mt-2">{errors.description}</span>}
                            </Label>
                            <textarea
                               
                                id="description"
                                value={blog.description}
                                onChange={handleInputChange}
                                name="description"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="range">
                                Déplacement
                                {errors.range && <span className="text-red-500 mt-2">{errors.range}</span>}
                            </Label>
                            <Input
                                id="range"
                                name="range"
                                type="number"
                                value={blog.range}
                                onChange={(e) => setBlog({ ...blog, range: parseInt(e.target.value) })}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">
                                Status
                                {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={blog.status}
                                onChange={(e) => setBlog({ ...blog, status: e.target.value })}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="full_text">
                                Description
                                {errors.full_text && <span className="text-red-500 mt-2">{errors.full_text}</span>}
                            </Label>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ReactQuill
                                    id="full_text"
                                    value={blog.full_text}
                                    onChange={handleQuillChange}
                                    className="w-full"
                                    theme="snow"
                                />
                            </Suspense>
                        </div>
                        <input
                             id="favorites"
                             name="favorites"
                             type="hidden" 
                             
                             onChange={(e) => setBlog({ ...blog, favorites: parseInt(e.target.value) })}
                             className="display-none" />

                        <div className="flex justify-end mt-6">
                            <Button type="submit" className="w-44" size="lg">Ajouter</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default BlogForm;
