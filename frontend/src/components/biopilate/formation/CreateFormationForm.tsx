import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
interface FormLevel {
  name: string;
  price: number;
}

interface FormData {
  title: string;
  description: string;
  levels: FormLevel[];
  status: 'pending' | 'published';
  formation_line : string;
}

const CreateFormationSimple: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    levels: [{ name: '', price: 0 }],
    status: 'pending',
    formation_line : '',
  });

  const [files, setFiles] = useState({
    image: null as File | null,
    pdf: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLevelChange = (index: number, field: keyof FormLevel, value: string) => {
    const newLevels = [...formData.levels];
    newLevels[index] = {
      ...newLevels[index],
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    };
    setFormData(prev => ({
      ...prev,
      levels: newLevels
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf_document') => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({
      ...prev,
      [type]: file
    }));

    if (type === 'image' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLevel = () => {
    setFormData(prev => ({
      ...prev,
      levels: [...prev.levels, { name: '', price: 0 }]
    }));
  };

  const removeLevel = (index: number) => {
    if (formData.levels.length > 1) {
      setFormData(prev => ({
        ...prev,
        levels: prev.levels.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!formData.levels.every(level => level.name && level.price > 0)) {
      toast.error("Tous les niveaux doivent être remplis avec des prix valides");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('formation_line', formData.formation_line);

      // Append levels as JSON string
      formDataToSend.append('levels', JSON.stringify(formData.levels));

      // Append files if they exist
      if (files.image) {
        formDataToSend.append('image', files.image, files.image.name);
      }
      if (files.pdf) {
        formDataToSend.append('pdf_document', files.pdf, files.pdf.name);
      }

      // Log the data being sent
      console.log('Sending data:', {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        formation_line : formData.formation_line,
        levels: formData.levels,
        hasImage: !!files.image,
        hasPdf: !!files.pdf
      });

      const response = await api.post('formation-bio-plates/', formDataToSend);
      console.log('Response:', response.data);
      
      toast.success('Formation créée avec succès');
      // Reset form
      setFormData({
        title: '',
        description: '',
        levels: [{ name: '', price: 0 }],
        status: 'pending',
        formation_line : '',
      });
      setFiles({ image: null, pdf: null });
      setImagePreview(null); // Reset the image preview

      navigate('/Formation-biopilates'); // Redirect to the dashboard after creation
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de la création de la formation');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle Formation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="title">line du formation</Label>
            <Input
              id="formation_line"
              name="formation_line"
              value={formData.formation_line}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Niveaux</Label>
              <Button 
                type="button" 
                onClick={addLevel}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un niveau
              </Button>
            </div>

            {formData.levels.map((level, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Niveau</Label>
                  <Input
                    value={level.name}
                    onChange={(e) => handleLevelChange(index, 'name', e.target.value)}
                    placeholder="ex: Débutant"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label>Prix (€)</Label>
                  <Input
                    type="number"
                    value={level.price}
                    onChange={(e) => handleLevelChange(index, 'price', e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                {formData.levels.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeLevel(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'image')}
            />
          </div>

          {imagePreview && (
            <div className="my-4">
              <h3>Image Preview:</h3>
              <img
                src={imagePreview}
             
              alt="Image Preview"
              className="max-w-[100px] max-h-[200px] object-contain"
                
               
              />
            </div>
          )}

          <div>
            <Label htmlFor="pdf">Document PDF</Label>
            <Input
              id="pdf_document"
              name="pdf_document"  // name should match the field name in the API's request body
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, 'pdf_document')}
            />
          </div>

          <Button type="submit"  className="  reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  bg-bgColor text-marron  duration-300 ease-in-out transform">
            Créer la formation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateFormationSimple;
