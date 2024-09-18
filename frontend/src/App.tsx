import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/index.css";

import LogReg from "@/pages/logReg";
import { LoginForm } from "@/components/auth/login";
import { RegisterForm } from "@/components/auth/register";
import { Toaster } from "@/components/ui/sonner";
import { ResetPassword } from "@/pages/reset-password";
import { Dashboard } from "./pages/dashboard";
import { useEffect, useState } from "react";
import SideNav from "@/components/shared/side-nav";
import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Home from "@/pages/home";
import AdminDashboard from "./pages/admin-dashboard";
import UserProfile from "./pages/user-profile";
import OneCours from "./pages/one-cours";

// biopilate pages
import Teaches from "./pages/Teaches";
import Tages from "./pages/Tages";
import Services from "./pages/Services";
import EditService from "./pages/EditService";
import Planning from "./pages/Planning";
import Blog from "./pages/Blog";
import CreateBlogForm from "./components/biopilate/CreateBlogForm";
import FAQ from "./pages/FAQ";
import Formation from "./pages/Formation";
import Cours from "./pages/Cours";
import CreateServicesForm from "./components/biopilate/CreateServicesFrom";
import CreatePlanningForm from "./components/biopilate/CreatePlanningFrom";
import EditBlog from "./pages/EditBlog";
import CreateFAQFrom from "./components/biopilate/CreateFAQFrom";
import CreateFormationForm from "./components/biopilate/CreateFormationForm";
import EditCourForm from "./pages/EditCourForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const location = useLocation(); // Hook to get the current route
  const hideNavAndSideNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/login-register";

  return (
    <div className={`w-full min-h-screen ${!hideNavAndSideNav && "flex"}`}>
      {/* Conditionally render SideNav */}
      {!hideNavAndSideNav && <SideNav />}
      <div>
        {/* Conditionally render Navbar */}
        {!hideNavAndSideNav && (
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}

        <div
          className={`w-[100vw] ${
            !hideNavAndSideNav && "lg:w-[calc(100vw-265px)]"
          }  min-h-[calc(100vh-5rem)] bg-gray-50`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login-register"
              element={<LogReg setIsLoggedIn={setIsLoggedIn} />}
            />
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
            {/* biopilate  */}
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
      {/* Conditionally render Footer if needed */}
      {hideNavAndSideNav && <Footer />}
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
