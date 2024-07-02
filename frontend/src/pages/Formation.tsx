import SideNav from '@/components/shared/side-nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateFAQFrom from '@/components/biopilate/CreateFAQFrom';
import FAQShow from '@/components/biopilate/FAQShow';
import CreateFormationForm from '@/components/biopilate/CreateFormationForm';
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
                    {/* Create New Service Form */}
                    {/* <div className='bg-white rounded-lg shadow-md p-4'>
                        <h2 className='text-xl font-semibold mb-4'>Ajouter un Formation</h2>
                        <CreateFormationForm />
                    </div> */}

                    
                
            </div>
        </div>
   
    );
}
