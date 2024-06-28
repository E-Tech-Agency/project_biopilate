import SideNav from '@/components/shared/side-nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursShow from '@/components/biopilate/CoursShow';
export default function Cours() {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav/>
            <div>
                <div className=' justify-evenly items-center m-6'>
                <CoursShow/>
               
                
                </div>
                
            </div>
        </div>
    );
}
