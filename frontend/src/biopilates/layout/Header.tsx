import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import logoImage from "@/assets/images/biopilate-logo.png";
import ReserverButton from "../components/ReserverButton";
import "@/assets/styles/MenuButtonAnimation.css"; // Import the custom CSS file

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

const UniversDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: "blog",
      label: "Blog",
      href: "/blog",
    },
    {
      key: "vlog",
      label: "Vlog",
      href: "/vlog",
    },
  ];

  const handleItemClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div className="font-lato">
      <button
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        L'univers du Pilates
        <IoIosArrowDown />
      </button>
      {isOpen && (
        <div className="left-0 mt-2 w-48 flex flex-col items-start">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.href);
              }}
              className="block px-2 py-1.5 text-gray-600 hover:bg-gray-100"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const MenuButton: React.FC<{ isMenuOpen: boolean }> = ({ isMenuOpen }) => {
  return (
    <div className={`menu__icon ${isMenuOpen ? "open" : ""}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    const items = [
      "Accueil",
      "À propos",
      "Cours",
      "Formations",
      "Blog",
      "Contact",
    ];
    setSearchResults(
      items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.querySelector(".lg\\:hidden");

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white font-lato">
      <div className="flex gap-5 justify-between items-center px-14 py-1.5 w-full border-b border-solid bg-white border-bgColor md:flex-wrap max-md:border-none max-md:px-5 max-md:max-w-full font-lato">
        {/* Logo and Navigation desktop */}
        <div className="flex gap-7">
          <nav className="mx-auto gap-6 flex items-center">
            <a href="/" className="text-2xl">
              <img
                loading="lazy"
                src={logoImage}
                alt="Logo"
                className="rounded-full w-20"
              />
            </a>
            <div className="hidden lg:flex gap-8">
              {/* Individual Navigation Items */}
              <a
                href="/"
                className={`py-1.5 text-hover ${
                  window.location.pathname === "/" ? "custom-underline" : ""
                }`}
              >
                Accueil
              </a>
              <a
                href="/a-propos"
                className={`py-1.5 text-hover ${
                  window.location.pathname === "/a-propos"
                    ? "custom-underline"
                    : ""
                }`}
              >
                À propos
              </a>
              <a
                href="/cours"
                className={`py-1.5 text-hover ${
                  window.location.pathname === "/cours"
                    ? "custom-underline"
                    : ""
                }`}
              >
                Cours
              </a>
              <a
                href="/formations"
                className={`py-1.5 text-hover ${
                  window.location.pathname === "/formations"
                    ? "custom-underline"
                    : ""
                }`}
              >
                Formations
              </a>

              {/* Blog Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="py-1.5 text-hover flex items-center gap-1">
                    L'univers du Pilates
                    <IoIosArrowDown />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] font-lato flex flex-col gap-2 text-[15px] py-3 shadow-lg border bg-white rounded-md">
                  <a
                    href="/blog"
                    className="flex justify-start items-center gap-2 hover:underline px-4"
                  >
                    Blog
                  </a>
                  <hr className="border-marron" />
                  <a
                    href="/vlog"
                    className="flex justify-start items-center gap-2 hover:underline px-4"
                  >
                    Vlog
                  </a>
                </PopoverContent>
              </Popover>

              <a
                href="/contact"
                className={`py-1.5 text-hover ${
                  window.location.pathname === "/contact"
                    ? "custom-underline"
                    : ""
                }`}
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="flex flex-col justify-center max-md:hidden">
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
                  <input
                    type="text"
                    className="border-b border-gray-300 focus:border-gray-500 outline-none px-4 py-2"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="py-7"
                    onClick={() => {
                      handleSearch();
                      setShowSearch(!showSearch);
                    }}
                  >
                    <IoMdSearch className="text-2xl text-stone-500" />
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <div className="search-results mt-2">
                    {searchResults.map((item, index) => (
                      <a
                        key={index}
                        href={`/${item.toLowerCase()}`}
                        className="block py-1"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* search bar mobile */}
        <div className="flex flex-col justify-center md:hidden grow">
          {!showSearch && (
            <button
              className="py-7 ml-auto"
              onClick={() => setShowSearch(!showSearch)}
            >
              <IoMdSearch className="text-2xl text-stone-500" />
            </button>
          )}
          {showSearch && (
            <div>
              <div className="flex flex-row justify-center items-center">
                <input
                  type="text"
                  className="border-b border-gray-300 focus:border-gray-500 outline-none px-4 py-2"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="py-7"
                  onClick={() => {
                    handleSearch();
                    setShowSearch(!showSearch);
                  }}
                >
                  <IoMdSearch className="text-2xl text-stone-500" />
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="search-results mt-2">
                  {searchResults.map((item, index) => (
                    <a
                      key={index}
                      href={`/${item.toLowerCase()}`}
                      className="block py-1"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Links */}
        <div className="flex gap-4 pl-auto font-bold text-center text-stone-500">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="hidden md:flex items-center justify-center gap-3 my-auto text-lg border border-bgColor rounded-lg px-6 py-4"
            >
              <div className="max-md:hidden leading-5">Dashboard</div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="connecter flex items-center justify-center gap-3 my-auto text-lg"
            >
              <LuUserCircle2 className="text-2xl" />
              <div className="max-md:hidden leading-5">Se connecter</div>
            </Link>
          )}

          <div className="hidden md:flex">
            <ReserverButton link="https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0" />
          </div>
        </div>

        {/* Mobile Menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-4xl text-stone-500 transition-transform duration-300 ease-in-out"
          >
            <MenuButton isMenuOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          id="sidebar"
          className="lg:hidden flex items-start justify-center flex-col space-y-3 px-4 mt-4 pb-3"
        >
          <a
            href="/"
            className={`text-hover ${
              window.location.pathname === "/" ? "custom-underline" : ""
            }`}
          >
            Accueil
          </a>
          <a
            href="/a-propos"
            className={`text-hover ${
              window.location.pathname === "/a-propos" ? "custom-underline" : ""
            }`}
          >
            À propos
          </a>
          <a
            href="/cours"
            className={`text-hover ${
              window.location.pathname === "/cours" ? "custom-underline" : ""
            }`}
          >
            Cours
          </a>
          <a
            href="/formations"
            className={`text-hover ${
              window.location.pathname === "/formations"
                ? "custom-underline"
                : ""
            }`}
          >
            Formations
          </a>
          <UniversDropdown />
          <a
            href="/contact"
            className={`text-hover ${
              window.location.pathname === "/contact" ? "custom-underline" : ""
            }`}
          >
            Contact
          </a>
          <a href="https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0">
            Réserver
          </a>
        </div>
      )}
    </header>
  );
}
