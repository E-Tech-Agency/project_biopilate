// Import images
import manuel1 from "@/assets/images/manuels/manuel1.jpg";
import manuel2 from "@/assets/images/manuels/manuel2.jpg";
import manuel3 from "@/assets/images/manuels/manuel3.jpg";
import manuel4 from "@/assets/images/manuels/manuel4.jpg";
import manuel5 from "@/assets/images/manuels/manuel5.jpg";
import manuel6 from "@/assets/images/manuels/manuel6.jpg";
import manuel7 from "@/assets/images/manuels/manuel7.jpg";
import manuel8 from "@/assets/images/manuels/manuel8.jpg";
import manuel9 from "@/assets/images/manuels/manuel9.jpg";
import manuel10 from "@/assets/images/manuels/manuel10.jpg";
import ReserverButton from "@/biopilates/components/ReserverButton";

export default function Manuel() {
  const manuelsData = [
    {
      title: "Manuel Matwork complet",
      image: manuel1,
    },
    {
      title: "Manuel Reformer débutant",
      image: manuel2,
    },
    {
      title: "Manuel Reformer intermédiaire",
      image: manuel3,
    },
    {
      title: "Manuel Reformer avancé",
      image: manuel4,
    },
    {
      title: "Manuel Cadillac débutant",
      image: manuel5,
    },
    {
      title: "Manuel Cadillac intermédiaire et avancé",
      image: manuel6,
    },
    {
      title: "Manuel Chaise complet",
      image: manuel7,
    },
    {
      title: "Manuel Ladder Barrel Complet",
      image: manuel8,
    },
    {
      title: "Manuel Arc Barrel Complet",
      image: manuel9,
    },
    {
      title: "Manuel Spine Corrector Complet",
      image: manuel10,
    },
  ];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-evenly size-full px-4 sm:px-10 2xl:px-12 py-12 md:py-16">
      {manuelsData.map((manuel, index) => (
        <div
          key={index}
          className="w-[182px] flex flex-col justify-start items-center gap-4
          "
        >
          <img
            className="size-[140px] object-cover rounded-full shadow-md"
            src={manuel.image}
            alt={manuel.title}
          />
          <p className="flex-grow text-marron sm:text-lg text-center font-ebGaramond font-bold leading-normal">
            {manuel.title}
          </p>
          <ReserverButton text="Commander" />
        </div>
      ))}
    </div>
  );
}
