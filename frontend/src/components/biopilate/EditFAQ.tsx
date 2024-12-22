import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { FAQ } from "@/types/types";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

// Set the app element for accessibility
Modal.setAppElement('#root');

interface EditFAQModalProps {
    faqId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function EditFAQ({ faqId, isOpen, onClose, onSave }: EditFAQModalProps) {
    const [formData, setFormData] = useState<FAQ | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("EditFAQ Modal Props:", { faqId, isOpen });
        
        if (faqId && isOpen) {
            const fetchFaq = async () => {
                try {
                    setIsLoading(true);
                    const res = await api.get(`faqs/${faqId}/`);
                    setFormData(res.data);
                } catch (error) {
                    console.error("Error fetching FAQ", error);
                    setError("Error fetching FAQ data.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFaq();
        } else {
            setFormData(null);
        }
    }, [faqId, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            if (faqId && formData) {
                await api.put(`faqs/${faqId}/`, formData);
                onSave();
            }
        } catch (error) {
            console.error("Error updating FAQ", error);
            setError("Error updating FAQ. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Custom modal styles
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '800px',
            padding: '2rem',
            borderRadius: '0.75rem'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            style={customStyles}
            contentLabel="Edit FAQ Modal"
        >
            <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4 flex items-center justify-center">
                <Edit className="mr-3 text-blue-600" size={28} />
                Modifier FAQ
            </h2>                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6" >
                            {/* Form fields remain the same as in your original component */}
                            <div>
                            <Label htmlFor="title" className="text-gray-700 font-medium mb-2 block">
                        Titre 
                    </Label>
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
                            {/* Rest of the form remains the same */}
                            
                            <div className="flex justify-end mb-8 gap-4">
                                <Button 
                                    type="button" 
                                    variant="secondary" 
                                    onClick={onClose} 
                                    className="w-32"
                                >
                                    Annuler
                                </Button>
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                     className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
                                >
                                    {isLoading ? 'Saving...' : 'Enregistrer'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
