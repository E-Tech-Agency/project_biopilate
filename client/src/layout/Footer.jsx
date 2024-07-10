import React from "react";
import { LuPhone } from "react-icons/lu";
import { LiaEnvelope } from "react-icons/lia";
import { PiMapPinLight } from "react-icons/pi";

export default function Footer() {
  const menuItems = [
    "Accueil",
    "A propos",
    "Cours",
    "Formations",
    "Blog",
    "Contact",
  ];
  const contactInfo = [
    { icon: LuPhone, text: "+33 6 50 81 18 92", ariaLabel: "Phone number" },
    { icon: LiaEnvelope, text: "info@email.com", ariaLabel: "Email address" },
    {
      icon: PiMapPinLight,
      text: "2 Rue Boyer, 75020 Paris, France",
      ariaLabel: "Address",
    },
  ];

  return (
    <footer className="absolute bottom-0 w-full p-4 flex flex-col flex-wrap pt-20 pr-16 pb-7 bg-bgColor max-md:pr-5 mt-auto ">
      <div className="self-center w-full max-w-[1310px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start text-base leading-7 text-neutral-900 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d53af1280a382173e4626eea1b95c7e502a15e4538a32ae75980b9d8c1707631?apiKey=bd2f05ff851942b7ba465ac3aba2ff1b&"
                alt="Company logo"
                className="max-w-full rounded-full aspect-square w-[103px]"
              />
              <div className="self-stretch mt-6">
                L'Équilibre en Mouvement, la Pureté en Action
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/426a28c3bcf35cf010b72e8c3551ce7234b6cbe02571fe649248a199df2c7562?apiKey=bd2f05ff851942b7ba465ac3aba2ff1b&"
                alt=""
                className="mt-5 aspect-[2.56] w-[76px]"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
            <div className="mt-1.5 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <nav className="flex flex-col w-[49%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-wrap gap-5 text-base max-w-[257px] text-neutral-900">
                    <div className="w-full">
                      <h2 className="text-xl font-semibold">Menu</h2>
                    </div>
                    {menuItems.map((item, index) => (
                      <div key={index} className="w-[calc(50%-10px)]">
                        <a href="#" className="block">
                          {item}
                        </a>
                      </div>
                    ))}
                  </div>
                </nav>
                <section className="flex flex-col ml-5 w-[51%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-base text-neutral-900 max-md:mt-10">
                    <h2 className="text-xl font-semibold">Contact</h2>
                    <ul className="mt-8 space-y-4">
                      {contactInfo.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <item.icon
                            className="shrink-0 w-5 h-5"
                            aria-label={item.ariaLabel}
                          />
                          <div className="flex-auto">{item.text}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 self-start mt-16 text-sm tracking-tight text-center capitalize text-neutral-900 max-md:flex-wrap max-md:mt-10">
        <div className="shrink-0 my-auto max-w-full h-px border border-solid bg-neutral-900 border-neutral-900 w-[515px]" />
        <div className="flex-auto">
          Copyright by{" "}
          <span className="font-bold text-neutral-900">Brand & COM</span> @ 2024
          All rights reserved
        </div>
      </div>
    </footer>
  );
}
