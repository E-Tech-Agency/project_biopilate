import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Teache, TeacherFormEditType, CreateTeacherErrors } from "@/types/types";

interface TeachesEditFormProps {
    teache: Teache;
    onSave: (data: TeacherFormEditType, id: number) => void;
    onClose: () => void;
}

const TeachesEditForm: React.FC<TeachesEditFormProps> = ({ teache, onSave, onClose }) => {
    const [formState, setFormState] = useState<TeacherFormEditType>({
        fullname: teache.fullname,
        email: teache.email,
        nomber_phone: teache.nomber_phone,
        specialite: teache.specialite,
        image: teache.image,
        description: teache.description,
    });

    const [errors, setErrors] = useState<CreateTeacherErrors>({});
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(teache.image);

    useEffect(() => {
        setFormState({
            fullname: teache.fullname,
            email: teache.email,
            nomber_phone: teache.nomber_phone,
            specialite: teache.specialite,
            image: teache.image,
            description: teache.description,
        });
        setImagePreviewUrl(teache.image);
    }, [teache]);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [id]: id === "nomber_phone" ? Number(value) : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormState((prev) => ({
                ...prev,
                image: file,
            }));
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: CreateTeacherErrors = {
            fullname: [],
            email: [],
            nomber_phone: [],
            specialite: [],
            image: [],
            description: [],
        };

        if (!formState.fullname) {
            newErrors.fullname.push("Le nom complet est requis.");
            isValid = false;
        }
        if (!formState.email) {
            newErrors.email.push("L'email est requis.");
            isValid = false;
        }
        if (!formState.nomber_phone || isNaN(formState.nomber_phone)) {
            newErrors.nomber_phone.push("Un numéro de téléphone valide est requis.");
            isValid = false;
        }
        if (!formState.specialite) {
            newErrors.specialite.push("La spécialité est requise.");
            isValid = false;
        }
        if (!formState.description) {
            newErrors.description.push("La biographie est requise.");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const updatedFormState = {
                ...formState,
                image: formState.image instanceof File ? formState.image : teache.image,
            };
            onSave(updatedFormState, teache.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
                {imagePreviewUrl && (
                    <div className="mb-4">
                        <img
                            src={imagePreviewUrl}
                            alt="Image actuelle"
                            className="w-32 h-32 object-cover rounded-md border"
                        />
                    </div>
                )}

                <div>
                    <Label htmlFor="fullname">Nom complet</Label>
                    <Input
                        id="fullname"
                        type="text"
                        value={formState.fullname}
                        onChange={handleInputChange}
                        placeholder="Nom complet"
                        className="w-full"
                    />
                    {errors.fullname?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="image">Image</Label>
                    <Input
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                    {errors.image?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Adresse email"
                        className="w-full"
                    />
                    {errors.email?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>

                <div>
                    <Label htmlFor="nomber_phone">Numéro de téléphone</Label>
                    <Input
                        id="nomber_phone"
                        type="number"
                        value={formState.nomber_phone}
                        onChange={handleInputChange}
                        placeholder="Numéro de téléphone"
                        className="w-full"
                    />
                    {errors.nomber_phone?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>

                <div>
                    <Label htmlFor="specialite">Spécialité</Label>
                    <Input
                        id="specialite"
                        type="text"
                        value={formState.specialite}
                        onChange={handleInputChange}
                        placeholder="Spécialité"
                        className="w-full"
                    />
                    {errors.specialite?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>

                

                <div className="sm:col-span-2">
                    <Label htmlFor="description">Biographie</Label>
                    <textarea
                        id="description"
                        value={formState.description}
                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLTextAreaElement>)}
                        placeholder="Écrivez une brève biographie"
                        className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                    {errors.description?.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2">Annuler</Button>
                <Button type="submit" className="px-4 py-2">Enregistrer les modifications</Button>
            </div>
        </form>
    );
};

export default TeachesEditForm;
