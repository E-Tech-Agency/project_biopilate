import SideNav from '@/components/shared/side-nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import FAQShow from '@/components/biopilate/FAQShow';
export default function FAQ() {
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
       
            <div>
              
                
                    {/* Service Details */}
                    <div className=' justify-evenly items-center m-6'>
                     
                        <FAQShow />
                    </div>
                   

                    
                
            
        </div>
    </div>
    );
}
