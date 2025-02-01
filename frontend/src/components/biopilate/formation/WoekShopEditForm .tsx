import { useState } from "react";
import { WorkShop, CategoryWorkShop } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { FaFileUpload, FaSave, FaTimes } from "react-icons/fa";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface EditworjShopProps {
    workshop: WorkShop;
    categories: CategoryWorkShop[];
    onUpdate: (data: FormData, id: number) => void;
}

const EditWorkShopForm: React.FC<EditworjShopProps> = ({ workshop, categories, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: workshop.title,
        description: workshop.description,
        status: workshop.status,
        category_workshop: workshop.category_workshop,
        image: null as File | null,
        pdf_workshop: null as File | null,
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
    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      field: "image" | "pdf_workshop"
    ) => {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData((prevState) => ({
        ...prevState,
        [field]: file,
      }));
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
        submitData.append("status", formData.status);
        submitData.append("category_workshop", formData.category_workshop);

        if (formData.image) {
            submitData.append("image", formData.image);
        }
        if (formData.pdf_workshop) {
          submitData.append("pdf_workshop", formData.pdf_workshop);
      }

        onUpdate(submitData, workshop.id);
    };

    return (
       
        <Card>
          <CardHeader >
            <span className="block mb-2 text-gray-990">  Modifier Workshop</span>
            
            
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-4">
                <Label htmlFor="title" className="block mb-2 text-gray-700">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={workshop.title || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-200"
                  placeholder="Nom du workshop"
                />
              </div>
  
              {/* Status Dropdown */}
              <div className="mb-4">
                <Label htmlFor="status" className="block mb-2 text-gray-700">Statut</Label>
                <select
                  id="status"
                  name="status"
                  value={workshop.status || 'pending'}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="pending">En attente de publication</option>
                  <option value="approved">Publiée</option>
                </select>
              </div>
  
              {/* Category Dropdown */}
              <div className="mb-4">
                <Label htmlFor="category_workshop" className="block mb-2 text-gray-700">Catégorie</Label>
                <select
                  id="category_workshop"
                  name="category_workshop"
                  value={workshop.category_workshop || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                <Label htmlFor="image" className="block mb-2 text-gray-700">Image</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="w-full file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium"
                  />
                  {workshop.image && (
                    <img 
                      src={workshop.image} 
                      alt={workshop.title} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" 
                    />
                  )}
                </div>
              </div>
  
              {/* PDF Upload */}
              <div className="mb-4">
                <Label htmlFor="pdf_workshop" className="block mb-2 text-gray-700">Upload PDF</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="pdf_workshop"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, "pdf_workshop")}
                    className="w-full file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium"
                  />
                  {workshop.pdf_workshop && (
                    <a 
                      href={workshop.pdf_workshop} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaFileUpload className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
  
              {/* Description */}
              <div className="mb-4">
                <Label htmlFor="full_text" className="block mb-2 text-gray-700">Description</Label>
                <ReactQuill
                  id="full_text"
                  value={workshop.description || ''}
                  onChange={handleQuillChange}
                  className="h-48"
                  theme="snow"
                  placeholder="Détails du workshop"
                />
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-between mt-16">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/WorkshopShow-biopilates")}
                  className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100"
                >
                  <FaTimes />
                  <span>Annuler</span>
                </Button>
                <button 
                  type="submit" 
                   className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
                >
                  <FaSave />
                  <span>Enregistrer</span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
     
    );
};

export default EditWorkShopForm;
