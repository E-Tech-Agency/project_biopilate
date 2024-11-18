import image1 from "@/assets/images/financer-formation-1.jpg";
import image2 from "@/assets/images/financer-formation-2.jpg";

import FINANCER from "@/assets/doc/FINANCER SA FORMATION_.pdf";
export default function FinancerVotreFormation() {
  const handleOpenPdf = () => {
    window.open(FINANCER, "_blank");
  };
  return (
    <section className="relative flex justify-between items-center gap-10 2xl:gap-4 mb-10 bg-bgColor max-md:h-[230px] h-[420px] overflow-hidden max-md:mx-[-20px] md:rounded-lg">
      <div className="absolute max-md:hidden top-0 left-0 mt-[-10px] ml-[-60px] ">
        <svg
          width="602"
          height="430"
          viewBox="0 0 602 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M515.248 428.469C500.623 281.291 470.24 190.736 439.046 167.385C418.111 151.724 398.807 154.256 376.854 155.187C364.236 155.718 351.352 156.184 337.365 155.635C297.363 154.067 274.859 143.484 234.27 117.693C224.869 111.7 215.162 105.08 204.865 98.1212C151.194 61.806 94.0827 15.4775 59.2126 38.9543"
            stroke="#756E66"
            stroke-width="2"
            stroke-miterlimit="10"
          />
          <path
            opacity="0.5"
            d="M474.844 429.293C464.435 299.41 453.81 264.956 424.229 239.35C404.375 222.174 385.638 222.469 364.379 219.474C352.16 217.749 339.685 215.922 326.17 213.025C287.515 204.744 266.015 191.69 227.408 162.347C218.466 155.533 209.245 148.125 199.462 140.321C148.467 99.6059 94.3993 49.6311 60.0727 63.9085"
            stroke="#756E66"
            stroke-width="2"
            stroke-miterlimit="10"
          />
        </svg>
      </div>

      <div className="relative max-md:hidden flex items-end mt-6 mb-14 ml-14 w-[420px]">
        <img
          src={image1}
          alt=""
          className="rounded-full object-cover size-[280px] lg:w-[314px] lg:h-[314px]"
        />
        <img
          src={image2}
          alt=""
          className="absolute rounded-full object-cover size-[150px] lg:w-[200px] lg:h-[200px] right-0 mb-[-40px]"
        />
      </div>
      {/* text */}
      <div className="flex flex-col max-md:justify-center max-md:items-start gap-3 md:gap-4 md:w-[55%] 2xl:w-[60%] mx-8 sm:mx-10 md:mr-12">
        <p className="font-ebGaramond font-bold text-lg md:text-[27px] max-md:leading-6 text-marron">
          Boostez votre avenir Pilates grâce à un financement sur-mesure
        </p>
        <p className="font-lato text-sm md:text-lg max-md:leading-5">
          Investissez en vous avec une formation Pilates : pour votre équilibre,
          votre bien-être et une carrière épanouie
        </p>
        <div className="rounded-lg">
          <button
            className={`flex overflow-hidden reserver-button cursor-pointer bg-white flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
            onClick={handleOpenPdf}
          >
            <div className="hover-circle overflow-hidden" />
            Financez votre formation
          </button>
        </div>
      </div>
    </section>
  );
}
