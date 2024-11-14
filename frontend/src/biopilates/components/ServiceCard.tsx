// import bioPilateLogo from "@/assets/images/biopilate-logo.png";

// Define the type for the service prop
interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className=" sm:py-6 flex flex-col justify-center sm:justify-around items-center gap-8 md:gap-4 rounded-lg shadow-lg min-w-[232px] sm:min-w-[320px] lg:min-w-[350px] max-w-[370px] h-[347px] sm:h-[428px] bg-white">
      <img
        loading="lazy"
        src={service.image}
        alt="Service"
        className="rounded-full w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] object-cover shadow-lg"
      />
      <div className="text-center flex flex-col justify-between gap-4 md:gap-2 h-20">
        <p className="text-marron text-xl leading-6 font-bold font-ebGaramond text-center inline-block w-[230px] md:w-[260px]">
          {service.title}
        </p>
        <p className="text-sm sm:text-base font-lato ">{service.description}</p>
      </div>
    </div>
  );
}
