import React from "react";
import { IoMdSearch } from "react-icons/io";

const navItems = [
  { label: "Accueil", href: "/accueil" },
  { label: "À propos", href: "/a-propos" },
  { label: "Cours", href: "/cours" },
  { label: "Formations", href: "/formations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="flex gap-5 justify-between px-14 py-1.5 w-full border border-solid bg-zinc-50 border-stone-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full font-lato">
      <nav className="flex gap-5 justify-between items-center text-base text-neutral-900 max-md:flex-wrap">
        <a href="/accueil">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a025b06def9b74513c3c582f0417a67b1c7db878178c972a0a43b7662fe94d87?apiKey=bd2f05ff851942b7ba465ac3aba2ff1b&"
            alt=""
            className="shrink-0 self-stretch rounded-full aspect-square w-[81px]"
          />
        </a>
        <ul className="flex gap-5 justify-between self-stretch pr-2.5 my-auto max-md:flex-wrap">
          {navItems.map((item, index) => (
            <li>
              <a
                href={item.href}
                className="justify-center self-start py-1.5 whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <IoMdSearch />
      </nav>
      <div className="flex gap-4 my-auto font-bold text-center text-stone-500">
        <button className="flex gap-2 my-auto text-lg">
          <span className="justify-center my-auto">Se connecter</span>
        </button>
        <button className="flex flex-col justify-center text-base leading-6 rounded-lg">
          <span className="justify-center px-10 py-4 bg-bgColor max-md:px-5">
            Réserver
          </span>
        </button>
      </div>
    </header>
  );
}
