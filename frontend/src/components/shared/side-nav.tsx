import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/biopilate-logo.png";

// Icons
import { IoMenu } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { PiPackage } from "react-icons/pi";
import { FaHandHoldingDollar, FaRegFolderOpen } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";

import ActiveLinkSVG from "@/components/shared/ActiveLinkSVG"; // Active link indicator SVG

export default function SideNav() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (pathname: string) => location.pathname === pathname;

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
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const generalNavItems = [
    {
      label: "Manuel",
      href: "/manuel",
      icon: <FaRegFolderOpen className="text-xl" />,
    },
    {
      label: "Workshop",
      href: "/workshop",
      icon: <GiTeacher className="text-xl" />,
    },
    {
      label: "Financer votre formation",
      href: "/financer-votre-formation",
      icon: <FaHandHoldingDollar className="text-xl" />,
    },
  ];

  const supplierNavItems = [
    {
      label: "Gestion des Cours",
      href: "/Cours-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Instructeur",
      href: "/Teaches-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Tages",
      href: "/Tages-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Service",
      href: "/Service-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Planning",
      href: "/planning-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Blogs",
      href: "/blog-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates FAQ",
      href: "/FAQ-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates Formation",
      href: "/Formation-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates WorkShop",
      href: "/WorkshopShow-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Biopilates vlog",
      href: "/vlog-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    // 
    {
      label: "Biopilates Manuel",
      href: "/manuel-biopilates",
      icon: <PiPackage className="text-xl" />,
    },
    {
      label: "Financer voter formation",
      href: "/financer-formation-biopilates",
      icon: <PiPackage className="text-xl" />,
    },


  ];

  const isSupplier = localStorage.getItem("is_supplier")?.toString() === "true";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-10 left-4 z-50 cursor-pointer size-4"
        onClick={toggleSidebar}
      >
        <IoMenu className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed lg:sticky lg:flex flex-col justify-between border-r border-bgColor bg-white min-w-64 font-lato h-screen top-0 left-0 max-md:shadow-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold my-10"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar when logo is clicked
            >
              <img src={logo} alt="logo" className="w-28 h-28" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-auto py-2 grid items-start text-base font-lato">
            {generalNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`flex justify-start items-center gap-3 h-[50px] transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-gray-100 text-gray-900 ml-0"
                    : "text-gray-500 hover:text-gray-900 ml-[33px]"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {isActive(item.href) && <ActiveLinkSVG />}
                {item.icon}
                <h1>{item.label}</h1>
              </Link>
            ))}

            {isSupplier &&
              supplierNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex justify-start items-center gap-3 h-[50px] transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-gray-100 text-gray-900 ml-0"
                      : "text-gray-500 hover:text-gray-900 ml-[33px]"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {isActive(item.href) && <ActiveLinkSVG />}
                  {item.icon}
                  <h1>{item.label}</h1>
                </Link>
              ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-5 pt-14 pb-20 border-t border-bgColor w-full">
          <Link
            to="/"
            className="flex justify-start items-center gap-2 font-semibold w-full pl-8 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaArrowLeft className="text-xl" />
            <span>Retour à l'acceuil</span>
          </Link>
          <Link
            to="/user"
            className="flex justify-start items-center gap-2 font-semibold w-full pl-8 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <BsGearFill className="text-xl" />
            <span>Paramétres</span>
          </Link>
        </div>
      </div>
    </>
  );
}
