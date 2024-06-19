import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Button } from "../ui/button";
import { Planning } from "@/types/types";
import api from "@/lib/api";

interface PlanningEditModalProps {
    planningId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function PlanningEditModal({ planningId, isOpen, onClose, onSave }: PlanningEditModalProps) {
    const [formData, setFormData] = useState<Planning | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (planningId) {
            const fetchPlanning = async () => {
                try {
                    const res = await api.get(`plannings/${planningId}`);
                    setFormData(res.data);
                } catch (error) {
                    console.error("Error fetching planning", error);
                    setError("Error fetching planning data.");
                }
            };
            fetchPlanning();
        }
    }, [planningId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            if (planningId && formData) {
                await api.put(`plannings/${planningId}`, formData);
                onSave();
            }
        } catch (error) {
            console.error("Error updating planning", error);
            setError("Error updating planning. Please try again.");
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <div>
                    <label>Titre</label>
                    <input type="text" name="title" value={formData?.title || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Durée</label>
                    <input type="text" name="duree" value={formData?.duree || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData?.description || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" value={formData?.status || ''} onChange={handleChange}>
                        <option value="pending">En attente</option>
                        <option value="approved">Publiée</option>
                    </select>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" value={formData?.category?.name || ''} onChange={handleChange} />
                </div>
                <Button type="submit">Save</Button>
                <Button type="button" onClick={onClose}>Cancel</Button>
            </form>
        </Modal>
    );
}
