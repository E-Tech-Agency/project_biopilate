import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

interface CreateCategoryCourseProps {
    onSuccess?: () => void
}

export default function CreateCategoryCours({ onSuccess }: CreateCategoryCourseProps) {
    const [errors, setErrors] = useState("")
    const [category, setCategory] = useState({
        name: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await api.post("cours_category/", category)
            toast.success("Catégorie créée avec succès")
            setCategory({ name: "" })
            setErrors("")

            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data.name[0] || "Une erreur s'est produite")
            }
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto ">
            <CardHeader>
                <CardTitle>Ajouter une Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        value={category.name}
                        placeholder="Nom de la catégorie"
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full"
                    />
                    {errors && (
                        <CardDescription className="text-red-500">
                            {errors}
                        </CardDescription>
                    )}
                    <button type="submit"  className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform">
                        Ajouter la Catégorie
                    </button>
                </form>
            </CardContent>
        </Card>
    )
}