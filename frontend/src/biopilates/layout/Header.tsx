import { useState } from "react";
import { IoMdSearch, IoIosMenu, IoMdClose } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import logoImage from "@/assets/images/biopilate-logo.png";
import ReserverButton from "../components/ReserverButton";

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

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      <div className="flex gap-5 justify-between items-center px-14 py-1.5 w-full border-b border-solid bg-white border-bgColor md:flex-wrap max-md:border-none max-md:px-5 max-md:max-w-full font-lato">
        {/* Logo and Navigation */}
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
            <div className="hidden md:flex gap-8">
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
            <ReserverButton />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-4xl text-stone-500">
            {!isMenuOpen && <IoIosMenu />}
            {isMenuOpen && <IoMdClose />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex items-center justify-center flex-col space-y-2 mt-2">
          <a href="/">Accueil</a>
          <a href="/a-propos">À propos</a>
          <a href="/cours">Cours</a>
          <a href="/formations">Formations</a>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-hover flex items-center gap-1">
                L'univers du Pilates
                <IoIosArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-white rounded-md shadow-md">
              <a href="/blog" className="block py-1.5 px-4">
                Blog
              </a>
              <hr className="border-marron" />
              <a href="/vlog" className="block py-1.5 px-4">
                Vlog
              </a>
            </PopoverContent>
          </Popover>
          <a href="/contact">Contact</a>
        </div>
      )}
    </header>
  );
}
