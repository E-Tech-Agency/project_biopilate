import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CoursePlanning, SessionPlanning } from "@/types/types";
import { ImagePlus, X, Save, AlertCircle } from "lucide-react";
import api from "@/lib/api";

interface PlanningEditModalProps {
  planningId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function PlanningEditModal({
  planningId,
  isOpen,
  onClose,
  onSave,
}: PlanningEditModalProps) {
  const [formData, setFormData] = useState<CoursePlanning | null>(null);
  const [sessions, setSessions] = useState<SessionPlanning[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (planningId) {
      const fetchPlanning = async () => {
        try {
          const res = await api.get(`course-list-planning/${planningId}/`);
          setFormData(res.data);
          //get session by courseId !!!
          const sessionsRes = await api.get(`session-detail/?course=${planningId}/sessions/`);
          setSessions(sessionsRes.data);
        } catch (error) {
          console.error("Error fetching planning or sessions", error);
          setError("Error fetching planning data.");
        }
      };
      fetchPlanning();
    } else {
      setFormData(null);
      setSessions([]);
    }
  }, [planningId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? {
        ...prevData,
        [name]: name === "session" ? parseInt(value) : value,
      } : null
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (planningId && formData) {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("status", formData.status);
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        await api.put(`course-list-planning/${planningId}/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onSave();
      }
    } catch (error) {
      console.error("Error updating planning", error);
      setError("Error updating planning. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-bgColor to-bgColor/60">
          <DialogTitle className="text-2xl font-bold text-marron">
            Modifier le Planning
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="mx-6 mt-4 flex items-center gap-2 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="px-6">
            <Card className="border-none shadow-none">
              <CardContent className="p-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Image du cours</Label>
                    <div className="relative group">
                      <div className="aspect-video rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
                        {(imagePreview || formData?.image) ? (
                          <div className="w-full h-full relative group">
                            <img
                              src={imagePreview || formData?.image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-white border-white hover:bg-white/20"
                                onClick={() => document.getElementById('image-upload')?.click()}
                              >
                                <ImagePlus className="w-4 h-4 mr-2" />
                                Changer l'image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-6">
                            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('image-upload')?.click()}
                              >
                                Sélectionner une image
                              </Button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                          </div>
                        )}
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Fields Section */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Titre du cours
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData?.title || ""}
                        onChange={handleChange}
                        className="w-full shadow-sm"
                        placeholder="ex: Pilates Débutant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="decription_link" className="text-sm font-medium text-gray-700">
                       Line de planning
                      </Label>
                      <Input
                        id="decription_link"
                        name="decription_link"
                        value={formData?.decription_link || ""}
                        onChange={handleChange}
                        className="w-full shadow-sm"
                        placeholder="ex: Pilates Débutant"
                      />
                    </div>


                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData?.description || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-bgColor focus:ring-bgColor"
                        placeholder="Décrivez le contenu du cours..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                        Statut du cours
                      </Label>
                      <select
                        id="status"
                        name="status"
                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-bgColor focus:ring-bgColor"
                        value={formData?.status || ""}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner un statut</option>
                        <option value="pending">En attente de publication</option>
                        <option value="confirmed">Publié</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="min-w-[100px]"
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button
              type="submit"
              className="min-w-[100px] bg-bgColor text-marron hover:bg-bgColor/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}