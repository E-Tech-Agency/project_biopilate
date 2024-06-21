import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";

import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import React from "react";
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



    return (
        <Card className="w-full max-w-2xl mx-auto p-6 my-8">
            <CardHeader>
                <CardTitle>Ajouter un Planning</CardTitle>
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
                                type="text"
                                value={blog.title}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="author">
                                Titre
                                {errors.author && <span className="text-red-500 mt-2">{errors.author}</span>}
                            </Label>
                            <Input
                                id="author"
                                type="text"
                                value={blog.author}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="duree">
                                Durée
                                {errors.duree && <span className="text-red-500 mt-2">{errors.duree}</span>}
                            </Label>
                            <Input
                                id="duree"
                                value={planning.duree}
                                onChange={(e) => setPlanning({ ...planning, duree: e.target.value })}
                                placeholder="Durée du planning"
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="category">
                                    Niveau
                                    {errors.category && <span className="text-red-500 mt-2">{errors.category}</span>}
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={planning.category}
                                    onChange={(e) => setPlanning({ ...planning, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Sélectionner un Niveau</option>
                                    {categories.map((niveau) => (
                                        <option key={niveau.id} value={niveau.id}>
                                            {niveau.name}
                                        </option>
                                    ))}
                                </select>
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
                                    value={planning.range}
                                    onChange={(e) => setPlanning({ ...planning, range: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">
                                Status
                                {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={planning.status}
                                onChange={(e) => setPlanning({ ...planning, status: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">
                                Description
                                {errors.description && <span className="text-red-500 mt-2">{errors.description}</span>}
                            </Label>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ReactQuill
                                    id="description"
                                    value={planning.description}
                                    onChange={handleQuillChange}
                                    className="w-full"
                                    theme="snow"
                                />
                            </Suspense>
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
