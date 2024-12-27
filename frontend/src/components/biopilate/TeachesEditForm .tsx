import { useState, useEffect } from "react";

import { Teache, TeacherFormEditType, CreateTeacherErrors } from "@/types/types";
import { User, Camera, Mail, Phone, Briefcase, FileText } from 'lucide-react';

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
        <div className=" items-center justify-center" >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mettre à jour le profil</h2>
          <p className="text-gray-500">Modifiez vos informations personnelles</p>
        </div>
  
        <form onSubmit={handleSubmit} className=" flex space-y-6" encType="multipart/form-data">
          <div className="flex flex-col items-center mb-6">
            
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-blue-100 overflow-hidden shadow-md">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-300">
                    <User size={80} />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 m-2 cursor-pointer hover:bg-blue-600">
                  <Camera size={20} />
                  <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {errors.image?.map((error, index) => (
              <p key={index} className="text-red-500 mt-2 text-sm">{error}</p>
            ))}
          </div>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <User className="mr-2 text-blue-500" size={18} />
                Nom complet
              </label>
              <input
                id="fullname"
                type="text"
                value={formState.fullname}
                onChange={handleInputChange}
                placeholder="Entrez votre nom complet"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.fullname?.map((error, index) => (
                <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
              ))}
            </div>
  
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <Mail className="mr-2 text-blue-500" size={18} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Votre adresse email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.email?.map((error, index) => (
                <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
              ))}
            </div>
  
            <div>
              <label htmlFor="nomber_phone" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <Phone className="mr-2 text-blue-500" size={18} />
                Numéro de téléphone
              </label>
              <input
                id="nomber_phone"
                type="tel"
                value={formState.nomber_phone}
                onChange={handleInputChange}
                placeholder="Votre numéro de téléphone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.nomber_phone?.map((error, index) => (
                <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
              ))}
            </div>
  
            <div>
              <label htmlFor="specialite" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <Briefcase className="mr-2 text-blue-500" size={18} />
                Spécialité
              </label>
              <input
                id="specialite"
                type="text"
                value={formState.specialite}
                onChange={handleInputChange}
                placeholder="Votre domaine d'expertise"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.specialite?.map((error, index) => (
                <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
              ))}
            </div>
  
            <div className="md:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <FileText className="mr-2 text-blue-500" size={18} />
                Biographie
              </label>
              <textarea
                id="description"
                value={formState.description}
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLTextAreaElement>)}
                placeholder="Écrivez une brève biographie"
                className="w-full px-4 py-2 h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
              />
              {errors.description?.map((error, index) => (
                <p key={index} className="text-red-500 mt-1 text-sm">{error}</p>
              ))}
            </div>

          <div className="flex justify-end space-x-4">
    <button 
        type="button" 
        onClick={onClose} 
        className="px-6 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
    >
        Annuler
    </button>
    <button 
        type="submit" 
        className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"    >
        Enregistrer les modifications
    </button>
</div>
          </div>
  

        </form>
      </div>
    );
};

export default TeachesEditForm;
