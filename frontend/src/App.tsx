import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/index.css";

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

// Forms
import CreateBlogForm from "./components/biopilate/CreateBlogForm";
import CreateServicesForm from "./components/biopilate/CreateServicesFrom";
import CreatePlanningForm from "./components/biopilate/CreatePlanningFrom";
import CreateFAQFrom from "./components/biopilate/CreateFAQFrom";
import CreateFormationForm from "./components/biopilate/CreateFormationForm";
import EditBlog from "./pages/EditBlog";
import EditCourForm from "./pages/EditCourForm";
import ScrollToTop from "./biopilates/components/ScrollToTop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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
    ],
    sideNav: [
      "/login",
      "/register",
      "/reset_password/:id/:token",
      "/a-propos",
      "/cours",
      "/formations",
      "/blog",
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

  return (
    <div
      className={`w-full min-h-screen bg-gray-50 ${!isSideNavHidden && "flex"}`}
    >
      {/* Conditionally render SideNav */}
      {!isSideNavHidden && <SideNav />}

      <div>
        {/* Conditionally render Header */}
        {!isNavHidden && <Header isLoggedIn={isLoggedIn} />}

        {/* Conditionally render Navbar */}
        {isNavHidden && !isRegOrLogin && (
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}

        <div
          className={`w-[100vw] ${
            !isSideNavHidden && "lg:w-[calc(100vw-265px)]"
          } min-h-[calc(100vh-5rem)] `}
        >
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Accueil />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/cours" element={<CoursB />} />
            <Route path="/formations" element={<FormationsB />} />
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