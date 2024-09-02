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
        });
        setImagePreviewUrl(teache.image);
    }, [teache]);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setImagePreviewUrl(URL.createObjectURL(file)); // Update preview URL
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: CreateTeacherErrors = {};

        // Initialize errors arrays
        newErrors.fullname = [];
        newErrors.email = [];
        newErrors.nomber_phone = [];
        newErrors.specialite = [];
        newErrors.image = [];

        if (!formState.fullname) {
            newErrors.fullname.push("Full name is required.");
            isValid = false;
        }
        if (!formState.email) {
            newErrors.email.push("Email is required.");
            isValid = false;
        }
        if (!formState.nomber_phone || isNaN(formState.nomber_phone)) {
            newErrors.nomber_phone.push("Valid phone number is required.");
            isValid = false;
        }
        if (!formState.specialite) {
            newErrors.specialite.push("Speciality is required.");
            isValid = false;
        }
        // Add more validation rules as needed

        // Update state directly with errors
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
                        <img src={imagePreviewUrl} alt="Current" className="w-32 h-32 object-cover" />
                    </div>
                )}
                <div>
                    <Label htmlFor="fullname">Prénom et Nom</Label>
                    <Input
                        id="fullname"
                        type="text"
                        value={formState.fullname}
                        onChange={handleInputChange}
                        placeholder="Prénom et Nom"
                        className="w-full"
                    />
                    {errors.fullname && errors.fullname.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1">{error}</p>
                    ))}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Instructeur Email"
                        className="w-full"
                    />
                    {errors.email && errors.email.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1">{error}</p>
                    ))}
                </div>
                <div>
                    <Label htmlFor="nomber_phone">Numéro Téléphone</Label>
                    <Input
                        id="nomber_phone"
                        type="number"
                        value={formState.nomber_phone}
                        onChange={handleInputChange}
                        placeholder="Numéro Téléphone"
                        className="w-full"
                    />
                    {errors.nomber_phone && errors.nomber_phone.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1">{error}</p>
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
                    {errors.specialite && errors.specialite.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1">{error}</p>
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
                    {errors.image && errors.image.map((error, index) => (
                        <p key={index} className="text-red-500 mt-1">{error}</p>
                    ))}
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
                <Button type="submit" className="w-full" size="lg">Mettre à jour</Button>
            </div>
        </form>
    );
};

export default TeachesEditForm;
