import SideNav from '@/components/shared/side-nav';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "@/lib/api";
import { Cours } from "@/types/types";
import EditCour from '@/components/biopilate/EditCour';
const EditCourForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [courData, setCoursData] = useState<Cours | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`cours/${id}/`);
                const courData = response.data;
                setCoursData(courData);
            } catch (error) {
                console.error("Error fetching cours data", error);
            }
        };

        fetchData();
    }, [id]);

    const updateCours = async (data: any, id?: number) => {
        try {
            if (data instanceof FormData) {
                await api.put(`cours/${id}/`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await api.put(`cours/${data.id}/`, data);
            }
            // Handle success or navigate back to previous page
            navigate('/Cours-biopilates'); // Navigate to home or previous page on successful update
        } catch (error) {
            console.error("Error updating cours", error);
            alert(`Failed to update cour: ${error.message}`);
        }
    };

    useEffect(() => {
        const isSupplier = localStorage.getItem('is_supplier');
        if (!isSupplier || isSupplier !== "true") {
            navigate('/login-register');
        }
    }, [navigate]);

    if (!courData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <SideNav />
            <div>
                <div className='justify-evenly items-center  m-6'>
                    <EditCour cours={courData} onUpdate={updateCours} />
                    
                </div>
            </div>
        </div>
    );
}

export default EditCourForm;
