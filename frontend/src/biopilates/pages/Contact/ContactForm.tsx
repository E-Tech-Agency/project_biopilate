import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";
import api from "@/lib/api"; // Ensure this path is correct based on your project structure

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state for success status

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target; // Destructure to get id and value
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(""); // Reset status message on submit

    try {
      const response = await api.post("contact/", formData); // Adjust API endpoint if necessary
      if (response.status === 200) {
        setStatusMessage("Votre message a été envoyé avec succès!");
        setIsSuccess(true); // Set success status
        // Reset form fields after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatusMessage(
          "Une erreur est survenue lors de l'envoi de votre message."
        ); // Handle non-200 responses
        setIsSuccess(false); // Reset success status on error
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      setStatusMessage(
        "Une erreur est survenue lors de l'envoi de votre message."
      );
      setIsSuccess(false); // Reset success status on error
    }
  };

  return (
    <div className="py-8 px-4 sm:px-8 bg-white bg-opacity-50 rounded-[20px] w-full min-w-[300px] 2xl:max-w-[640px] max-w-[545px] flex flex-grow mx-auto max-md:bg-opacity-95 shadow-sm">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-5">
          {statusMessage && (
            <div
              className={`text-center font-ebGaramond text-sm sm:text-xl font-bold mt-3 ${
                isSuccess ? "text-burlywood" : "text-red-500"
              }`}
            >
              {statusMessage}
            </div>
          )}
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="name"
          >
            Nom et prénom
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <FaRegUser />
            </span>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="email"
          >
            Adresse Email
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <HiOutlineEnvelope />
            </span>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="phone"
          >
            Numéro de téléphone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
              <LuPhone />
            </span>
            <input
              type="tel" // Change to 'tel' for better mobile experience
              id="phone"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="subject"
          >
            Objet
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="subject"
              className="bg-gray-50 border border-marron text-gray-900 text-sm sm:text-base rounded-md block w-full p-2.5"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <textarea
              id="message"
              className="bg-white border border-gray-300 focus:border-marron focus:ring-marron text-gray-900 text-sm sm:text-base rounded-lg block w-full p-4 transition-all duration-300 ease-in-out shadow-sm focus:outline-none"
              placeholder="Écrivez votre message ici..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="reserver-button flex mx-auto mb-3 flex-col justify-center items-center text-base sm:text-lg font-bold rounded-lg w-full py-2 sm:py-3 bg-bgColor text-marron"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
