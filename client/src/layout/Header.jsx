import { React, useState } from "react";

import { IoMdSearch, IoIosMenu } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";

const navItems = [
  { label: "Accueil", href: "/accueil" },
  { label: "À propos", href: "/a-propos" },
  { label: "Cours", href: "/cours" },
  { label: "Formations", href: "/formations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex justify-center">
      <button onClick={() => setShowSearch(!showSearch)}>
        <IoMdSearch className="text-2xl text-stone-500" />
      </button>
      {showSearch && (
        <div className="">
          {/* Search Bar */}
          <input type="text" className="" placeholder="Search..." />
          {/* Recent Search Items */}
          <div className="">
            <div>Item 1</div>
            <div>Item 2</div>
            {/* Add more items as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex gap-5 justify-between items-center px-14 py-1.5 w-full border border-solid bg-white border-bgColor md:flex-wrap max-md:border-none max-md:px-5 max-md:max-w-full font-lato">
      <nav className="flex gap-5 items-center text-neutral-900 max-md:flex-wrap">
        <ul className="flex gap-5 justify-between items-center max-md:flex-wrap">
          <li>
            <a href="/accueil">
              <img
                loading="lazy"
                src={require("../Images/biopilate-logo.png")}
                alt="Logo"
                className="rounded-full w-20"
              />
            </a>
          </li>
          <ul
            className={`flex gap-5 justify-between items-center max-md:flex-wrap ${
              isMenuOpen ? "flex flex-nowrap" : "hidden"
            }md:flex`}
          >
            {navItems.map((item, index) => (
              <li>
                <a
                  href={item.href}
                  className={`py-1.5 whitespace-nowrap ${
                    window.location.pathname === item.href
                      ? "custom-underline"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </ul>
      </nav>

      <div className="flex justify-center items-center gap-2">
        <SearchBar />
        <div className="flex gap-4 pl-auto font-bold text-center text-stone-500">
          <button className="flex items-center justify-center gap-3 my-auto text-lg">
            <LuUserCircle2 className="text-2xl" />
            <div className="max-md:hidden">Se connecter</div>
          </button>
          <button className="flex flex-col justify-center text-base leading-6 rounded-lg px-10 py-4 bg-bgColor max-md:hidden">
            Réserver
          </button>
        </div>

        <button
          className="sm:hidden" // Hide on screens larger than `md`
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Icon or text to indicate menu toggle */}
          <IoIosMenu className="text-4xl text-stone-500" />
        </button>
      </div>
    </header>
  );
}
