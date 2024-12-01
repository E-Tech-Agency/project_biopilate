import { LuCalendarDays } from "react-icons/lu";

type Plan = {
  title: string;
  image: string;
  niveau: string;
  date?: string;
  timeSlots: string[];
  price: string;
};

type PlanningCardProps = {
  plan: Plan;
  showMore: boolean;
  toggleShowMore: () => void;
};

export default function PlanningFormationCard({ plan }: PlanningCardProps) {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out w-[274px] sm:w-[364px] max-md:h-[400px] h-[514px]">
      <div className="relative inset-0 top-0 max-md:h-[200px] h-[250px]">
        <img
          loading="lazy"
          src={plan.image}
          alt="Gym"
          className="size-full max-sm:rounded-b-none object-cover"
        />
        <div className="absolute inset-0 size-full text-bgColor">
          <div className="relative flex flex-col items-center size-full font-ebGaramond">
            <div className="top-0 absolute inset-0 bg-gradient-to-t from-black to-[70%] opacity-75" />
            <h3 className="text-xl sm:text-2xl font-semibold absolute bottom-0 left-0 right-0 text-center pb-14">
              {plan.title}
            </h3>
            <h3 className="text-base sm:text-xl font-normal absolute bottom-0 left-0 right-0 text-center pb-6">
              {plan.niveau}
            </h3>
          </div>
        </div>
      </div>
      <div className="rounded-md flex flex-col flex-nowrap justify-around items-center md:gap-6 gap-4 md:py-6 py-5 font-lato text-center h-fit">
        <div className="flex justify-center items-center gap-2 text-marron font-ebGaramond text-base sm:text-lg w-52">
          <LuCalendarDays className="block text-2xl sm:text-3xl" />
          <p className="font-bold">{plan.date}</p>
        </div>
        {plan.timeSlots.map((day, index) => (
          <div className="w-full py-1.5" key={index}>
            <h1 className="text-sm sm:text-lg">{day}</h1>
          </div>
        ))}
        <p className="text-lg font-bold">{plan.price}</p>
        <div className="rounded-lg">
          <button
            className={`flex overflow-hidden reserver-button cursor-pointer bg-bgColor flex-col justify-center text-sm sm:text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
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
  );
}
