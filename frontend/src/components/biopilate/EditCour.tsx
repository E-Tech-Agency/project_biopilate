import { useState } from "react";
import { Cours, CategoryCours } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, Check } from "lucide-react";

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
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
            <Card className="shadow-lg border-none">
                <CardHeader >
                    <CardTitle className=" flex items-center">
                        <FileText className="mr-3" />
                        Modifier le Cours
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="title" className="text-gray-700 font-semibold">Titre du Cours</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <Label htmlFor="status" className="text-gray-700 font-semibold">Statut</Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="pending">En attente de publication</option>
                                    <option value="approved">Publiée</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="category_cours" className="text-gray-700 font-semibold">Catégorie</Label>
                            <select
                                id="category_cours"
                                name="category_cours"
                                value={formData.category_cours || ''}
                                onChange={handleInputChange}
                                className="mt-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                            >
                                <option value="">Sélectionner une Catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="image" className="text-gray-700 font-semibold">Image du Cours</Label>
                            <div className="mt-2 flex items-center space-x-4">
                                <div className="relative w-24 h-24">
                                    {cours.image ? (
                                        <img 
                                            src={cours.image} 
                                            alt={cours.title} 
                                            className="w-full h-full object-cover rounded-lg shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Upload className="text-gray-500" />
                                        </div>
                                    )}
                                </div>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="flex-grow file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="full_text" className="text-gray-700 font-semibold">Description</Label>
                            <ReactQuill
                                id="full_text"
                                value={formData.description}
                                onChange={handleQuillChange}
                                className="mt-2 bg-white rounded-md"
                                theme="snow"
                            />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <Button
                                type="button"
                                onClick={() => navigate("/Cours-biopilates")}
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300 flex items-center"
                            >
                                <X className="mr-2" /> Annuler
                            </Button>
                            <Button 
                                type="submit" 
                                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center"
                            >
                                <Check className="mr-2" /> Enregistrer
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditCour;