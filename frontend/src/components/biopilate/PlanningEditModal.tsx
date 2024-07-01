import { useState, useEffect } from "react";
import Modal from 'react-modal';
import ReactQuill from "react-quill";
import { Planning, Category } from "@/types/types";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

interface PlanningEditModalProps {
    planningId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function PlanningEditModal({ planningId, isOpen, onClose, onSave }: PlanningEditModalProps) {
    const [formData, setFormData] = useState<Planning | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (planningId) {
            const fetchPlanning = async () => {
                try {
                    const res = await api.get(`plannings/${planningId}/`);
                    setFormData(res.data);
                } catch (error) {
                    console.error("Error fetching planning", error);
                    setError("Error fetching planning data.");
                }
            };
            fetchPlanning();
        } else {
            setFormData(null); // Reset form data when modal is closed
        }
    }, [planningId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("categories/");
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };

    const handleQuillChange = (value: string) => {
        setFormData((prevData) => prevData ? { ...prevData, description: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            if (planningId && formData) {
                await api.put(`plannings/${planningId}/`, formData);
                onSave();
            }
        } catch (error) {
            console.error("Error updating planning", error);
            setError("Error updating planning. Please try again.");
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Edit Planning</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div>
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                className="w-full mt-2"
                                value={formData?.title || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="duree">Durée</Label>
                            <Input
                                id="duree"
                                name="duree"
                                type="text"
                                className="w-full mt-2"
                                value={formData?.duree || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="range">Déplacement</Label>
                            <Input
                                id="range"
                                name="range"
                                type="number"
                                className="w-full mt-2"
                                value={formData?.range || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="category_name">Niveau</Label>
                            <select
                                id="category_name"
                                name="category_name"
                                className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
                                value={formData?.category_name || ''}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un Niveau</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <ReactQuill
                                id="description"
                                value={formData?.description || ''}
                                onChange={handleQuillChange}
                                className="w-full mt-2"
                                theme="snow"
                            />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
                                value={formData?.status || ''}
                                onChange={handleChange}
                            >
                                <option value="">Sélectionner un Status</option>
                                <option value="pending">En attente de publication</option>
                                <option value="approved">Publiée</option>
                            </select>
                        </div>
                        <div className="flex justify-end mb-8 gap-4">
                            <Button type="button" onClick={onClose} className="w-32">Annuler</Button>
                            <Button type="submit" className="w-32">Enregistrer</Button>
                        </div>
                        <div></div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
