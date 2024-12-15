import { useState } from "react";
import { Vlog, CategoryVlog } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Upload, XCircle } from 'lucide-react';

interface EditVlogProps {
    vlog: Vlog;
    categories: CategoryVlog[];
    onUpdate: (data: FormData, id: number) => void;
}

const EditVlogpForm: React.FC<EditVlogProps> = ({ vlog, categories, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: vlog.title,
        description: vlog.description,
        status: vlog.status,
        category_vlog: vlog.category_vlog,
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
        submitData.append("category_vlog", formData.category_vlog);

        if (formData.image) {
            submitData.append("image", formData.image);
        }
        

        onUpdate(submitData, vlog.id);
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <Label htmlFor="title" className="text-gray-700 font-semibold">
            Titre du Vlog
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Entrez le titre du vlog"
            className="mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <Label htmlFor="status" className="text-gray-700 font-semibold">
            Statut
          </Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">En attente de publication</option>
            <option value="approved">Publiée</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <Label htmlFor="category_vlog" className="text-gray-700 font-semibold">
            Catégorie
          </Label>
          <select
            id="category_vlog"
            name="category_vlog"
            value={formData.category_vlog || ''}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
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
        <div className="mb-4">
          <Label htmlFor="image" className="text-gray-700 font-semibold">
            Image du Vlog
          </Label>
          <div className="mt-2 flex items-center">
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <label 
              htmlFor="image" 
              className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <Upload className="mr-2" size={20} />
              Choisir une image
            </label>
            {vlog.image && (
              <div className="ml-4 relative">
                <img 
                  src={vlog.image} 
                  alt={vlog.title} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                />
                <button 
                  type="button" 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <XCircle size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Vlog Link */}
        <div className="mb-4">
          <Label htmlFor="description" className="text-gray-700 font-semibold">
            Lien du Vlog
          </Label>
          <Input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Collez le lien du vlog"
            className="mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={() => navigate("/vlog-biopilates")}
            variant="outline"
            className="px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    );
};

export default EditVlogpForm;
