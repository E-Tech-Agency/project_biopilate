import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdSearch, IoIosNotifications } from "react-icons/io";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import { SetStateAction } from "react";
import userImg from "@/assets/images/user-default.png";
import { Button } from "../ui/button";
// import { ModeToggle } from "./mode-toggle";

export function Navbar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  console.log(isLoggedIn);

  const navigate = useNavigate();
  // const nav = () => { navigate("/login") }
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };

  const logout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/register");
  };

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
    <header className="sticky top-0 z-40 shadow-sm flex flex-col-reverse lg:flex-row max-lg:justify-evenly h-48 lg:h-[148px] w-full shrink-0 items-center px-6 xl:px-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
      <div className="lg:flex-grow w-full text-start">
        <h1 className="text-[24px] md:text-[42px] font-semibold max-md:mb-2">
          Bienvenue Emilie!
        </h1>
        <p className="text-xs font-semibold">
          Voici votre tableau de bord des manuels{" "}
        </p>
      </div>

      <div className="flex justify-end items-center gap-3 w-full">
        <div>
          <div className="flex flex-row justify-center items-center border-b border-bgColor focus:border-gray-500 ml-12 sm:mx-4 md:mx-7">
            <button
              className=""
              onClick={() => {
                handleSearch();
              }}
            >
              <IoMdSearch className="text-xl md:text-2xl text-stone-500" />
            </button>
            <input
              type="text"
              className="outline-none px-3 md:px-4 py-2 w-full"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* {searchResults.length > 0 && (
          <div className="search-results mt-48 bg-white z-20">
            {searchResults.map((item, index) => (
              <a
                key={index}
                href={`/${item.toLowerCase()}`}
                className="block py-1 px-2"
              >
                {item}
              </a>
            ))}
          </div>
        )} */}
        </div>
        <button className="" onClick={() => {}}>
          <IoIosNotifications className="text-xl md:text-3xl mr-1 md:mr-2 text-hover" />
        </button>
        <button className="flex-shrink-0" onClick={() => {}}>
          <img
            src={userImg}
            alt=""
            className="size-[34px] md:size-[45px] object-cover rounded-full"
          />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="py-1.5 text-hover flex items-center gap-1">
              <BiSolidDownArrow className="text-lg md:text-xl" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] font-lato flex flex-col gap-2 text-[15px] py-3 mt-4 shadow-lg border bg-white rounded-md transition-transform duration-300 ease-in-out z-10">
            <Button variant="destructive" onClick={logout} className="mx-4">
              déconnexion
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
