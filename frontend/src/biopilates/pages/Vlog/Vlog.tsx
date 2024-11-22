import vlog1 from "@/assets/images/vlog-1.jpg";
import vlog2 from "@/assets/images/vlog-2.jpg";
import vlog3 from "@/assets/images/vlog-3.jpg";

export default function Vlog() {
  const videos = [
    {
      niveau: "Facile",
      image: vlog1,
      title: "Pilates élastiques bras et jambes en bord du mer ",
      date: "24 Septembre 2024",
      link: "https://www.youtube.com/watch?v=lnt7ZxXAJwc",
    },
    {
      niveau: "Facile",
      image: vlog2,
      title: "Pilates sur tapis et stretching en week end",
      date: "13 Septembre 2024 ",
      link: "https://www.youtube.com/watch?v=DDA8oJBdjko",
    },
    {
      niveau: "Facile",
      image: vlog3,
      title: "Reformer avec l'élastique au jardin des buttes chaumont - Paris",
      date: "1 Septembre 2024 ",
      link: "https://www.youtube.com/watch?v=LbdXftFZgo4",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8 mx-5 md:mx-12 mb-12 ">
      <div className="font-bold font-ebGaramond text-center flex flex-col gap-2 md:gap-6">
        <p className="text-marron text-xl md:text-[34px]">
          Voici un aperçu de nos entraînements
        </p>
        <p className="text-blueText text-lg md:text-[28px]">
          La plus grande bibliothèque et la plus grande variété des vlogs de
          Pilates
        </p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-14 justify-center sm:justify-between size-full sm:px-4 2xl:px-8 mt-12 md:mt-16">
        {videos.map((video) => (
          <div
            className="relative w-[367px] h-[328px] sm:h-[364px] bg-gray-100 shadow-md cursor-pointer
            "
            onClick={() => {
              window.open(video.link, "_blank");
            }}
          >
            <p className=" absolute flex flex-col justify-center text-sm sm:text-base px-4 py-3 bg-bgColor text-marron font-lato font-bold right-0">
              {video.niveau}
            </p>
            <img
              className="w-full h-[180px] object-cover"
              src={video.image}
            ></img>
            <div className="h-[148px] sm:h-[184px] py-4 px-5 flex flex-col justify-between">
              <p className="text-marron text-lg sm:text-[28px] font-ebGaramond font-bold leading-normal">
                {video.title}
              </p>
              <p className=" text-sm sm:text-base mb-2">{video.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
