import { LuPhone } from "react-icons/lu";
import { LiaEnvelope } from "react-icons/lia";
import { PiMapPinLight } from "react-icons/pi";

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
    <footer className="bottom-0 w-full flex justify-center items-center flex-col flex-wrap px-2 sm:px-2 sm:py-16 pb-7 bg-bgColor max-md:pr-5 sm:mt-auto">
      <div className="flex sm:justify-center sm:items-center gap-5 max-md:flex-col max-md:gap-0 self-center w-full max-w-[1310px] px-4 sm:pr-12 pl-8 max-md:max-w-full max-md:ml-4">
        <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start text-base leading-7 text-neutral-900 max-md:mt-10">
            <img
              loading="lazy"
              src={logoImage}
              alt="Company logo"
              className="max-w-full rounded-full aspect-square w-[103px]"
            />
            <div className="self-stretch mt-6 text-xs sm:text-base">
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
        <div className="flex ml-5 w-[50%] max-md:ml-0 max-md:w-full mt-6 sm:mt-8 max-md:max-w-full gap-5 max-md:flex-col max-md:gap-0">
          <nav className="flex w-[49%] max-md:ml-0 max-md:w-full flex-wrap gap-2 sm:gap-4 text-base max-w-[257px] text-neutral-900">
            <h2 className="text-lg sm:text-xl font-semibold">Menu</h2>
            <ul className="flex flex-wrap gap-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="w-[calc(50%-45px)] sm:w-[calc(50%-15px)]"
                >
                  <a href={item.href} className="block text-xs sm:text-base">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <section className="flex flex-col justify-between md:ml-5 max-md:w-full grow text-base text-neutral-900 max-md:mt-4">
            <h2 className="text-lg sm:text-xl font-semibold block">Contact</h2>
            <ul className="mt-4 md:mt-5 space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex gap-3">
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
      <div className="flex items-center gap-2 lg:gap-4 md:gap-5 mt-10 text-xs tracking-tight text-center capitalize text-neutral-900 md:flex-row md:justify-center md:mt-10">
        <div className="shrink-0 mt-1 max-w-full h-px bg-neutral-900 w-[50px] md:w-16 lg:w-[410px] xl:w-[450px] 2xl:w-[730px]" />
        <div className="flex-auto">
          Copyright by{" "}
          <span className="font-bold text-neutral-900">Brand & COM</span> @ 2024
          All rights reserved
        </div>
        <div className="shrink-0 mt-1 max-w-full h-px bg-neutral-900 w-[50px] md:w-16 lg:w-[410px] xl:w-[450px] 2xl:w-[730px]" />
      </div>
    </footer>
  );
}
