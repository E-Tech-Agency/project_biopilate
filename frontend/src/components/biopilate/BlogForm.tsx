import React, { useState, useRef, Suspense } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tage, CreateBlogErrors, BlogFormType } from '@/types/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { X } from 'lucide-react';

interface BlogFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: CreateBlogErrors;
  blog: BlogFormType;
  setBlog: React.Dispatch<React.SetStateAction<BlogFormType>>;
  tages?: Tage[]; 
}

const BlogForm: React.FC<BlogFormProps> = ({
  handleSubmit,
  errors,
  blog,
  setBlog,
  tages = [] 
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlog(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        return validTypes.includes(file.type) && file.size <= maxSize;
      });

      // Update blog state with files
      if (files[0]) {
        setBlog(prev => ({
          ...prev,
          image_1: files[0],
          image_2: files.length > 1 ? files[1] : null
        }));
      }

      // Create image previews
      const previews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(e.target.selectedOptions).map(option => option.value);
    setBlog(prev => ({
      ...prev,
      tages: selectedTags.join(',')
    }));
  };

  const handleQuillChange = (content: string) => {
    setBlog(prev => ({
      ...prev,
      full_text: content
    }));
  };

  const removePreviewImage = (index: number) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Update blog state
    setBlog(prev => ({
      ...prev,
      image_1: null,
      image_2: null
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-700">
          Créer un nouveau blog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Titre</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={blog.title}
                onChange={handleInputChange}
                placeholder="Entrez le titre du blog"
                className={`w-full ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Author Input */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">Nom de l'écrivain</Label>
              <Input
                id="author"
                name="author"
                type="text"
                value={blog.author}
                onChange={handleInputChange}
                placeholder="Nom de l'auteur"
                className={`w-full ${errors.author ? 'border-red-500' : ''}`}
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Image de couverture */}
            <div className="space-y-2">
              <Label htmlFor="image_1" className="text-sm font-medium">Image de couverture</Label>
              <Input
                 id="image_1"
                 name="image_1"
                 type="file"
                onChange={handleFileChange}
                
                className={`w-full ${errors.image_1 ? 'border-red-500' : ''}`}
              />
              {errors.image_1 && <p className="text-red-500 text-sm">{errors.image_1}</p>}
            </div>

            {/* Image du blog */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">Image du blog</Label>
              <Input
                id="image_2"
                name="image_2"
                type="file"
                onChange={handleFileChange}
                placeholder="Nom de l'auteur"
                className={`w-full ${errors.image_2 ? 'border-red-500' : ''}`}
              />
              {errors.image_2 && <p className="text-red-500 text-sm">{errors.image_2}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">Déplacement du blog</Label>
              <Input
                id="range"
                name="range"
                type="number"
                value={blog.range}
                onChange={handleInputChange}
                
                className={`w-full ${errors.range ? 'border-red-500' : ''}`}
              />
              {errors.range && <p className="text-red-500 text-sm">{errors.range}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Images du blog</Label>
            <div className="flex items-center space-x-4">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                multiple
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            
            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="flex space-x-2 mt-2">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removePreviewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.image_1 && <p className="text-red-500 text-sm">{errors.image_1}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description de couverture</Label>
            <textarea
              id="description"
              name="description"
              value={blog.description}
              onChange={handleInputChange}
              placeholder="Entrez la description du blog"
              className={`w-full p-2 border rounded-md min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label htmlFor="full_text">Contenu complet</Label>
            <Suspense fallback={<div>Chargement...</div>}>
              <ReactQuill
                value={blog.full_text}
                onChange={handleQuillChange}
                theme="snow"
                className={`${errors.full_text ? 'border-red-500' : ''}`}
                placeholder="Écrivez le contenu de votre blog ici"
              />
            </Suspense>
            {errors.full_text && <p className="text-red-500 text-sm">{errors.full_text}</p>}
          </div>

          {/* Additional Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                  id="date"
                  name="date"
                  type="date"
                  value={blog.date ? new Date(blog.date).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  className={`w-full ${errors.date ? 'border-red-500' : ''}`}
                />

              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <select
                id="status"
                name="status"
                value={blog.status}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.status ? 'border-red-500' : ''}`}
              >
                <option value="pending">En attente de publication</option>
                <option value="approved">Publiée</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tages">Tags</Label>
            <select
              id="tages"
              name="tages"
              multiple
              value={blog.tages ? blog.tages.split(',') : []}
              onChange={handleTagChange}
              className="w-full p-2 border rounded-md"
              size={Math.min(5, tages.length)}
            >
              {tages.map(tag => (
                <option key={tag.id} value={tag.id.toString()}>
                  {tag.title}
                </option>
              ))}
            </select>
            {errors.tages && <p className="text-red-500 text-sm">{errors.tages}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
             className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
          >
            Créer le blog
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;