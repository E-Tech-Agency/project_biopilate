import SideNav from '@/components/shared/side-nav';
import CreateCategory from '@/components/supplier/create-category';
import CreateProductForm from '@/components/supplier/create-product-form';
import ProductsTable from '@/components/supplier/products-table';
import SupplierProducts from '@/components/supplier/suplier-products';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePlanningForm from '@/components/biopilate/CreatePlanningFrom';
import PlanningShow from '@/components/biopilate/PlanningShow';
import BlogShow from '@/components/biopilate/BlogShow';

export default function Blog() {
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
                <BlogShow/>
                <CreatePlanningForm/>
                
                </div>
                
            </div>
        </div>
    );
}
