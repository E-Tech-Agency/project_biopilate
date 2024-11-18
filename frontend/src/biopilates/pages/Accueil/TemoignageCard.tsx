import BiopilateLogo from "@/assets/images/biopilate-logo.png";
import { FaStar } from "react-icons/fa";
interface Temoignage {
  user: string;
  note: number;
  title: string;
  review: string;
}

export default function TemoignageCard({
  temoignage,
}: {
  temoignage: Temoignage;
}) {
  return (
    <div className="flex flex-col max-w-[850px] min-w-[220px] md:h-[300px] shadow-xl rounded-lg bg-white py-6 sm:py-4 px-4 sm:px-8">
      <div className="flex gap-4">
        <img
          loading="lazy"
          src={BiopilateLogo}
          alt="User"
          className="rounded-full w-[35px] h-[35px] sm:w-[60px] sm:h-[60px] mt-1 sm:mt-0"
        />
        <div className="mb-4 sm:mb-8 flex flex-col sm:gap-2 font-ebGaramond font-bold">
          <p className="font-ebGaramond font-boldX">{temoignage.user}</p>
          <div className="flex gap-1 text-yellow-300 text-lg">
            {[...Array(temoignage.note)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-sm sm:text-2xl mb-4 sm:mb-6 text-marron font-lato font-bold">
          {temoignage.title}
        </p>
        <p className="text-xs sm:text-[16px] leading-normal sm:leading-5">
          {temoignage.review}
        </p>
      </div>
    </div>
  );
}
