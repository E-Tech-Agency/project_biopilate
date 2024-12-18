import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./styles/index.css";
import { IoIosArrowUp } from "react-icons/io";

// import { Toaster } from "@/components/ui/sonner";
import { ResetPassword } from "@/pages/reset-password";
import { Dashboard } from "./pages/dashboard";
import Header from "@/biopilates/layout/Header";
import Footer from "@/biopilates/layout/Footer";
import SideNav from "./components/shared/side-nav";
import { Navbar } from "./components/shared/navbar";

// Authentication
import { LoginForm } from "./components/auth/login";
import { RegisterForm } from "./components/auth/register";

// Site pages
import Accueil from "@/biopilates/pages/Accueil/Accueil";
import Apropos from "@/biopilates/pages/Apropos/Apropos";
import CoursB from "@/biopilates/pages/Cours/Cours";
import FormationsB from "@/biopilates/pages/Formations/Formations";
import BlogB from "@/biopilates/pages/Blog/Blog";
import ContactB from "@/biopilates/pages/Contact/Contact";
import StottPilates from "@/biopilates/pages/Apropos/StottPilates";
import Evolis from "@/biopilates/pages/Apropos/Evolis";
import Article from "@/biopilates/pages/Blog/Article";
import Gyrotonic from "@/biopilates/pages/Apropos/Gyrotonic";

// Biopilates-specific pages
import Teaches from "./pages/Teaches";
import Tages from "./pages/Tages";
import Services from "./pages/Services";
import EditService from "./pages/EditService";
import Planning from "./pages/Planning";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Formation from "./pages/Formation";
import Cours from "./pages/Cours";
import OneCours from "./pages/one-cours";
import AdminDashboard from "./pages/admin-dashboard";
import UserProfile from "./pages/user-profile";
import WorkshopShow from "./components/biopilate/WorkshopShow";
import EditWorkshop from "./pages/EditWorkShp";
import VlogShow from "./components/biopilate/VlogShow";
import EditVlog from "./pages/EditVlog";
import ManuelShow from "./components/biopilate/ManuelShow";
import EditManuel from "./pages/EditManuel";
import FinancerFormationShow from "./components/biopilate/FinancerFormationShow";
import EditFormationFinancer from "./pages/EditFormationFinancer";



