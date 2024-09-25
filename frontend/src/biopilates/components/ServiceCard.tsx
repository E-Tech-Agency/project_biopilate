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
    <div className=" my-6 flex flex-col justify-between items-center rounded-lg mx-4 sm:mx-8 shadow-lg w-[232px] h-[347px] sm:w-[364px] sm:h-[400px] ">
      <div className="px-6 sm:px-10 sm:py-6 flex flex-col justify-center items-center gap-4">
        <img
          loading="lazy"
          src={service.image}
          alt="Service"
          className="rounded-full w-[155px] h-[155px] sm:w-[240px] sm:h-[240px] object-cover"
        />
        <div className="text-center flex flex-col gap-2">
          <p className="text-marron text-lg leading-6 font-bold font-ebGaramond text-center">
            {service.title}
          </p>
          <p className="text-xs sm:text-sm font-lato ">{service.description}</p>
        </div>
      </div>

      {/* <div className="flex justify-between gap-4 sm:gap-12 border-t border-bgColor px-7 py-4">
        <div className="flex justify-center items-center gap-2">
          <img
            loading="lazy"
            src={bioPilateLogo}
            alt="User"
            className="rounded-full w-[36px] h-[36px]"
          />
          <p className="text-[8px] sm:text-xs text-gray-500">
            Nom d'utilisateur
          </p>
        </div>
        <button className="reserver-button flex ml-auto flex-col justify-center text-xs rounded-lg px-4 py-1 bg-bgColor text-marron font-bold">
          Réserver
        </button>
      </div> */}
    </div>
  );
}
