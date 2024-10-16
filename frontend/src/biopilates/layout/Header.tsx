import { useState } from "react";
import { IoMdSearch, IoIosMenu } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import logoImage from "@/assets/images/biopilate-logo.png";
import { Link } from "react-router-dom";
import ReserverButton from "../components/ReserverButton";

// Define a type for navigation items
type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Cours", href: "/cours" },
  { label: "Formations", href: "/formations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NavItem[]>([]); // Explicitly define the type

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    const results = navItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Search Query:", searchQuery); // Log the search query
    console.log("Filtered Results:", results); // Log the filtered results
    setSearchResults(results);
  };

  return (
    <header>
      <div className="flex gap-5 justify-between items-center px-14 py-1.5 w-full border-b border-solid bg-white border-bgColor md:flex-wrap max-md:border-none max-md:px-5 max-md:max-w-full font-lato">
        <div className="flex gap-7">
          <nav className="mx-auto gap-6 flex items-center">
            <a href="/" className=" text-2xl">
              <img
                loading="lazy"
                src={logoImage}
                alt="Logo"
                className="rounded-full w-20"
              />
            </a>
            <div className="hidden md:flex gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`py-1.5 text-hover ${
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
                      <a key={index} href={item.href} className="block py-1">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

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
              <div className="max-md:hidden  leading-5">Se connecter</div>
            </Link>
          )}

          <div className="hidden md:flex">
            <ReserverButton />
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="">
            <IoIosMenu className="text-4xl text-stone-500" />
          </button>
        </div>
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
