import React, {Suspense } from "react";
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
import { BlogFormType, CreateBlogErrors ,Tage} from "@/types/types";
const ReactQuill = React.lazy(() => import("react-quill"));

type BlogFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: CreateBlogErrors;
    blog: BlogFormType;
    setBlog: React.Dispatch<React.SetStateAction<BlogFormType>>;
    tages:Tage;
};

const BlogForm: React.FC<BlogFormProps> = ({ handleSubmit, errors, blog, setBlog ,tages}) => {
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
          ...prevBlog,
          [name]: value,
        }));
      };
      

  
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
                <CardTitle className="text-center text-2xl font-bold">Ajouter un Article blog</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Titre</Label>
                            {errors.title && <span className="text-red-500">{errors.title}</span>}
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
                            <Label htmlFor="author">Nom de l’écrivain</Label>
                            {errors.author && <span className="text-red-500">{errors.author}</span>}
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
                            <Label htmlFor="date">Date de création</Label>
                            {errors.date && <span className="text-red-500">{errors.date}</span>}
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={typeof blog.date === 'string' ? blog.date : formatDateToYYYYMMDD(blog.date)}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="tages">tages {errors.tages && <li className="text-red-500 mt-1">{errors.tages}</li>}</Label>
                            <select
                                id="tages"
                                name="tages"
                                value={blog.tages}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Sélectionner un tages</option>
                                {tages.map((tage) => (
                                    <option key={tage.id} value={tage.id}>
                                        {tage.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="grid gap-3">
                                <Label htmlFor="image_1">Image de couverture</Label>
                                {errors.image_1 && <span className="text-red-500">{errors.image_1}</span>}
                                <Input
                                    id="image_1"
                                    name="image_1"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="image_2">Image du blog</Label>
                                {errors.image_2 && <span className="text-red-500">{errors.image_2}</span>}
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
                            <Label htmlFor="description">Description de couverture</Label>
                            {errors.description && <span className="text-red-500">{errors.description}</span>}
                            <textarea
                                id="description"
                                name="description"
                                value={blog.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="range">Déplacement</Label>
                            {errors.range && <span className="text-red-500">{errors.range}</span>}
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
                            <Label htmlFor="status">Status</Label>
                            {errors.status && <span className="text-red-500">{errors.status}</span>}
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
                            <Label htmlFor="full_text">Description</Label>
                            {errors.full_text && <span className="text-red-500">{errors.full_text}</span>}
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
                        <div className="hidden">
                            <input
                                id="favorites"
                                name="favorites"
                                type="hidden"
                                onChange={(e) => setBlog({ ...blog, favorites: parseInt(e.target.value) })}
                            />
                        </div>
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
