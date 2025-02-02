import { LuCalendarDays } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

type Session = {
  course: number;
  start_date: string;
  end_date: string;
  schedule: string;
};

type Plan = {
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  decription_link: string;
  date?: string;
  sessions?: Session[];
};

type PlanningCardProps = {
  plan: Plan;
  showMore: boolean;
  toggleShowMore: () => void;
};


function TimeSlots({ plan, showMore, toggleShowMore }: PlanningCardProps) {
  // Extract schedule data from the sessions
  const session = plan.sessions?.[0];
  if (!session) return null;

  // Format the schedule data
  let scheduleLines: string[] = [];
  
  if (session.schedule && typeof session.schedule === 'object') {
    // Handle API format
    const scheduleData = session.schedule;
    scheduleLines = Object.entries(scheduleData)
      .filter(([key]) => key !== 'start_date' && key !== 'end_date')
      .map(([date, time]) => `- ${date}: ${time}`)
      .filter(line => line && line !== '');
  } else if (typeof session.schedule === 'string') {
    // Handle hardcoded format
    scheduleLines = session.schedule
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line !== '');
  }

  // If no valid schedule lines after processing, return null
  if (scheduleLines.length === 0) {
    return null;
  }

  const displayedSchedules = showMore ? scheduleLines : scheduleLines.slice(0, 1);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {displayedSchedules.map((schedule, index) => (
        <div
          key={index}
          className="border border-x-0 border-bgColor w-full py-1.5"
        >
          <h1 className="text-sm md:text-lg">{schedule}</h1>
        </div>
      ))}

      {scheduleLines.length > 1 && (
        <button
          className="flex items-center text-marron text-lg font-lato font-bold mt-5"
          onClick={toggleShowMore}
        >
          <span className="text-sm md:text-base mr-2">
            {showMore ? "Voir moins" : "Voir plus"}
          </span>
          <FaChevronDown
            className={`text-sm md:text-base transition-transform ${
              showMore ? "rotate-180" : ""
            }`}
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
        showMore ? "h-auto" : "max-md:h-[420px] h-[500px]"
      }`}
    >
      <div className="w-[274px] sm:w-[364px]">
        {/* Image and title */}
        <div className="relative inset-0 top-0 max-md:h-[200px] h-[250px]">
          <img
            loading="lazy"
            src={plan.image}
            alt={plan.title}
            className="w-full h-full max-sm:rounded-b-none object-cover"
          />
          <div className="absolute inset-0 w-full h-full text-bgColor">
            <div className="relative flex flex-col items-center w-full h-full font-ebGaramond">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-[70%] opacity-75" />
              <h3
                className={`text-xl md:text-2xl font-semibold absolute bottom-0 left-0 right-0 text-center pb-14 px-4 ${
                  plan.description ? "" : "pb-7"
                }`}
              >
                {plan.title}
              </h3>
              {plan.description && (
                <h3 className="text-lg md:text-xl font-normal absolute bottom-0 left-0 right-0 text-center pb-6">
                  {plan.description}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Dates and button */}
        <div className="rounded-md flex flex-col flex-nowrap items-center gap-5 py-4 font-lato text-center">
          {plan.date && (
            <div className="flex justify-center items-center gap-2 md:gap-4 text-marron font-ebGaramond text-base md:text-lg w-52 md:w-72 md:grow h-8 md:h-10">
              <div className="md:h-8 md:w-8">
                <LuCalendarDays className="block text-2xl md:text-4xl" />
              </div>
              <p className="md:text-lg font-bold">{plan.date}</p>
            </div>
          )}

          {/* Display the schedule */}
          <TimeSlots
            plan={plan}
            showMore={showMore}
            toggleShowMore={toggleShowMore}
          />

          {/* Button to join */}
          <div className="rounded-lg grow">
            <button
              className="flex overflow-hidden reserver-button bg-bgColor flex-col justify-center text-sm md:text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform"
              onClick={() => {
                window.open(plan.decription_link, "_blank");
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