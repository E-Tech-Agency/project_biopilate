import { useState, useEffect } from "react";
import { Service, Teache } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import api from "@/lib/api";

interface ServiceEditFormProps {
    service: Service;
    onUpdate: (data: FormData, id: number) => void;
}

const ServiceEditForm: React.FC<ServiceEditFormProps> = ({ service, onUpdate }) => {
    const [title, setTitle] = useState(service.title);
    const [description, setDescription] = useState(service.description);
    const [status, setStatus] = useState(service.status);
    const [fullText, setFullText] = useState(service.full_text);
    const [instructeur, setInstructeur] = useState(service.instructeur);
    const [image, setImage] = useState<File | null>(null);
    const [instructeurs, setInstructeurs] = useState<Teache[]>([]);

    useEffect(() => {
        const fetchInstructeurs = async () => {
            try {
                const response = await api.get("teaches/");
                setInstructeurs(response.data);
            } catch (error) {
                console.error("Error fetching instructors", error);
            }
        };

        fetchInstructeurs();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "status":
                setStatus(value);
                break;
            case "instructeur":
                setInstructeur(value);
                break;
            default:
                break;
        }
    };

    const handleQuillChange = (value: string) => {
        setFullText(value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure files is not null and has at least one file
        const file = e.target.files?.[0] || null;
        setImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("full_text", fullText);
        formData.append("instructeur", instructeur);

        if (image) {
            formData.append("image", image);
        }

        onUpdate(formData, service.id);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="mb-4">Modifier Service</h1>
            <div className="mb-4">
                <Label htmlFor="title">Titre</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="pending">En attente de publication</option>
                    <option value="approved">Publiée</option>
                </select>
            </div>
            <div className="mb-4">
                <Label htmlFor="instructeur">Instructeur</Label>
                <select
                    id="instructeur"
                    name="instructeur"
                    value={instructeur}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    {instructeurs.map((inst) => (
                        <option key={inst.id} value={inst.fullname}>
                            {inst.fullname}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="mt-1 block w-full"
                />
                {service.image && (
                    <img src={service.image} alt={service.title} className="w-16 h-16 rounded-full mt-2" />
                )}
            </div>
            <div className="mb-4">
                <Label htmlFor="full_text">Texte Complet</Label>
                <ReactQuill
                    id="full_text"
                    value={fullText}
                    onChange={handleQuillChange}
                    className="w-full"
                    theme="snow"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Enregistrer
                </Button>
            </div>
        </form>
    );
};

export default ServiceEditForm;
