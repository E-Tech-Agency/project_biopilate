import SideNav from '@/components/shared/side-nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateServicesForm from '@/components/biopilate/CreateServicesFrom';
import ServiceShow from '@/components/biopilate/ServiceShow';

export default function Services() {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    return (
        <div className='flex min-h-screen'>
            {/* Side Navigation */}
            <SideNav />

            {/* Main Content */}
            <div className='flex-1 bg-gray-100'>
                <div className='p-8'>
                  
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Service Details */}
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h2 className='text-xl font-semibold mb-4'>Services Liste</h2>
                            <ServiceShow />
                        </div>
                        {/* Create New Service Form */}
                        <div className='bg-white rounded-lg shadow-md p-4'>
                            <h2 className='text-xl font-semibold mb-4'>Ajouter un Service</h2>
                            <CreateServicesForm />
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}
