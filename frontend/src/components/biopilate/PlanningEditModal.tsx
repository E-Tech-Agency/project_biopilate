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
        <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Planning</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Durée */}
                    <div>
                        <Label htmlFor="duree" className="block text-gray-700 text-sm font-medium mb-2">
                            Durée
                        </Label>
                        <Input
                            id="duree"
                            name="duree"
                            type="text"
                            placeholder="Entrez la durée"
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                            value={formData?.duree || ''}
                            onChange={handleChange}
                        />
                    </div>
    
                    {/* Déplacement */}
                    
    
                    {/* Niveau */}
                    <div>
                        <Label htmlFor="category_name" className="block text-gray-700 text-sm font-medium mb-2">
                            Niveau
                        </Label>
                        <select
                            id="category_name"
                            name="category_name"
                            className="w-full p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
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
    
                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                            Description
                        </Label>
                        <ReactQuill
                            id="description"
                            value={formData?.description || ''}
                            onChange={handleQuillChange}
                            className="w-full border rounded-md focus:ring focus:ring-blue-500"
                            theme="snow"
                        />
                    </div>
    
                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </Modal>
    
    );
}
