import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, 
  Plus, 
  Save, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ChevronUp, 
  ChevronDown,
  Clock,
  Check,
  X,
  Trash2
} from "lucide-react";
import { FormationFormType, FormationCategoryType, OptionFormType } from "@/types/types";

type Props = {
  initialFormation: FormationFormType;
  initialCategories: FormationCategoryType[];
  allOptions: OptionFormType[];
  onSubmit: (formationData: FormationFormType, categories: FormationCategoryType[]) => void;
};
const FormationEditForm: React.FC<Props> = ({ initialFormation, initialCategories, allOptions, onSubmit }) => {
  const [formation, setFormation] = useState(initialFormation);
  const [formationCategories, setFormationCategories] = useState(initialCategories);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState("details");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (index: number, field: string, value: string | number) => {
    const updatedCategories = [...formationCategories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setFormationCategories(updatedCategories);
  };

  const addCategory = () => {
    setFormationCategories((prev) => [
      ...prev,
      { formation: formation.id, option: 0, price: 0, created_at: new Date(), updated_at: new Date() },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formation, formationCategories);
  };

 

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Top Control Bar */}
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
              formation.status === "approved" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {formation.status === "approved" ? "Publiée" : "En attente"}
          </Badge>
        </div>
        <Button 
          onClick={handleSubmit}
         className=" flex reserver-button text-sm sm:text-base font-bold font-lato rounded-lg  py-2 sm:py-3 bg-bgColor text-marron  duration-300 ease-in-out transform"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>

      <div className="space-y-6">
        {/* Formation Title Section */}
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
          <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="outline" className="bg-white">
              <Pencil className="w-3 h-3 mr-1" />
              {previewMode ? "Éditer" : "Édition"}
            </Badge>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {/* Details Section */}
          <Card className="border-none shadow-lg overflow-hidden transition-all duration-300">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100"
              onClick={() => toggleSection("details")}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  <Clock className="w-4 h-4 mr-1" />
                  Détails
                </Badge>
              </div>
              {expandedSection === "details" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
            {expandedSection === "details" && (
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="relative group">
                    {previewMode ? (
                      <p className="text-gray-600">{formation.description}</p>
                    ) : (
                      <textarea
                        value={formation.description}
                        name="description"
                        onChange={handleInputChange}
                        className="w-full min-h-[120px] p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                        placeholder="Description de la formation"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Options Section */}
          <Card className="border-none shadow-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
              onClick={() => toggleSection("options")}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  Options ({formationCategories.length})
                </Badge>
              </div>
              {expandedSection === "options" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
            {expandedSection === "options" && (
              <CardContent className="p-4">
                <div className="space-y-4">
                  {formationCategories.length > 0 ? (
                    <div className="grid gap-4">
                      {formationCategories.map((cat, idx) => (
                        <div key={idx} className="relative group">
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="flex-grow grid grid-cols-2 gap-4">
                              <select
                                className="p-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                                value={cat.option}
                                onChange={(e) => handleCategoryChange(idx, "option", parseInt(e.target.value))}
                                disabled={previewMode}
                              >
                                <option value="">Sélectionner une option</option>
                                {allOptions.map((opt) => (
                                  <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                  </option>
                                ))}
                              </select>
                              <div className="relative">
                                <Input
                                  type="number"
                                  value={cat.price}
                                  onChange={(e) => handleCategoryChange(idx, "price", parseFloat(e.target.value))}
                                  className="pr-12"
                                  disabled={previewMode}
                                  placeholder="Prix"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                  TND
                                </span>
                              </div>
                            </div>
                            {!previewMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCategory(idx)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-gray-500 bg-gray-50 p-8 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>Aucune option configurée</span>
                    </div>
                  )}
                  {!previewMode && (
                    <Button
                      type="button"
                      onClick={addCategory}
                      variant="outline"
                      className="w-full mt-4 border-dashed"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une option
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Status Section */}
          <Card className="border-none shadow-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100"
              onClick={() => toggleSection("status")}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  Statut
                </Badge>
              </div>
              {expandedSection === "status" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
            {expandedSection === "status" && (
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={formation.status === "pending" ? "default" : "outline"}
                    className={`flex items-center justify-center gap-2 ${
                      formation.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""
                    }`}
                    onClick={() => handleInputChange({ target: { name: "status", value: "pending" } })}
                    disabled={previewMode}
                  >
                    <Clock className="w-4 h-4" />
                    En attente
                  </Button>
                  <Button
                    variant={formation.status === "approved" ? "default" : "outline"}
                    className={`flex items-center justify-center gap-2 ${
                      formation.status === "approved" ? "bg-green-100 text-green-800" : ""
                    }`}
                    onClick={() => handleInputChange({ target: { name: "status", value: "approved" } })}
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