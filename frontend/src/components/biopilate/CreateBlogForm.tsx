import { useNavigate } from "react-router-dom";
import { CreateBlogErrors, BlogFormType , Tage } from "@/types/types";
import { useEffect, useState } from "react";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import React from "react";
import BlogForm from "./BlogForm";

export default function CreateBlogForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);
    const [tages,setTages]= useState<Tage[]>([]);
  const [errors, setErrors] = useState<CreateBlogErrors>({});
  const [blog, setBlog] = useState<BlogFormType>({
    title: "",
    author: "",
    description: "",
    status: "pending",
    image_1: null,
    image_2: null,
    full_text: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    range: 0,
    favorites: 0,
    tages:[],
  });
  useEffect(() => {
    const fetchTages = async () => {
        try {
            const res = await api.get("tages/");
            setTages(res.data);
            console.log(res.data);
            
        } catch (error) {
            console.error("Error fetching tages", error);
        }
    };

    fetchTages();
}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("author", blog.author);
    formData.append("status", blog.status);
    formData.append("description", blog.description);
    formData.append("full_text", blog.full_text);
    formData.append("date", blog.date.toLocaleString()); // Ensure date is in YYYY-MM-DD format
    formData.append("range", blog.range.toString()); // Convert number to string
    formData.append(
      "favorites",
      blog.favorites !== null ? blog.favorites.toString() : ""
    );
    formData.append('tages', blog.tages.toString());
    
    if (blog.image_1) formData.append("image_1", blog.image_1);
    if (blog.image_2) formData.append("image_2", blog.image_2);

    try {
      await apiCreateTeache.post("blogs/", formData);
      setBlog({
        title: "",
        author: "",
        description: "",
        status: "pending",
        image_1: null,
        image_2: null,
        full_text: "",
        date: new Date().toISOString().split("T")[0], // Reset to today's date
        range: 0,
        favorites: 0,
        tages:[],
      });
      toast.success("Blog created");
      navigate("/blog-biopilates");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsFromDb = error.response?.data;
        console.log(errorsFromDb);
        toast.error(errorsFromDb.error);
        setErrors(errorsFromDb);
      }
    }
  };

  return (
    <div className="justify-evenly items-center m-6">
      <BlogForm
        handleSubmit={handleSubmit}
        errors={errors}
        blog={blog}
        tages={tages}
        setBlog={setBlog}
      />
    </div>
  );
}
