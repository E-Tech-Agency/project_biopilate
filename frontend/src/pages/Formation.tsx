import SideNav from '@/components/shared/side-nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormationShow from '@/components/biopilate/FormationShow';
export default function Formation() {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
        {/* Side Navigation */}
        <SideNav />

        {/* Main Content */}
        <div >
            
               
                    {/* Service Details */}
                    <div className='justify-evenly items-center m-6'>
                       
                        <FormationShow />
                    </div>
                   

                    
                
            </div>
        </div>
   
    );
}
