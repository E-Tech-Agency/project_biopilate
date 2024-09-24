import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5"; // Menu Icon for mobile
import logo from "@/assets/biopilate-logo.png";
import { PiPackage } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import ActiveLinkSVG from "@/components/shared/ActiveLinkSVG"; // Import the SVG

export default function SideNav() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper function to determine if the link is active
  const isActive = (pathname: string) => location.pathname === pathname;

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false); // Close the sidebar
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

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <IoMenu className="text-2xl" onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`lg:flex hidden border-r border-bgColor bg-white min-w-64 font-lato h-screen flex-col justify-between top-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div>
          <div className="flex justify-center items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold my-10"
            >
              <img src={logo} alt="logo" className="w-28 h-28" />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <nav className="flex-1 overflow-auto py-2 grid items-start text-base font-lato">
              {/* Dashboard Link */}
              <Link
                to="/dashboard"
                className={`flex justify-start items-center gap-3 h-[50px] transition-opacity ${
                  isActive("/dashboard")
                    ? "bg-gray-100 text-gray-900 ml-0"
                    : "text-gray-500 hover:text-gray-900 ml-[33px]"
                } dark:text-gray-400 dark:hover:text-gray-50 dark:bg-gray-800 dark:hover:bg-gray-800`}
              >
                {isActive("/dashboard") && <ActiveLinkSVG />}
                <PiPackage className="text-xl" />
                <h1>Cours</h1>
              </Link>

              {/* Cours Biopilates Link */}
              {localStorage.getItem("is_supplier")?.toString() === "true" && (
                <Link
                  to="/Cours-biopilates"
                  className={`flex justify-start items-center gap-3 h-[50px] transition-opacity ${
                    isActive("/Cours-biopilates")
                      ? "bg-gray-100 text-gray-900 ml-0"
                      : "text-gray-500 hover:text-gray-900 ml-[33px]"
                  } dark:text-gray-400 dark:hover:text-gray-50 dark:bg-gray-800 dark:hover:bg-gray-800`}
                >
                  {isActive("/Cours-biopilates") && <ActiveLinkSVG />}
                  <PiPackage className="text-xl" />
                  <h1>Gestion des Cours</h1>
                </Link>
              )}

              {/* Teaches Link */}
              {localStorage.getItem("is_supplier")?.toString() === "true" && (
                <Link
                  to="/Teaches-biopilates"
                  className={`flex justify-start items-center gap-3 h-[50px] transition-opacity ${
                    isActive("/Teaches-biopilates")
                      ? "bg-gray-100 text-gray-900 ml-0"
                      : "text-gray-500 hover:text-gray-900 ml-[33px]"
                  } dark:text-gray-400 dark:hover:text-gray-50 dark:bg-gray-800 dark:hover:bg-gray-800`}
                >
                  {isActive("/Teaches-biopilates") && <ActiveLinkSVG />}
                  <PiPackage className="text-xl" />
                  <h1>Biopilates Instructeur</h1>
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* Footer Section - Stick to Bottom */}
        <div className="flex flex-col gap-5 pt-14 pb-20 border-t border-bgColor w-full">
          {/* Retour à l'accueil Link */}
          <Link
            to="/"
            className="flex justify-start items-center gap-2 font-semibold w-full pl-8"
          >
            <FaArrowLeft className="text-xl" />
            <span>Retour à l'acceuil</span>
          </Link>
          {/* Parameters Link */}
          <Link
            to="/parameters"
            className="flex justify-start items-center gap-2 font-semibold w-full pl-8"
          >
            <PiPackage className="text-xl" />
            <span>Parameters</span>
          </Link>
        </div>
      </div>
    </>
  );
}
