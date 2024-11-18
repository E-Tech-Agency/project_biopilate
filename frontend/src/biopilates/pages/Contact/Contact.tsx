import { LuPhone } from "react-icons/lu";
import { LuClock } from "react-icons/lu";

import { PiMapPinLight } from "react-icons/pi";
import { TiSocialFacebook } from "react-icons/ti";
import { RiInstagramFill } from "react-icons/ri";
import ContactForm from "./ContactForm";
import contactBg from "@/assets/images/contact-bg.jpg"; // Import the image here

export default function Contact() {
  return (
    <div className="mt-4 mx-2 md:mx-12 mb-12">
      <div className="relative mt-4 min-h-[736px] flex justify-center items-center">
        <div className="absolute inset-0 size-full">
          <img
            src={contactBg} // Use the imported image here
            alt="Contact bg"
            className="size-full object-cover max-md:max-h-[500px]"
          />
        </div>
        <div className="absolute inset-0 bg-black from-black rounded-lg opacity-50 max-md:max-h-[500px]"></div>
        {/* contact info */}
        <section className="relative flex max-lg:flex-wrap m-8 md:m-20 justify-center lg:justify-between items-center gap-12">
          <div className="flex flex-col justify-center items-start gap-4 text-white font-lato max-w-[90%] lg:max-w-[35%]">
            <p className="text-3xl md:text-5xl font-bold font-ebGaramond">
              Contactez-nous{" "}
            </p>
            <p className="text-sm md:text-xl md:leading-7 font-normal mb-6">
              Votre voyage vers l’harmonie commence ici. Prenez le premier pas
              vers un équilibre parfait entre corps et esprit en nous contactant
              dès aujourd’hui. Que vous soyez un débutant curieux ou un
              passionné de Pilates, notre équipe dévouée est prête à vous
              guider.
            </p>
            <div className="flex gap-4">
              <LuClock className="w-4 h-4 md:w-6 md:h-6" />
              <p className="text-sm md:text-lg">
                Du Lundi à Dimanche : du 8h à 21h
              </p>
            </div>
            <div className="flex gap-4">
              <LuPhone className="w-4 h-4 md:w-6 md:h-6" />
              <p className="text-sm md:text-lg">01 23 45 67 89</p>
            </div>
            <div className="flex gap-4">
              <PiMapPinLight className="w-4 h-4 md:w-6 md:h-6" />
              <p className="text-sm md:text-lg">
                2 Rue Boyer, 75020 Paris, France
              </p>
            </div>

            {/* social media buttons */}
            <div className="">
              <button
                className="text-marron bg-white rounded-sm border border-marron text-lg p-1.5 mr-4
                "
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/STUDIOBIOPILATESPARIS",
                    "_blank"
                  );
                }}
              >
                <TiSocialFacebook />
              </button>
              <button
                className="text-marron bg-white rounded-sm border border-marron text-lg p-1.5"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/biopilates_studio_paris/",
                    "_blank"
                  );
                }}
              >
                <RiInstagramFill />
              </button>
            </div>
          </div>
          {/* contact form */}

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
