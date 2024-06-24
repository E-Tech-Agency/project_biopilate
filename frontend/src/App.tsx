import { Route, Routes } from 'react-router-dom';
import LogReg from '@/pages/logReg';
import { Toaster } from '@/components/ui/sonner';
import { ResetPassword } from '@/pages/reset-password';
import { Dashboard } from './pages/dashboard';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import Home from '@/pages/home';
import SupplierDashboard from '@/pages/supplier-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import UserProfile from './pages/user-profile';
import OneProduct from './pages/one-product';
import EditProduct from './pages/edit-product';
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
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-register" element={<LogReg  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-product" element={<SupplierDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/product/:id" element={<OneProduct />} />
        <Route path='/update-product/:id' element={<EditProduct />} />
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
                    
                
      </Routes>
      <Toaster />
      <Footer/>
    </div>
  );
}

export default App;
