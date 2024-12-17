import React, { useState, useEffect } from "react";
import { Vlog, CategoryVlog } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Upload, XCircle, Edit } from 'lucide-react';

interface EditVlogProps {
    vlog: Vlog;
    categories: CategoryVlog[];
    onUpdate: (data: FormData, id: number) => void;
}

const EditVlogForm: React.FC<EditVlogProps> = ({ vlog, categories, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: vlog.title,
        description: vlog.description,
        status: vlog.status,
        category_vlog: vlog.category_vlog,
        image: null as File | null,
    });
    const [previewImage, setPreviewImage] = useState<string | null>(vlog.image || null);
    const navigate = useNavigate();

    // Reset form when vlog prop changes
    useEffect(() => {
        setFormData({
            title: vlog.title,
            description: vlog.description,
            status: vlog.status,
            category_vlog: vlog.category_vlog,
            image: null,
        });
        setPreviewImage(vlog.image || null);
    }, [vlog]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData(prevData => ({
                ...prevData,
                image: file,
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prevData => ({
            ...prevData,
            image: null,
        }));
        setPreviewImage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("status", formData.status);
        submitData.append("category_vlog", formData.category_vlog || '');

        if (formData.image) {
            submitData.append("image", formData.image);
        }

        onUpdate(submitData, vlog.id);
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4 flex items-center justify-center">
                <Edit className="mr-3 text-blue-600" size={28} />
                Modifier le Vlog
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input */}
                <div>
                    <Label htmlFor="title" className="text-gray-700 font-medium mb-2 block">
                        Titre du Vlog
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Modifier le titre du vlog"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        required
                    />
                </div>

                {/* Status Dropdown */}
                <div>
                    <Label htmlFor="status" className="text-gray-700 font-medium mb-2 block">
                        Statut
                    </Label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 py-2"
                        required
                    >
                        <option value="pending">En attente de publication</option>
                        <option value="approved">Publiée</option>
                    </select>
                </div>

                {/* Category Dropdown */}
                <div>
                    <Label htmlFor="category_vlog" className="text-gray-700 font-medium mb-2 block">
                        Catégorie
                    </Label>
                    <select
                        id="category_vlog"
                        name="category_vlog"
                        value={formData.category_vlog || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 py-2"
                        required
                    >
                        <option value="">Sélectionner une Catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <Label className="text-gray-700 font-medium mb-2 block">
                        Image du Vlog
                    </Label>
                    <div className="flex items-center space-x-4">
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <label 
                            htmlFor="image" 
                            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                        >
                            <Upload className="mr-2" size={20} />
                            Modifier l'image
                        </label>
                        {previewImage && (
                            <div className="relative">
                                <img 
                                    src={previewImage} 
                                    alt="Vlog preview" 
                                    className="w-20 h-20 rounded-lg object-cover shadow-md"
                                />
                                <button 
                                    type="button" 
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <XCircle size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vlog Link */}
                <div>
                    <Label htmlFor="description" className="text-gray-700 font-medium mb-2 block">
                        Lien du Vlog
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Modifier le lien du vlog"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-4 pt-4">
                    <Button
                        type="button"
                        onClick={() => navigate("/vlog-biopilates")}
                        variant="outline"
                        className="w-full py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Annuler
                    </Button>
                    <Button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Mettre à jour
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditVlogForm;