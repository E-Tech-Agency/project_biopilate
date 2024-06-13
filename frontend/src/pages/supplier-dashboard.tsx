import SideNav from '@/components/shared/side-nav';
import CreateCategory from '@/components/supplier/create-category';
import CreateProductForm from '@/components/supplier/create-product-form';
import ProductsTable from '@/components/supplier/products-table';
import SupplierProducts from '@/components/supplier/suplier-products';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupplierDashboard() {
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
                <div className='flex flex-row justify-evenly items-center m-6'>
                <CreateProductForm/>
                <div className='flex flex-col gap-4'>
                    <CreateCategory/>
                    <SupplierProducts/>
                </div>
                </div>
                <div className='m-4'>
                <ProductsTable/>
                
                </div>
            </div>
        </div>
    );
}
