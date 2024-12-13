import { useState } from "react";
import { Cours, CategoryCours } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
interface EditCourProps {
    cours: Cours;
    categories: CategoryCours[];
    onUpdate: (data: FormData, id: number) => void;
}

const EditCour: React.FC<EditCourProps> = ({ cours, categories, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: cours.title,
        description: cours.description,
        status: cours.status,
        category_cours: cours.category_cours,
        image: null as File | null,
    });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleQuillChange = (value: string) => {
        setFormData({
            ...formData,
            description: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("status", formData.status);
        submitData.append("category_cours", formData.category_cours);

        if (formData.image) {
            submitData.append("image", formData.image);
        }

        onUpdate(submitData, cours.id);
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
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="pending">En attente de publication</option>
                    <option value="approved">Publiée</option>
                </select>
            </div>
            <div className="mb-4">
                <Label htmlFor="category_name">Catégorie</Label>
                <select
                    id="category_cours"
                    name="category_cours"
                    value={formData.category_cours || ''}
                    onChange={handleInputChange}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Sélectionner une Catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <Label htmlFor="image">Image</Label>
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
                    value={formData.description}
                    onChange={handleQuillChange}
                    className="w-full"
                    theme="snow"
                />
            </div>
            <Button
                    type="button"
                    onClick={() => navigate("/Cours-biopilates")}
                    className="bg-gray-300 hover:bg-opacity-80 transition-colors duration-300"
                  >
                    Annuler
                  </Button>
            <div className="flex justify-end space-x-2">
                <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Enregistrer
                </Button>
            </div>
        </form>
    );
};

export default EditCour;
