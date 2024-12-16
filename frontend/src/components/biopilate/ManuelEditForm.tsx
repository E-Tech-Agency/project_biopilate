import { useState } from "react";
import { Manuel } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Upload, XCircle } from 'lucide-react';

interface EditManuelProps {
    manuel: Manuel;
   
    onUpdate: (data: FormData, id: number) => void;
}

const EditManuelForm: React.FC<EditManuelProps> = ({ manuel, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: manuel.title,
        description: manuel.description,
        status: manuel.status,
      
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

        if (formData.image) {
            submitData.append("image", formData.image);
        }
        
        onUpdate(submitData, manuel.id);
    };

    return (
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto space-y-6">
    <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Créer un Manuel</h2>
        <p className="text-gray-500">Remplissez les détails de votre manuel</p>
    </div>

    {/* Title Input */}
    <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-700 font-semibold block">
            Titre du Manuel
        </Label>
        <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Entrez le titre du manuel"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
    </div>

    {/* Status Dropdown */}
    <div className="space-y-2">
        <Label htmlFor="status" className="text-gray-700 font-semibold block">
            Statut de Publication
        </Label>
        <div className="relative">
            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
                <option value="pending">En attente de publication</option>
                <option value="approved">Publiée</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    </div>

    {/* Image Upload */}
    <div className="space-y-2">
        <Label htmlFor="image" className="text-gray-700 font-semibold block">
            Image du Manuel
        </Label>
        <div className="flex items-center space-x-4">
            <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                className="hidden"
            />
            <label
                htmlFor="image"
                className="flex items-center px-5 py-3 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100 transition-colors group"
            >
                <Upload className="mr-2 group-hover:rotate-6 transition-transform" size={24} />
                Choisir une image
            </label>
            
            {manuel.image && (
                <div className="relative group">
                    <img
                        src={manuel.image}
                        alt={manuel.title}
                        className="w-20 h-20 rounded-lg object-cover border-2 border-blue-200 group-hover:scale-105 transition-transform"
                    />
                    <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                    >
                        <XCircle size={16} />
                    </button>
                </div>
            )}
        </div>
    </div>

    {/* Vlog Link */}
    <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700 font-semibold block">
            Lien du Manuel
        </Label>
        <Input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Collez le lien du manuel"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between mt-8">
        <Button
            type="button"
            onClick={() => navigate("/manuel-biopilates")}
            variant="outline"
            className="px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
        >
            Annuler
        </Button>
        <Button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
            Enregistrer
        </Button>
    </div>
</form>
    );
};

export default EditManuelForm;
