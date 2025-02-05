import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import biopilateLogo from "@/assets/images/biopilate-logo.png"; // Replace require with import
import api from "@/lib/api";
import { BlogArticle } from "@/types/types";

interface BlogCardProps {
  article: BlogArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.favorites || 0); // Initialize likes with article's favorites count or 0 if undefined
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation
  const updateBlog = async (data: { favorites?: number; view?: number }) => {
    try {
      await api.put(`blogs/${article.id}/`, data); // Use your "edit blog" API endpoint
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  const toggleLike = () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLiked(!liked);
    updateBlog({ favorites: newLikes }); // Update the favorites count in the backend
  };

  const navigateToArticle = () => {
    updateBlog({ view: (article.view || 0) + 1 }); // Increment view count in the backend
    navigate(`/blog/${article.id}`); // Navigate to the article page
  };

  return (
    <div
      className="bg-white flex flex-col justify-center items-center shadow-2xl gap-2 rounded-2xl w-[260px] sm:w-[410px] max-h-[610px] p-4"
      style={{ cursor: "pointer" }} // Show pointer cursor to indicate clickable card
    >
      <div className="flex flex-col items-end bg-white">
        {/* heart */}
        <div className="text-2xl sm:text-3xl z-[1] mb-[-44px] sm:mb-[-55px] ml-[-55px] pt-3 sm:pt-6 pr-3 sm:pr-6">
          {liked ? (
            <FaHeart
              className="text-red-500 bg-white rounded-sm sm:rounded-xl"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when icon is clicked
                toggleLike();
              }}
            />
          ) : (
            <FaRegHeart
              className="text-marron bg-white rounded-sm sm:rounded-xl"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when icon is clicked
                toggleLike();
              }}
            />
          )}
        </div>

        {/* article img */}
        <img
          loading="lazy"
          src={article.image}
          alt="Article"
          className="rounded-3xl w-[240px] h-[231px] sm:w-[384px] sm:h-[318px] object-cover mt-4 shadow-lg"
        />
      </div>

      <div className="px-2 flex flex-col gap-3 h-56">
        <p className="text-black sm:text-[28px] font-semibold font-ebGaramond mt-1 leading-8">
          {article.title}
          {/* {article.view}  <span className="text-gray-600">({likes} likes)</span> */}
        </p>
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src={biopilateLogo} // Use import instead of require
            alt="User"
            className="rounded-full w-[22px] h-[22px]"
          />
          <p className="text-sm text-gray-700">{article.ecrivain}</p>
        </div>
        <p className="text-xs sm:text-base sm:leading-5 overflow-hidden h-[80px] overflow-y-auto ">
          {article.description}
        </p>
        {/* <div className="flex items-center gap-2 text-sm">
          <FaHeart className="text-blueText" /> 
          <p>{likes} j'aimes</p> 
        </div> */}
      </div>

      <button
        className="reserver-button flex mt-1 bg-bgColor flex-col justify-center items-center text-base font-bold text-marron rounded-xl w-[90%] py-2 transform"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when button is clicked
          navigateToArticle(); // Navigate when button is clicked
        }}
      >
        <div className="hover-circle" />
        Lire la suite
      </button>
    </div>
  );
}
