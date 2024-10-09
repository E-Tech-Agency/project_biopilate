import { Button } from "@/components/ui/button";
import {
    Card,
  
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

export function EditForm() {
    const [user, setUser] = useState<User>({
        auth_provider: "", 
        date_joined: "", 
        email: "", 
        first_name: "", 
        id: 0, 
        is_active: false, 
        is_staff: false,
        is_superuser: false,
        is_supplier: false,
        is_verified: false,
        last_name: "", 
        phone_number: "",  
        profile_image: "",
        password:"",
    });
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);  
    const [imagePreview, setImagePreview] = useState<string | null>(null);  // State for image preview

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("get_one_user/");
                setUser(res.data);
                setImagePreview(res.data.profile_image);  // Set initial image preview
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
        fetchUser();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);  // Set image preview
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("first_name", user.first_name);
        formData.append("last_name", user.last_name);
        formData.append("phone_number", user.phone_number || "");
        formData.append("password", user.password || "");
        if (profileImageFile) {
            formData.append("profile_image", profileImageFile);
        }

        try {
            const res = await api.patch("update_user/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res.data);
            toast.success("Les informations de votre profil ont été modifiées avec succès.");
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };

    return (
        <Card className="flex flex-col md:flex-row shadow-lg rounded-xl bg-gradient-to-r  bg-bgColor    p-6 text-white mx-auto w-full max-w-4xl">
        <div className="md:w-1/3 flex flex-col items-center justify-center">
            {imagePreview ? (
                <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="h-48 w-48 object-cover rounded-full shadow-lg mb-4 border-4 border-white" 
                />
            ) : (
                <div className="h-48 w-48 flex items-center justify-center bg-gray-300 rounded-full mb-4">
                    <span className="text-gray-700 text-xl">No Image</span>
                </div>
            )}
            <h2 className="text-2xl text-marron font-semibold">{user.first_name} {user.last_name}</h2>
            <p className="italic text-marron text-lg">{user.email}</p>
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8 bg-white rounded-lg p-6 text-gray-800 shadow-md">
            <h3 className="text-3xl font-bold text-center mb-6 gradient-text">Modifier le profil</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name" className="text-gray-700">Prénom</Label>
                        <Input 
                            id="first-name" 
                            value={user.first_name} 
                            onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
                            placeholder="Jean" 
                            required 
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name" className="text-gray-700">Nom</Label>
                        <Input 
                            id="last-name" 
                            value={user.last_name} 
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
                            required 
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone-number" className="text-gray-700">Numéro de téléphone</Label>
                        <Input
                            id="phone-number"
                            value={user.phone_number || ""}
                            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                            placeholder="0612345678"
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="profile-image" className="text-gray-700">Image de profil</Label>
                        <Input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Entrez votre mot de passe"
                            className="border rounded-lg p-2"
                        />
                    </div>
                </div>
                <Button 
                    type="submit"  
                    className="mt-6 bg-bgColor text-marron font-bold py-2 px-4 rounded-lg "
                >
                    Modifier
                </Button>
            </form>
        </div>
    </Card>
    
    

    );
}
