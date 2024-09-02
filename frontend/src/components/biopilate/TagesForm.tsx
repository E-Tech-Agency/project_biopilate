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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pending">En attente de publication</option>
          <option value="approved">Publiée</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
      </div>
    </form>
  );
};

export default TagesForm;
