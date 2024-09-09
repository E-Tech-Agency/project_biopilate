import React, { useEffect, useState } from "react";
import "@/assets/styles/Apropos.css";

// Define the type for the images array as a prop
interface StartupAnimationProps {
  images: string[];
}

export default function StartupAnimation({ images }: StartupAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(false);
    }, 3300); // Adjust the duration to match your needs
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Startup Animation */}
      <div
        className={`max-md:hidden animated-pics flex flex-col justify-center items-end gap-10 bg-white transition-transform duration-1000 ease-in-out ${
          isAnimating ? "" : "hidden opacity-0"
        }`}
      >
        <img
          src={images[0]}
          alt="Stott Pilates 1"
          className="w-[387px] h-[505px] object-cover rotate-[4deg] mr-[50px]"
        />
        <img
          src={images[1]}
          alt="Stott Pilates 2"
          className="w-[387px] h-[505px] object-cover rotate-[6deg] mr-[100px]"
        />
        <img
          src={images[2]}
          alt="Stott Pilates 3"
          className="w-[387px] h-[505px] object-cover rotate-[8deg] mr-[150px]"
        />
        <img
          src={images[3]}
          alt="Stott Pilates 3"
          className="w-[387px] h-[505px] object-cover rotate-[10deg] mr-[210px]"
        />
        <img
          src={images[4]}
          alt="Stott Pilates 4"
          className="animate-transformImage w-[387px] h-[505px] object-cover rotate-[12deg] mr-[280px]"
        />
      </div>
    </div>
  );
}
