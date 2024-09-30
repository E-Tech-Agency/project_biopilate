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
    <div className=" my-6 flex flex-col justify-between items-center rounded-lg mx-4 sm:mx-8 shadow-lg w-[232px] h-[347px] sm:w-[368px] sm:h-[428px] ">
      <div className="px-6 sm:px-10 sm:py-6 flex flex-col justify-around items-center gap-4 h-full">
        <img
          loading="lazy"
          src={service.image}
          alt="Service"
          className="rounded-full w-[155px] h-[155px] sm:w-[240px] sm:h-[240px] object-cover shadow-lg"
        />
        <div className="text-center flex flex-col justify-between gap-2 h-20">
          <p className="text-marron text-xl leading-6 font-bold font-ebGaramond text-center">
            {service.title}
          </p>
          <p className="text-sm sm:text-base font-lato ">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
