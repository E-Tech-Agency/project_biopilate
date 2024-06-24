import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateFAQErrors, FAQFormType, FAQ } from "@/types/types";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import api from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import React from "react";

const ReactQuill = React.lazy(() => import("react-quill"));

export default function CreateFAQFrom() {
    const [errors, setErrors] = useState<CreateFAQErrors>({});
   
    const [faq, setFaq] = useState<FAQFormType>({
        title: "",
        description: "",
        status: "",
        range:0,
    });

  

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFaq((prevFAQ) => ({
            ...prevFAQ,
            [name]: value,
        }));
    };

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', faq.title);
        formData.append('description', faq.description);
        formData.append('status', faq.status);
        formData.append('range', faq.range.toString());
       

        try {
            await apiCreateTeache.post("faqs/", formData);
            setFaq({
                title: "",
                description: "",
                status: "",
                range:0,
            });
            toast.success("FAQ created");
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
        <Card className="w-max w-full">
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="fullname">Titre <br />{errors.title && <li className="text-red-500 mt-2">{errors.title}</li>}</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                className="w-full"
                               
                                onChange={(e) => setFaq({ ...faq, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description <br />{errors.description && <li className="text-red-500 mt-2">{errors.description}</li>}</Label>
                            <textarea
                                id="description"
                                name="description"
                             
                                className="w-full p-2 border rounded-md"
                                onChange={(e) => setFaq({ ...faq, description: e.target.value })}
                            />
                        </div>
                       
                        <div className="grid gap-3">
                            <Label htmlFor="range"> déplacement <br />{errors.range && <li className="text-red-500 mt-2">{errors.range}</li>}</Label>
                            <Input
                                id="range"
                                name="range"
                                type="number"
                                className="w-full"
                                onChange={(e) => setFaq({ ...faq, range: e.target.value })}
                            />
                        </div>
                        
                        <div className="grid gap-3">
                            <Label htmlFor="status">
                                Status
                                {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                            </Label>
                            <select
                                id="status"
                                name="status"
                               
                                onChange={(e) => setFaq({ ...faq, status: e.target.value })}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <Button type="submit" className="w-44" size={"lg"}>Ajouter</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
