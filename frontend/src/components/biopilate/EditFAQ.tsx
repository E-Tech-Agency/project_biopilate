import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { FAQ } from "@/types/types";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EditFAQModalProps {
    faqId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function EditFAQ({ faqId, isOpen, onClose, onSave }: EditFAQModalProps) {
    const [formData, setFormData] = useState<FAQ | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (faqId) {
            const fetchFaq = async () => {
                try {
                    const res = await api.get(`faqs/${faqId}/`);
                    setFormData(res.data);
                } catch (error) {
                    console.error("Error fetching FAQ", error);
                    setError("Error fetching FAQ data.");
                }
            };
            fetchFaq();
        } else {
            setFormData(null); // Reset form data when modal is closed
        }
    }, [faqId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            if (faqId && formData) {
                await api.put(`faqs/${faqId}/`, formData);
                onSave();
            }
        } catch (error) {
            console.error("Error updating FAQ", error);
            setError("Error updating FAQ. Please try again.");
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
                <h2 className="text-2xl font-semibold mb-6">Edit FAQ</h2>
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
                        <div className="grid gap-3">
                            <Label htmlFor="range">Déplacement</Label>
                            <Input
                                id="range"
                                name="range"
                                type="number"
                                className="w-full"
                                value={formData?.range || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Réponse</Label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full p-2 border rounded-md"
                                value={formData?.description || ''}
                                onChange={handleChange}
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
                    </div>
                </form>
            </div>
        </Modal>
    );
}
