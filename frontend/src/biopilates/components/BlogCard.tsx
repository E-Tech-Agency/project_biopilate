import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import biopilateLogo from "@/assets/images/biopilate-logo.png"; // Replace require with import

// Define the Article type
interface Article {
  id: number;
  title: string;
  ecrivain: string;
  description: string;
  jaimes: number;
  image: string;
}

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.jaimes); // Initialize likes with article's jaimes count
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  const toggleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked); // Toggle the liked state
  };

  const navigateToArticle = () => {
    navigate(`/blog/${article.id}`); // Navigate to the article page
  };

  return (
    <div
      className="bg-white flex flex-col justify-center items-center shadow-2xl gap-2 rounded-3xl w-[260px] sm:w-[410px] max-h-[606px] p-4"
      style={{ cursor: "pointer" }} // Show pointer cursor to indicate clickable card
    >
      <div className="flex flex-col items-end bg-white">
        <div className="text-3xl z-[1] mb-[-55px] ml-[-55px] pt-6 pr-6">
          {liked ? (
            <FaHeart
              className="text-red-500 bg-white rounded-xl"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when icon is clicked
                toggleLike();
              }}
            />
          ) : (
            <FaRegHeart
              className="text-marron bg-white rounded-xl"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when icon is clicked
                toggleLike();
              }}
            />
          )}
        </div>
        <img
          loading="lazy"
          src={article.image}
          alt="Article"
          className="rounded-3xl w-[240px] h-[231px] sm:w-[384px] sm:h-[318px] object-cover mt-4"
        />
      </div>

      <div className="px-4 flex flex-col gap-3">
        <p className="text-black text-[28px] font-semibold font-ebGaramond">
          {article.title}
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
        <p className="text-base leading-5 overflow-hidden h-[60px]">
          {article.description}
        </p>
        <div className="flex items-center gap-2 text-sm">
          {/* <FaHeart className="text-blueText" /> */}
          {/* <p>{likes} j'aimes</p> */}
        </div>
      </div>

      <button
        className="reserver-button flex mt-1  flex-col justify-center items-center text-base rounded-lg w-[90%] py-3 transform"
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
