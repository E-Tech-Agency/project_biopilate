import SideNav from '@/components/shared/side-nav';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PlanningShow from '@/components/biopilate/PlanningShow';

export default function Planning() {
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
                
                <div className='m-4'>
                <PlanningShow/>
                
                </div>
            </div>
        </div>
    );
}
