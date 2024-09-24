import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
        profile_image: ""  
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
        <Card className="mt-4 mx-auto  shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Modifier le profil</CardTitle>
                <CardDescription>
                    Modifiez les informations de votre profil
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <CardContent>
                    <div className="grid gap-4">
                        {imagePreview && (
                            <div className="mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className=" h-32 object-cover rounded-md border border-gray-300"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Prénom</Label>
                                <Input 
                                    id="first-name" 
                                    value={user.first_name} 
                                    onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
                                    placeholder="Jean" 
                                    required 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Nom</Label>
                                <Input 
                                    id="last-name" 
                                    value={user.last_name} 
                                    onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone-number">Numéro de téléphone</Label>
                            <Input
                                id="phone-number"
                                value={user.phone_number || ""}
                                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                                placeholder="0612345678"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="profile-image">Image de profil</Label>
                            <Input
                                id="profile-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Modifier
                        </Button>
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}
