import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import { CreateBlogErrors, BlogFormType, Tage } from "@/types/types";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import BlogForm from "./BlogForm";

export default function CreateBlogForm() {
  const navigate = useNavigate();

  // State management
  const [tages, setTages] = useState<Tage[]>([]);
  const [errors, setErrors] = useState<CreateBlogErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initial blog state
  const [blog, setBlog] = useState<BlogFormType>({
    title: "",
    author: "",
    description: "",
    status: "pending",
    image_1: null,
    image_2: null,
    full_text: "",
    date: new Date().toISOString().split("T")[0],
    range: 0,
    favorites: 0,
    tages: "",
   
  });

  // Check supplier authentication
  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("tages/");
        setTages(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast.error("Impossible de charger les tags. Veuillez réessayer.");
      }
    };
  
    fetchTags();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Form validation
    const validationErrors: CreateBlogErrors = {};
    if (!blog.title.trim()) validationErrors.title = "Le titre est requis";
    if (!blog.author.trim()) validationErrors.author = "Le nom de l'auteur est requis";
    if (!blog.description.trim()) validationErrors.description = "La description est requise";
    if (!blog.full_text.trim()) validationErrors.full_text = "Le contenu du blog est requis";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    
    // Append all blog data to FormData
    Object.keys(blog).forEach(key => {
      const value = blog[key as keyof BlogFormType];
      if (value !== null && value !== undefined) {
        if (key === 'image_1' || key === 'image_2') {
          // Handle file uploads
          formData.append(key, value as File);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    try {
      // Submit blog post
      const response = await apiCreateTeache.post("blogs/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Reset form and show success message
      setBlog({
        title: "",
        author: "",
        description: "",
        status: "pending",
        image_1: null,
        image_2: null,
        full_text: "",
        date: new Date().toISOString().split("T")[0],
        range: 0,
        favorites: 0,
        tages: "",
        
      });

      toast.success("Blog créé avec succès");
      navigate("/blog-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data || {};
        console.error("Erreur de création de blog:", errorsFromDb);
        
        // Handle and display errors
        toast.error(errorsFromDb.error || "Échec de la création du blog");
        setErrors(errorsFromDb);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <BlogForm
        handleSubmit={handleSubmit}
        errors={errors}
        blog={blog}
        setBlog={setBlog}
        tages={tages}
      />
    </div>
  );
}