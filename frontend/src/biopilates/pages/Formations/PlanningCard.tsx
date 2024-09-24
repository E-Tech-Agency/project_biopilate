import { useState, useEffect } from "react";

type Plan = {
  title: string;
  image: string;
  date: string;
  niveau: string;
};

type PlanningCardProps = {
  plan: Plan;
  calendar: string[];
};

export default function PlanningCard({ plan, calendar }: PlanningCardProps) {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const transitionClass = `transition-all duration-500 ease-in-out`;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsHover(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsHover(false);
  };

  const isActive = isHover;

  return (
    <div>
      <div className="relative rounded-lg w-[240px] h-[500px] sm:w-[315px] sm:h-[500px] cursor-pointer shadow-xl">
        <div className="absolute inset-0 size-full">
          <img
            loading="lazy"
            src={plan.image}
            alt="Gym"
            className={
              "size-full max-sm:h-[200px] max-sm:rounded-b-none rounded-lg object-cover"
            }
          />
          <div className="sm:hidden absolute inset-0 size-full text-bgColor">
            <div className="relative max-sm:h-[200px] flex flex-col items-center size-full font-ebGaramond">
              <div className="top-0 absolute inset-0 bg-gradient-to-t from-black to-[70%] max-sm:rounded-b-none rounded-lg opacity-75 " />
              <h3 className="text-xl font-semibold absolute bottom-0 left-0 right-0 text-center pb-12  ">
                {plan.title}
              </h3>
              <h3 className="text-lg font-normal absolute bottom-0 left-0 right-0 text-center pb-4">
                {plan.niveau}
              </h3>
              <p className="text-sm leading-4 italic text-center text-wrap line-clamp-6 px-2"></p>
            </div>
          </div>

          {/* calendar */}
          <div className="sm:hidden rounded-md flex flex-col flex-nowrap items-center gap-4 py-5 px-2 font-lato text-center bottom-0">
            <div className="text-marron text-lg font-bold">{plan.date}</div>
            <div className="flex flex-col justify-center items-center">
              {Array.isArray(calendar) &&
                calendar.map((day, index) => (
                  <h1 className="text-sm" key={index}>
                    {day}
                  </h1>
                ))}
            </div>
          </div>
        </div>

        {/* overlay */}
        <div
          className="relative max-sm:hidden text-bgColor size-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black to-[70%] rounded-lg ${transitionClass} ${
              isActive ? "opacity-15" : "opacity-75"
            }`}
          />
          <div className="relative flex flex-col items-center size-full font-ebGaramond">
            <h3
              className={`text-2xl font-semibold absolute bottom-0 left-0 right-0 text-center pb-24  ${transitionClass} ${
                isActive ? "translate-y-[-150px] opacity-0 text-black" : ""
              }`}
            >
              {plan.title}
            </h3>
            <h3
              className={`text-xl font-normal absolute bottom-0 left-0 right-0 text-center pb-14 ${transitionClass} ${
                isActive ? "translate-y-[-150px] opacity-0 text-black" : ""
              }`}
            >
              {plan.niveau}
            </h3>
            <p className="text-sm leading-4 italic text-center text-wrap line-clamp-6 px-2"></p>
            <div
              className={`flex flex-col pb-2 gap-5 ml-[-315px] ${transitionClass} ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute bg-white text-marron rounded-md size-full flex flex-col justify-center flex-nowrap items-center gap-4 py-16 px-8 font-lato font-bold">
                <div className="border-marron border rounded-lg px-5 py-4">
                  {plan.date}
                </div>
                <div className="flex flex-col justify-center items-center">
                  {Array.isArray(calendar) &&
                    calendar.map((day, index) => (
                      <h1 key={index}>{day}</h1>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