// Forms
import CreateBlogForm from "./components/biopilate/CreateBlogForm";
import CreateServicesForm from "./components/biopilate/CreateServicesFrom";
import CreatePlanningForm from "./components/biopilate/CreatePlanningFrom";
import CreateFAQFrom from "./components/biopilate/CreateFAQFrom";
import CreateFormationForm from "./components/biopilate/CreateFormationForm";
import EditBlog from "./pages/EditBlog";
import EditCourForm from "./pages/EditCourForm";
import ScrollToTop from "./biopilates/components/ScrollToTop";
import Vlog from "./biopilates/pages/Vlog/Vlog";
import Manuel from "./pages/Manuel";
import Workshops from "./pages/Workshops";
import FinancerVotreFormationDash from "./pages/FinancerVotreFormationDash";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [showButton, setShowButton] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to check login status based on token
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isRouteHidden = (patterns: string[], currentRoute: string): boolean => {
    return patterns.some((pattern) => {
      // Convert dynamic segments like ":id" or ":token" into regex to match real values
      const regexPattern = pattern.replace(/:\w+/g, "\\w+");
      const regex = new RegExp(`^${regexPattern}`);
      return regex.test(currentRoute);
    });
  };

  // Consolidated routes that hide certain components
  const hiddenRoutes = {
    nav: [
      "/login",
      "/register",
      "/reset_password/:id/:token",
      "/dashboard",
      "/admin",
      "/user",
      "/manuel",
      "/workshop",
      "/financer-votre-formation",
      "/cour/:id",
      "/Teaches-biopilates",
      "/Tages-biopilates",
      "/Service-biopilates",
      "/edit-service/:id",
      "/planning-biopilates",
      "/blog-biopilates",
      "/add-article-biopilates",
      "/FAQ-biopilates",
      "/Formation-biopilates",
      "/Cours-biopilates",
      "/ajouter-service-biopilates",
      "/ajouter-planning-biopilates",
      "/edit-article-biopilates/:id",
      "/add-FAQ-biopilates",
      "/add-Formation-biopilates",
      "/edit-cours-biopilates/:id",
      "/WorkshopShow-biopilates",
      "/edit-workShop-biopilates/:id",
      "/vlog-biopilates",
      "/edit-Vlog-biopilates/:id",
      "/edit-manuel-biopilates/:id",
      "/financer-formation-biopilates",
      "/edit-formation-finance-biopilates/:id",
      "/manuel-biopilates",
    ],
    sideNav: [
      "/login",
      "/register",
      "/reset_password/:id/:token",
      "/a-propos",
      "/cours",
      "/formations",
      "/blog",
      "/vlog",
      "/blog/:id",
      "/contact",
      "/a-propos/stottPilates",
      "/a-propos/Evolis",
      "/a-propos/evolis",
      "/a-propos/gyrotonic",
      "/a-propos/Gyrotonic",
      "/a-propos/STOTTPILATES",
    ],
    reg: ["/login", "/register"],
  };

  const currentRoute = location.pathname;

  const isNavHidden = isRouteHidden(hiddenRoutes.nav, currentRoute);
  const isSideNavHidden =
    isRouteHidden(hiddenRoutes.sideNav, currentRoute) || currentRoute === "/";
  const isRegOrLogin = isRouteHidden(hiddenRoutes.reg, currentRoute);
  const isFooterHidden = isNavHidden;

  const getTitle = (route: string) => {
    switch (route) {
      case "/":
        return "Accueil - BioPilates";
      case "/a-propos":
        return "À propos - BioPilates";
      case "/cours":
        return "Cours - BioPilates";
      case "/formations":
        return "Formations - BioPilates";
      case "/blog":
        return "Blog - BioPilates";
      case "/contact":
        return "Contact - BioPilates";
      case "/vlog":
        return "Vlog - BioPilates";
      case "/a-propos/stottPilates":
        return "Stott Pilates - BioPilates";
      case "/a-propos/evolis":
        return "Evolis - BioPilates";
      case "/a-propos/gyrotonic":
        return "Gyrotonic - BioPilates";
      case "/login":
        return "Login - BioPilates";
      case "/register":
        return "Register - BioPilates";
      case "/reset_password/:id/:token":
        return "Reset Password - BioPilates";
      case "/dashboard":
        return "Dashboard - BioPilates";
      case "/admin":
        return "Admin Dashboard - BioPilates";
      case "/user":
        return "User Profile - BioPilates";
      case "/manuel":
        return "Manuel - BioPilates";
      case "/workshop":
        return "Workshop - BioPilates";
      case "/financer-votre-formation":
        return "Financer Votre Formation - BioPilates";
      case "/cour/:id":
        return "Cours - BioPilates";
      case "/Teaches-biopilates":
        return "Teaches - BioPilates";
      case "/Tages-biopilates":
        return "Tages - BioPilates";
      case "/Service-biopilates":
        return "Service - BioPilates";
      case "/edit-service/:id":
        return "Edit Service - BioPilates";
      case "/planning-biopilates":
        return "Planning - BioPilates";
      case "/blog-biopilates":
        return "Blog - BioPilates";
      case "/add-article-biopilates":
        return "Add Article - BioPilates";
      case "/FAQ-biopilates":
        return "FAQ - BioPilates";
      case "/Formation-biopilates":
        return "Formation - BioPilates";
      case "/Cours-biopilates":
        return "Cours - BioPilates";
      case "/ajouter-service-biopilates":
        return "Ajouter Service - BioPilates";
      case "/ajouter-planning-biopilates":
        return "Ajouter Planning - BioPilates";
      case "/edit-article-biopilates/:id":
        return "WorkShopShow - BioPilates";
        case "/WorkshopShow-biopilates":
        return "Edit Article - BioPilates";
      case "/edit-workShop-biopilates/:id":
        return "Edit Workshop - BioPilates";
      case "/vlog-biopilates":
        return "Vlog - BioPilates"
      case "/vlog-biopilates/:id":
        return "Vlog Show - BioPilates";
      case "/edit-Vlog-biopilates/:id":
        return "Edit Vlog - BioPilates";
      case "/edit-manuel-biopilates/:id":
        return "Edit Manuel - BioPilates";
      case "/financer-formation-biopilates":
        return "Financer Votre Formation - BioPilates";
      case "/edit-formation-finance-biopilates/:id":
        return "Edit Formation Finance - BioPilates";
     
      case  "/manuel-biopilates":
        return "Manuel - BioPilates";
      case "/add-FAQ-biopilates":
        return "Add FAQ - BioPilates";
      case "/add-Formation-biopilates":
        return "Add Formation - BioPilates";
      case "/edit-cours-biopilates/:id":
        return "Edit Cours - BioPilates";
      default:
        return "BioPilates";
    }
  };

  return (
    <div
      className={`w-full min-h-screen bg-gray-50 ${!isSideNavHidden && "flex"}`}
    >
      <Helmet>
        <title>{getTitle(currentRoute)}</title>
      </Helmet>
      {/* Conditionally render SideNav */}
      {!isSideNavHidden && <SideNav />}

      <div>
        {/* Conditionally render Header */}
        {!isNavHidden && <Header isLoggedIn={isLoggedIn} />}

        {/* Conditionally render Navbar */}
        {isNavHidden && !isRegOrLogin && (
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* scroll to top button */}
        <button
          className={`max-md:hidden size-11 text-2xl bg-marron opacity-0 text-white rounded-full fixed transform duration-300 ease-in-out z-50 right-16 bottom-20 cursor-pointer ${
            showButton ? "opacity-100 block" : "opacity-0"
          }`}
          onClick={scrollToTop}
        >
          {/* <FontAwesomeIcon icon={faArrowUp} /> */}
          <IoIosArrowUp className="m-auto" />
        </button>

        <div
          className={`w-[100vw] ${
            !isSideNavHidden && "lg:w-[calc(100vw-265px)]"
          } min-h-[calc(100vh-5rem)] `}
        >
          {/* scroll tp top when refresh or starting a new page*/}
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Accueil />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/cours" element={<CoursB />} />
            <Route path="/formations" element={<FormationsB />} />
            <Route path="/vlog" element={<Vlog />} />
            <Route path="/blog" element={<BlogB />} />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="/contact" element={<ContactB />} />
            <Route path="/a-propos/stottPilates" element={<StottPilates />} />
            <Route path="/a-propos/evolis" element={<Evolis />} />
            <Route path="/a-propos/gyrotonic" element={<Gyrotonic />} />

            {/* Dashboard & Auth */}

            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/register"
              element={<RegisterForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/manuel" element={<Manuel />} />
            <Route path="/workshop" element={<Workshops />} />
            <Route
              path="/financer-votre-formation"
              element={<FinancerVotreFormationDash />}
            />
            <Route path="/cour/:id" element={<OneCours />} />

            {/* Biopilates-specific Routes */}
            <Route path="/Teaches-biopilates" element={<Teaches />} />
            <Route path="/Tages-biopilates" element={<Tages />} />
            <Route path="/Service-biopilates" element={<Services />} />
            <Route path="/edit-service/:id" element={<EditService />} />
            <Route path="/planning-biopilates" element={<Planning />} />
            <Route path="/blog-biopilates" element={<Blog />} />
            <Route
              path="/add-article-biopilates"
              element={<CreateBlogForm />}
            />
            <Route path="/FAQ-biopilates" element={<FAQ />} />
            <Route path="/Formation-biopilates" element={<Formation />} />
            <Route path="/Cours-biopilates" element={<Cours />} />
            <Route path="/WorkshopShow-biopilates" element={<WorkshopShow />} />
            <Route path="/edit-workShop-biopilates/:id" element={<EditWorkshop />} />

            <Route
              path="/ajouter-service-biopilates"
              element={<CreateServicesForm />}
            />
            <Route
              path="/ajouter-planning-biopilates"
              element={<CreatePlanningForm />}
            />
            <Route path="/edit-article-biopilates/:id" element={<EditBlog />} />
            <Route path="/add-FAQ-biopilates" element={<CreateFAQFrom />} />
            <Route
              path="/add-Formation-biopilates"
              element={<CreateFormationForm />}
            />
            <Route
              path="/edit-cours-biopilates/:id"
              element={<EditCourForm />}
            />
            <Route
              path="/vlog-biopilates"
              element={<VlogShow />}
            />
            <Route path="/edit-Vlog-biopilates/:id" element={<EditVlog />} />
           
            <Route
              path= "/financer-formation-biopilates"
              element={<FinancerFormationShow />}
            />
             <Route path="/edit-formation-finance-biopilates/:id" element={<EditFormationFinancer />} />
            <Route path= "/manuel-biopilates" element={<ManuelShow />} />
            <Route path="/edit-manuel-biopilates/:id" element={<EditManuel/>} />
          </Routes>
        </div>
      </div>

      {/* Conditionally render Footer */}
      {!isFooterHidden && <Footer />}

      {/* Toast notifications */}
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
