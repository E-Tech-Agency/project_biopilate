import { Route, Routes } from 'react-router-dom';
import LogReg from '@/pages/logReg';
import { Toaster } from '@/components/ui/sonner';
import { ResetPassword } from '@/pages/reset-password';
import { Dashboard } from './pages/dashboard';
import { useEffect, useState } from 'react';
import  Header  from '@/biopilates/layout/Header'
import Footer from '@/biopilates/layout/Footer'
import Home from '@/pages/home';

import AdminDashboard from './pages/admin-dashboard';
import UserProfile from './pages/user-profile';
import OneCours from './pages/one-cours';
//site show
import Accueil from '@/biopilates/pages/Accueil/Accueil';
import Apropos from '@/biopilates/pages/Apropos/Apropos';
import CoursB from "@/biopilates/pages/Cours/Cours";
import FormationsB from '@/biopilates/pages/Formations/Formations';
// biopilate
import Teaches from './pages/Teaches';
import Tages from './pages/Tages';
import Services from './pages/Services';
import EditService from './pages/EditService';
import Planning from './pages/Planning';
import Blog from './pages/Blog';
import CreateBlogForm from './components/biopilate/CreateBlogForm';
import FAQ from './pages/FAQ';
import Formation from './pages/Formation';
import Cours from './pages/Cours';
import CreateServicesForm from './components/biopilate/CreateServicesFrom';
import CreatePlanningForm from './components/biopilate/CreatePlanningFrom';
import EditBlog from './pages/EditBlog';
import CreateFAQFrom from './components/biopilate/CreateFAQFrom';
import CreateFormationForm from './components/biopilate/CreateFormationForm';

import EditCourForm from './pages/EditCourForm';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
       <Header></Header>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/a-propos" element={<Apropos />}/>
        <Route path="/cours" element={<CoursB />}/>
        <Route path="/formations" element={<FormationsB />}/>
        <Route path="/login-register" element={<LogReg  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
         {/*<Route path="/create-product" element={<SupplierDashboard />} />*/}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/cour/:id" element={<OneCours />} />
        
        {/* biopilate  */}
        <Route path='/Teaches-biopilates' element={<Teaches />} />
        <Route path='/Tages-biopilates' element={<Tages />} />
        <Route path='/Service-biopilates' element={<Services />} />
        <Route path="/edit-service/:id" element={<EditService/>}/>
        <Route path="/planning-biopilates" element={<Planning/>}/>
        <Route path="/blog-biopilates" element={<Blog/>}/>
        <Route path="/add-article-biopilates" element={<CreateBlogForm/>}/>
        <Route path="/FAQ-biopilates" element={<FAQ/>}/>
        <Route path="/Formation-biopilates" element={<Formation/>}/>
        <Route path="/Cours-biopilates" element={<Cours/>}/>
        <Route path="/ajouter-service-biopilates" element={<CreateServicesForm/>}/>
        <Route path="/ajouter-planning-biopilates" element={<CreatePlanningForm/>}/>
        <Route path="/edit-article-biopilates/:id" element={<EditBlog/>}/>    
        <Route path="/add-FAQ-biopilates" element={<CreateFAQFrom/>}/>
        <Route path="/add-Formation-biopilates" element={<CreateFormationForm/>}/>                  
        <Route path="/edit-cours-biopilates/:id" element={<EditCourForm/>}/>    
      </Routes>
      <Toaster />
      <Footer/>
    </div>
  );
}

export default App;
