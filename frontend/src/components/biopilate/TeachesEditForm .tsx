import api from "@/lib/api";
import { Teache } from "@/types/types";
import {  useState } from "react";

 
export default function TeachesEditForm ({ teache, onSave, onClose }: { teache: Teache, onSave: (updatedTeache: Teache) => void, onClose: () => void })  {
    const [fullname, setFullname] = useState(teache.fullname);
    const [email, setEmail] = useState(teache.email);
    const [nomberPhone, setNomberPhone] = useState(teache.nomber_phone);
    const [specialite, setSpecialite] = useState(teache.specialite);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTeache = {
            ...teache,
            fullname,
            email,
            nomber_phone: nomberPhone,
            specialite,
        };
        console.log("Updated Teache Data:", updatedTeache);
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("nomber_phone", nomberPhone);
    formData.append("specialite", specialite);

    if (image) {
        formData.append("image", image); // Ensure image is appended if it exists
    }

    console.log("Form Data:", formData);

    try {
        await onSave(formData, teache.id);
    } catch (error) {
        console.error("Error saving Instructeur", error);
    }
    };
   
   
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="mb-4 items-center  ">Modifier   Instructeur</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Prénom et Nom</label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Numéro Téléphone</label>
                <input
                    type="text"
                    value={nomberPhone}
                    onChange={(e) => setNomberPhone(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                <input
                    type="text"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
    type="file"
    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
    className="mt-1 block w-full"
/>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
            </div>
        </form>
    );
};
