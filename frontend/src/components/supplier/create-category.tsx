import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "../ui/input"
import { useState } from "react";
import api from "@/lib/api";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function CreateCategory() {
    const [errors, setErrors] = useState("");
    const [category, setCategory] = useState({
        name: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post("categories/", category);
            toast.success("Category created");
            setCategory({name: ""});
            navigate('/ajouter-planning-biopilates');
           
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data.name[0])

            }
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ajouter un niveau</CardTitle>
                <CardDescription>{errors !== "" && <li className="text-red-500 mt-2">{errors}</li>}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                           
                            <Input type="text" value={category.name} placeholder="niveau" onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                            <Button type="submit" className="w-full">
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
