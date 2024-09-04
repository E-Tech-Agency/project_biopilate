import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";

export default function ContactForm() {
  return (
    <div>
      <div className="py-8 px-8 bg-white bg-opacity-50 rounded-[20px] max-w-md w-full xl:mr-10 flex flex-grow">
        <form className="max-w-md min-w-[280px] w-full mx-auto">
          <div className="mb-5">
            <label
              className="block font-ebGaramond text-lg font-bold mb-2"
              htmlFor="name"
            >
              Nom et prénom
            </label>
            <div className="mt-1 flex rounded-md shadow-sm ">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
                <FaRegUser />
              </span>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm rounded-none rounded-r-md block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              className="block font-ebGaramond text-lg font-bold mb-2"
              htmlFor="name"
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
                className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm rounded-none rounded-r-md block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              className="block font-ebGaramond text-lg font-bold mb-2"
              htmlFor="name"
            >
              Numéro de téléphone
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg">
                <LuPhone />
              </span>
              <input
                type="number"
                id="email"
                className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm rounded-none rounded-r-md block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              className="block font-ebGaramond text-lg font-bold mb-2"
              htmlFor="name"
            >
              Objet
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-marron bg-gray-50 text-gray-500 text-lg"></span> */}
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-marron text-gray-900 text-sm rounded-md block w-full p-2.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="reserver-button flex mx-auto mb-3 flex-col justify-center items-center text-base font-bold rounded-lg w-full py-2 bg-bgColor text-marron"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
