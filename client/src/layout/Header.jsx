import { React, useState } from "react";

import { IoMdSearch, IoIosMenu } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Cours", href: "/cours" },
  { label: "Formations", href: "/formations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      {!showSearch && (
        <button className="py-7" onClick={() => setShowSearch(!showSearch)}>
          <IoMdSearch className="text-2xl text-stone-500" />
        </button>
      )}
      {showSearch && (
        <div>
          <div className="flex flex-row justify-center items-center">
            {/* Search Bar */}
            <input
              type="text"
              className="border-b border-gray-300 focus:border-gray-500 outline-none px-4 py-2"
              placeholder="Search..."
            />
            <button className="py-7" onClick={() => setShowSearch(!showSearch)}>
              <IoMdSearch className="text-2xl text-stone-500" />
            </button>
          </div>

          {/* Recent Search Items */}
          <div className="">
            <div>Item 1</div>
            <div>Item 2</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="flex gap-5 justify-between items-center px-14 py-1.5 w-full border-b border-solid bg-white border-bgColor md:flex-wrap max-md:border-none max-md:px-5 max-md:max-w-full font-lato">
        {/* Navbar */}
        <div className="flex gap-7">
          <nav className="mx-auto gap-6 flex items-center">
            <a href="/" className=" text-2xl">
              <img
                loading="lazy"
                src={require("../images/biopilate-logo.png")}
                alt="Logo"
                className="rounded-full w-20"
              />
            </a>
            <div className="hidden md:flex gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`py-1.5 ${
                    window.location.pathname === item.href
                      ? "custom-underline"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Search Bar */}
          {/* <SearchBar /> */}

          <div className="flex flex-col justify-center">
            {!showSearch && (
              <button
                className="py-7"
                onClick={() => setShowSearch(!showSearch)}
              >
                <IoMdSearch className="text-2xl text-stone-500" />
              </button>
            )}
            {showSearch && (
              <div>
                <div className="flex flex-row justify-center items-center">
                  {/* Search Bar */}
                  <input
                    type="text"
                    className="border-b border-gray-300 focus:border-gray-500 outline-none px-4 py-2"
                    placeholder="Search..."
                  />
                  <button
                    className="py-7"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <IoMdSearch className="text-2xl text-stone-500" />
                  </button>
                </div>

                {/* Recent Search Items */}
                <div className="">
                  <div>Item 1</div>
                  <div>Item 2</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex gap-4 pl-auto font-bold text-center text-stone-500">
            <button className="flex items-center justify-center gap-3 my-auto text-lg">
              <LuUserCircle2 className="text-2xl" />
              <div className="max-md:hidden">Se connecter</div>
            </button>
            <button className="flex flex-col justify-center text-base leading-6 rounded-lg px-10 py-4 bg-bgColor max-md:hidden">
              Réserver
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="">
            <IoIosMenu className="text-4xl text-stone-500" />
          </button>
        </div>
        {/* Hamburger Menu */}
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex items-center justify-center flex-col space-y-2 mt-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="py-1.5 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
