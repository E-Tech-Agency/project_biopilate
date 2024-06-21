import SideNav from '@/components/shared/side-nav';

import { useNavigate } from 'react-router-dom';
import { CreateBlogErrors, BlogFormType, Blog } from "@/types/types";
import { useEffect, useState } from "react";

import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import React from "react";
const ReactQuill = React.lazy(() => import("react-quill"));
import BlogForm from './BlogForm';
export default function CreateBlogForm() {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);
    const [errors, setErrors] = useState<CreateBlogErrors>({});
    const [blog, setBlog] = useState<BlogFormType>({
        title: '',
        author: '',
        description: '',
        status: 'pending',
        image_1: null,
        image_2: null,
        full_text: '',
        date:  new Date(),
        range: 0,
    });

     

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('author', blog.author);
        formData.append('status', blog.status);
        formData.append('full_text', blog.full_text);
        formData.append('date', blog.date.toDateString());
        formData.append('range', blog.range.toString());
        
       

        if (blog.image_1) formData.append('image_1', blog.image_1);
        if (blog.image_2) formData.append('image_2', blog.image_2);

        try {
            await apiCreateTeache.post("blogs/", formData);
            setBlog({
                title: '',
                author: '',
                description: '',
                status: 'pending',
                image_1: null,
                image_2: null,
                full_text: '',
                date: new Date(),  // Reset to current date
                range: 0,
            });
            toast.success("Blog  created");
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
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
        <SideNav/>
        <div>
            <div className=' justify-evenly items-center m-6'>
            
            <BlogForm handleSubmit={handleSubmit} errors={errors} blog={blog} setBlog={setBlog} />
            
            </div>
            
        </div>
    </div>
    );
}
