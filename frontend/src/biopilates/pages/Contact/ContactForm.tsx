
import { FaRegUser } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuPhone } from "react-icons/lu";

export default function ContactForm() {
  return (
    <div className="py-8 px-4 sm:px-8 bg-white bg-opacity-50 rounded-[20px] w-full max-w-md xl:max-w-lg flex flex-grow min-w-[300px] mx-auto">
      <form className="w-full">
        <div className="mb-5">
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
              type="number"
              id="phone"
              className="bg-gray-50 border border-marron border-l-0 text-gray-900 text-sm sm:text-base rounded-none rounded-r-md block w-full p-2.5"
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
              required
            />
          </div>
        </div>
        <div className="mb-5">
  <label
    className="block font-ebGaramond text-sm sm:text-xl font-bold mb-2 "
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