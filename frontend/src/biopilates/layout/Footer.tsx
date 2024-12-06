import { LuPhone } from "react-icons/lu";
import { LiaEnvelope } from "react-icons/lia";
import { PiMapPinLight } from "react-icons/pi";
import { TiSocialFacebook } from "react-icons/ti";
import { RiInstagramFill } from "react-icons/ri";

// Import the logo image
import logoImage from "@/assets/images/biopilate-logo.png";

export default function Footer() {
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Cours", href: "/cours" },
    { label: "Formations", href: "/formations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    { icon: LuPhone, text: "+33 6 50 81 18 92", ariaLabel: "Phone number" },
    {
      icon: LiaEnvelope,
      text: "studio@biopilates.fr",
      ariaLabel: "Email address",
    },
    {
      icon: PiMapPinLight,
      text: "2 Rue Boyer, 75020 Paris, France",
      ariaLabel: "Address",
    },
  ];

  return (
    <footer className="bottom-0 w-full flex justify-center items-center flex-col flex-wrap px-2 sm:py-16 pb-7 bg-bgColor sm:mt-auto">
      <div className="flex sm:justify-center sm:items-center md:gap-4 max-md:flex-col self-center w-[95%] max-w-full px-4 md:pl-8 max-md:max-w-full max-md:ml-4">
        <div className="flex flex-col max-md:w-full grow items-start text-base leading-7 text-neutral-900 max-md:mt-8">
          <img
            loading="lazy"
            src={logoImage}
            alt="Company logo"
            className="max-w-full rounded-full aspect-square w-[103px]"
          />
          <div className="mt-6 text-xs sm:text-base">
            L'Équilibre en Mouvement, la Pureté en Action
          </div>
          {/* social media buttons */}
          <div className="mt-4">
            <button
              className="text-bgColor bg-black rounded-sm text-lg p-1.5 mr-4
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
              className="text-bgColor bg-black rounded-sm text-lg p-1.5"
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

        <div className="flex md:w-[50%] w-full mt-6 sm:mt-8 max-md:max-w-full md:gap-4 max-md:flex-col">
          <nav className="flex md:w-[55%] w-full flex-wrap gap-2 sm:gap-4 text-base max-w-[257px] text-neutral-900">
            <h2 className="text-lg sm:text-xl font-semibold">Menu</h2>
            <ul className="flex flex-wrap grow gap-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="w-[calc(50%-45px)] sm:w-[calc(50%-5px)]"
                >
                  <a href={item.href} className="block text-xs sm:text-base">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <section className="flex flex-col justify-between max-md:w-full w-[72%] grow text-base text-neutral-900 max-md:mt-4">
            <h2 className="text-lg sm:text-xl font-semibold block">Contact</h2>
            <ul className="mt-4 md:mt-5 space-y-3">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 shrink
                "
                >
                  <item.icon
                    className="shrink-0 w-5 h-5"
                    aria-label={item.ariaLabel}
                  />
                  <div className="block text-xs sm:text-base">{item.text}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="relative flex justify-center items-center mt-10 text-[10px] sm:text-sm tracking-tight text-center capitalize text-neutral-900 md:mt-10 w-full">
        <div className="absolute w-full h-px bg-neutral-900" />
        <div className="bg-bgColor z-10 inline-block px-3">
          ©2024.Biopilates Crée et développé par {""}
          <strong>BRAND AND COM</strong>
        </div>
      </div>
    </footer>
  );
}
