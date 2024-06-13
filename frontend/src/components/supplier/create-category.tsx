import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { useState } from "react";
import api from "@/lib/api";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function CreateCategory() {
    const [errors, setErrors] = useState("");
    const [category, setCategory] = useState({
        name: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post("create/category/", category);
            toast.success("Category created");
            setCategory({name: ""});
            setErrors("");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data.name[0])

            }
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Category</CardTitle>
                <CardDescription>{errors !== "" && <li className="text-red-500 mt-2">{errors}</li>}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <Input type="text" value={category.name} placeholder="category name" onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                            <Button type="submit" className="w-full">
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
