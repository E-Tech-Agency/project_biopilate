import SideNav from '@/components/shared/side-nav';


import TeachesShow from '@/components/biopilate/TeachesShow';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Teaches() {
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
                
                </div>
                
            </div>
        </div>
    );
}
