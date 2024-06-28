import SideNav from '@/components/shared/side-nav';
import CreateCategory from '@/components/supplier/create-category';
import CreateProductForm from '@/components/supplier/create-product-form';
import ProductsTable from '@/components/supplier/products-table';
import SupplierProducts from '@/components/supplier/suplier-products';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTagesFrom from '@/components/biopilate/CreateTagesFrom';
import TagesShow from '@/components/biopilate/TagesShow';

export default function Tages() {
    const navigate = useNavigate();

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <div className="flex-1 bg-gray-100">
            <div className='p-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <TagesShow />
                    <div className='bg-white rounded-lg shadow-md p-4'>
                        <CreateTagesFrom />
                    </div>
                </div></div>
            </div>
        </div>
    );
}
