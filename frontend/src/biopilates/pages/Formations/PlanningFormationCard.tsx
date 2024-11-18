import { LuCalendarDays } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

type Plan = {
  title: string;
  image: string;
  niveau: string;
  date?: string;
  timeSlots: string[];
};

type PlanningCardProps = {
  plan: Plan;
  showMore: boolean;
  toggleShowMore: () => void;
};

type TimeSlotsProps = {
  plan: Plan;
  showMore: boolean;
  toggleShowMore: () => void;
};

function TimeSlots({ plan, showMore, toggleShowMore }: TimeSlotsProps) {
  const timeSlots = Array.isArray(plan.timeSlots) ? plan.timeSlots : [];
  const displayedSlots = showMore ? timeSlots : timeSlots.slice(0, 5);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {displayedSlots.map((day, index) => (
        <div
          className="border border-x-0 border-bgColor w-full py-1.5"
          key={index}
        >
          <h1 className="text-lg">{day}</h1>
        </div>
      ))}

      {timeSlots.length > 5 && (
        <button
          className="flex items-center text-marron text-lg font-lato font-bold mt-3 cursor-pointer"
          onClick={toggleShowMore}
        >
          <span className="mr-2">{showMore ? "Voir moins" : "Voir plus"}</span>
          <FaChevronDown
            className={`transition-transform ${showMore ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

export default function PlanningFormationCard({
  plan,
  showMore,
  toggleShowMore,
}: PlanningCardProps) {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
        showMore ? "h-auto" : " max-md:h-[620px] h-[675px]"
      }`}
    >
      <div className="w-[274px] sm:w-[364px]">
        <div className="relative inset-0 top-0 max-sm:h-[200px] h-[250px]">
          <img
            loading="lazy"
            src={plan.image}
            alt="Gym"
            className="size-full max-sm:rounded-b-none object-cover"
          />
          <div className="absolute inset-0 size-full text-bgColor">
            <div className="relative flex flex-col items-center size-full font-ebGaramond">
              <div className="top-0 absolute inset-0 bg-gradient-to-t from-black to-[70%] opacity-75" />
              <h3 className="text-2xl font-semibold absolute bottom-0 left-0 right-0 text-center pb-14">
                {plan.title}
              </h3>
              <h3 className="text-xl font-normal absolute bottom-0 left-0 right-0 text-center pb-6">
                {plan.niveau}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-md flex flex-col flex-nowrap items-center gap-4 py-4 font-lato text-center bottom-0">
          <div className="flex justify-center items-center gap-2 text-marron font-ebGaramond text-lg w-52">
            <LuCalendarDays className="block text-4xl" />
            <p className="font-bold">{plan.date}</p>
          </div>
          <TimeSlots
            plan={plan}
            showMore={showMore}
            toggleShowMore={toggleShowMore}
          />

          <div className="rounded-lg">
            <button
              className={`flex overflow-hidden reserver-button cursor-pointer bg-bgColor flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
              onClick={() => {
                window.open(
                  "https://forms.zohopublic.com/virtualoffice707/form/AnalysedesbesoinsbnficiairesFormationscourtesouper/formperma/0Yyw-9wbvHRQB_Xb63QniT0EDrnKuekcjjfWvZC8PMg",
                  "_blank"
                );
              }}
            >
              <div className="hover-circle overflow-hidden" />
              Rejoignez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
