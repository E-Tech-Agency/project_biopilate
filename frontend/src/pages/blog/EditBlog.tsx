import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { Blog } from "@/types/types";
import BlogEditForm from "@/components/biopilate/blog/BlogEditForm";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`blogs/${id}/`);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("Unable to fetch blog details. Please try again later.");
      }
    };

    fetchData();
  }, [id]);

  const updateBlog = async (data: FormData, id: number) => {
    try {
      await api.put(`blogs/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/blog-biopilates");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update the blog. Please check the details and try again.");
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
    <div className="justify-evenly items-center m-6">
      <BlogEditForm blog={blogData} onUpdate={updateBlog} />
    </div>
  );
};

export default EditBlog;
