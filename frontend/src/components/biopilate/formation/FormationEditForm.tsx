import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
   Plus, Save, Eye, EyeOff,
  ChevronUp, ChevronDown, Clock, Check, Trash2,
  FileText, Image
} from "lucide-react";
import { CreateFormation ,FormationLevel} from "@/types/formation";

type Props = {
  initialFormation: CreateFormation;
  onSubmit: (formationData: CreateFormation) => void;
};

const FormationEditForm: React.FC<Props> = ({ initialFormation, onSubmit }) => {
  const [formation, setFormation] = useState(initialFormation);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState("details");
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormation((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormation((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const handleLevelChange = (index: number, field: keyof FormationLevel, value: string | number) => {
    const updatedLevels = formation.levels.map((level, i) => 
      i === index ? { ...level, [field]: value } : level
    );
    setFormation((prev) => ({ ...prev, levels: updatedLevels }));
  };

  const addLevel = () => {
    setFormation((prev) => ({ ...prev, levels: [...prev.levels, { name: "", price: 0 }] }));
  };

  const removeLevel = (index: number) => {
    const updatedLevels = formation.levels.filter((_, i) => i !== index);
    setFormation((prev) => ({ ...prev, levels: updatedLevels }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formation);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  const handleStatusUpdate = (status: "pending" | "published") => {
    setFormation((prev) => ({ ...prev, status }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {previewMode ? "Mode Édition" : "Aperçu"}
          </Button>
          <Badge 
            className={`px-3 py-1 ${
              formation.status === "published" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {formation.status === "published" ? "Publiée" : "En attente"}
          </Badge>
        </div>
        <button 
          onClick={handleSubmit}
          className="flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg py-2 sm:py-3 bg-bgColor text-marron duration-300 ease-in-out transform"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>
      <div className="space-y-6">
        <div className="relative group">
          {previewMode ? (
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{formation.title}</h1>
          ) : (
            <Input
              value={formation.title}
              name="title"
              onChange={handleInputChange}
              className="text-4xl font-bold border-0 border-b-2 rounded-none focus:ring-0 px-0 pb-2"
              placeholder="Titre de la formation"
            />
          )}
        </div>
        <div className="space-y-4">
          <Card className="border-none shadow-lg overflow-hidden transition-all duration-300">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100"
              onClick={() => toggleSection("details")}
            >
              <Badge variant="outline" className="bg-white">
                <Clock className="w-4 h-4 mr-1" />
                Détails
              </Badge>
              {expandedSection === "details" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {expandedSection === "details" && (
            <CardContent className="p-6 space-y-6">
              {previewMode ? (
                <p className="text-gray-600 leading-relaxed">{formation.description}</p>
              ) : (
                <>
                  <div className="space-y-4">
                    <textarea
                      value={formation.description}
                      name="description"
                      onChange={handleInputChange}
                      className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Description détaillée de la formation..."
                    />
                    <Input
                      value={formation.formation_line}
                      name="formation_line"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ligne de formation"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Image className="w-4 h-4" />
                        Image de la formation
                      </label>
                      <input 
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4" />
                        Document PDF
                      </label>
                      <input 
                        type="file"
                        name="pdf_document"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-gray-900">Niveaux de formation</h2>
                      <Button
                        onClick={addLevel}
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter un niveau
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formation.levels.map((level, index) => (
                        <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl">
                          <Input
                            value={level.name}
                            onChange={(e) => handleLevelChange(index, "name", e.target.value)}
                            placeholder="Nom du niveau"
                            className="flex-grow"
                          />
                          <Input
                            type="number"
                            value={level.price}
                            onChange={(e) => handleLevelChange(index, "price", parseFloat(e.target.value))}
                            placeholder="Prix"
                            className="w-32"
                          />
                          <Button
                            onClick={() => removeLevel(index)}
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          )}
          </Card>
          <Card className="border-none shadow-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100"
              onClick={() => toggleSection("status")}
            >
              <Badge variant="outline" className="bg-white">Statut</Badge>
              {expandedSection === "status" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {expandedSection === "status" && (
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={formation.status === "pending" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate("pending")}
                    disabled={previewMode}
                  >
                    <Clock className="w-4 h-4" />
                    En attente
                  </Button>
                  <Button
                    variant={formation.status === "published" ? "default" : "outline"}
                    onClick={() => handleStatusUpdate("published")}
                    disabled={previewMode}
                  >
                    <Check className="w-4 h-4" />
                    Publiée
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormationEditForm;
