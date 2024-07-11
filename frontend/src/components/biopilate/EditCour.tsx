import { useState, useEffect } from "react";
import { Cours } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import api from "@/lib/api";

interface EditCourProps {
    cours: Cours;
    onUpdate: (data: FormData, id: number) => void;
}

const EditCour: React.FC<EditCourProps> = ({ cours, onUpdate }) => {
    const [title, setTitle] = useState(cours.title);
    const [description, setDescription] = useState(cours.description);
    const [status, setStatus] = useState(cours.status);
    const [image, setImage1] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "title":
                setTitle(value);
                break;
           
            case "status":
                setStatus(value);
                break;
           
            default:
                break;
        }
    };

    const handleQuillChange = (value: string) => {
        setDescription(value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            if (name === "image") {
                setImage1(files[0]);
            } 
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
       
        

        if (image) {
            formData.append("image", image);
        }
        
        onUpdate(formData, cours.id);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="mb-4">Modifier Cours</h1>
            <div className="mb-4">
                <Label htmlFor="title">Titre</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
           
            
            <div className="mb-4">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="pending">En attente de publication</option>
                    <option value="approved">Publiée</option>
                </select>
            </div>
            
            <div className="mb-4">
                <Label htmlFor="image">Image </Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="mt-1 block w-full"
                />
                {cours.image && (
                    <img src={cours.image} alt={cours.title} className="w-16 h-16 rounded-full mt-2" />
                )}
            </div>
           
            <div className="mb-4">
                <Label htmlFor="full_text">Description</Label>
                <ReactQuill
                    id="full_text"
                    value={description}
                    onChange={handleQuillChange}
                    className="w-full"
                    theme="snow"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Enregistrer
                </Button>
            </div>
        </form>
    );
};

export default EditCour;
