import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function EditForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier == "true") {
      navigate("/login");
    }
  }, [navigate]);
  // Initial user state
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
    password: "",
  });

  // State for profile image
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State for form interactions
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch user data function
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const res = await api.get("get_one_user/");
      setUser(res.data);
      setImagePreview(res.data.profile_image);
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.message || "Impossible de charger les informations de l'utilisateur";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite.");
        toast.error("Une erreur inconnue s'est produite.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = "La taille de l'image ne doit pas dépasser 5 Mo";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        const errorMsg = "Format d'image non supporté. Utilisez JPEG, PNG, GIF ou WebP";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        return;
      }

      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset previous messages
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    // Validate required fields
    if (!user.first_name || !user.last_name || !user.email) {
      const errorMsg = "Veuillez remplir tous les champs obligatoires";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      const errorMsg = "Veuillez entrer une adresse email valide";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("phone_number", user.phone_number || "");
    
    // Password validation
    if (user.password) {
      if (user.password.length < 8) {
        const errorMsg = "Le mot de passe doit contenir au moins 8 caractères";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        setIsLoading(false);
        return;
      }
      formData.append("password", user.password);
    }

    // Add profile image if selected
    if (profileImageFile) {
      formData.append("profile_image", profileImageFile);
    }

    try {
      await api.patch("update_user/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Refresh user data after successful update
      await fetchUserData();
      
      // Reset password field and file
      setUser(prevUser => ({
        ...prevUser,
        password: "" // Clear the password field
      }));
      setProfileImageFile(null);
      
      // Set success message
      const successMsg = "Votre profil a été mis à jour avec succès";
      setSuccessMessage(successMsg);
      toast.success(successMsg);
    }catch (error) {
      console.error("Failed to fetch user data:", error);
    
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data?.message || "Impossible de charger les informations de l'utilisateur";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite.");
        toast.error("Une erreur inconnue s'est produite.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Error Message Alert */}
      {errorMessage && (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center max-w-md w-full" role="alert">
            <AlertCircle className="mr-2 flex-shrink-0" />
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Success Message Alert */}
      {successMessage && (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center max-w-md w-full" role="alert">
            <CheckCircle className="mr-2 flex-shrink-0" />
            <span className="block sm:inline">{successMessage}</span>
          </div>
        </div>
      )}

      <Card className="flex flex-col md:flex-row shadow-lg rounded-xl bg-gradient-to-r p-6 text-white">
        <div className="md:w-1/3 flex flex-col items-center justify-center relative">
          <div 
            className="relative cursor-pointer group"
            onClick={() => document.getElementById('profile-image-upload')?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="h-48 w-48 object-cover rounded-full shadow-lg mb-4 border-4 border-white group-hover:opacity-70 transition-opacity"
              />
            ) : (
              <div className="h-48 w-48 flex items-center justify-center bg-gray-300 rounded-full mb-4">
                <span className="text-gray-700 text-xl">Pas d'image</span>
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform">
              <Upload size={24} className="text-gray-800" />
            </div>
          </div>
          
          <input
            id="profile-image-upload"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
          
          <h2 className="text-2xl text-marron font-semibold mt-4">
            {user.first_name} {user.last_name}
          </h2>
          <p className="italic text-marron text-lg">{user.email}</p>
        </div>
        
        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8 bg-white rounded-lg p-6 text-gray-800 shadow-md">
          <h3 className="text-3xl font-bold text-center mb-6 gradient-text">
            Modifier le profil
          </h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first-name" className="text-gray-700">
                  Prénom
                </Label>
                <Input
                  id="first-name"
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  placeholder="Jean"
                  required
                  className="border rounded-lg p-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name" className="text-gray-700">
                  Nom
                </Label>
                <Input
                  id="last-name"
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                  required
                  className="border rounded-lg p-2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
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
                <Label htmlFor="phone-number" className="text-gray-700">
                  Numéro de téléphone
                </Label>
                <PhoneInput
                  country={"fr"}
                  value={user.phone_number || ""}
                  onChange={(phone) => setUser({ ...user, phone_number: phone })}
                  inputClass="border rounded-lg p-2 w-full"
                  placeholder="0612345678"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={user.password || ""}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Laisser vide si pas de changement"
                  className="border rounded-lg p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full bg-bgColor text-marron font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Modification en cours...
                </>
              ) : (
                "Modifier"
              )}
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default EditForm;