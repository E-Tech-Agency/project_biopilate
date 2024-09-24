import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Blog } from "@/types/types";
import BlogEditForm from "@/components/biopilate/BlogEditForm";

const FormationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogData, setBlogeData] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`blogs/${id}/`);
        const blogData = response.data;
        setBlogeData(blogData);
      } catch (error) {
        console.error("Error fetching blog data", error);
      }
    };

    fetchData();
  }, [id]);

  const updateBlog = async (data: any, id?: number) => {
    try {
      if (data instanceof FormData) {
        await api.put(`blogs/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.put(`blogs/${data.id}`, data);
      }
      // Handle success or navigate back to previous page
      navigate("/blog-biopilates"); // Navigate to home or previous page on successful update
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating blog", error);
        alert(`Failed to update blog: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const isSupplier = localStorage.getItem("is_supplier");
    if (!isSupplier || isSupplier !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-evenly items-center  m-6">
      <BlogEditForm blog={blogData} onUpdate={updateBlog} />
    </div>
  );
};

export default FormationEdit;
