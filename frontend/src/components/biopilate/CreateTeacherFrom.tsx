import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateTeacherErrors, TeacherFormType } from "@/types/types"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import apiCreateTeache from "@/lib/apiCreateTeache"
import api from "@/lib/api"
import axios from "axios"
import { toast } from "sonner"


export default function CreateTeacherFrom() {
    
    const [errors, setErrors] = useState<CreateTeacherErrors>({});
    const [teache, setTeache] = useState<TeacherFormType>({
        fullname: "",
        email: "",
        nomber_phone: 0,
        specialite: "",
        image: null,
    });
    
    

   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', teache.fullname);
        formData.append('email', teache.email);
        formData.append('specialite', teache.specialite);
        formData.append('nomber_phone', teache.nomber_phone.toString());
        
        if (teache.image) {
            formData.append('image', teache.image);
        }

        try {
            await apiCreateTeache.post("teaches/", formData);
            setTeache({
                fullname: "",
                email: "",
                nomber_phone: 0,
                specialite: "",
                image: null,
            })
            toast.success("Instructeur created")
        } catch (error) {
            if(axios.isAxiosError(error)){
                const errorsFromDb = error.response?.data;
                console.log(errorsFromDb);
                toast.error(errorsFromDb.error)
                if(errorsFromDb.error){
                    console.log("errorrrrrrrrrrr");
                    
                    setErrors({...errors,image:errorsFromDb.error})
                }
                setErrors(errorsFromDb);
            }
        }
    };

    return (
        <Card className="w-min">
            <CardHeader>
                <CardTitle>Ajouter un Instructeur</CardTitle>
               
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="fullname">Prénom et Nom <br />{errors.fullname && <li className="text-red-500 mt-2">{errors.fullname}</li>}</Label>
                            <Input
                                id="fullname"
                                type="text"
                                className="w-full"
                                placeholder="Prénom et Nom"
                                onChange={(e) => setTeache({ ...teache, fullname: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="email">Email <br />{errors.email && <li className="text-red-500 mt-2">{errors.email}</li>}</Label>
                            <Input
                                id="email"
                                placeholder="Intructeur Email"
                                className="w-full"
                                onChange={(e) => setTeache({ ...teache, email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-6 items-center">
                            <div className="flex flex-row justify-center gap- items-center">
                                <Label htmlFor="nomber_phone">numéro téléphone {errors.nomber_phone && <li className="text-red-500 mt-1">{errors.nomber_phone}</li>}</Label>
                                <Input
                                    id="nomber_phone"
                                    type="number"
                                    className="w-25"
                                    placeholder="numéro téléphone"
                                    onChange={(e) => setTeache({ ...teache, nomber_phone: Number(e.target.value) })}
                                    value={teache.nomber_phone}
                                />
                                  <Label htmlFor="specialite">spécialité {errors.specialite && <li className="text-red-500 mt-1">{errors.specialite}</li>}</Label>
                                <Input
                                    id="specialite"
                                    type="text"
                                    className="w-25"
                                    placeholder="spécialité"
                                    onChange={(e) => setTeache({ ...teache, specialite:e.target.value })}
                                    
                                />
                                
                                
                               
                            </div>
                            <div className="grid gap-3">
                            <Label htmlFor="photo"> Ajouter un image </Label>
                                
                                <Input
                                    id="image"
                                    type="file"
                                    className="w-full"
                                    onChange={(e) => setTeache({ ...teache, image: e.target.files[0] })}
                                />
                            </div>
                            <div>
                                <Button type="submit" className="w-44" size={"lg"}>Ajouter</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
