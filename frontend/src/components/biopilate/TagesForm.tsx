import { useState } from "react";
import * as React from 'react'; 
interface TagesFormProps {
  initialData?: {
    title?: string;
    status?: string;
  };
  onSave: (data: { title: string; status: string }) => Promise<void>;
  onClose: () => void;
}
  const TagesForm: React.FC<TagesFormProps> = ({ initialData, onSave, onClose }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [status, setStatus] = useState(initialData?.status || "pending");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const data = { title, status };
      console.log("Form Data:", data);
      await onSave(data);
      onClose(); // Optional: Close the form after saving
    };
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un Tage</h2>
  
  {/* Title Input */}
  <div className="mb-4">
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      Titre
    </label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Entrez le titre..."
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    
  </div>

  {/* Status Dropdown */}
  <div className="mb-4">
    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
      Statut
    </label>
    <select
      id="status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Sélectionnez un statut</option>
      <option value="pending">En attente de publication</option>
      <option value="approved">Publiée</option>
    </select>
    
  </div>

  {/* Action Buttons */}
  <div className="flex justify-end space-x-4">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Annuler
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Enregistrer
    </button>
  </div>
</form>

  );
};

export default TagesForm;
