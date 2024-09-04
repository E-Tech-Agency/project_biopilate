import React from "react";
import { LuPhone } from "react-icons/lu";
import { PiMapPinLight } from "react-icons/pi";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div className="mt-4 mx-8 md:mx-12 mb-12">
      <div className="relative mt-4 min-h-[736px] flex justify-center items-center">
        <div className="absolute inset-0 size-full">
          <img
            src={require("../../assets/images/contact-bg.jpg")}
            alt="Contact bg"
            className="size-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black from-black rounded-lg opacity-25"></div>
        {/* contact info */}
        <section className="relative flex flex-wrap m-8 justify-center lg:justify-between items-center gap-10">
          <div className="flex flex-col justify-center items-start gap-4 text-white font-lato max-w-[80%] lg:max-w-[35%]">
            <p className="text-5xl font-bold font-ebGaramond">
              Contactez-nous{" "}
            </p>
            <p className="text-xl leading-7 font-normal mb-6">
              Votre voyage vers l’harmonie commence ici. Prenez le premier pas
              vers un équilibre parfait entre corps et esprit en nous contactant
              dès aujourd’hui. Que vous soyez un débutant curieux ou un
              passionné de Pilates, notre équipe dévouée est prête à vous
              guider.
            </p>
            <div className="flex gap-4">
              <LuPhone className="w-6 h-6" />
              <p className="text-lg">01 23 45 67 89</p>
            </div>
            <div className="flex gap-4">
              <PiMapPinLight className="w-6 h-6" />
              <p className="text-lg">2 Rue Boyer, 75020 Paris, France</p>
            </div>
          </div>
          {/* contact form */}

          <ContactForm />
        </section>
      </div>
    </div>
  );
}
