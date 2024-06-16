import SideNav from '@/components/shared/side-nav';

import CreateTeacherFrom from '@/components/biopilate/CreateTeacherFrom';
import TeachesShow from '@/components/biopilate/TeachesShow';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateServicesForm from '@/components/biopilate/CreateServicesFrom';
export default function Services() {
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
                <div className='justify-evenly items-center m-6'>
                <TeachesShow/>
                <div className='flex flex-col gap-4'>
                {/* <CreateServicesForm/> */}
                    {/* <CreateCategory/> */}
                    {/* <SupplierProducts/> */}
                </div>
                </div>
                <div className='m-4'>
               
                
                </div>
            </div>
        </div>
    );
}
