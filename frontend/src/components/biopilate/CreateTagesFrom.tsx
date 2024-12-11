import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import apiCreateTeache from "@/lib/apiCreateTeache";
import axios from "axios";
import { toast } from "sonner";
import { CreateTagesErrors, TagesFormType } from "@/types/types";
interface CreateTagesFormProps {
    onTageAdded: () => void; // Callback to notify parent component of new tage
  }
export default function CreateTagesForm({ onTageAdded }: CreateTagesFormProps)  {
    const [errors, setErrors] = useState<CreateTagesErrors>({});
    const [tage, setTage] = useState<TagesFormType>({
        title: "",
        status: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await apiCreateTeache.post("tages/", tage);
            toast.success("Biopilate tages created");
            setTage({ title: "", status: "" });
            setErrors({});
            onTageAdded();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data);
            }
        }
    };

    return (
        <Card >
            <CardHeader>
                <CardTitle>Ajouter un Tage</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Titre</Label>
                            {errors.title && <span className="text-red-500 mt-2">{errors.title}</span>}
                            <Input
                                id="title"
                                type="text"
                                className="w-full"
                                placeholder="tage ..."
                                value={tage.title}
                                onChange={(e) => setTage({ ...tage, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={tage.status}
                                onChange={(e) => setTage({ ...tage, status: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                            {errors.status && <span className="text-red-500 mt-2">{errors.status}</span>}
                        </div>
                        <div>
                            <Button type="submit" className="w-44" size={"lg"}>Ajouter</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
